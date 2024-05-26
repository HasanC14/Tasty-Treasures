import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Layout from "../Layout/Layout";
import Recipes from "../Components/Recipes/Recipes";
import RecipeDetails from "../Components/Recipes/RecipeDetails";
import Login from "../Components/Login/Login";
import AddRecipe from "../Components/Recipes/AddRecipe";
import BuyCoins from "../Components/Buy Coins/BuyCoins";
import Error from "../Components/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/recipes",
        element: <Recipes></Recipes>,
      },
      {
        path: "/addRecipe",
        element: <AddRecipe />,
      },
      {
        path: "/recipeDetails/:id",
        element: <RecipeDetails></RecipeDetails>,
      },
      {
        path: "/buyCoin",
        element: <BuyCoins></BuyCoins>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
