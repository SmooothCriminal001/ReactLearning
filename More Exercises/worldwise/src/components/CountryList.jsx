/* eslint-disable react/prop-types */
import Spinner from "./Spinner"
import Message from "./Message"
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem"
import { useCities } from "../contexts/CitiesContext"

export default function CountryList(){

    const { cities, isLoading } = useCities()

    const countries = cities.reduce((arr, city) => {
        if(!arr.some(eachCity => eachCity.country == city.country)){
            arr.push({ emoji: city.emoji, country: city.country })
        }
        return arr
    }, [])

    if(isLoading) return <Spinner />

    if(cities.length == 0) return <Message message="Add your first city by clicking on a city on the map"/>

    return <ul className={styles.countryList}>
        { countries.map(eachCountry => (
            <CountryItem country={eachCountry} key={eachCountry.country}/>
        ))}
    </ul>
}