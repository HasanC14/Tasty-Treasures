function Footer() {
  return (
    <div>
      <div className="bg-red-100">
        <footer className="flex flex-col justify-center items-center py-20 max-w-6xl mx-auto ">
          <div className="space-y-14">
            <ul className="uppercase flex flex-wrap  space-x-10 text-gray-700 text-sm justify-center items-center">
              <li className="">
                <a href="/">
                  <img
                    src="../../../public/logo_text.png"
                    alt=""
                    className="size-40 hover:scale-110 transition-all ease-in-out duration-700  overflow-hidden"
                  />
                </a>
              </li>
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  CONTACT US
                </a>
              </li>
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  NUTRITION INFO{" "}
                </a>
              </li>
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  EMPLOYMENT
                </a>
              </li>
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  {" "}
                  OUR STORY
                </a>
              </li>
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  WHO WE ARE
                </a>
              </li>
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  FRANCHISING
                </a>
              </li>
            </ul>
            <ul className="uppercase flex flex-wrap  space-x-10  text-gray-700 text-xs justify-center items-center">
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  TERMS & CONDITIONS{" "}
                </a>
              </li>
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  SITEMAP
                </a>
              </li>
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  {" "}
                  PRIVACY POLICY
                </a>
              </li>
              <li className="mt-4">
                <a href="" className="hover:text-red-500">
                  {" "}
                  WEB ACCESSIBILITY
                </a>
              </li>
            </ul>
            <ul className="uppercase flex flex-wrap  space-x-2  text-gray-700 justify-center items-center text-3xl">
              <li className="mt-4">
                <a
                  href=""
                  className="hover:text-red-500 transition-all ease-in-out duration-700 "
                >
                  <i className="fa-brands fa-square-facebook"></i>
                </a>
              </li>
              <li className="mt-4">
                <a
                  href=""
                  className="hover:text-red-500 transition-all ease-in-out duration-700 "
                >
                  <i className="fa-brands fa-square-instagram"></i>
                </a>
              </li>
              <li className="mt-4">
                <a
                  href=""
                  className="hover:text-red-500 transition-all ease-in-out duration-700 "
                >
                  <i className="fa-brands fa-square-x-twitter"></i>
                </a>
              </li>
              <li className="mt-4">
                <a
                  href=""
                  className="hover:text-red-500 transition-all ease-in-out duration-700 "
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
