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
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App(){

    return <>
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="product" element={<Product />}/>
                        <Route path="pricing" element={<Pricing />}/>
                        <Route path="login" element={<Login />}/>
                        <Route path="app" element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate replace to="cities" />}/>
                            <Route path="cities/:id" element={<City />}/>
                            <Route path="cities" index element={<CityList />}/>
                            <Route path="countries" element={<CountryList />} />
                            <Route path="form" element={<Form />}/>
                        </Route>
                        <Route path="*" element={<PageNotFound />}/>
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    </>
}