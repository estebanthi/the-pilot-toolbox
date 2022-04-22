import QCMNumberPickerSliderStyled from "./QCMNumberPickerSliderStyled";
import {useState} from "react";

const QCMNumberPickerSlider = (props) => {

    const [value, setValue] = useState(0)

    return (
        <QCMNumberPickerSliderStyled
            valueLabelDisplay="auto"
            defaultValue={20}
            min={0}
            max={300}
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
                props.handleChange(e.target.value)
            }}
        />
    )

}

export default QCMNumberPickerSlider