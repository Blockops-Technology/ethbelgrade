import styles from "./speakers.module.scss";
import Button from "../../common/button/button";
import speakers from "./speakers.json";

const Speakers = () => {
  return (
    <div id="speakers">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.text}>
            <p className={styles.title}>The brightest Web3 minds</p>
            <p className={styles.subtitle}>have something to say</p>
          </div>
          {/*<div>*/}
          {/*  <a href="https://forms.gle/Xf3wV3qp5Jq7oM1W9" target="_blank" rel="noreferrer noopener">*/}
          {/*    <Button>Apply as a speaker</Button>*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
        <div className={styles.speakerList}>
          {
            speakers.list.map((speaker, i) => (
              <div key={i} className={styles.speaker}>
                <a href={speaker.twitter} target="_blank" rel="noreferrer noopener">
                  <img src={`/images/Speakers/${speaker.photo}`} alt={speaker.name + " photo"} />
                  {
                    speaker.category && (
                      <div>
                        <div className={`${styles.category} ${styles["category" + speaker.category.replaceAll(" ", "")]}`}>{speaker.category}</div>
                      </div>
                    )
                  }
                  <p className={styles.name}>{speaker.name}</p>
                  <p className={styles.position}>{speaker.position}</p>
                </a>
              </div>
            ))
          }
        </div>
        <div className={styles.buttonWrapper}>
          {/*<Link href="/speakers">*/}
          {/*  <Button ghost>View all speakers</Button>*/}
          {/*</Link>*/}
        </div>
      </div>
    </div>
  );
}

export default Speakers;