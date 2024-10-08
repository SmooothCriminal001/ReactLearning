import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import useIsLoading from "../hooks/useIsLoading";

export default function AppLayout(){
    const isLoading = useIsLoading()

    return <div className="layout">

        
        <Header />

        <main>
            <Outlet />
        </main>

        <CartOverview />
    </div>
}