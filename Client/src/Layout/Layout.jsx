import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

function Layout() {
  return (
    <div className="flex flex-col justify-between min-h-screen space-y-10">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
