import styles from "./agenda.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import agenda from "./agenda.json";

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
            <div className={styles.tablistTitle}>Stages</div>
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
                          <div className={styles.talk} key={i}>
                            <div className={styles.time}>{talk.time}</div>
                            <div className={styles.talkDetails}>
                              <p className={styles.talkTitle}>{talk.title}</p>
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
                                  <p>{talk.speaker}</p>
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