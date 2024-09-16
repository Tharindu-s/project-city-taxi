import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import homeIcon from "../../../public/assets/img/dashboard/icons8-home-144.png";
import driverIcon from "../../../public/assets/img/dashboard/icons8-driver-90.png";
import userIcon from "../../../public/assets/img/dashboard/icons8-user-90.png";
import logoutIcon from "../../../public/assets/img/dashboard/icons8-logout-90.png";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: homeIcon,
        label: "Home",
        href: "/dashboard/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: driverIcon,
        label: "Drivers",
        href: "/dashboard/list/drivers",
        visible: ["admin", "teacher"],
      },
      {
        icon: userIcon,
        label: "Users",
        href: "/dashboard/list/users",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: logoutIcon,
        label: "Logout",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block font-bold text-black my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <p className="hidden lg:block font-medium text-black">
                    {item.label}
                  </p>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
