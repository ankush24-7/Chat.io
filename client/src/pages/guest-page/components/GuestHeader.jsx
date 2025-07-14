import { NonIconBtn } from "@/components/ui/Buttons";

const GuestHeader = () => {
  return (
    <header className="flex justify-between items-center px-2 py-3 lg:px-10">
      <span className="scale-90 -translate-x-3 md:scale-100 lg:-translate-x-0">
        <h1 className="text-2xl font-mono text-prim-text">Chat.io</h1>
      </span>
      <ul className="hidden lg:flex lg:items-center lg:gap-6">
        <NonIconBtn label="Login" to="/login" />
        <NonIconBtn label="Sign Up" to="/sign-up" />
      </ul>
    </header>
  );
};

export default GuestHeader;
