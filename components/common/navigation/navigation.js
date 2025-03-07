import Link from "next/link";
import { useState } from "react";
import { Menu } from '@headlessui/react'

import styles from "./navigation.module.scss";
import HamburgerMenu from "../../../public/icons/hamburger-menu.svg";
import CloseIcon from "../../../public/icons/x.svg";
import { BGBW_URL } from "../../../constants";
import Button from "../button/button";

import { TICKETING_PLATFORM_URL } from "../../../constants";
import Banner from "../banner/banner";

const MainMenu = ({ setOpenMobileMenu = () => { } }) => (
  <>
    <Menu>
      <div className={styles.menuLinks} onClick={() => setOpenMobileMenu(false)}>
        <Link href="/">
          <span className={styles.menuItem}>Conference</span>
        </Link>
        {/*<Link href="/agenda">*/}
        {/*  <span className={styles.menuItem}>Agenda</span>*/}
        {/*</Link>*/}
        <Link href="/hackathon">
          <span className={styles.menuItem}>Hackathon</span>
        </Link>
        <Link href="/ventures">
          <span className={styles.menuItem}>For Startups</span>
        </Link>
        <Link href="/community">
          <span className={styles.menuItem}>Community</span>
        </Link>
        <div className={styles.dropdownWrapper} onClick={(e) => e.stopPropagation()}>
          <Menu.Button className={styles.menuItem}>Past Events </Menu.Button>
          <Menu.Items className={styles.dropdown}>
            <Menu.Item>
              <a
                href="https://2024.ethbelgrade.rs"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.dropdownLink}
              >
                <img src="/icons/play-arrow.svg" alt="arrow icon" />
                2024
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://2023.ethbelgrade.rs"
                target="_blank"
                rel="noreferrer noopener"
              >
                <div className={styles.dropdownLink}>
                  <img src="/icons/play-arrow.svg" alt="arrow icon" />
                  2023
                </div>
              </a>
            </Menu.Item>
          </Menu.Items>
        </div>
        <Link href="https://joobpool.com/" target="_blank" rel="noreferrer noopener">
          <span className={styles.menuItem}>Jobs</span>
        </Link>
        <div className={styles.showOnHamburger}>
          <Link href={BGBW_URL} target="_blank" rel="noreferrer noopener">
            <span className={styles.menuItem}>Side Events</span>
          </Link>
          {/*<Link className={styles.ticketLink} href={TICKETING_PLATFORM_URL} target="_blank" rel="noreferrer noopener">*/}
          {/*  <Button className={styles.button}>Get Tickets</Button>*/}
          {/*</Link>*/}
        </div>
        <div className={styles.hideOnHamburger}>
          <Link className={styles.ticketLink} href={BGBW_URL} target="_blank" rel="noreferrer noopener">
            <Button className={styles.button}>Side Events</Button>
          </Link>
        </div>
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
    <div className={styles.wrapper}>
      <Banner />
      <div className="">
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
                  <MainMenu setOpenMobileMenu={setOpenMobileMenu} />
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
