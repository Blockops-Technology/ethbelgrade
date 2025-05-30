import Link from "next/link";
import styles from "./agenda.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Button from "../../common/button/button";
import agenda from "./agenda.json";
import speakers from "../speakers/speakers.json";

const twitter = new Map();

speakers.list.forEach(element => {
  twitter.set(element.name, element.twitter);
});

const SpeakerList = (props) => {
  return props.name
    .split(",").map((name, i) => {
      let handle = twitter.get(name.replace('moderated by', '').replace(/\(.+\)/, '').trim());
      const comma = i > 0 ? ", " : "";
      if (!handle && props.twitter_fallback) {
        handle = props.twitter_fallback;
      }
      if (handle) {
        return <>{comma}<Link href={handle} target="_blank" rel="noreferrer noopener">{name}</Link></>;
      } else {
        return <>{comma}{name}</>;
      }
    });
}

function Detail({ item }) {
  const style = {
    "--duration": item.slots ? item.slots : 1,
    "--spaces": item.spaces ? item.spaces : 1,
  };

  const classes = item.category?.toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("/", "")
    .split(",")
    .map(cat => styles["talkCategory" + cat])
    .join(' ');

  if (item.title || item.speaker || item.type)
    return (
      <div className={styles.details} style={style}>
        <div className={`${styles.talk} ${classes}`}>
          {item.category.replaceAll("Break", "") && item.category.replaceAll("Break", "").split(', ').map(cat => (<div key={cat} className={styles.talkType}>{cat}</div>))}
          <div className={styles.talkTitle}>{item.title ? item.title : "TBA"}</div>
          {item.speaker && (
            <div className={styles.talkSpeaker}>
              <SpeakerList name={`${item.speaker}`} twitter_fallback={item.twitter_fallback} />
              {item.company && <span>, {item.company}</span>}
            </div>
          )}
          {
            item.youtube &&
            <div>
              <Link href={`${item.youtube}`} target="_blank" rel="noreferrer noopener">
                <Button className={styles.viewOnYt}>
                  <img className={styles.playIcon} src="/icons/play.svg" alt="Play icon" />
                  Watch on YouTube
                </Button>
              </Link>
            </div>
          }
        </div>
      </div>
    )
  else
    return (
      <div className={styles.details} style={style}></div>
    )
}

function TimeSlot({ time, programe }) {
  return (
    <>
      <div className={styles.time}>{time}</div>
      {programe ?
        programe.map((element, i) => (
          <Detail key={i} item={element} />
        )) : <></>
      }
    </>
  )
}

const startTime = 10;
const endTime = 18;
const timeSlots = [
  "09:00",
  "09:30"
];

for (let hour = startTime; hour < endTime; hour++) {
  // Adding two slots per hour: XX:00 and XX:30
  timeSlots.push(`${hour}:00`);
  timeSlots.push(`${hour}:30`);
}

const Agenda = () => (
  <div id="agenda" className={styles.agenda}>
    <div className="container no-padding">
      <div className={styles.titleWrapper}>
        <p className={styles.title}>Agenda</p>
      </div>
      <div className={styles.agendaContainer}>
        <Tabs className={styles.tabs} defaultIndex={0}>
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
                <div className={styles.timeTable} style={{gridTemplateRows: 'auto repeat(' + (day.programe['17:30'] ? 18 : 17) +', minmax(130px, 1fr))'}}>
                  <div></div>
                  <div className={styles.header}>
                    <h3><span></span></h3>
                    <h4>Danube stage</h4>
                  </div>
                  <div className={styles.header}>
                    <h3> <span></span></h3>
                    <h4>Sava stage</h4>
                  </div>
                  <div className={styles.header}>
                    <h3><span></span></h3>
                    {/* <img className="w-full !max-w-[110px]" src="/images/partners/rise-logo.png" /> */}
                    <h4>Rise stage</h4>
                  </div>
                  {timeSlots.map((time, index) => {
                    if (day.programe[time])
                      return <TimeSlot key={time} programe={day.programe[time]} time={time} index={index} start={1} duration={1} />;
                    return null;
                  })}
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
