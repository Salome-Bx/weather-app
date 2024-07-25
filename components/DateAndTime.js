import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getTime(
          unitSystem,
          new Date(weatherData.current.time).getTime(),
          weatherData.timezone
        )} ${getAMPM(unitSystem, new Date(weatherData.current.time).getTime(), weatherData.timezone
        )}`}
      </h2>
    </div>
  );
};
