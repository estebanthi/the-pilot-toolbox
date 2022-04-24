import styles from "./SuccessAlert.module.css"

const ErrorAlert = (props) => {
    return (
        <span className={styles.successAlert}>
            {props.text}
        </span>
    )
}

export default ErrorAlert