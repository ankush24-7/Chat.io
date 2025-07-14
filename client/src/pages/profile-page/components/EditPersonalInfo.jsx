import validate from "@/utils/validateForm";
import { useUser } from "@/contexts/userContext";

const EditPersonalInfo = ({ errors, setErrors, colors, setColors }) => {
  const { user } = useUser();
  const validateField = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        validate.validateFullName(value, setColors, setErrors);
        break;
      case "username":
        validate.validateUsername(value, setColors, setErrors);
        break;
      case "email":
        validate.validateEmail(value, setColors, setErrors);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full flex flex-col rounded-2xl px-3 py-2 mt-2 gap-1.5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="fullname" className="text-sm leading-3 text-gray-300">
          Full Name*
        </label>
        <input
          type="text"
          name="fullName"
          autoComplete="off"
          defaultValue={user.fullName}
          placeholder="Enter your first name"
          onChange={(e) => validateField(e)}
          style={{ borderColor: colors.fullName }}
          className="w-full p-1.5 rounded-xl focus:outline-none border border-white/20 text-white hover:bg-card-hover focus:bg-card-hover"
        />
        <p className="text-red-500 text-[10px] h-1">{errors.fullName}</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm leading-3 text-gray-300">
          Username*
        </label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          defaultValue={user.username}
          placeholder="Enter your username"
          onChange={(e) => validateField(e)}
          style={{ borderColor: colors.username }}
          className="w-full p-1.5 rounded-xl focus:outline-none border border-white/20 text-white hover:bg-card-hover focus:bg-card-hover"
        />
        <p className="text-red-500 text-[10px] h-1">{errors.username}</p>
        <label htmlFor="email" className="text-sm leading-3 text-gray-300">
          Email*
        </label>
        <input
          type="email"
          name="email"
          autoComplete="off"
          defaultValue={user.email}
          placeholder="Enter your email"
          onChange={(e) => validateField(e)}
          style={{ borderColor: colors.email }}
          className="w-full p-1.5 rounded-xl focus:outline-none border border-white/20 text-white hover:bg-card-hover focus:bg-card-hover"
        />
        <p className="text-red-500 text-[10px] h-1">{errors.email}</p>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
