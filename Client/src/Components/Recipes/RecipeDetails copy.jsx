import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import SwiperCore, { EffectCoverflow, Pagination, Navigation } from "swiper";
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);
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
  const [purchase, setPurchase] = useState(false);

  const navigate = useNavigate();

  const fetchRecipe = async (userEmail) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/recipe/${id}`, {
        params: { userEmail },
      });

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
    // <div className="space-y-4 text-lg">
    //   <div>
    //     <Swiper
    //       className=" mySwiper"
    //       pagination={{
    //         dynamicBullets: true,
    //       }}
    //       modules={[Pagination]}
    //     >
    //       {recipe?.imageUrls?.map((image, index) => (
    //         <SwiperSlide key={index}>
    //           {/* <img
    //           src={`http://localhost:5000${image}`}
    //           alt={recipe?.title}
    //           className=" w-1/3 rounded-md"
    //         /> */}
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>
    //   </div>
    //   <h1 className="text-4xl font-bold">{recipe?.title}</h1>
    //   <p>{recipe?.description}</p>
    //   <h2 className="flex items-center text-xl">
    //     <FaBasketShopping className="mr-2" />
    //     Ingredients
    //   </h2>
    //   <ul className="list-disc ml-4">
    //     {recipe?.ingredients?.map((ingredient, index) => (
    //       <li key={index}>{ingredient}</li>
    //     ))}
    //   </ul>
    //   <h2 className="flex items-center text-xl">
    //     <FaListCheck className="mr-2" />
    //     Steps
    //   </h2>
    //   <ol>
    //     {recipe?.steps?.map((step, index) => (
    //       <li key={index}>
    //         {index + 1}. <span className="ml-2">{step}</span>
    //       </li>
    //     ))}
    //   </ol>
    //   <h2 className="flex items-center text-xl">
    //     <FaRegCirclePlay className="mr-2" />
    //     Video Tutorial
    //   </h2>
    //   <iframe
    //     width="560"
    //     height="315"
    //     src={`https://www.youtube.com/embed/${
    //       recipe?.videoURL.split("be/")[1]
    //     }`}
    //     title={recipe?.title}
    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //     allowFullScreen
    //   ></iframe>
    // </div>
    // <Swiper
    //   className=" mySwiper"
    //   pagination={{
    //     dynamicBullets: true,
    //   }}
    //   modules={[Pagination]}
    // >
    //   {recipe?.imageUrls?.map((image, index) => (
    //     <SwiperSlide key={index}>
    //       <img
    //         src={`http://localhost:5000${image}`}
    //         alt={recipe?.title}
    //         className=" w-1/3 rounded-md"
    //       />
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        clickable: true,
      }}
      modules={[EffectCoverflow, Pagination, Navigation]}
      className="swiper_container"
    >
      {recipe?.imageUrls?.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={`http://localhost:5000${image}`}
            alt={recipe?.title}
            className=" w-1/3 rounded-md"
          />
        </SwiperSlide>
      ))}

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <div className="swiper-button-next slider-arrow">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
}

export default RecipeDetails;
