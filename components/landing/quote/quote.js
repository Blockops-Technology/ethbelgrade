import styles from "./quote.module.scss";

const Quote = () => (
  <div className="container">
      <div className={styles.content}>
        <img src="/images/petar-popovic.png" alt="Petar Popovic ETH Belgrade core Organiser and Founder" />
        <div className={styles.quote}>
          <p className={styles.quoteText}>Belgrade equals Web3. Some of the biggest Web3 projects in the world started here,  and it’s our mission to make Belgrade’s name as recognizable as they are.”</p>
          <p className={styles.name}>Petar POPOVIĆ</p>
          <p  className={styles.title}>Founder and Core Organiser at ETH Belgrade</p>
        </div>
      </div>
  </div>
);

export default Quote;