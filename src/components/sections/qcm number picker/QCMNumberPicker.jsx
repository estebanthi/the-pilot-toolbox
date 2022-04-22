import styles from "./QCMNumberPicker.module.css"
import QCMNumberPickerSlider from "../../sliders/qcm number picker slider/QCMNumberPickerSlider";
import {useState} from "react";


const QCMNumberPicker = (props) => {

    const [value, setValue] = useState(0)

    const handleChange = (value) => {
        setValue(value)
        props.handleChange(value)
    }

    return (
        <div className={styles.qcmNumberPicker}>
            <h3>Nombre de QCM : </h3>
            <div className={styles.slider}>
                <QCMNumberPickerSlider handleChange={handleChange}/>
            </div>
            <span className={styles.qcmNumber}>{value}</span >
        </div>
    )

}

export default QCMNumberPicker

