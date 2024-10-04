import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OnePageNav() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/check-login");
      const loggedInUser = await response.json();
      setUser(loggedInUser);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    router.push("/logout");
  };

  return (
    <div>
      <ul>
        {!user && (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
        <li>
          <Link href="/">Home</Link>
        </li>

        {!user && (
          <li>
            <Link href="/join">Join</Link>
            <i className="fas fa-angle-down ps-1" />
            <ul className="submenu">
              <li>
                <Link href="/passenger-join">As a passenger</Link>
              </li>
              <li>
                <Link href="/driver-join">As a driver</Link>
              </li>
            </ul>
          </li>
        )}
        {user && user.type === "admin" && (
          <li>
            <Link href="/dashboard">Admin</Link>
          </li>
        )}
        {user && (
          <li>
            <button
              onClick={handleLogout}
              style={{
                border: "none",
                background: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
