import { bcms } from "../../../bcms";
import { BCMSImage } from "@thebcms/components-react";
import { useState, useEffect } from 'react';
import styles from "./speakers.module.scss";
import Button from "../../common/button/button";
import speakers from "./speakers.json";
import { SPEAKER_APPLICATION_FORM_URL } from "../../../constants";

const Speakers = ({speakers}) => {
  return (
    <div id="speakers">
      <div className={styles.pageTitleContainer}>
        <p className={styles.pageTitle}>Speakers</p>
      </div>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={styles.title}>The brightest Web3 minds</p>
            <p className={styles.subtitle}>have something to say</p>
          </div>
          {/*<div>*/}
          {/*  <a href={SPEAKER_APPLICATION_FORM_URL} target="_blank" rel="noreferrer noopener">*/}
          {/*    <Button styleType="purple">Apply as a speaker</Button>*/}
          {/*  </a>*/}
          {/*</div>*/}
        </div>
        <div className={styles.speakerList}>
          {
            speakers.map((speaker, i) => (
              <div key={i}>
                <a href={speaker.meta.en.twitter} target="_blank" rel="noreferrer noopener">
                  <BCMSImage
                    media={speaker.meta.en.photo}
                    clientConfig={bcms.getConfig()}
                  />
                  {
                    speaker.meta.en.category && (
                      <div>
                        <div className={`${styles.category} ${styles["category" + speaker.meta.en.category.replaceAll(" ", "")]}`}>{speaker.meta.en.category}</div>
                      </div>
                    )
                  }
                  <p className={styles.name}>{speaker.meta.en.name}</p>
                  <p className={styles.position}>{speaker.meta.en.position}</p>
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Speakers;