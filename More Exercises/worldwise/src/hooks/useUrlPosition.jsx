import { useSearchParams } from "react-router-dom"

export function useUrlPosition(defaultLat, defaultLng){
    const [searchParams] = useSearchParams()
    const lat = searchParams.get('lat') || defaultLat
    const lng = searchParams.get('lng') || defaultLng

    return [lat, lng]
}