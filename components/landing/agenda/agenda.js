import Link from "next/link";
import styles from "./agenda.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import agenda1 from "./agenda1.json";
import agenda from "./agenda.json";
import speakers from "../speakers/speakers.json";
import { useState } from "react";

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

const Agenda = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div id="agenda" className={styles.agenda}>
      <div className="container">
        <p className={styles.title}>Agenda</p>
        <div className={styles.agendaContainer}>
          <Tabs className={styles.tabs} selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList className={styles.tablist}>
              <div className={styles.tabsContainer}>
                {
                  agenda.days.map((day, i) => (
                    <Tab key={i} className={styles.tab} selectedClassName={styles.selectedTab}>
                      <p className={styles.tabTitle}>{day.name}</p>
                      <p className={styles.tabSubtitle}>{day.date}</p>
                    </Tab>
                  ))
                }
              </div>
            </TabList>

          {
            agenda.days.map((day, i) => (
              <TabPanel key={i}>
                {
                  <div className={styles.table}>
                    {
                      [""].concat(agenda.timeSlots).map((timeslot, j) => (
                        timeslot === "" ? (
                            [""].concat(agenda.stages).map((stage, k) => (
                              <div className={`${stage && styles.stageName}`} key={k}>
                                {stage?.name}
                              </div>
                            ))

                      ) : (
                          [""].concat(agenda.stages).map((stage, l) => {
                            switch (l) {
                              case 0:
                                return (
                                  <div className={styles.timeSlotBorder} key={l}>
                                    <p>{timeslot}</p>
                                  </div>
                                );
                              case 1:
                                return (
                                  <div className={`${styles.timeSlotBorder}`} key={l + 1}>
                                    <p>
                                      {agenda.days[i].mainStage?.talks[j - 1]?.title}
                                    </p>
                                  </div>
                                );
                              case 2:
                                return (
                                  <div className={styles.timeSlotBorder} key={l + 2}>
                                    <p>
                                      {agenda.days[i].secondStage?.talks[j - 1]?.title}
                                    </p>
                                  </div>
                                );
                              case 3:
                                return (
                                  <div style={{gridRow: `span ${agenda.days[i].thirdStage?.talks[j - 1]?.span}`}} className={styles.timeSlotBorder} key={l + 2}>
                                    <p>
                                      {agenda.days[i].thirdStage?.talks[j - 1]?.title}
                                    </p>
                                  </div>
                                );
                            }
                          })
                          // <div className={styles.timeSlotBorder} key={j}>
                          //   <p>{timeslot}</p>
                          // </div>
                        )
                      ))
                    }
                  </div>
                }
              </TabPanel>
            ))
          }
        </Tabs>
      </div>

      </div>
    </div>
  );
}

export default Agenda;
