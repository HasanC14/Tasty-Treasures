import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function Recipes() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(" ");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      console.log(search);
      const res = await axios.get(
        `http://localhost:5000/recipes?search=${search}&page=${page}&pageSize=${pageSize}`
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
  }, [search, page, pageSize]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes"
          className="search-input bg-gray-500"
        />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <div className="grid grid-cols-4 max-w-6xl mx-auto gap-4">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} Recipe={recipe} />
            ))}
          </div>
          <div className="flex justify-center">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous Page
            </button>
            <button onClick={() => setPage(page + 1)}>Next Page</button>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value))}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
}

export default Recipes;
