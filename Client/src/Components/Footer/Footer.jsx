import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaCircleXmark,
  FaEllipsis,
  FaEnvelopeOpen,
} from "react-icons/fa6";
import "/src/App.css";
function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const textAreaVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.3, ease: "easeInOut" },
    },
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="text-xs mt-10 flex flex-col md:flex-row items-center">
        <div className=" text-lg md:mr-2 mr-0">
          <a
            href="https://github.com/HasanC14/Tasty-Treasures"
            className="md:text-2xl text-lg  hover:underline"
            target="_blank"
          >
            Tasty Treasures
          </a>
        </div>
        <div>
          Made with ❤️ by
          <button className="text-prime underline ml-1" onClick={toggleModal}>
            Hasan Chowdhury
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <motion.div
          custom="left"
          initial="hidden"
          animate="visible"
          variants={textAreaVariants}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className=" bg-prime max-w-screen-lg mx-auto text-second rounded-xl ">
            <div className="w-full h-12 bg-[#ec7777] rounded-t-xl flex justify-between items-center">
              <div>
                <FaEllipsis className="text-5xl ms-4 text-white" />
              </div>
              <div>
                <FaCircleXmark
                  className="text-white text-3xl me-2 hover:text-gray-200 cursor-pointer"
                  onClick={toggleModal}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 md:px-4 md:py-16 p-3 bg-base-200">
              <div className="m-auto col-span-1">
                <img
                  src="/Profile.png"
                  alt=""
                  className="size-72 rounded-full "
                />
              </div>
              <div className="col-span-2 lg:mt-0 mt-5 text-white">
                <p className="text-xl  md:px-10 p-3">
                  <span className="md:text-2xl text-lg ">
                    Hi there! I&#39;m{" "}
                    <span className="md:text-4xl text-2xl font-bold">
                      Hasan
                    </span>
                    ,{" "}
                  </span>{" "}
                  <br />a{" "}
                  <span className="font-bold">Full Stack Web Developer</span>{" "}
                  who loves to code. I developed{" "}
                  <a
                    href="https://github.com/HasanC14/Tasty-Treasures"
                    className="md:text-2xl text-lg font-bold hover:underline"
                  >
                    Tasty Treasures
                  </a>{" "}
                  , a unique recipe-sharing platform where users can explore
                  delicious recipes using a fun coin-based system. Users spend
                  coins to unlock recipes and earn coins by uploading their own
                  culinary creations. Built with the MERN stack, Tasty Treasures
                  offers a seamless and engaging experience for food lovers. If
                  you have any feedback or suggestions, I'd love to hear from
                  you!
                  <div className="flex space-x-4 md:text-3xl text-2xl mt-5">
                    <a
                      href="dev.hasanchowdhury@gmail.com?subject=Hello%20There&body=I%20wanted%20to%20get%20in%20touch%20with%20you."
                      target="_blank"
                    >
                      <FaEnvelopeOpen />
                    </a>
                    <a
                      href="https://www.facebook.com/dev.hasanchowdhury"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-all ease-in-out duration-700"
                    >
                      <FaFacebook></FaFacebook>
                    </a>
                    <a
                      href="https://github.com/HasanC14"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-all ease-in-out duration-700"
                    >
                      <FaGithub></FaGithub>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/dev1hasanchowdhury/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-all ease-in-out duration-700"
                    >
                      <FaLinkedinIn></FaLinkedinIn>
                    </a>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
export default Footer;
