import styles from "./RadioButton.module.css"

const RadioButton = (props) => {

    return (
        <input type='radio' className={styles.radio} checked={props.selected == props.value} onChange={() => {
            props.setSelected(props.value)
            props.handleChange(props.value)
        }}></input>
    )

}

export default RadioButton