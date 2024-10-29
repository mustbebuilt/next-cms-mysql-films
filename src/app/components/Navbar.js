// "use client";
// import { useEffect } from "react";
import Link from "next/link";
import { logout, getSession } from "@/app/lib/auth";
import BurgerMenu from "./BurgerMenu";

const Navbar = async (props) => {
  const isLoggedIn = props.isAuthenticated;
  const session = await getSession();
  // console.log("mySession: ", session.user.username);
  const username = session.user.username;

  return (
    <div className='headerContainer'>
      <header>
        <div className='topBar'>
          <h1>SHU Films</h1>
          <BurgerMenu isLoggedIn={props.isAuthenticated} username={username} />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
