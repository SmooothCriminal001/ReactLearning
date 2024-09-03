/* eslint-disable react/prop-types */
import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./Map.module.css"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet"
import { useEffect, useState } from "react"
import { useCities } from "../contexts/CitiesContext"
import { useGeolocation } from "../hooks/useGeolocation"
import Button from "./Button"
import { useUrlPosition } from "../hooks/useUrlPosition"

export default function Map(){

    const [mapPosition, setMapPosition] = useState([40, 0])
    const { cities } = useCities()
    const {isLoading: isLoadingPosition, position: geoLocationPosition, getPosition} = useGeolocation()

    const [mapLat, mapLng] = useUrlPosition(40, 0)

    useEffect(() => {
        if(mapLat && mapLng){
            setMapPosition([
                mapLat,
                mapLng
            ])
        }
    }, [mapLat, mapLng])

    useEffect(() => {
        if(geoLocationPosition){
            setMapPosition(geoLocationPosition)
        }
    }, [geoLocationPosition])

    return <div className={styles.mapContainer} > 
        {
            (geoLocationPosition != mapPosition) && 
            <Button type="position" onclick={getPosition}>
            {isLoadingPosition ? 'Loading' : 'Use your position'}
        </Button>
        }
        <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />

            {cities.map(eachCity => (
                <Marker position={[eachCity.position.lat, eachCity.position.lng]} key={eachCity.id}>
                    <Popup>
                        <span>{eachCity.emoji}</span>
                        <span>{eachCity.cityName}</span>
                    </Popup>
                </Marker>
            ))}

            {
                (geoLocationPosition) && 
                <Marker position={mapPosition}>
                    <Popup>
                        <span>
                            { geoLocationPosition == mapPosition ? "Your location" : "Current Selection"}
                        </span>
                    </Popup>
                </Marker>
            }

            <ChangeCenter position={mapPosition} />
            <DetectClick />
        </MapContainer>
    </div>
}

function ChangeCenter( { position }){
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick(){
    const navigate = useNavigate()

    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}