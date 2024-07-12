import { useState } from "react";
import axios from "axios";
import { UseAuth } from "../../Context/AuthContext";
import { Toaster, toast } from "react-hot-toast";

const AddRecipe = () => {
  const { savedUser } = UseAuth();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    category: "",
    country: "",
    videoURL: "",
    imageURL: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!savedUser) {
      console.error("No user logged in");
      return;
    }

    const formattedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split(",").map((item) => item.trim()),
      steps: recipe.steps.split("\n").map((item) => item.trim()),
      tags: recipe.tags.split(",").map((item) => item.trim()),
      creatorEmail: savedUser.email,
    };

    console.log(formattedRecipe);

    try {
      const response = await axios.post(
        "http://localhost:5000/addRecipe",
        formattedRecipe
      );
      toast.success("Recipe added successfully!");
      console.log("Recipe added successfully:", response.data);
      setRecipe({
        title: "",
        description: "",
        ingredients: "",
        steps: "",
        category: "",
        country: "",
        videoURL: "",
        imageURL: "",
        tags: "",
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={recipe?.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={recipe?.description}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Ingredients (comma separated):
          </label>
          <textarea
            name="ingredients"
            value={recipe?.ingredients}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Steps (one per line):</label>
          <textarea
            name="steps"
            value={recipe?.steps}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Category:</label>
          <input
            type="text"
            name="category"
            value={recipe?.category}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Country:</label>
          <input
            type="text"
            name="country"
            value={recipe?.country}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Video URL:</label>
          <input
            type="url"
            name="videoURL"
            value={recipe?.videoURL}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL:</label>
          <input
            type="url"
            name="imageURL"
            value={recipe?.imageURL}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Tags (comma separated):</label>
          <input
            type="text"
            name="tags"
            value={recipe?.tags}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          Add Recipe
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddRecipe;
