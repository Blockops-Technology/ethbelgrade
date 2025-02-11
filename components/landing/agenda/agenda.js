import styles from "./agenda.module.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import TimeSlot from "./timeslot";

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

    if (!(day.slug in talks))
      talks[day.slug] = {}
    talks[day.slug][space.slug] = {}
    data.talks.map((talkData, i) => {
      talks[day.slug][space.slug][timeSlots[i]] = talkData.meta.en
    })
  });
  days = Object.values(days)
  spaces = Object.values(spaces)

  days.map((day, i) => {
    spaces.map((space, i) => {
      timeSlots.map((timeSlot, _) => {
        if (!(timeSlot in day.programe))
          day.programe[timeSlot] = []
        if (timeSlot in talks[day.slug][space.slug])
          day.programe[timeSlot].push(talks[day.slug][space.slug][timeSlot])
        else
          day.programe[timeSlot].push({
            "category": "",
            "title": "",
            "slug": "",
            "speakers": [],
            "company": "",
            "youtube": ""
          })   
      })
    })
  })

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
