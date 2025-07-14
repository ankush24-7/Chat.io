import "@/assets/styles/animations.css";
import "@/assets/styles/scrollbars.css";
import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";
import { UserProvider } from "./contexts/userContext";

const App = () => {
  return (
    <UserProvider>
      <div className="flex flex-col h-dvh">
        <Header />
        <Outlet />
      </div>
    </UserProvider>
  )
}

export default App;
