import { useEffect, useState } from "react";
import axios from "axios";
import { UseAuth } from "../../Context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const AddRecipe = () => {
  const { savedUser, setCoin } = UseAuth();
  const { width, height } = useWindowSize();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    category: "",
    country: "",
    videoURL: "",
    tags: "",
  });
  const [imageFile, setImageFile] = useState([]);
  const [ConfettiState, setConfettiState] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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

    const formData = new FormData();
    formData.append("title", recipe?.title);
    formData.append("description", recipe?.description);
    formData.append("ingredients", recipe?.ingredients);
    formData.append("steps", recipe?.steps);
    formData.append("category", recipe?.category);
    formData.append("country", recipe?.country);
    formData.append("videoURL", recipe?.videoURL);
    formData.append("tags", recipe?.tags);
    formData.append("creatorEmail", savedUser?.email);

    if (imageFile.length > 0) {
      formData.append("image", imageFile[0]?.file);
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/addRecipe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCoin((prev) => !prev);
      setConfettiState((prev) => !prev);
      toast.success("Congratulations! You got 50 Coins");
      console.log("Recipe added successfully:", response.data);
      setRecipe({
        title: "",
        description: "",
        ingredients: "",
        steps: "",
        category: "",
        country: "",
        videoURL: "",
        tags: "",
      });
      setImageFile([]);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  useEffect(() => {
    if (ConfettiState) {
      const timer = setTimeout(() => {
        setConfettiState(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [ConfettiState]);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full">
      {ConfettiState ? <Confetti width={width} height={height} /> : ""}
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
          <label className="block text-gray-700">Image:</label>
          <FilePond
            files={imageFile}
            allowMultiple={false}
            onupdatefiles={setImageFile}
            allowFileEncode={true}
            name="image"
            maxFileSize="2MB"
            labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
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
