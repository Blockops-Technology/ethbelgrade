import styles from "./startups.module.scss";
import Button from "../../common/button/button";
import Link from "next/link";

const Startups = () => (
  <div id="startups">
    <div className={styles.pageTitleContainer}>
      <p className={styles.pageTitle}>Startups</p>
    </div>
    <div className="container">
      <div>
        <p className={styles.sectionTitle}>Startup Programme</p>
        <p className={styles.subtitle}>ETH Belgrade Ventures</p>
        <div className={styles.mainGrid}>
          <div>
            <p className={styles.title}>
              Pitch your project and meet world-class investors
            </p>
            <p>Are you building something innovative that solves real-world problems? This is your opportunity to shine.</p>
            <p>The <strong>ETH Belgrade Ventures Startup Programme</strong> connects startups at any funding stage with top-tier VCs and investors. This exclusive track is designed for the most promising projects to build relationships, gain exposure, and secure funding.</p>
          </div>
          <div>
            <p style={{fontWeight: "bold", fontSize: 24, marginTop: 0}}>What’s in it for you?</p>
            <ul style={{fontSize: 20}}>
              <li>A free booth at the conference venue</li>
              <li>The chance to pitch to 30+ top investors</li>
              <li>1-on-1 meetings and speed dating with VCs</li>
              <li>A seat at the exclusive speakers&apos; dinner with investors, speakers, and sponsors</li>
              <li>Three complimentary conference tickets</li>
              <li>A speaking or workshop slot at the conference</li>
              <li>Mentorship from top web3 industry leaders</li>
              <li>Media coverage to amplify your story</li>
            </ul>
          </div>
        </div>
        <div className={styles.ctaWrapper}>
          <Link href="/ventures" target="_blank" rel="noreferrer noopener">
            <Button className={styles.button} styleType="red">DISCOVER MORE AND APPLY</Button>
          </Link>
        </div>
      </div>

      {/*<div className={styles.investors}>*/}
      {/*  <div className={styles.investorsTitle}>*/}
      {/*    The investors*/}
      {/*  </div>*/}

      {/*  <div className={styles.investorsGrid}>*/}
      {/*    <div><img src="/images/partners/BlockSplit_logo.png" alt=""/></div>*/}
      {/*    <div><img src="/images/partners/Unusual-Sour-Logo.png" alt=""/></div>*/}
      {/*    <div><img src="/images/hackathon-label.png" alt=""/></div>*/}
      {/*    <div>test2</div>*/}
      {/*    <div>test3</div>*/}
      {/*    <div>test1</div>*/}
      {/*    <div>test2</div>*/}
      {/*    <div>test3</div>*/}
      {/*    <div>test1</div>*/}
      {/*    <div>test2</div>*/}
      {/*    <div>test3</div>*/}
      {/*    <div>test3</div>*/}
      {/*    <div>test3</div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  </div>
);

export default Startups;
