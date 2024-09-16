import Link from "next/link";

export default function OnePageNav() {
  return (
    <>
      <ul>
        <li className="has-dropdown active menu-thumb">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/book">Book now</Link>
        </li>
        <li>
          <Link href="/join">Join</Link>
        </li>
      </ul>
    </>
  );
}