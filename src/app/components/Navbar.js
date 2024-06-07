"use client";
import { useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  useEffect(() => {
    const setMenu = () => {
      const burgerMenu = document.querySelector(".burger");
      const navBar = document.querySelector("nav");
      let navBarStatus = false;

      if (navBar.style.left === "") {
        burgerMenu.addEventListener("click", () => {
          if (navBarStatus) {
            navBarStatus = false;
            navBar.removeAttribute("style");
            burgerMenu.classList.remove("changeBurger");
          } else {
            navBarStatus = true;
            navBar.style.left = "0px";
            burgerMenu.classList.add("changeBurger");
          }
        });
      } else {
        navBarStatus = false;
        navBar.removeAttribute("style");
      }
    };

    setMenu();
    window.addEventListener("resize", setMenu);

    return () => {
      window.removeEventListener("resize", setMenu);
    };
  }, []);

  return (
    <div className='headerContainer'>
      <header>
        <div className='topBar'>
          <div>
            <h1>SHU Films</h1>
          </div>
          <div className='burger'>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </div>
        </div>
        <div>
          <nav className='mainNav'>
            <menu>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/catalogue'>Catalogue</Link>
              </li>
              <li>
                <Link href='/search'>Search</Link>
              </li>
              <li>
                <Link href='/contact'>Contact Us</Link>
              </li>
            </menu>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
