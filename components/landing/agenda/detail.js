import styles from "./agenda.module.scss";
import Speakers from "./speakers";

const Detail = ({ item }) => {
  if (item === undefined) {
    return (
      <div className={styles.details}></div>
    )
  }
  const style = {
    "--duration": item.slots ? item.slots : 1,
    "--spaces": item.spaces ? item.spaces : 1,
  };

  const classes = item.category?.toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("/", "")
    .split(",")
    .map(cat => styles["talkCategory" + cat])
    .join(' ');

  if ((item.slug && item.slug != "empty") || item.speakers.length)
    return (
      <div className={styles.details} style={style}>
        <div className={`${styles.talk} ${classes}`}>
          {item.category && (item.category.replaceAll("Break", "") && item.category.replaceAll("Break", "").split(', ').map(cat => (<div key={cat} className={styles.talkType}>{cat}</div>)))}
          <div className={styles.talkTitle}>{item.title ? item.title : "TBA"}</div>
          {item.speakers && (
            <div className={styles.talkSpeaker}>
              <Speakers speakers={item.speakers} />
              {item.company && <span>, {item.company}</span>}
            </div>
          )}
          {
            item.youtube &&
            <div>
              <Link href={`${item.youtube}`} target="_blank" rel="noreferrer noopener">
                <Button className={styles.viewOnYt}>
                  <img className={styles.playIcon} src="/icons/play.svg" alt="Play icon" />
                  Watch on YouTube
                </Button>
              </Link>
            </div>
          }
        </div>
      </div>
    )
  else
    return (
      <div className={styles.details}></div>
    )
}

export default Detail