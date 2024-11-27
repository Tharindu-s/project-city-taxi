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
        icon: driverIcon,
        label: "Drivers",
        href: "/dashboard/list/drivers",
      },
      {
        icon: userIcon,
        label: "Passengers",
        href: "/dashboard/list/passengers",
      },
      {
        icon: userIcon,
        label: "Book",
        href: "/dashboard/list/book",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: logoutIcon,
        label: "Logout",
        href: "/logout",
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
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
