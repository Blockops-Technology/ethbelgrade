import { bcms } from "../../../bcms";
import { BCMSImage } from "@thebcms/components-react";
import styles from "./partners.module.scss";

const Partner = ({name, className = styles.sponsorsList, partners}) => (
  (partners && partners.length != 0) ?
    <>
      <p className={styles.tier}>{name}</p>
      <div className={className}>
        {
          partners.map((partner, i) => (
            <a key={i} href={partner.meta.en.url} target="_blank" rel="noreferrer noopener">
              <BCMSImage
                media={partner.meta.en.logo}
                clientConfig={bcms.getConfig()}
              />
            </a>
          ))
        }
      </div>
    </> : ""
);

export default Partner;