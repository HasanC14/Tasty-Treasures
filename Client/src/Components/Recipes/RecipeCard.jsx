import { useEffect, useState } from "react";
import { FaCoins, FaEye, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UseAuth } from "../../Context/AuthContext";
import Skeleton from "../Skeleton/Skeleton";

function RecipeCard({ Recipe, loading }) {
  const { savedUser } = UseAuth();
  console.log(savedUser);
  const [purchase, setPurchase] = useState(false);

  const {
    title,
    imageUrls,
    reactions,
    category,
    _id,
    watchCount,
    purchased_by,
    creatorEmail,
  } = Recipe;

  useEffect(() => {
    if (savedUser?.email) {
      const hasPurchased = purchased_by?.includes(savedUser.email);
      if (hasPurchased) {
        setPurchase(true);
      }
    }
  }, [savedUser, purchased_by]);

  return loading ? (
    <Skeleton></Skeleton>
  ) : (
    <div className="p-2 rounded-lg bg-gray-100 relative w-72">
      <div>
        <img
          src={`https://tasty-treasures-server.vercel.app${imageUrls[0]}`}
          alt=""
          className="rounded-md hover:rotate-3 cursor-pointer hover:scale-110 transition-all ease-in-out duration-700 h-40 w-full"
        />
      </div>
      <div>
        <div className="flex justify-between items-center text-lg font-semibold mt-2 px-1 text-start ">
          <span className="truncate"> {title}</span>
          <div className="flex  space-x-2 ml-1">
            <div className="flex items-center text-xs text-red-600">
              <FaHeart className="mr-1 text-md" />
              {reactions?.length}
            </div>
            <div className="flex items-center text-xs text-red-600">
              <FaEye className="mr-1 text-md" />
              {watchCount}
            </div>
          </div>
        </div>

        <div className="text-xs">
          <span className="bg-red-500 rounded-2xl px-4 text-white">
            {category}
          </span>
        </div>
        {savedUser ? (
          <Link
            to={`/recipeDetails/${_id}`}
            className="absolute bottom-4 right-0 mt-2 px-4 py-2 bg-red-500 text-white rounded-md rounded-tr-none rounded-br-none w-4/5 flex items-center hover:bg-red-600"
          >
            <div className="flex items-center justify-center font-bold w-full">
              <FaCoins className="text-yellow-500 text-xl" />
              <div className="">
                {savedUser?.email === creatorEmail
                  ? "Your recipe"
                  : purchase
                  ? "Purchased"
                  : "10"}
              </div>
            </div>
          </Link>
        ) : (
          <div className="absolute bottom-4 right-0 mt-2 px-4 py-2 bg-red-500 text-white rounded-md rounded-tr-none rounded-br-none w-4/5 flex items-center hover:bg-red-600">
            <div className="flex items-center justify-center font-bold w-full">
              <FaCoins className="text-yellow-500 text-xl" />
              <div className="">Login First</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
