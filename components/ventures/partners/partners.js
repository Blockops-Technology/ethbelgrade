import styles from "./partners.module.scss";
import Button from "../../common/button/button";
import { HACKATHON_APPLICATION_FORM_URL, VENTURES_PARTNER_APPLICATION_FORM } from "../../../constants";

const Partners = () => (
  <div id="about" className={styles.about}>
    <div className="container">
      <div className={styles.content}>
        <div>
          <p className={styles.sectionTitle}>ETH Belgrade Ventures partners</p>
          <p className={styles.sectionText}>
            ETH Belgrade Ventures has a long list of partners, VCs, Angels, other investors, and individuals that are supporting the program and are ready to invest in the best projects.
          </p>
          <div className={styles.partners}>
            <a style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "center" }} href="https://www.johnlilic.info/" target="_blank" rel="noreferrer noopener">
              <img src="/images/partners/johnlilic.jpg" alt="John Lilic logo" />
              <p style={{ fontWeight: "bold", fontSize: 20, textTransform: "uppercase" }}>John Lilic</p>
            </a>
            <a href="https://www.daedalus.gg/" target="_blank" rel="noreferrer noopener">
              <img src="/images/ventures/daedalus.png" alt="" />
            </a>
            <a href="https://www.bigbrain.holdings/" target="_blank" rel="noreferrer noopener">
              <img src="/images/ventures/bbh-logo.svg" alt="" />
            </a>
            <a href="https://www.veryearly.xyz/" target="_blank" rel="noreferrer noopener">
              <img src="/images/ventures/veryearly.svg" alt="" />
            </a>

          </div>
          <p>What do you get as a partner?</p>
          <ul style={{ marginBottom: 50 }}>
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