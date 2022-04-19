import Link from "next/link";

import styles from "./BasicButton.module.css"


const BasicButton = (props) => {

    return (
        <Link href={props.href}>
            <span className={styles.button}>{props.text}</span>
        </Link>
    )

}

export default BasicButton