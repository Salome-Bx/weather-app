import styles from "./UnitSwitch.module.css";

export const UnitSwitch = ({ onClick, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles.switch} ${
          unitSystem == "metric" ? styles.active : styles.inactive
        }`}
        onClick={onClick}
      >
      </p>
      <p
        className={`${styles.switch} ${
          unitSystem == "metric" ? styles.inactive : styles.active
        }`}
        onClick={onClick}
      >
      </p>
    </div>
  );
};
