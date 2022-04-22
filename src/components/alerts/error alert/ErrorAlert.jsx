import styles from "./ErrorAlert.module.css"

const ErrorAlert = (props) => {
    return (
        <span className={styles.errorAlert}>
            {props.text}
        </span>
    )
}

export default ErrorAlert