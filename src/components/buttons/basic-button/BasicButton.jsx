import Link from "next/link";

import styles from "./BasicButton.module.css"


const BasicButton = (props) => {

    return (
        props.href && <Link href={props.href}>
            <span className={styles.button}>{props.text}</span>
        </Link> ||
        props.onClick && <span className={styles.button} onClick={props.onClick}>{props.text}</span>
    )

}

export default BasicButton