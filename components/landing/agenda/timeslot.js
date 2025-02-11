import styles from "./agenda.module.scss";
import Detail from "./detail";

const TimeSlot = ({ time, programe }) => {
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

export default TimeSlot