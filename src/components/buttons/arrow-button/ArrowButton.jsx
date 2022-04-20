import Link from "next/link";

import styles from "./ArrowButton.module.css"
import {ArrowDropDownCircle} from "@mui/icons-material";
import {useRouter} from "next/router";


const ArrowButton = (props) => {

    const router = useRouter()

    return (
        <div className={styles.container}>
            <Link href={props.href}>
                <span className={styles.button}>{props.text}</span>
            </Link>
            <ArrowDropDownCircle className={styles.icon} onClick={() => router.push(props.href)}/>
        </div>
    )

}

export default ArrowButton