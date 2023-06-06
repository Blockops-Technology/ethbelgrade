import styles from "./mentorsAndJudges.module.scss";

const MentorsAndJudges = () => (
  <div className={styles.mjWrapper}>
    <div className="container">
      <div className={styles.mentors}>
        <p className={styles.mentorsTitle}>Mentors</p>
        <div className={styles.people}>
          <div className={styles.person}>
            <img src="/images/hackathon/petar.png" alt="Person photo" />
            <p className={styles.name}>Petar Atanasovski</p>
            <p>Attic42</p>
          </div>
          <div className={styles.person}>
            <img src="/images/hackathon/lazartravica.png" alt="Person" />
            <p className={styles.name}>Lazar Travica</p>
            <p>Route3</p>
          </div>
          <div className={styles.person}>
            <img src="/images/hackathon/blendor.png" alt="Blendor" />
            <p className={styles.name}>Blendor Sefaj</p>
            <p>Clover Labs</p>
          </div>
          <div className={styles.person}>
            <img src="/images/hackathon/simon.png" alt="Simon" />
            <p className={styles.name}>Simon</p>
            <p>Clover Labs</p>
          </div>
          <div className={styles.person}>
            <img src="/images/hackathon/fxnction.png" alt="MPerson" />
            <p className={styles.name}>Michael Jacobs</p>
            <p>Ratio</p>
          </div>
          <div className={styles.person}>
            <img src="/images/hackathon/miros.png" alt="MPerson" />
            <p className={styles.name}>Miros</p>
            <p>Polygon</p>
          </div>
          <div className={styles.person}>
            <img src="/images/hackathon/solange.png" alt="MPerson" />
            <p className={styles.name}>Solange Gueiros</p>
            <p>Chainlink</p>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.judgesTitle}>Judges</p>
        <div className={styles.people}>
          <div className={styles.person}>
            <img src="/images/hackathon/muhammed-ens.png" alt="Person photo" />
            <p className={styles.name}>Muhammed Tanrikulu</p>
            <p>Ethereum Name Service</p>
          </div>
          <div className={styles.person}>
            <img src="/images/hackathon/ivan-bjelajac.png" alt="Ivan Bjelajac" />
            <p className={styles.name}>Ivan Bjelajac</p>
            <p>Attic42</p>
          </div>
          <div className={styles.person}>
            <img src="/images/hackathon/malisa-pusonja.png" alt="Malisa Pusonja" />
            <p className={styles.name}>Malisa Pusonja</p>
            <p>Attic42</p>
          </div>
          <div className={styles.person}>
            <img src="/images/hackathon/miros.png" alt="MPerson" />
            <p className={styles.name}>Miros</p>
            <p>Polygon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MentorsAndJudges;