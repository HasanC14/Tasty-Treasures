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
        <div className="text-prime text-lg md:mr-2 mr-0">
          <a
            href="https://github.com/HasanC14/new-WriteRight-client"
            className="md:text-2xl text-lg  hover:underline"
            target="_blank"
          >
            WriteRight
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
            <div className="w-full h-12 bg-[#6a85c8] rounded-t-xl flex justify-between items-center">
              <div>
                <FaEllipsis className="text-5xl ms-4" />
              </div>
              <div>
                <FaCircleXmark
                  className="text-3xl me-2 hover:text-white cursor-pointer"
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
              <div className="col-span-2 lg:mt-0 mt-5">
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
                  who loves to code. I created{" "}
                  <a
                    href="https://github.com/HasanC14/new-WriteRight-client"
                    className="md:text-2xl text-lg font-bold hover:underline"
                  >
                    WriteRight
                  </a>{" "}
                  , By leveraging the power of{" "}
                  <span className="font-bold">Google</span>&#39;s latest
                  language processing technology, to assist people in refining
                  their writing skills. Good writing is an essential part of
                  communication, and my goal is for WriteRight to make that
                  process simpler. If you have any queries or comments, I would
                  be delighted to hear from you!
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
