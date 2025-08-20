import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { UserProvider } from "./Context/useAuth";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Outlet />
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
