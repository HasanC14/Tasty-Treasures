import { Link } from "react-router-dom";
import { UseAuth } from "../../Context/AuthContext";
import { useEffect } from "react";
import { FaCoins } from "react-icons/fa6";

function Navbar() {
  const {
    RegisterWithCoin,
    setLoading,
    LogOut,
    currentUser,
    LoginWithGoogle,
    savedUser,
    setCoin,
  } = UseAuth();

  const HandleGoogleSignIn = async () => {
    await LoginWithGoogle();
  };
  useEffect(() => {
    if (currentUser) {
      RegisterWithCoin();
      setLoading(false);
    }
  }, [currentUser]);
  const HandleLogout = () => {
    LogOut();
    setLoading(false);
    setCoin((prev) => !prev);
  };
  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
      <Link to={"/"}>
        <img
          src="../../../public/logo.png"
          alt=""
          className="size-24 hover:scale-110 transition-all ease-in-out duration-700"
        />
      </Link>
      <div className="flex space-x-10 items-center">
        <Link
          className="hover:underline hover:scale-110 transition-all ease-in-out duration-700"
          to={"/recipes"}
        >
          Recipes
        </Link>
        <Link
          className="hover:underline hover:scale-110 transition-all ease-in-out duration-700"
          to={"/addRecipes"}
        >
          Add Recipe
        </Link>
        <Link
          className="hover:underline hover:scale-110 transition-all ease-in-out duration-700"
          to={"/buyCoin"}
        >
          Buy Coins
        </Link>
        {currentUser ? (
          <button
            className="hover:underline hover:scale-110 transition-all ease-in-out duration-700 cursor-pointer"
            onClick={HandleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="hover:underline hover:scale-110 transition-all ease-in-out duration-700 cursor-pointer"
            onClick={HandleGoogleSignIn}
          >
            Login
          </button>
        )}
        {currentUser ? (
          <div className="flex items-center space-x-2">
            <img
              src={savedUser?.profileImage}
              alt=""
              className="size-16 rounded-full border-red-200 border-4"
            />
            <div className="flex flex-col">
              {/* <div className="text-lg font-semibold">{savedUser?.name}</div> */}
              <div className="flex items-center bg-red-100 rounded-md ps-2 py-1 font-bold w-16">
                <FaCoins className="text-yellow-500 text-xl" />
                <div className="">{savedUser?.coins}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
