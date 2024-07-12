import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseAuth } from "../../Context/AuthContext";
import {
  FaBasketShopping,
  FaListCheck,
  FaRegCirclePlay,
} from "react-icons/fa6";

function RecipeDetails() {
  const { id } = useParams();
  const { savedUser, setCoin } = UseAuth();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  const fetchRecipe = async (userEmail) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/recipe/${id}`, {
        params: { userEmail },
      });
      setCoin((prev) => !prev);
      console.log(res.data.recipe);
      setRecipe(res.data.recipe);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (savedUser?.email) {
      fetchRecipe(savedUser.email);
    }
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!recipe) {
    navigate("/buyCoin");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4 text-lg">
      <div className="w-full flex items-center ">
        <img
          src={recipe.imageURL}
          alt={recipe.title}
          className=" w-1/3 rounded-md"
        />
      </div>
      <h1 className="text-4xl font-bold">{recipe.title}</h1>
      <p>{recipe.description}</p>
      <h2 className="flex items-center text-xl">
        <FaBasketShopping className="mr-2" />
        Ingredients
      </h2>
      <ul className="list-disc ml-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="flex items-center text-xl">
        <FaListCheck className="mr-2" />
        Steps
      </h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>
            {index + 1}. <span className="ml-2">{step}</span>
          </li>
        ))}
      </ol>
      <h2 className="flex items-center text-xl">
        <FaRegCirclePlay className="mr-2" />
        Video Tutorial
      </h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${
          recipe?.videoURL.split("be/")[1]
        }`}
        title={recipe.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default RecipeDetails;
