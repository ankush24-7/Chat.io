import User from "@/components/ui/User";
import Notifications from "@/components/ui/Notifications";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-3.5 py-1.5 bg-second-dark">
      <h1 className="text-3xl font-mono text-prim-text">Chat.io</h1>
      <div className="flex items-center gap-4">
        <Notifications />
        <User />
      </div>
    </div>
  );
};

export default Header;
