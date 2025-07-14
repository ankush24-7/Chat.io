import Profile from "@/components/ui/Profile";
import PersonalInfoForm from "./components/PersonalInfoForm";

const ProfilePage = () => {
  return (
    <div className="w-full h-full py-4 bg-prim-dark">
      <div className="w-[45%] h-full flex flex-col p-2 items-center mx-auto rounded-xl bg-second-dark">
        <h1 className="text-2xl text-prim-text">Profile</h1>
        <Profile />
        <PersonalInfoForm />
      </div>
    </div>
  );
};

export default ProfilePage;
