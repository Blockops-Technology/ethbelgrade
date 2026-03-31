import styles from "./speakers.module.scss";
import Button from "../../common/button/button";
// import speakers from "./speakers.json";

const Speakers = ({speakers}) => {
  console.log(speakers)
  return (
    <div id="speakers">
      <div className={styles.pageTitleContainer}>
        <p className={styles.pageTitle}>Speakers</p>
      </div>
      <div className="container">
        <div className={styles.header}>
          <p className={styles.title}>They&apos;ve spoken at ETH Belgrade</p>
          <p className={styles.subtitle}>The brightest Web3 minds</p>
        </div>
        <div className={styles.grid}>
          {speakers.map((speaker, i) => (
            <a
              key={i}
              className={styles.gridCell}
              href={speaker.link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={speaker.image} alt={speaker.name + " photo"} />
              <p className={styles.name}>{speaker.name}</p>
              <p className={styles.position}>{speaker.company}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Speakers;
