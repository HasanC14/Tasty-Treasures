import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative">
      <picture className="w-full ">
        <source
          media="(max-width: 500px)"
          srcSet="../../../public/43.png"
          className="w-full"
        />
        <source
          media="(max-width: 800px)"
          srcSet="../../../public/84.png"
          className="w-full"
        />
        <img src="../../../public/1600x400.png" className="w-full" />
      </picture>
      <Link
        to={"/recipes"}
        className="absolute top-16 right-1/4  text-white font-bold  md:text-4xl  text-lg rounded-md"
      >
        Your Recipe Hub: Discover, Share, Enjoy
      </Link>
      <Link
        to={"/addRecipe"}
        className="absolute hover:bg-red-400 top-1/2 right-1/4 bg-red-500 text-white py-3 md:px-5 font-bold  lg:px-10 px-2  md:text-lg  text-xs rounded-md uppercase"
      >
        Share your recipe
      </Link>
      <Link
        to={"/recipes"}
        className="absolute hover:bg-red-400 top-1/3 right-1/4 bg-red-500 text-white py-3 md:px-5 font-bold  lg:px-10 px-2  md:text-lg  text-xs rounded-md uppercase"
      >
        See all recipes
      </Link>
    </div>
  );
};

export default Hero;
