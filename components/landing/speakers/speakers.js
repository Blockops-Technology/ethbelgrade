import styles from "./speakers.module.scss";
import speakers from "./speakers.json";
import speakers2026 from "./speakers2026.json";
import Silhouette from "../../common/silhouette.svg";

// Until 2026 speakers are published via /speaker-admin, show last year's list
const useNew = speakers2026.list.length > 0;

const Speakers = () => {
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
          {useNew
            ? speakers2026.list.map((speaker, i) => (
                <a
                  key={i}
                  className={styles.gridCell}
                  href={speaker.link || undefined}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className={styles.cutout}>
                    {speaker.photo ? (
                      <img
                        src={`/images/Speakers2026/${speaker.photo}`}
                        alt={speaker.name + " photo"}
                      />
                    ) : (
                      <Silhouette className={styles.silhouette} aria-label={speaker.name + " silhouette"} />
                    )}
                  </span>
                  <p className={styles.name}>{speaker.name}</p>
                  <p className={styles.position}>{speaker.position}</p>
                </a>
              ))
            : speakers.list.map((speaker, i) => (
                <a
                  key={i}
                  className={styles.gridCell}
                  href={speaker.twitter}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={`/images/Speakers/${speaker.photo}`} alt={speaker.name + " photo"} />
                  <p className={styles.name}>{speaker.name}</p>
                  <p className={styles.position}>{speaker.position}</p>
                </a>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Speakers;
