import { Outlet } from "react-router-dom"
import Logo from "./Logo"
import styles from "./Sidebar.module.css"
import AppNav from "./AppNav"

export default function Sidebar(){
    return <div className={styles.sidebar}>
        <Logo />
        <AppNav />

        <Outlet />
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by Worldwise.inc
            </p>
        </footer>
    </div>
}