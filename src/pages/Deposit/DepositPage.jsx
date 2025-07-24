import { Navbar } from "../../components/Navbar/Navbar"
import {Footer} from "../../components/Footer/Footer"
import { Deposit } from "../../components/deposit/Deposit"

export const DepositPage = () => {
    return(
        <>
            <Navbar/>
                <Deposit/>
            <Footer/>

        </>
    )
}