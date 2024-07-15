import { useEffect, useState } from "react";
import { FaCoins, FaEye, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UseAuth } from "../../Context/AuthContext";

function RecipeCard({ Recipe }) {
  const { savedUser, setCoin } = UseAuth();
  const [purchase, setPurchase] = useState(false);

  const {
    title,
    description,
    imageURL,
    reactions,
    category,
    _id,
    watchCount,
    purchased_by,
  } = Recipe;
  console.log(imageURL);
  useEffect(() => {
    if (savedUser?.email) {
      const hasPurchased = purchased_by.includes(savedUser.email);
      if (hasPurchased) {
        setPurchase(true);
        setCoin((prev) => !prev);
      }
    }
  }, [savedUser, purchased_by]);

  return (
    <div className="p-4 rounded-lg bg-gray-100 h-[27rem] relative">
      <div>
        <img
          src={`http://localhost:5000${imageURL}`}
          alt=""
          className="rounded-md hover:rotate-12 cursor-pointer hover:scale-110 transition-all ease-in-out duration-700"
        />
      </div>
      <div>
        <div className="flex justify-between text-lg font-semibold mt-2 px-1 text-start truncate">
          {title}
        </div>
        <div className="flex mb-2 space-x-2 ml-1">
          <div className="flex items-center text-xs text-red-600">
            <FaHeart className="mr-1 text-lg" />
            {reactions.length}
          </div>
          <div className="flex items-center text-xs text-red-600">
            <FaEye className="mr-1 text-lg" />
            {watchCount}
          </div>
        </div>
        <div className="text-xs">
          <span className="bg-red-500 rounded-2xl px-4 text-white">
            {category}
          </span>
        </div>
        <div className="text-xs text-gray-600 text-justify line-clamp-3 px-1 my-2">
          {description}
        </div>
        {savedUser ? (
          <Link
            to={`/recipeDetails/${_id}`}
            className="absolute bottom-4 right-0 mt-2 px-4 py-2 bg-red-500 text-white rounded-md rounded-tr-none rounded-br-none w-4/5 flex items-center hover:bg-red-600"
          >
            <div className="flex items-center justify-center font-bold w-full">
              <FaCoins className="text-yellow-500 text-xl" />
              <div className="">{purchase ? "Purchased" : "10"}</div>
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
