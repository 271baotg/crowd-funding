// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetail from "./pages/CampaignDetail";
import { Web3Context } from "./context/Web3Context";
import History from "./pages/History";
const App = () => {
  return (
    <Web3Context>
      <div className="relative p-4 bg-[#fff]] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Sidebar />
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetail />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </Web3Context>
  );
};

export default App;
