// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

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

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaign = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaign];
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

        numberOfCampaign++;

        return numberOfCampaign - 1;
    }

    function donateToCampaign(uint256 _campaignId) public payable {
        uint256 amount = msg.value;

        Campaign storage campagin = campaigns[_campaignId];

        campagin.donators.push(msg.sender);
        campagin.donations.push(amount);

        (bool isSuccess, ) = payable(campagin.owner).call{value: amount}("");

        if (isSuccess) {
            campagin.collected += amount;
        }
    }

    function getDonators(
        uint256 _campaginId
    ) public view returns (address[] memory, uint256[] memory) {
        return (
            campaigns[_campaginId].donators,
            campaigns[_campaginId].donations
        );
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaign);

        for (uint i = 0; i < numberOfCampaign; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    constructor() {}
}
