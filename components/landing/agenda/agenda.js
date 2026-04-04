import Link from "next/link";
import styles from "./agenda.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Button from "../../common/button/button";
import speakers from "../speakers/speakers.json";
import { DEFAULT_AGENDA_SPACES, getDefaultAgenda, toLegacyAgendaShape } from "@/lib/agenda";

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
          {item.link ? <a href={item.link}><div className={styles.talkTitle}>{item.title ? item.title : "TBA"}</div></a> : <div className={styles.talkTitle}>{item.title ? item.title : "TBA"}</div>}
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

const AgendaComponent = ({ agendaData }) => {
  const normalizedAgenda = agendaData || getDefaultAgenda();
  const legacyAgenda = toLegacyAgendaShape(normalizedAgenda);
  const spaces = (normalizedAgenda?.spaces || DEFAULT_AGENDA_SPACES).slice().sort((a, b) => a.order - b.order);
  const timeSlots = normalizedAgenda?.timeSlots || [];

  return (
    <div id="agenda" className={styles.agenda}>
      <div className="container no-padding">
        <div className={styles.titleWrapper}>
          <p className={styles.title}>Agenda</p>
        </div>
        <div className={styles.agendaContainer}>
          <Tabs className={styles.tabs} defaultIndex={0}>
            <TabList className={styles.tablist}>
              <div className={styles.tabsContainer}>
                {legacyAgenda.days.map((day, i) => (
                  <Tab key={i} className={styles.tab} selectedClassName={styles.selectedTab}>
                    <div className={styles.tabName}>{day.dayName}</div>
                    <div className={styles.tabDate}>{day.date}</div>
                  </Tab>
                ))}
              </div>
            </TabList>

            {legacyAgenda.days.map((day, i) => (
              <TabPanel key={i}>
                <div className={styles.timeTable} style={{ gridTemplateRows: `auto repeat(${timeSlots.length}, minmax(130px, 1fr))` }}>
                  <div></div>
                  {spaces.map((space) => (
                    <div key={space.id} className={styles.header}>
                      <h3><span></span></h3>
                      <h4>{space.name}</h4>
                    </div>
                  ))}
                  {timeSlots.map((time, index) => {
                    if (day.programe[time]) {
                      return <TimeSlot key={time} programe={day.programe[time]} time={time} index={index} start={1} duration={1} />;
                    }
                    return null;
                  })}
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AgendaComponent;
