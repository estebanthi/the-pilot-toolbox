import styles from "./RadioButton.module.css"

const RadioButton = (props) => {

    return (
        <input disabled={props.disabled || false} type='radio' className={styles.radio} checked={props.selected == props.value} onChange={() => {
            props.setSelected(props.value)
            props.handleChange(props.value)
        }}></input>
    )

}

export default RadioButton