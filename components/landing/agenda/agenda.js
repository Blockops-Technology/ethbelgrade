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

const startTime = 9;
const endTime = 17;
const timeSlots = [
  "8:30"
];

for (let hour = startTime; hour < endTime; hour++) {
  // Adding two slots per hour: XX:00 and XX:30
  timeSlots.push(`${hour}:00`);
  timeSlots.push(`${hour}:30`);
}

timeSlots.push("17:00")

const Agenda = () => (
  <div id="agenda" className={styles.agenda}>
    <div className="container">
      <div className={styles.titleWrapper}>
        <p className={styles.title}>Agenda</p>
      </div>
      <div className={styles.agendaContainer}>
        <Tabs className={styles.tabs}>
          <TabList className={styles.tablist}>
            <div className={styles.tabsContainer}>
              {
                agenda.days.map((day, i) => (
                  <Tab key={i} className={styles.tab} selectedClassName={styles.selectedTab}>
                    <div className={styles.tabName}>{day.dayName}</div>
                    <div className={styles.tabDate}>{day.date}</div>
                  </Tab>
                ))
              }
            </div>
          </TabList>

          {
            agenda.days.map((day, i) => (
              <TabPanel key={i}>
                <div className={styles.timeTable}>
                  <div className={styles.timeSlot}>
                    <div></div>
                    <div>Stage 1</div>
                    <div>Stage 2</div>
                    <div>Stage 3</div>
                    <div>Workshop</div>
                  </div>
                  {timeSlots.map((time, index) => (
                    <div key={index} className={styles.timeSlot}>
                      <div className={styles.time}>{time}</div>
                      {time in day.programe ?
                        day.programe[time].map((element, i) => (
                          <div className={styles.details}>
                            {element.title}
                          </div>  
                        )) :
                        <> 
                        <div className={styles.details}></div>
                        <div className={styles.details}></div>
                        <div className={styles.details}></div>
                        <div className={styles.details}></div>
                        </>
                      }
                    </div>
                  ))}
                </div>
                {/* {
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
                              <p className={styles.talkTitle}>{talk.recording ? <Link href={`${talk.recording}`} target="_blank" rel="noreferrer noopener">{talk.title}</Link> : talk.title}</p>
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
                } */}
              </TabPanel>
            ))
          }
        </Tabs>
      </div>

    </div>
  </div>
);

export default Agenda;
