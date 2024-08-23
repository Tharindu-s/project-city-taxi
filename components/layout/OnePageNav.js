import Link from "next/link";

export default function OnePageNav() {
  return (
    <>
      <ul>
        <li className="has-dropdown active menu-thumb">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="#about">About</Link>
        </li>
        <li>
          <Link href="#service">Services</Link>
        </li>
        <li>
          <Link href="#project">Projects</Link>
        </li>
        <li>
          <Link href="#team">Team</Link>
        </li>
        <li>
          <Link href="#blog">Blog</Link>
        </li>
      </ul>
    </>
  );
}
