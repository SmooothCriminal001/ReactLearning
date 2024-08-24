import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Product from "./pages/Product"
import HomePage from "./pages/Homepage"
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City"

import CountryList from "./components/CountryList";
import Form from "./components/Form";

const BASE_URL = "http://localhost:8000"

export default function App(){

    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState()

    useEffect(() => {
        async function fetchCities(){
            try{
                setIsLoading(true)
                const data = await fetch(`${BASE_URL}/cities`)
                const cityData = await data.json()

                console.log(`cities: ${JSON.stringify(cityData)}`);
                setCities(cityData)
            }
            catch(error){
                console.log(`There has been an error: ${error.message}`);
            }
            finally{
                setIsLoading(false)
            }
        }

        fetchCities()
    }, [])

    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="product" element={<Product />}/>
                <Route path="pricing" element={<Pricing />}/>
                <Route path="login" element={<Login />}/>
                <Route path="app" element={<AppLayout />}>
                    <Route index element={<Navigate replace to="cities" />}/>
                    <Route path="cities/:id" element={<City />}/>
                    <Route path="cities" index element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
                    <Route path="form" element={<Form />}/>
                </Route>
                <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </BrowserRouter>
    </>
}