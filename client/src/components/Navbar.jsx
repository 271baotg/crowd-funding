import CustomButton from "./CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { logo, menu, search, sun, thirdweb } from "../assets";
import { useContext, useState } from "react";
import { navlinks } from "../constant";
import Context, { Web3Context } from "../context/Web3Context";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [isActive, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const { connect, connectedWallet } = useContext(Context);

  useEffect(() => {
    console.log("Connected Wallet: ", connectedWallet);
  }, []);
  useEffect(() => {
    // Extract the pathname from the location object
    const currentPath = location.pathname;

    // Iterate over navlinks to find the active link
    navlinks.forEach((link) => {
      if (currentPath === link.link) {
        setActive(link.name);
      }
    });
  }, [location.pathname]);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6 pb-4 border-b-4 border-[#4acd8d]-500">
      <div className="rounded-[35px] w-full lg:flex-1 flex flex-row sm:max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#d2d5cd]">
        <input
          type="text"
          placeholder="Search for campaign"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#25272f] bg-transparent  text-black outline-none"
        ></input>
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex items-center justify-center cursor-pointer">
          <img
            src={search}
            alt="search-icon"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden justify-end gap-4 flex-row">
        <CustomButton
          btnType="button"
          title={connectedWallet ? "Create a campaign" : "Connect"}
          styles={connectedWallet ? "bg-[#1dc071]" : "bg-[#77d465]"}
          handleClick={() => {
            if (connectedWallet) navigate("create-campaign");
            else connect();
          }}
        />
        {/* <p className="font-semibold underline text-[10px] text-white">
          ${connectedWallet.substring(0, 6)}...$
          {connectedWallet.substring(connectedWallet.length - 4)}
        </p> */}
        <Link>
          <div className="bg-[#4b5264] w-[52px] h-[52px] cursor-pointer rounded-full flex flex-row justify-center items-center">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Burger menu */}

      <div className="sm:hidden flex justify-between items-center relative">
        <div className="bg-[#4b5264] w-[52px] h-[52px] cursor-pointer rounded-full flex flex-row justify-center items-center">
          <img
            src={thirdweb}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 py-4
            ${
              !toggle ? "-translate-y-[100vh]" : "translate-y-0"
            } transition-all duration-700`}
        >
          <ul>
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive == link.name && "bg-[#3b433a]"
                } cursor-pointer text-gray-400`}
                onClick={() => {
                  setActive(link.name);
                  setToggle(false);
                  navigate(link.link);
                }}
              >
                <img
                  className={`${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                  src={link.imgUrl}
                  alt={link.name}
                />
                <p
                  className={`pl-3 font-epilouge ${
                    isActive === link.name && "text-[#1dc071]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={connectedWallet ? "Create a campaign" : "Connect"}
              styles={connectedWallet ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (connectedWallet) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
