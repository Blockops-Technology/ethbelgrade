import styles from "./team.module.scss";

const Team = () => (
  <div className={styles.team}>
    <div className="container">
      <div className={styles.content}>
        <div>
          <p className={styles.title}>Meet the team</p>
          <p>Get to know the building blocks that clicked together and brought the idea of ETH Belgrade</p>
        </div>
        <div>
          <a href="https://twitter.com/0xdevelopera" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Petar-Popovic.png" alt="Petar Popovic profile picture" />
            <p className={styles.title}>Petar Popovic</p>
            <p>Founder & Chief Project Manager</p>
          </a>
        </div>
        <div>
          <a href="https://twitter.com/CryptoMetash" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Milos-Rakcevic.png" alt="Milos Rakcevic profile picture" />
            <p className={styles.title}>Milos Rakcevic</p>
            <p>Co-Founder & Head of Partnerships</p>
          </a>
        </div>
        <div>
          <a href="https://twitter.com/tanjaweb3" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Tanja-Mladenovic.png" alt="Tanja Mladenovic profile picture" />
            <p className={styles.title}>Tanja Mladenovic</p>
            <p>Co-Founder & Head of Marketing</p>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/dusanmarkovic7/" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Dusan-Markovic.png" alt="Dusan Markovic profile picture" />
            <p className={styles.title}>Dusan Markovic</p>
            <p>Head of Logistics</p>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/nikolaivezic/" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Nikola-Ivezic.png" alt="Nikola Ivezic profile picture" />
            <p className={styles.title}>Nikola Ivezic</p>
            <p>Project Coordinator</p>
          </a>
        </div>
        <div>
          <a href="https://twitter.com/strangestrain_" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Natasa-Bujosevic.png" alt="Natasa Bujosevic profile picture" />
            <p className={styles.title}>Natasa Bujosevic</p>
            <p>Head of Speakers</p>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/nevena-tomovic-056992a4/" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Nevena-Tomovic.png" alt="Nevena Tomovic profile picture" />
            <p className={styles.title}>Nevena Tomovic</p>
            <p>Sales Director</p>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/ivan-tabakovic-58a002256/" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Ivan-Tabakovic.png" alt="Ivan Tabakovic profile picture" />
            <p className={styles.title}>Ivan Tabakovic</p>
            <p>Art Director</p>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/vasilije-glomazic/" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Vasilije-Glomazic.png" alt="Vasilije Glomazic profile picture" />
            <p className={styles.title}>Vasilije Glomazic</p>
            <p>Creative Director</p>
          </a>
        </div>
        <div>
          <a href="https://twitter.com/Cryptobu_ll" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Nikola-Obradovic.png" alt="Nikola Obradovic profile picture" />
            <p className={styles.title}>Nikola Obradovic</p>
            <p>Community Lead</p>
          </a>
        </div>
        <div>
          <a href="https://twitter.com/LawyerWooden" target="_blank" rel="noreferrer noopener">
            <img src="/images/team/Ilija-Rilakovic.png" alt="Ilija Rilakovic profile picture" />
            <p className={styles.title}>Ilija Rilakovic</p>
            <p>Legal</p>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Team;