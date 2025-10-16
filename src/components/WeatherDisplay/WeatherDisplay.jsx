import styles from "./WeatherDisplay.module.scss";

export const WeatherDisplay = ({ city, data }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.city}>{city}</h2>
      <div className={styles.icon}>{data.icon}</div>
      <p className={styles.temp}>{data.temp}°C</p>
      <p className={styles.desc}>{data.description}</p>
    </div>
  );
};
