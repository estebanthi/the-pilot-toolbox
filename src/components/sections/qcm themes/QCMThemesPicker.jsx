import styles from "./QCMThemesPicker.module.css"
import Select from "react-select";
import BasicButton from "../../buttons/basic-button/BasicButton";
import {useEffect, useState} from "react";
import {getThemes} from "../../../../services/qcm";



const QCMThemesPicker = (props) => {

    const [values, setValues] = useState([])

    const selectAll = () => {
        setValues(getSelectOptionsFromThemes())
        props.handleChange(getSelectOptionsFromThemes())
    }

    const reset = () => {
        setValues([])
        props.handleChange([])
    }

    const handleChange = (values) => {
        setValues(values)
        props.handleChange(values.map((theme) => theme.value))
    }

    const getSelectOptionsFromThemes = () => {
        const themes = props.themes
        const options = themes.map((theme) => (
            {
                label: theme.title,
                value: theme._id
            }
        ))
        return options
    }

    return (
        <div className={styles.qcmThemesPicker}>
            <div className={styles.themesSelectContainer}>
                <h3>Thèmes : </h3>
                <div className={styles.select}>
                <Select options={getSelectOptionsFromThemes()} isMulti onChange={handleChange} value={values}/>
                </div>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button}><BasicButton text="Sélectionner tous les thèmes" onClick={selectAll}/></div>
                <div className={styles.button}><BasicButton text="Réinitialiser" onClick={reset}/></div>
            </div>
            {values.length ? "" : <span className={styles.error}>Veuillez sélectionner au moins 1 thème.</span>}
        </div>
    )

}

export default QCMThemesPicker