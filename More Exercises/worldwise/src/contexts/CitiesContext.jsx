/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext()

const BASE_URL = "http://localhost:8000"

const types = {
    startLoad: "startLoad",
    stopLoad: "stopLoad",
    updateCities: "updateCities",
    updateSelectedCity: "updateSelectedCity",
    addCity: "addCity",
    removeCity: "removeCity",
}

const initialState = {
    cities: [],
    isLoading: false,
    selectedCity: {}
}

const reducer = (state, action) => {
    switch(action.type) {
        case types.updateCities:
            return {
                ...state,
                cities: action.payload,
                isLoading: false
            }
        case types.startLoad:
            return {
                ...state,
                isLoading: true
            }
        case types.stopLoad:
            return {
                ...state,
                isLoading: false
            }
        case types.updateSelectedCity:
            return {
                ...state,
                selectedCity: action.payload,
            }
        case types.addCity:
            return {
                ...state, cities: [...state.cities, action.payload], selectedCity: action.payload
            }
        case types.removeCity:
            return {
                ...state, cities: state.cities.filter(city => city.id != action.payload)
            }
        default:
          new Error('Invalid action')
    }
}

function CitiesProvider( { children }){

    const [{ cities, isLoading, selectedCity }, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        async function fetchCities(){
            try{
                dispatch({ type: types.startLoad })
                const data = await fetch(`${BASE_URL}/cities`)
                const cityData = await data.json()

                console.log(`cities: ${JSON.stringify(cityData)}`);
                dispatch( { type: types.updateCities, payload: cityData })
            }
            catch(error){
                console.log(`There has been an error: ${error.message}`);
            }
            finally{
                dispatch( { type: types.stopLoad } )
            }
        }

        fetchCities()
    }, [])

    async function getCity(id){
        try{
            dispatch({ type: types.startLoad })
            const data = await fetch(`${BASE_URL}/cities/${id}`)
            const cityData = await data.json()

            console.log(`selected city: ${JSON.stringify(cityData)}`);
            dispatch( { type: types.updateSelectedCity, payload: cityData })
        }
        catch(error){
            console.log(`There has been an error: ${error.message}`);
        }
        finally{
            dispatch( { type: types.stopLoad } )
        }
    }

    async function addCity(city){
        try{
            dispatch({ type: types.startLoad })

            const response = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(city),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
    
            console.log(`added city: ${JSON.stringify(data)}`);
    
            dispatch({ type: types.addCity, payload: data})
        }
        catch(e){
            console.log(`There has been an error: ${e.message}`)
        }
        finally{
            dispatch( { type: types.stopLoad } )
        }
    }
    
    async function removeCity(cityId){
        try{
            dispatch({ type: types.startLoad })

            const response = await fetch(`${BASE_URL}/cities/${cityId}`, {
                method: 'DELETE'
            })
            await response.json()
    
            dispatch({ type: types.removeCity, payload: cityId})
        }
        catch(e){
            console.log(`There has been an error: ${e.message}`)
        }
        finally{
            dispatch( { type: types.stopLoad } )
        }
    }

    return <CitiesContext.Provider value={{
        cities,
        isLoading,
        getCity,
        selectedCity,
        addCity,
        removeCity
    }}>
        {children}
    </CitiesContext.Provider>
}

const useCities = () => {
    const cities = useContext(CitiesContext)

    if(!cities){
        throw new Error("CitiesContext is used outside of its scope")
    }

    return cities
}

export { CitiesProvider, useCities }