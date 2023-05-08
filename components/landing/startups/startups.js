import styles from "./startups.module.scss";
import Button from "../../common/button/button";

const Startups = () => (
  <div id="startups" className={styles.startups}>
    <div className="container">
      <div className={styles.content}>
        <div className={styles.mainGrid}>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <p className={`${styles.title} ${styles.bigTitle}`}>Open call</p>
              <p className={styles.subtitle}>for startups</p>
            </div>
            <div className={styles.title}>
              <p>Pitch your project and meet world-class investors</p>
            </div>
            <p>
              Your project is innovative and can help resolve a real-world problem? We have great news for you. <b>ETH Belgrade</b> allows startups in all funding stages to establish relationships with top-tier VC funds. With the purchased conference ticket, you get the chance to present your idea to investors on the first day of the conference (2nd June).
            </p>

            <p>
              The following day (3rd June) is reserved for speed-dating. The investors will pick the most promising startups to conduct one-on-one sessions with them.
            </p>

            <p>
              So, yes, you might be just one ticket away from ensuring a secure future for your business. <b>Make sure you show up on the stage.</b>
            </p>
          </div>
          <div className={styles.imgWrapper}>
            <img src="/images/startups-decoration.svg" alt=""/>
          </div>

          <div className={styles.ctaWrapper}>
            <a href="https://app.moongate.id/events/ethbelgrade" target="_blank" rel="noreferrer noopener">
              <Button ghost>Get tickets</Button>
            </a>
            <a href="https://forms.gle/wBR93x9uuAaSDQz8A" target="_blank" rel="noopener noreferrer">
              <Button>Apply to pitch</Button>
            </a>
          </div>
        </div>
      </div>

      {/*<div className={styles.investors}>*/}
      {/*  <div className={styles.investorsTitle}>*/}
      {/*    The investors*/}
      {/*  </div>*/}

      {/*  <div className={styles.investorsGrid}>*/}
      {/*    <div><img src="/images/partners/BlockSplit_logo.png" alt=""/></div>*/}
      {/*    <div><img src="/images/partners/Unusual-Sour-Logo.png" alt=""/></div>*/}
      {/*    <div><img src="/images/kum.png" alt=""/></div>*/}
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
