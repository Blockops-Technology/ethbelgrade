import styles from "./partners.module.scss";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL, VENTURES_PARTNER_APPLICATION_FORM } from "../../../constants";
import Investors from "../../common/investors/investors";

const Partners = () => (
  <div id="about" className={styles.about}>
    <div className="container">
      <div className={styles.content}>
        <div>
          <p className={styles.sectionTitle}>ETH Belgrade Ventures partners</p>
          <p className={styles.sectionText}>
            ETH Belgrade Ventures has a long list of partners, VCs, Angels, other investors, and individuals that are supporting the program and are ready to invest in the best projects.
          </p>
          <Investors />
          <p className={styles.sectionTitle}>What do you get as a partner?</p>
          <ul style={{ marginBottom: 50, marginTop: 20, listStyleType: "disc" }}>
            <li style={{ marginBottom: 7 }}>
              Invitation to all ETH Belgrade Ventures events happening through out the year
              <br />
              (e.g. <a className={styles.links} href="https://lu.ma/iv71qvhh" target="_blank" rel="noreferrer noopener">Meet the VCs Night @ Devcon SEA</a>, <a className={styles.links} href="https://lu.ma/8362zl6d" target="_blank" rel="noreferrer noopener">Meet the VCs @ Dubai Blockchain Week</a>)
            </li>
            <li style={{ marginBottom: 7 }}>VIP tickets for ETH Belgrade conference</li>
            <li style={{ marginBottom: 7 }}>Exclusive access to the pitching room at the conference</li>
            <li style={{ marginBottom: 7 }}>Access to all pitch decks in electronic format</li>
            <li style={{ marginBottom: 7 }}>Access to the founders&apos; directory and contact details</li>
            <li style={{ marginBottom: 7 }}>Access to pitch recordings</li>
            <li style={{ marginBottom: 7 }}>Access to an exclusive ETH Belgrade dinner with all speakers, sponsors, and startups <strong>(cca 200 top tier people every year)</strong></li>
            <li style={{ marginBottom: 7 }}>Access to an exclusive VIP lounge at the ETH Belgrade conference venue</li>
            <li style={{ marginBottom: 7 }}>Your logo on our website</li>
            <li style={{ marginBottom: 7 }}>Social and Media Announcements and coverage for additional exposure</li>
          </ul>

          <a href={VENTURES_PARTNER_APPLICATION_FORM} target="_blank" rel="noreferrer noopener">
            <Button className={styles.button}>
              Join as Investor
            </Button>
          </a>
        </div>
      </div>
      {/*<div className={styles.deadlineContainer}>*/}
      {/*  <p className={styles.deadline}>Registration will close on May 20, 2024</p>*/}
      {/*</div>*/}
    </div>
  </div>
);

export default Partners;