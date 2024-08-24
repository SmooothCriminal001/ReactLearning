/* eslint-disable react/prop-types */
import CityItem from "./CityItem"
import Spinner from "./Spinner"
import Message from "./Message"
import styles from "./CityList.module.css"

export default function CityList({ cities, isLoading }){

    if(isLoading) return <Spinner />

    if(cities.length == 0) return <Message message="Add your first city by clicking on a city of the map"/>

    return <ul className={styles.cityList}>
        { cities.map(eachCity => (
            <CityItem key={eachCity.id} city={eachCity}/>
        ))}
    </ul>
}