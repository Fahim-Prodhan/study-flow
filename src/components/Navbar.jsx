import { LuNotebookPen } from "react-icons/lu";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, setUser, loading } = useAuth();

  const handleLogOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data, "data");

      if (data.success) {
        toast.success(data.message || "Logged out successfully!");
        setUser(null);
      } else {
        throw new Error(data.message || "Failed to log out.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-[#f0f1eb]">
      <nav className="flex justify-between gap-4 items-center py-4  container mx-auto">
        <Link to="/">
          <LuNotebookPen className="text-[#0e7c66] h-[35px] w-[35px]" />
        </Link>

        <ul className="flex gap-2 items-center text-slate-700">
          <li>
            {/* <a href="/features">Features</a> */}
            <Link to="/features">Features</Link>
          </li>
          <li>
            <Link to="/how-it-works">How it Works</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/private">
              {" "}
              <div className="aura aura-rainbow">
                <div className="card bg-base-100">
                  <div className="card-body">
                    <p>Private Page</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </ul>

        <div className="flex gap-4 items-center">
          {loading ? (
            <span className="loading loading-spinner text-error"></span>
          ) : user ? (
            <div>
              <button
                className="btn h-[60px] bg-none border-none hover:bg-none"
                popoverTarget="popover-1"
                style={
                  { anchorName: "--anchor-1" } /* as React.CSSProperties */
                }
              >
                <img
                  src="https://png.pngtree.com/png-clipart/20241125/original/pngtree-cartoon-user-avatar-vector-png-image_17295195.png"
                  alt=""
                  className="h-[60px] w-[60px] rounded-full border border-orange-500"
                />
              </button>

              <ul
                className="dropdown menu w-[300xp] rounded-box bg-base-100 shadow-sm space-y-3"
                popover="auto"
                id="popover-1"
                style={
                  { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
                }
              >
                <span className="text-[#0e7c66] font-semibold text-xl">
                  Welcome, {user.name}
                </span>

                <li>
                  <Link to={"/dashboard/task"} className="block text-center">
                    <button className="">Dashboard</button>
                  </Link>
                </li>
                <li>
                  <button
                    className="btn border-red-500 text-red-500"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/sign-in">
              <button className="px-4 py-2 rounded-md font-semibold text-xl cursor-pointer text-[#0e7c66] border-2 border-[#0e7c66] hover:bg-[#0e7c66] hover:text-white">
                Login
              </button>
            </Link>
          )}
          <button className="bg-[#0e7c66] px-4 py-2 rounded-md font-semibold text-xl text-white">
            Get Started
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
