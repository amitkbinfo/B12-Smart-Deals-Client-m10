import React, { use } from "react";
import MyLink from "./MyLink";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";

const Navbar = () => {
  const { user, loading, signOutUser } = use(AuthContext);
  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("সাইন আউট সফল হয়েছে।");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  const navLinks = (
    <>
      <MyLink to={"/"}>Home</MyLink>
      <MyLink to={"/all-products"}>All Products</MyLink>
      {
        user && <>
        {/* <MyLink to={"/my-products"}>My Products</MyLink> */}
      <MyLink to={"/my-bids"}>My Bids</MyLink>
      <MyLink to={"/create-product"}>Create Product</MyLink></>
      }
    </>
  );
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to={"/"} className="font-bold text-2xl">
            Smart<span className="primary-text">Deals</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex gap-3">{navLinks}</div>
        {loading ? (
          <div className="navbar-end gap-2">
            <ClockLoader size={36} color="#FB4231" />
            <div className="skeleton btn bg-[#F8F8F8] btn-ghost w-16 h-8 shrink-0"></div>
          </div>
        ) : user ? (
          <div className="navbar-end gap-2">
            <img
              src={user?.photoURL}
              className="rounded-full w-10"
              title={user?.displayName}
              alt=""
            />
            <Link
              onClick={handleLogout}
              to="/login"
              className="btn btn-sm border-[#7740E8] primary-text"
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="navbar-end gap-2">
            <Link to="/login" className="btn border-[#7740E8] primary-text">
              Login
            </Link>
            <Link to="/register" className="btn primary-bg">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
