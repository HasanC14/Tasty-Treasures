import Hero from "../Hero/Hero";
import Recipes from "../Recipes/Recipes";

function Home() {
  return (
    <div className="">
      {/* <Hero />
      <div className="text-center md:text-4xl text-2xl font-bold my-10 underline">
        Discover Recipes Across the WORLD{" "}
      </div> */}
      <Recipes />
    </div>
  );
}

export default Home;
