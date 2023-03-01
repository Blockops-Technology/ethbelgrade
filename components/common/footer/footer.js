import styles from "./footer.module.scss";

const Footer = () => (
  <div className={styles.footer}>
    <div className="container">
      <div className={styles.footerContent}>
        <p className={styles.title}>Let&apos;s connect</p>
        <div className={styles.bgbwSection}>
          <p className={styles.sectionTitle}>We&apos;re part of</p>
          <a href="https://belgradeblockchainweek.com/" target="_blank" rel="noreferrer noopener">
            <img className={styles.bgbwLogo} src="/images/bgbw-logo.svg" alt="Belgrade Blockchain Week logo" />
          </a>
        </div>
        <div className={styles.socialSection}>
          <p className={styles.sectionTitle}>Social Media</p>
          <div className={styles.socialIcons}>
            <a href="https://t.me/+JHSH1qc-W85kYzdk" target="_blank" rel="noreferrer noopener">
              <img className={styles.socialIcon} src="/icons/telegram.svg" alt="Telegram Icon" />
            </a>
            <a href="https://www.linkedin.com/company/eth-belgrade/" target="_blank" rel="noreferrer noopener">
              <img className={styles.socialIcon} src="/icons/linkedin.svg" alt="Linkedin Icon" />
            </a>
            <a href="https://twitter.com/ethbelgrade" target="_blank" rel="noreferrer noopener">
              <img className={styles.socialIcon} src="/icons/twitter.svg" alt="Twitter Icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;