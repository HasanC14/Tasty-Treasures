import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseAuth } from "../../Context/AuthContext";
import {
  FaBasketShopping,
  FaListCheck,
  FaRegCirclePlay,
} from "react-icons/fa6";
import Carousel from "../Carousel/Carousel";

function RecipeDetails() {
  const { id } = useParams();
  const { savedUser, setCoin } = UseAuth();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const navigate = useNavigate();

  const fetchRecipe = async (userEmail) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://tasty-treasures-server.vercel.app/recipe/${id}`,
        {
          params: { userEmail },
        }
      );

      if (savedUser?.coins > 9) {
        setCoin((prev) => !prev);
        setRecipe(res.data.recipe);
        const hasPurchased = res.data.recipe?.purchased_by?.includes(
          savedUser.email
        );
        if (
          !hasPurchased &&
          savedUser?.email != res?.data?.recipe?.creatorEmail
        ) {
          navigate("/buyCoin");
        }
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (savedUser?.email) {
      fetchRecipe(savedUser?.email);
    }
  }, [savedUser?.email]);

  useEffect(() => {}, [recipe]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">{recipe?.title}</h1>
        <p className="mt-5">{recipe?.description}</p>
      </div>
      <div className="flex md:flex-row flex-col-reverse gap-4 text-lg">
        <div className="w-1/2 space-y-4">
          <div className="space-y-2">
            <h2 className="flex items-center text-xl font-semibold">
              <FaBasketShopping className="mr-2" />
              Ingredients
            </h2>
            <ul className="list-disc ml-4 grid grid-cols-3">
              {recipe?.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="flex items-center text-xl font-semibold">
              <FaListCheck className="mr-2" />
              Steps
            </h2>
            <ol>
              {recipe?.steps?.map((step, index) => (
                <li key={index}>
                  {index + 1}. <span className="ml-2">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="w-1/2">
          <div className="max-w-lg space-y-8">
            <Carousel>
              {recipe?.imageUrls?.map((image, index) => (
                <img
                  key={index}
                  src={`https://tasty-treasures-server.vercel.app${image}`}
                  alt={recipe?.title}
                  className="min-w-full max-h-80 rounded-md"
                />
              ))}
            </Carousel>
            <div className="space-y-2">
              <h2 className="flex items-center text-xl font-semibold">
                <FaRegCirclePlay className="mr-2" />
                Video Tutorial
              </h2>
              <iframe
                className="w-full h-56"
                src={`https://www.youtube.com/embed/${
                  recipe?.videoURL.split("be/")[1]
                }`}
                title={recipe?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
