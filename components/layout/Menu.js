import Link from "next/link";

export default function Menu() {
  return (
    <>
      <ul>
        <li className="has-dropdown active menu-thumb">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/news">
            Services
            <i className="fas fa-angle-down ps-1" />
          </Link>
          <ul className="submenu">
            <li>
              <Link href="/service">Services</Link>
            </li>
            <li>
              <Link href="/service-carousel">Service Carousel</Link>
            </li>
            <li>
              <Link href="/service-details">Service Details</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </>
  );
}
