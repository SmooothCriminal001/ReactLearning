/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import styles from "./CityItem.module.css"
import { useCities } from "../contexts/CitiesContext"

const formatDate = (date) => 
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long"
    }).format(new Date(date))

export default function CityItem({ city }){
    const { selectedCity, removeCity } = useCities()
    
    const handleRemove = (e) => {
        e.preventDefault()
        removeCity(city.id)
    }
    
    return <li>
        <Link className={`${styles.cityItem} ${selectedCity.id === city.id ? styles["cityItem--active"] : ''}`} to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
            <span className={styles.emoji}>{city.emoji}</span>
            <h3 className={styles.name}>{city.cityName}</h3>

            <time className={styles.date}>{formatDate(city.date)}</time>
            <button className={styles.deleteBtn} onClick={handleRemove}>&times;</button>
        </Link>
    </li>
}