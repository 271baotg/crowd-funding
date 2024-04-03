// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 collected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    struct Record {
        address sender;
        string tag;
        uint256 target;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Record) public records;

    uint256 public numberOfCampaign = 0;
    uint256 public numberOfRecord = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaign];
        Record storage record = records[numberOfRecord];
        require(
            campaign.deadline < block.timestamp,
            "The deadline must not be in the past !"
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;

        record.sender = _owner;
        record.tag = "create_campaign";
        record.target = numberOfCampaign;
        record.amount = 0;
        record.timestamp = block.timestamp;

        numberOfCampaign++;
        numberOfRecord++;

        return numberOfCampaign - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];
        Record storage record = records[numberOfRecord];

        record.sender = msg.sender;
        record.tag = "donate";
        record.target = _id;
        record.amount = msg.value;
        record.timestamp = block.timestamp;

        numberOfRecord++;

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        // (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        // if (sent) {
        campaign.collected = campaign.collected + amount;
        // }
    }

    function getDonators(
        uint256 _campaginId
    ) public view returns (address[] memory, uint256[] memory) {
        return (
            campaigns[_campaginId].donators,
            campaigns[_campaginId].donations
        );
    }

    function getRecords() public view returns (Record[] memory) {
        Record[] memory allRecords = new Record[](numberOfRecord);
        for (uint i = 0; i < numberOfRecord; i++) {
            Record storage item = records[i];
            allRecords[i] = item;
        }

        return allRecords;
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaign);

        for (uint i = 0; i < numberOfCampaign; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    function getCampaignById(uint idx) public view returns (Campaign memory) {
        Campaign storage item = campaigns[idx];
        return item;
    }

    function widthdraw(uint idx) public {
        require(idx < numberOfCampaign, "Contract index is not valid");
        Campaign storage camp = campaigns[idx];
        require(msg.sender == camp.owner, "Sender is not the owner");
        Record storage record = records[numberOfRecord];

        record.sender = msg.sender;
        record.tag = "widthdraw";
        record.target = idx;
        record.amount = camp.collected;
        record.timestamp = block.timestamp;

        numberOfRecord++;
        payable(msg.sender).transfer(camp.collected);

        camp.collected -= camp.collected;
    }

    function returnFund(uint idx) public {
        Campaign storage camp = campaigns[idx];
        require(camp.collected >= 0, "This campaign doesn't have any ETH");
        (address[] memory donators, uint256[] memory donations) = getDonators(
            idx
        );
        for (uint i = 0; i < donators.length; i++) {
            address donator = donators[i];
            uint256 amount = donations[i];
            payable(donator).transfer(amount);
            camp.collected -= amount;
        }
    }

    constructor() {}
}
