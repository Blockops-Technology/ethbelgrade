import styles from "./startups.module.scss";
import Button from "../../common/button/button";

const Startups = () => (
  <div id="startups">
    <div className={styles.pageTitleContainer}>
      <p className={styles.pageTitle}>Startups</p>
    </div>
    <div className="container">
      <div>
        <p className={styles.sectionTitle}>For startups</p>
        <p className={styles.subtitle}>ETH Belgrade Ventures</p>
        <div className={styles.mainGrid}>
          <div>
            <p className={styles.title}>
              Pitch your project and meet world-class investors
            </p>
            <p>Your project is innovative and can help resolve a real-world problem? We have great news for you. <b>ETH Belgrade</b> allows startups in all funding stages to establish relationships with top-tier VC funds and get funding.</p>
            <p>ETH Belgrade Ventures is an exclusive track for the most promising startups and carefully selected VCs and investors.</p>
          </div>
          <div>
            <p style={{fontWeight: "bold", fontSize: 24, marginTop: 0}}>What will selected startups get:</p>
            <ul style={{fontSize: 20}}>
              <li style={{marginBottom: 7}}>Opportunity to pitch in front of selected investors</li>
              <li style={{marginBottom: 7}}>1-1 with investors and speed dating</li>
              <li style={{marginBottom: 7}}>A seat at the exclusive speakers dinner with all investors, speakers and sponsors</li>
              <li style={{marginBottom: 7}}>Three tickets for the conference</li>
              <li style={{marginBottom: 7}}>Booth at the conference venue</li>
              <li style={{marginBottom: 7}}>Talk or workshop at the conference</li>
              <li style={{marginBottom: 7}}>Special mentor sessions with top mentors from web3 industry</li>
              <li style={{marginBottom: 7}}>Media coverage</li>
            </ul>
          </div>
        </div>
        <div className={styles.ctaWrapper}>
          <a href="https://forms.gle/2MUCURz3RHdPDtew5" target="_blank" rel="noopener noreferrer">
            <Button className={styles.button} styleType="red">Apply</Button>
          </a>
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
