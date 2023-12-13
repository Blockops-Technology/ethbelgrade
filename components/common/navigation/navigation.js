import Link from "next/link";
import { useState } from "react";
import { Menu } from '@headlessui/react'

import styles from "./navigation.module.scss";
import HamburgerMenu from "../../../public/icons/hamburger-menu.svg";
import CloseIcon from "../../../public/icons/x.svg";
import { BGBW_URL } from "../../../constants";
import Button from "../button/button";

const MainMenu = () => (
  <>
    <Menu>
      <div className={styles.menuLinks}>
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
        <div className={styles.dropdownWrapper}>
          <Menu.Button className={styles.menuItem}>Past Events </Menu.Button>
          <Menu.Items className={styles.dropdown}>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="https://2023.ethbelgrade.rs"
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.dropdownLink}
                >
                  <img src="/icons/play-arrow.svg" alt="arrow icon" />
                  2023
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </div>
        <a href={BGBW_URL} target="_blank" rel="noreferrer noopener">
          <Button className={styles.button}>Side Events</Button>
        </a>
        {/*<Link href="#faq">*/}
        {/*  <span className={styles.menuItem}>FAQ</span>*/}
        {/*</Link>*/}
      </div>
    </Menu>
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
          <MainMenu />
        </div>
        {
          openMobileMenu ? (
            <div className={styles.mobileMenu}>
              <div className={styles.closeIconWrapper}>
                <CloseIcon className={styles.closeIcon} onClick={toggleMobileMenu} />
              </div>
              <MainMenu />
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