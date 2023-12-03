import styles from "./ticketCta.module.scss";
import Button from "../../common/button/button";
import { TICKETING_PLATFORM_URL } from "../../../constants";

const TicketCta = () => (
  <div className="container">
    <div className={styles.ticketWrapper}>
      <div className={styles.mobileSection}>
        <img src="/images/ticket-mobile.png" alt="Conference info" />
      </div>
      <a href={TICKETING_PLATFORM_URL} target="_blank" rel="noreferrer noopener">
        <img className={styles.ticket} src="/images/ticket.png" alt="Ticket illustration" />
        <Button ghost className={styles.mobileSection}>Get tickets</Button>
      </a>
    </div>
  </div>
);

export default TicketCta;