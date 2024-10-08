import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import useIsLoading from "../hooks/useIsLoading";
import Loader from "./Loader";

export default function AppLayout(){
    const isLoading = useIsLoading()

    return <div className="layout">
        {isLoading && <Loader />}
        <Header />

        <main>
            <Outlet />
        </main>

        <CartOverview />
    </div>
}