import styles from "./ticketCta.module.scss";
import Button from "../../common/button/button";

const TicketCta = () => (
  <div className="container">
    <div className={styles.ticketWrapper}>
      <div className={styles.mobileSection}>
        <img src="/images/ticket-mobile.png" alt="Conference info" />
      </div>
      <a href="https://app.moongate.id/events/ethbelgrade" target="_blank" rel="noreferrer noopener">
        <img className={styles.ticket} src="/images/ticket.png" alt="Ticket illustration" />
        <Button ghost className={styles.mobileSection}>Get tickets</Button>
      </a>
    </div>
  </div>
);

export default TicketCta;