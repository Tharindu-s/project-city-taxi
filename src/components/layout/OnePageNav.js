import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnePageNav() {

  const router = useRouter(); // Define the router object

  const handleLogout = async () => {
    // Redirect to the logout page
    router.push('/logout');
  };

  return (
    <>
      <ul>
        <li className="has-dropdown active menu-thumb">
          <Link href="/login">Login</Link>
        </li>
        <li className="has-dropdown active menu-thumb">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/book">Book now</Link>
        </li>
        <li>
          <Link href="/join">Join</Link>
        </li>
        <li>
          <Link href="/dashboard">admin</Link>
        </li>
        <li>
        <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: 'inherit', cursor: 'pointer' }}>
            Logout
          </button>
        </li>
      </ul>
    </>
  );
}
