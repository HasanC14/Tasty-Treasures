import { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa6";
import { UseAuth } from "../../Context/AuthContext";
import axios from "axios";

const CoinCard = ({ pack }) => {
  const { savedUser, setCoin } = UseAuth();
  const { title, benefits, imageURL, price } = pack;

  const handlePurchase = async () => {
    if (savedUser) {
      try {
        const response = await axios.post(
          "http://localhost:5000/purchaseCoins",
          {
            email: savedUser.email,
            amount: price,
          }
        );
        setCoin((prev) => !prev);
        console.log("Purchase successful:", response.data);
      } catch (error) {
        console.error("Error purchasing coins:", error);
      }
    } else {
      console.error("No user logged in");
    }
  };

  return (
    <div className="p-4 rounded-lg bg-gray-100 h-[35rem] relative">
      <div>
        <img
          src={imageURL}
          alt={title}
          className="rounded-md overflow-hidden cursor-pointer w-full"
        />
      </div>
      <div>
        <div className="flex justify-between text-2xl font-semibold mt-2 px-1 text-start">
          {title}
        </div>
        <div className="text-gray-600 text-justify px-1 my-2">
          <ul className="list-disc text-md ml-2">
            {benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
        {savedUser ? (
          <div
            onClick={handlePurchase}
            className="absolute bottom-4 right-0 mt-2 px-4 py-2 bg-red-500 text-white rounded-md rounded-tr-none rounded-br-none w-4/5 flex items-center hover:bg-red-600 hover:scale-110 transition-all ease-in-out duration-700 cursor-pointer"
          >
            <div className="flex items-center justify-center font-bold w-full">
              <div className="">${price}</div>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-4 right-0 mt-2 px-4 py-2 bg-red-500 text-white rounded-md rounded-tr-none rounded-br-none w-4/5 flex items-center hover:bg-red-600 hover:scale-110 transition-all ease-in-out duration-700 cursor-pointer">
            <div className="flex items-center justify-center font-bold w-full">
              <div className="">Login First</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinCard;
