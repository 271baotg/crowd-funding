import { useContext, useEffect, useState } from "react";
import Context from "../context/Web3Context";
import { ethers } from "ethers";
import CampaignList from "../components/CampaignList";

const Profile = () => {
  const { getPersonalCampaigns } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    setIsLoading(true);
    const data = await getPersonalCampaigns();
    console.log(data);
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <CampaignList
      title="Your Created Campaigns: "
      data={campaigns}
      isLoading={isLoading}
    ></CampaignList>
  );
};

export default Profile;
