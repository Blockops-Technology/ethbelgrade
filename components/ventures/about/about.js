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
          <p className={styles.sectionTitle}>What is ETH Belgrade Ventures</p>
          <p>ETH Belgrade Ventures is a separate branch of ETH Belgrade dedicated to helping founders in reaching their full potential by offering mentorship, access to ETH Belgrade investor network and most influential people in web3 and Ethereum, other projects and founders, and much more.</p>
          <p>For Investors ETH Belgrade Ventures represents opportunity to present themselves, get constant fresh deal flow of most promising startups, and access to best builders and teams in the space.</p>
        </div>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Startup Programme at ETH Belgrade</p>
          <p>Startup Programme is an exclusive track and a carefully designed program for selected startups that are raising funds which is happening alongside ETH Belgrade conference.</p>
          <p>During 3 days startups have an opportunity present their projects and solutions to prominent investors, top tier web3 experts and mentors, and wider Ethereum community.</p>
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