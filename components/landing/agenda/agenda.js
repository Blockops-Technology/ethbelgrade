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
      const handle = twitter.get(name.replace('moderated by', '').replace(/\(.+\)/, '').trim());
      const comma = i > 0 ? ", " : "";
      if (handle) {
        return <>{comma}<Link href={`${handle}`} target="_blank" rel="noreferrer noopener">{name}</Link></>;
      } else {
        return <>{comma}{name}</>;
      }
    });
}

function Detail({ item }) {
  if (item === undefined) {
    return (
      <div className={styles.details}></div>
    )
  }
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

  console.log(item)
  if (item.slug != "empty" || item.speakers.length)
    return (
      <div className={styles.details} style={style}>
        <div className={`${styles.talk} ${classes}`}>
          {/* {item.category.replaceAll("Break", "") && item.category.replaceAll("Break", "").split(', ').map(cat => (<div key={cat} className={styles.talkType}>{cat}</div>))} */}
          <div className={styles.talkTitle}>{item.title ? item.title : "TBA"}</div>
          {item.speaker && (
            <div className={styles.talkSpeaker}>
              <SpeakerList name={`${item.speaker}`} />
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
      <div className={styles.details}></div>
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

const startTime = 9;
const endTime = 17;
const timeSlots = [
  "08:30",
];

for (let hour = startTime; hour < endTime; hour++) {
  timeSlots.push(`${hour}:00`);
  timeSlots.push(`${hour}:30`);
}

timeSlots.push("17:00")

const Agenda = ({ agenda }) => {
  let days = {};
  let spaces = {};
  let talks = {};
  agenda.map((day_and_space, i) => {
    const data = day_and_space.meta.en
    const day = data.day.meta.en
    const space = data.space.meta.en

    if (!(day.title in days)) {
      const date = new Date(day.date.timestamp)
      days[day.title] = {
        dayName: day.title,
        slug: day.slug,
        date: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }),
        programe: {}
      }
    }

    if (!(space.title in spaces)) {
      spaces[space.title] = space
    }

    data.talks.map((talkData, i) => {
      console.log(talkData)
      if (!(day.slug in talks))
        talks[day.slug] = {}
      talks[day.slug][space.slug] = talkData.meta.en

    })
  });
  days = Object.values(days)
  spaces = Object.values(spaces)
  console.log(talks)
  days.map((day, i) => {
    var timeSlotIndex = 0
    spaces.map((space, i) => {
      const timeSlot = timeSlots[timeSlotIndex]
      if (!(timeSlot in day.programe))
        day.programe[timeSlot] = []
      day.programe[timeSlot].push(talks[day.slug][space.slug])
    })
    ++timeSlotIndex
  })
  console.log(days[0].programe)

  return <div id="agenda" className={styles.agenda}>
    <div className="container no-padding">
      <div className={styles.titleWrapper}>
        <p className={styles.title}>Agenda</p>
      </div>
      <div className={styles.agendaContainer}>
        <Tabs className={styles.tabs} defaultIndex={0}>
          <TabList className={styles.tablist}>
            <div className={styles.tabsContainer}>
              {
                days.map((day, i) => (
                  <Tab key={i} className={styles.tab} selectedClassName={styles.selectedTab}>
                    <div className={styles.tabName}>{day.dayName}</div>
                    <div className={styles.tabDate}>{day.date}</div>
                  </Tab>
                ))
              }
            </div>
          </TabList>

          {
            days.map((day, i) => (
              <TabPanel key={i}>
                <div className={styles.timeTable}>
                  <div></div>
                  {
                    spaces.map((space, i) => (
                      <div className={styles.header}>
                        <h3>{space.name} <span>[{space.pronounciation}]</span></h3>
                        <h4>{space.location}</h4>
                      </div>
                    ))
                  }
                  {
                    timeSlots.map((time, index) => (
                      <TimeSlot key={time} programe={day.programe[time]} time={time} index={index} start={1} duration={1} />
                    ))
                  }
                </div>
                { }
              </TabPanel>
            ))
          }
        </Tabs>
      </div>

    </div>
  </div>
};

export default Agenda;
