import styles from "./newsletter.module.scss";
import Button from "../../common/button/button";

const Newsletter = () => (
  <div className={styles.newsletter}>
    <div className="container">
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <p className={styles.title}>Newsletter</p>
          <p className={styles.text}>Don&apos;t miss anything important about ETH Belgrade*</p>
        </div>
        <div className={styles.form}>
          <div className={styles.inputWrapper}>
            <input type="text" placeholder="enter your email" />
            <p className={styles.disclaimer}>*Only essential information. We promise.</p>
          </div>
          <Button className={styles.button}>Sign up</Button>
        </div>
      </div>
    </div>
  </div>
);

export default Newsletter;