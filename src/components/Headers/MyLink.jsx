import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "primary-text text-sm font-semibold"
          : `${className} text-sm font-semibold`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
