import styles from "./RadioButton.module.css"

const RadioButton = (props) => {

    return (
        <input disabled={props.disabled || false} type='radio' className={props.small ? styles.smallRadio : styles.radio} checked={props.selected == props.value} onChange={() => {
            props.setSelected(props.value)
            if (props.handleChange) {
                props.handleChange(props.value)
            }
        }}></input>
    )

}

export default RadioButton