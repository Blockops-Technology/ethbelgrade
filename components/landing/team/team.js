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
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/iveza.png" alt="Petar Popovic profile picture" />
            <p className={styles.title}>Petar Popovic</p>
            <p>Founder & Chief Project Manager</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/kum.png" alt="Milos Rakcevic profile picture" />
            <p className={styles.title}>Milos Rakcevic</p>
            <p>Co-Founder & Head of Partnerships</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/kum.png" alt="Tanja Mladenovic profile picture" />
            <p className={styles.title}>Tanja Mladenovic</p>
            <p>Co-Founder & Head of Marketing</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/iveza.png" alt="Nikola Ivezic profile picture" />
            <p className={styles.title}>Nikola Ivezic</p>
            <p>Project Coordinator</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/kum.png" alt="Dusan Markovic profile picture" />
            <p className={styles.title}>Dusan Markovic</p>
            <p>Head of Logistics</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/kum.png" alt="Nevena Tomovic profile picture" />
            <p className={styles.title}>Nevena Tomovic</p>
            <p>Sales Director</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/kum.png" alt="Natasa Bujosevic profile picture" />
            <p className={styles.title}>Natasa Bujosevic</p>
            <p>Head of Speakers</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/kum.png" alt="Ivan Tabakovic profile picture" />
            <p className={styles.title}>Ivan Tabakovic</p>
            <p>Art Director</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/kum.png" alt="Vasilije Glomazic profile picture" />
            <p className={styles.title}>Vasilije Glomazic</p>
            <p>Content Writer</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/kum.png" alt="Nikola Obradovic profile picture" />
            <p className={styles.title}>Nikola Obradovic</p>
            <p>Community Lead</p>
          </a>
        </div>
        <div>
          <a href="" target="_blank" rel="noreferrer noopener">
            <img src="/images/kum.png" alt="Ilija Rilakovic profile picture" />
            <p className={styles.title}>Ilija Rilakovic</p>
            <p>Ilija Rilakovic</p>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Team;