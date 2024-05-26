import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function Recipes() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/recipes`);
      console.log(res.data);
      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-4 max-w-6xl mx-auto gap-4">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} Recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );
}

export default Recipes;
