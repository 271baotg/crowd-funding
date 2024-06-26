/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../../../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json";
import { timeAgo } from "../utils/index";

const Context = createContext();

export const Web3Context = ({ children }) => {
  // const contractAddress = "0x51D5385526FE0Cc8D87061898f6B14e6805A26D6";
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = abi.abi;
  const [web3State, setWeb3State] = useState({
    provider: null,
    signer: null,
    contract: new ethers.Contract(contractAddress, contractABI, null),
  });
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    console.log(web3State);
    console.log(contractABI);
  }, [web3State]);

  useEffect(() => {
    if (sessionStorage.getItem("connected_wallet")) {
      connect();
    }
    checkIfAccountChanged();
  }, []);

  const checkIfAccountChanged = async () => {
    try {
      const { ethereum } = window;
      ethereum.on("accountsChanged", (accounts) => {
        console.log("List account: ", accounts);
        console.log("Account changed to:", accounts[0]);
        setCurrentAccount(accounts[0]);
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCampaignById = async (id) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const newContract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    if (newContract) {
      try {
        const campaign = await newContract.getCampaignById([id]);
        console.log(`Campaign detail with id ${id} `, campaign);
        const parsedResult = {
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          collected: ethers.utils.formatEther(campaign.collected.toString()),
          state: campaign.state,
          image: campaign.image,
        };
        return parsedResult;
      } catch (error) {
        console.error("Error getting campaign:", error);
      }
    } else {
      console.error("Contract is not initialized yet.");
    }
  };

  const getAllRecords = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const newContract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    if (newContract) {
      try {
        const allRecord = await newContract.getRecords();

        const parsedRecords = allRecord.map((record, i) => ({
          sender: `${record.sender.slice(0, 7)}...${record.sender.slice(38)}`,
          target: record.target.toNumber(),
          tag: record.tag,
          txHash: `${record.txHash.slice(0, 7)}...${record.txHash.slice(61)}`,
          timestamp: timeAgo(record.timestamp.toNumber()),
          amount: ethers.utils.formatEther(record.amount.toString()),
        }));
        console.log("All records:", parsedRecords);
        return parsedRecords;
      } catch (error) {
        console.error("Error getting campaigns:", error);
      }
    } else {
      console.error("Contract is not initialized yet.");
    }
  };

  const getAllCampaigns = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const newContract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    if (newContract) {
      try {
        const allCampaigns = await newContract.getCampaigns();
        console.log("All campaigns:", allCampaigns);
        const parsedResult = allCampaigns.map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          collected: ethers.utils.formatEther(campaign.collected.toString()),
          image: campaign.image,
          id: i,
          state: campaign.state,
        }));
        return parsedResult;
      } catch (error) {
        console.error("Error getting campaigns:", error);
      }
    } else {
      console.error("Contract is not initialized yet.");
    }
  };

  const getPersonalCampaigns = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const newContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    if (newContract) {
      try {
        const allCampaigns = await newContract.getCampaigns();
        console.log("All campaigns:", allCampaigns);
        const parsedResult = allCampaigns.map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          collected: ethers.utils.formatEther(campaign.collected.toString()),
          image: campaign.image,
          state: campaign.state,
          id: i,
        }));

        console.log("Onwer: ", address);
        const result = parsedResult.filter((campaign) => {
          return campaign.owner === address;
        });
        console.log("Owner campaigns: ", result);
        return result;
      } catch (error) {
        console.error("Error getting campaigns:", error);
      }
    } else {
      console.error("Contract is not initialized yet.");
    }
  };

  const createCampaign = async (form) => {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      web3State.signer
    );

    try {
      const newCampaign = await contract.createCampaign(
        currentAccount,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
        { gasLimit: 5000000 }
      );
      console.log("Transaction hash:", newCampaign.hash);
      await contract.updateRecordHash(newCampaign.hash);
      console.log("Campaign succesfully created: ", newCampaign);
      return true;
    } catch (error) {
      console.log("Campaign succesfully failure: ", error);
      return false;
    }
  };

  const donate = async (id, amount) => {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      web3State.signer
    );

    if (contract) {
      try {
        console.log("Amount donated: ", amount);
        console.log("Type of amount: ", typeof amount);
        console.log("id: ", id);

        // Parse amount as Ether value
        const tx = await contract.donateToCampaign([id], {
          value: ethers.utils.parseEther(amount.toString()),
        });

        // Wait for the transaction to be mined
        await tx.wait();

        await contract.updateRecordHash(tx.hash);
        console.log("Transaction hash:", tx.hash);
        return tx;
      } catch (error) {
        console.log("Error while donate: ", error);
        return false;
      }
    }
  };

  const widthdraw = async (id) => {
    // alert(id);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      web3State.signer
    );
    if (contract) {
      try {
        // Parse amount as Ether value
        const tx = await contract.widthdraw(id);
        await contract.updateRecordHash(tx.hash);
        return true;
      } catch (error) {
        console.log("Error while widthdraw: ", error);
        return false;
      }
    }
  };

  const returnFund = async (id) => {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      web3State.signer
    );

    if (contract) {
      try {
        await contract.returnFund(id);
        return true;
      } catch (error) {
        console.log("Error while return fund", error);
        return false;
      }
    }
  };

  const getDonations = async (id) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    if (contract) {
      try {
        const data = await contract.getDonators([id]);
        console.log(data);
        const numberOfDonations = data[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
          parsedDonations.push({
            donator: data[0][i],
            donation: ethers.utils.formatEther(data[1][i].toString()),
          });
        }

        return parsedDonations;
      } catch (error) {
        console.log("Error while getting donations: ", error);
      }
    }
  };

  const connect = async () => {
    console.log("Connecting...");
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    try {
      // Create ethers.js provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log("Address: ", address);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setWeb3State((prev) => ({
        ...prev,
        provider: provider,
        signer: signer,
        contract: { ...contract, signer: signer },
      }));
      setCurrentAccount(address);
      sessionStorage.setItem("connected_wallet", address);
    } catch (error) {
      console.log("Failed to connect metamask");
    }
  };

  return (
    <Context.Provider
      value={{
        connect,
        createCampaign,
        getAllCampaigns,
        getPersonalCampaigns,
        connectedWallet: currentAccount,
        donate,
        widthdraw,
        getDonations,
        returnFund,
        getCampaignById,
        getAllRecords,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
