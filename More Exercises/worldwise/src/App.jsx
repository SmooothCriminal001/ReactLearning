import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import CityList from "./components/CityList";
import City from "./components/City"
import SpinnerFullPage from "./components/SpinnerFullPage";

import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"))
const Product = lazy(() => import("./pages/Product"))
const Pricing = lazy(() => import("./pages/Pricing"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))
const Login = lazy(() => import("./pages/Login"))
const AppLayout = lazy(() => import("./pages/AppLayout"))

export default function App(){

    return <>
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
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
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    </>
}