import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"

export default function Map(){

    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    const navigate = useNavigate()

    return <div className={styles.mapContainer} onClick={() => navigate("form")}> 
        <p>Latitude: {lat}</p>
        <p>Longitude: {lng}</p>
        <button onClick={() => setSearchParams({lat: 55, lng: 75})}>Set to a static point</button>
    </div>
}