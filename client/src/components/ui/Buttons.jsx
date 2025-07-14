import { Link } from "react-router-dom";

export function IconBtn({ onClick, Icon, to, label }) {
  return (
    <Link to={to}>
      <button 
        onClick={onClick}
        className="flex group items-center cursor-pointer rounded-xl pl-2 pr-1 py-1 gap-1 sm:gap-1.5 sm:px-1.5 sm:py-1 hover:bg-dark-hover">
        {Icon && <Icon />}
        <p className="text-white">{label}</p>
      </button>
    </Link>
  );
}

export function NonIconBtn({ label, to }) {
  return (
    <Link to={to}>
      <button className="flex items-center rounded-xl border-[1.5px] px-4 py-2 cursor-pointer hover:bg-dark-hover border-white">
        <p className="pb-0.5 font-medium leading-none text-prim-text">
          {label}
        </p>
      </button>
    </Link>
  );
}
