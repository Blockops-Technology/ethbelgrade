import Link from "next/link";
import styles from "./agenda.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import agenda from "./agenda.json";
import speakers from "../speakers/speakers.json";

const twitter = new Map();

speakers.list.forEach(element => {
  twitter.set(element.name, element.twitter);
});

const SpeakerList = (props) => {
  var first = true;
  return props.name.split(",").map(name => {
    const handle = twitter.get(name.trim());
    const comma = first ? "" : ", ";
    first = false;
    if (handle) {
      return <>{comma}<Link href={`${handle}`} target="_blank" rel="noreferrer noopener">{name}</Link></>;
    } else {
      return <>{comma}{name}</>;
    }
  });
}

const Agenda = () => (
  <div id="agenda" className={styles.agenda}>
    <div className="container">
      <div className={styles.titleWrapper}>
        <p className={styles.title}>Conference</p>
        <p className={styles.subtitle}>Agenda</p>
      </div>
      <div className={styles.agendaContainer}>
        <Tabs className={styles.tabs}>
          <TabList className={styles.tablist}>
            {/*<div className={styles.tablistTitle}>Stages</div>*/}
            <div className={styles.tabsContainer}>
              {
                agenda.stages.map((stage, i) => (
                  <Tab key={i} className={styles.tab} selectedClassName={styles.selectedTab}>{stage.stageName}</Tab>
                ))
              }
            </div>
          </TabList>

          {
            agenda.stages.map((stage, i) => (
              <TabPanel key={i}>
                {
                  stage.programme.map((day, i) => (
                    <div key={i}>
                      <div className={styles.dayWrapper}>
                        <p className={styles.dayDate}>
                          <span className={styles.day}>{day.day}</span>
                          <span className={styles.date}>{day.date}</span>
                        </p>
                      </div>
                      {
                        day.talks.map((talk, i) => (
                          <div className={`${styles.talk} ${styles[day.day.toLowerCase().replace(' ', '')]}`} key={i}>
                            <div className={styles.time}>{talk.time}</div>
                            <div className={styles.talkDetails}>
                              <p className={styles.talkTitle}>{talk.recording ? <Link href={`${talk.recording}`} target="_blank" rel="noreferrer noopener">
                                 <img className={styles.playIcon} src="/icons/play.webp" alt="Play icon" />{talk.title}</Link> : talk.title}</p>
                              {
                                talk.category &&
                                <p className={`${styles.talkCategory} ${styles["talkCategory" + talk.category.replaceAll(" ", "")]}`}>{talk.category}</p>
                              }
                              {
                                talk.speaker &&
                                <div className={styles.speaker}>
                                  {
                                    talk.speakerImage &&
                                    <img src={`/images/Speakers/${talk.speakerImage}`} alt={talk.speaker} />
                                  }
                                  <p>
                                    <SpeakerList name={`${talk.speaker}`} />
                                  </p>
                                  <span>|</span>
                                  <p>{talk.company}</p>
                                </div>
                              }
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </TabPanel>
            ))
          }
        </Tabs>
      </div>

    </div>
  </div>
);

export default Agenda;
