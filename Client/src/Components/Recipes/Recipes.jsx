import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "./Recipes.css";
import { FallingLines } from "react-loader-spinner";

function Recipes() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [animationClass, setAnimationClass] = useState("slide-in");

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/recipes?search=${search}&page=${page}`
      );
      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [search, page]);

  const handlePageChange = (newPage) => {
    setAnimationClass("slide-out");
    setTimeout(() => {
      setPage(newPage);
      setAnimationClass("slide-in");
    }, 500);
  };

  return (
    <>
      <form className=" max-w-6xl mx-auto">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </form>
      {/* 
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes"
          className="search-input bg-gray-500"
        /> */}
      {loading ? (
        <div className="flex justify-center items-center h-[28rem]">
          <FallingLines
            color="#EF4444"
            width="50"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto my-10">
          <div className={`grid grid-cols-4 gap-4 h-[28rem] ${animationClass}`}>
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} Recipe={recipe} />
            ))}
          </div>
          <div className="flex justify-end items-center space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-gray-200 rounded-full p-3 text-red-500"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="bg-gray-200 rounded-full p-3 text-red-500"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Recipes;
