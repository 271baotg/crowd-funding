/* eslint-disable react/prop-types */
import React from "react";
import HeadBox from "./HeadBox";
const TrackingTable = ({ records, option, setOption }) => {
  const matchingColor = (category) => {
    return option.find((item) => item.category === category).color;
  };
  return (
    <div className="h-auto bg-white border border-gray-800 rounded-lg overflow-hidden">
      <div className="flex flex-row w-full ">
        {option.map((item, index) => (
          <HeadBox data={item} key={index} setOption={setOption} />
        ))}
      </div>
      {/* Table */}
      <div className="p-6 w-full">
        <table className="w-full border-collapse">
          <thead className="border-collapse">
            <tr className="">
              <th className="py-1 px-3 text-[12px] font-sans uppercase text-left border-t border-b border-gray-800 text-black">
                Receipt
              </th>
              <th className="py-1 px-3 text-[12px] font-sans uppercase text-left border-t border-b border-gray-800 text-black">
                Transaction Hash
              </th>
              <th className="py-1 px-3 text-[12px] font-sans uppercase text-left border-t border-b border-gray-800 text-black">
                Category
              </th>
              <th className="py-1 px-3 text-[12px] font-sans uppercase text-left border-t border-b border-gray-800 text-black">
                Amount
              </th>
              <th className="py-1 px-3 text-[12px] font-sans uppercase text-left border-t border-b border-gray-800 text-black">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {records.length ? (
              records.map((item, index) => (
                <tr key={index} className="border-collapse ">
                  <td className="py-1 px-3 text-[12px] font-sans text-left border-t border-b border-gray-800 text-black">
                    <a className="underline text-blue-400 cursor-pointer hover:underline-offset-2">
                      {item.sender}
                    </a>
                  </td>
                  <td className="py-1 px-3 text-[12px] font-sans text-left border-t border-b border-gray-800 text-black">
                    <a
                      href={`https://sepolia.etherscan.io/tx/${item.txHash}`}
                      className="underline text-blue-400 cursor-pointer hover:underline-offset-2"
                    >
                      {item.txHash &&
                        `${item.txHash.slice(0, 7)}...${item.txHash.slice(60)}`}
                    </a>
                  </td>
                  <td className="py-1 px-3  font-semibold text-[12px] uppercase font-sans text-left border-t border-b border-gray-800 text-black">
                    <div className="flex items-center gap-2 py-2">
                      <div
                        className={`${matchingColor(
                          item.tag
                        )}   w-[4px] h-[20px] rounded-sm"`}
                      ></div>
                      <p className="text-gray-800 uppercase text-[12px]">
                        {item.tag}
                      </p>
                    </div>
                  </td>
                  <td className="py-1 px-3 font-semibold text-[12px] uppercase font-sans text-left border-t border-b border-gray-800 text-black">
                    {item.amount} <span className="font-normal">ETH</span>
                  </td>
                  <td className="py-1 font-semibold px-3 text-[12px] font-sans text-left border-t border-b border-gray-800 text-black">
                    {item.timestamp}
                  </td>
                </tr>
              ))
            ) : (
              <div className="flex p-4 items-center justify-center w-full">
                <p>Currently there is no transaction of this category</p>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackingTable;
