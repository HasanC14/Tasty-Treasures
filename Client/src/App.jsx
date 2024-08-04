import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/PublicRoutes";
import "./App";
function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
