import Image from "next/image";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="flex flex-col">
          <span className="text-lg leading-3 font-medium flex items-center gap-3">
            <FaUser size={22} />
            Admin
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
