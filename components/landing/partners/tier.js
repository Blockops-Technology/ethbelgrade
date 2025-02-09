import styles from "./partners.module.scss";
import Partner from "../../common/partner/partner"

const Tier = ({name, className = styles.sponsorsList, partners}) => (
  (partners && partners.length != 0) ?
    <>
      <p className={styles.tier}>{name}</p>
      <div className={className}>
        {
          partners.map((partner, i) => (
            <Partner key={i} url={partner.meta.en.url} logo={partner.meta.en.logo} />
          ))
        }
      </div>
    </> : ""
);

export default Tier;