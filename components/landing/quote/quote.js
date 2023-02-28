import styles from "./quote.module.scss";

const Quote = () => (
  <div className="container">
    <div className={styles.quoteWrapper}>
      <div className={styles.content}>
        <img src="/images/me-quote-photo.png" alt="Petar Popovic ETH Belgrade core Organiser, CEO at Renfter profile picture" />
        <div className={styles.quote}>
          <p className={styles.quoteText}>Belgrade equals Web3. Some of the biggest Web3 projects in the world started here,  and it’s our mission to make Belgrade’s name as recognizable as they are.”</p>
          <p className={styles.name}>Petar POPOVIĆ</p>
          <p  className={styles.title}>ETH Belgrade Core Organiser, CEO & Founder at Renfter</p>
        </div>
      </div>
    </div>
  </div>
);

export default Quote;