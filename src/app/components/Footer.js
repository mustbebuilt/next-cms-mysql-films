import Link from "next/link";
const footer = () => {
  return (
    <div className='footerContainer'>
      <footer>
        <nav>
          <menu>
            <li>
              <Link href='#'>Terms</Link>
            </li>
            <li>
              <Link href='#'>FAQ</Link>
            </li>
            <li>
              <Link href='#'>Facebook</Link>
            </li>
            <li>
              <Link href='#'>Twitter</Link>
            </li>
          </menu>
        </nav>
        <div>&copy; {new Date().getFullYear()} My Film Listing</div>
      </footer>
    </div>
  );
};
export default footer;
