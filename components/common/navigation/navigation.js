import Link from "next/link";
import { useState } from "react";
import { Menu } from '@headlessui/react'

import styles from "./navigation.module.scss";
import HamburgerMenu from "../../../public/icons/hamburger-menu.svg";
import CloseIcon from "../../../public/icons/x.svg";
import { BGBW_URL } from "../../../constants";
import Button from "../button/button";

import { TICKETING_PLATFORM_URL } from "../../../constants";

const MainMenu = () => (
  <>
    <Menu>
      <div className={styles.menuLinks}>
        <Link href="/">
          <span className={styles.menuItem}>Conference</span>
        </Link>
        <Link href="/#startups">
          <span className={styles.menuItem}>Startups</span>
        </Link>
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
        <Link href={BGBW_URL} target="_blank" rel="noreferrer noopener">
          <span className={styles.menuItem}>Side Events</span>
        </Link>
        <Link href={TICKETING_PLATFORM_URL} target="_blank" rel="noreferrer noopener">
          <Button className={styles.button}>Get Tickets</Button>
        </Link>
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
    <div className={styles.border}>
      <div className="container">
        <div className={styles.container}>
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
      </div>
    </div>
  );
}

export default Navigation;