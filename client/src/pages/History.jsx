import React, { useState, useEffect, useContext } from "react";
import { loader, refresh } from "../assets";
import TrackingTable from "../components/TrackingTable";
import Context from "../context/Web3Context";
const History = () => {
  const [listRecords, setListRecords] = useState([]);
  const [currentRecords, setCurrentRecords] = useState([]);
  const { getAllRecords } = useContext(Context);
  const [trackingData, setTrackingData] = useState([
    {
      category: "DONATE",
      selected: true,
      color: "bg-red-500",
    },
    {
      category: "WIDTHDRAW",
      selected: false,
      color: "bg-yellow-500",
    },
    {
      category: "REFUND",
      selected: false,
      color: "bg-green-500",
    },
    {
      category: "CREATE",
      selected: false,
      color: "bg-blue-500",
    },
  ]);

  useEffect(() => {
    setCurrentRecords(listRecords);
  }, [listRecords]);

  const optionChange = (category) => {
    const updatedTrackingData = trackingData.map((item) => {
      if (item.category === category) {
        return { ...item, selected: true };
      }
      return { ...item, selected: false };
    });
    setTrackingData(updatedTrackingData);
    const filteredRecords = listRecords.filter((item) => {
      return item.tag === category;
    });

    console.log("Filtered: ", filteredRecords);
    setCurrentRecords(filteredRecords);
  };
  const loadRecords = async () => {
    try {
      const data = await getAllRecords();
      setTrackingData([
        {
          category: "DONATE",
          selected: false,
          color: "bg-red-500",
        },
        {
          category: "WIDTHDRAW",
          selected: false,
          color: "bg-yellow-500",
        },
        {
          category: "REFUND",
          selected: false,
          color: "bg-green-500",
        },
        {
          category: "CREATE",
          selected: false,
          color: "bg-blue-500",
        },
      ]);
      setListRecords(data);
      console.log("Records: ", data);
    } catch (error) {
      console.log("Cannot get records");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h1 className="font-semibold text text-[30px]">Transactions:</h1>
        <div className="flex gap-1 items-center">
          <p
            onClick={() => {
              loadRecords();
            }}
            className="text-black underline hover:underline-offset-2 cursor-pointer"
          >
            Refresh
          </p>
          <img src={refresh} alt="refresh" className="w-[14px] h-[14px]" />
        </div>
      </div>
      <TrackingTable
        records={currentRecords}
        option={trackingData}
        setOption={optionChange}
      />
    </div>
  );
};

export default History;
