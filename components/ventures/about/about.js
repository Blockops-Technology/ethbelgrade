import styles from "./about.module.scss";
import Button from "../../common/button/button";
import { Marquee } from "dynamic-marquee-react";
import { STARTUP_PROGRAMME_STARTUP_APPLICATION_FORM_URL } from "../../../constants";

const About = () => (
  <>
    {/*<Marquee rate={-70} startOnScreen>*/}
    {/*  <p className={styles.stats}>*/}
    {/*    <span className={styles.purple}>3 days</span>*/}
    {/*    <span className={styles.blue}>100+ speakers</span>*/}
    {/*    <span className={styles.pink}>1200+ Attendees</span>*/}
    {/*    <span className={styles.emerald}>250+ hackers</span>*/}
    {/*    <span className={styles.green}>40+ web3 companies</span>*/}
    {/*    <span className={styles.orange}>20+ investors</span>*/}
    {/*  </p>*/}
    {/*</Marquee>*/}

    <div id="about" className={styles.about}>
      <p className={styles.subtitle}>Our mission</p>
      <p className={styles.title}>
        <span className={styles.highlight}>Help startups</span> to succeed <span className={styles.highlight}>– help investors</span> to find the best deals<span className={styles.highlight}>.</span>
      </p>

      <div className={styles.content}>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>What is ETH Belgrade Ventures?</p>
          <p>ETH Belgrade Ventures is a dedicated arm of ETH Belgrade focused on empowering founders to reach their full potential. Through mentorship, access to our investor network, connections with top figures in web3 and Ethereum, and collaboration with other projects and founders, we help startups thrive.</p>
          <p>For investors, ETH Belgrade Ventures offers unmatched opportunities to showcase themselves, access a steady stream of promising startups, and connect with the best builders and teams in the web3 space.</p>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Startup Programme at ETH Belgrade</p>
          <p>The Startup Programme is an exclusive track for fundraising startups, running alongside the ETH Belgrade conference. Or to put it simply, <b>it’s the ultimate stage for startups to make an impact and grow.</b></p>
          <p>Over three days, selected startups present their solutions to leading investors, gain insights from web3 experts and mentors, and connect with the Ethereum community.</p>
          <p style={{color: "var(--primary-red)"}} className={styles.bold}>All selected startups get:</p>
          <ul className={styles.bold}>
            <li>Free booth at the conference venue</li>
            <li>Opportunity to pitch in front of selected investors</li>
            <li>1-1 with investors and speed dating</li>
            <li>A seat at the exclusive speakers dinner with all investors, speakers and sponsors</li>
            <li>Three tickets for the conference</li>
            <li>Talk or workshop at the conference</li>
            <li>Special mentor sessions with top mentors from web3 industry</li>
            <li>Media coverage</li>
          </ul>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <a href={STARTUP_PROGRAMME_STARTUP_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">
          <Button className={styles.button} styleType="blue">
            Apply for Startup Programme
            <img src="/icons/arrow-right.svg" alt="Arrow right direction icon" />
          </Button>
        </a>
      </div>
    </div>
  </>
);

export default About;