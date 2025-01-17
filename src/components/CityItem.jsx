import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function formatDate(date) {
    const dateValue = new Date(date);
    const formatter = new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatter.format(dateValue);
  }

  function handleDeleteCity(e, cityId) {
    e.preventDefault();
    deleteCity(cityId);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleDeleteCity(e, id)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
