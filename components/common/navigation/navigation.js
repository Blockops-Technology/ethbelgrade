import Link from "next/link";
import { useState } from "react";

import styles from "./navigation.module.scss";
import HamburgerMenu from "../../../public/icons/hamburger-menu.svg";
import CloseIcon from "../../../public/icons/x.svg";

const Menu = () => (
  <>
    <Link href="/">
      <span className={styles.menuItem}>Conference</span>
    </Link>
    {/*<Link href="/#speakers">*/}
    {/*  <span className={styles.menuItem}>Speakers</span>*/}
    {/*</Link>*/}
    {/*<Link href="/#agenda">*/}
    {/*  <span className={styles.menuItem}>Agenda</span>*/}
    {/*</Link>*/}
    {/*<Link href="/#partners">*/}
    {/*  <span className={styles.menuItem}>Partners</span>*/}
    {/*</Link>*/}
    {/*<Link href="/#startups">*/}
    {/*  <span className={styles.menuItem}>Startups</span>*/}
    {/*</Link>*/}
    <Link href="/hackathon">
      <span className={styles.menuItem}>Hackathon</span>
    </Link>
    <Link href="/community">
      <span className={styles.menuItem}>Community</span>
    </Link>
    <Link href="/blog">
      <span className={styles.menuItem}>Blog</span>
    </Link>
    {/*<Link href="#faq">*/}
    {/*  <span className={styles.menuItem}>FAQ</span>*/}
    {/*</Link>*/}
  </>
);

const Navigation = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const toggleMobileMenu = () => setOpenMobileMenu((prevState) => {
    return (
      !prevState
    )
  })

  return (
    <div className="container">
      <nav className={styles.navigation}>
        <Link href="/">
          <img className={styles.logo} src="/logo.svg" alt="ETH Belgrade logo" />
        </Link>
        <div className={styles.menu}>
          <Menu />
        </div>
        {
          openMobileMenu ? (
            <div className={styles.mobileMenu}>
              <div className={styles.closeIconWrapper}>
                <CloseIcon className={styles.closeIcon} onClick={toggleMobileMenu} />
              </div>
              <Menu />
            </div>
          ) :
            <></>
        }
        <HamburgerMenu className={styles.hamburgerIcon} onClick={toggleMobileMenu} />
      </nav>
    </div>
  );
}

export default Navigation;