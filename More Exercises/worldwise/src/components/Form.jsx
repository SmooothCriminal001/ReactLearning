// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css'
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("")
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("")
  const [geoCodingError, setGeoCodingError] = useState("")
  const [lat, lng] = useUrlPosition()
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false)
  const { isLoading, addCity } = useCities()

  const navigate = useNavigate()

  useEffect(() => {

    console.log(`lat: ${lat} lng: ${lng}`)
    if(!lat && !lng) return

    async function getCityData(lat, lng){
      try{
        setIsLoadingGeoCoding(true)
        setGeoCodingError("")

        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await response.json()
        console.dir(data)

        if(!data.countryName){
          throw new Error(`That does not seem to be a city. Click somewhere else 😉`)
        }

        setCityName(data.city || data.locality || "")
        setCountryName(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      }
      catch(e){
        setGeoCodingError(e.message)
      }
      finally{
        setIsLoadingGeoCoding(false)
      }
    }

    getCityData(lat, lng)
  }, [lat, lng])

  async function onFormSubmit(e){
    e.preventDefault()

    if(!cityName || !date){
      return
    }

    const newCity = {
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: { lat, lng}
    }

    await addCity(newCity)

    navigate("/app/cities")
  }

  if(isLoadingGeoCoding){
    return <Spinner />
  }

  if(!lat && !lng){
    return <Message message="Start by clicking somewhere on the map" />
  }

  if(geoCodingError){
    return <Message message={geoCodingError} />
  }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={onFormSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span> 
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker 
          onChange={date => setDate(date)} 
          selected={date}
          dateFormat="dd/MM/yyyy"  
          id="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
