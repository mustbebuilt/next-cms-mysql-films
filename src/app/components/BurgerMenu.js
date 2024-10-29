// BurgerMenu.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { logout } from "@/app/lib/auth";

const BurgerMenu = ({ isLoggedIn, username }) => {
  const [isNavVisible, setNavVisible] = useState(false);

  const handleBurgerClick = () => {
    setNavVisible((prev) => !prev);
  };

  const handleLinkClick = () => {
    setNavVisible(false); // Hide menu when a link is clicked
  };

  useEffect(() => {
    const handleResize = () => {
      setNavVisible(false); // Close the menu on window resize
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className='burgerMenuContainer'>
      <div
        className={`burger ${isNavVisible ? "changeBurger" : ""}`}
        onClick={handleBurgerClick}
      >
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
      <nav className={`mainNav ${isNavVisible ? "visible" : ""}`}>
        <menu>
          <li onClick={handleLinkClick}>
            <Link href='/'>Home</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href='/catalogue'>Catalogue</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href='/search'>Search</Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href='/contact'>Contact Us</Link>
          </li>
          {!isLoggedIn ? (
            <li onClick={handleLinkClick}>
              <Link href='/login'>Login</Link>
            </li>
          ) : (
            <>
              <li onClick={handleLinkClick}>
                <Link href='/cms'>CMS</Link>
              </li>
              <li onClick={handleLinkClick}>
                <form action={logout} className='logout'>
                  <button>Logout</button>
                  <small> {username} </small>
                </form>
              </li>
            </>
          )}
        </menu>
      </nav>
    </div>
  );
};

export default BurgerMenu;
