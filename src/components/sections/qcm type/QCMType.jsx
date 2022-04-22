import styles from "./QCMType.module.css"
import {useState} from "react";
import RadioButton from "../../buttons/radio button/RadioButton";


const QCMType = (props) => {

    const [selected, setSelected] = useState(0);

    return (
        <div className={styles.qcmType}>
            <div className={styles.option}>
                <span className={styles.label}>
                    Tout QCM
                </span>
                <RadioButton value={0} selected={selected} setSelected={setSelected} handleChange={props.handleChange}
                />
            </div>
            <div className={styles.option}>
                <span className={styles.label}>
                    Uniquement des QCM jamais vus ou ratés
                </span>
                <RadioButton value={1} selected={selected} setSelected={setSelected} handleChange={props.handleChange}
                />
            </div>
            <div className={styles.option}>
                <span className={styles.label}>
                    Uniquement des QCM déjà vus
                </span>
                <RadioButton value={2} selected={selected} setSelected={setSelected} handleChange={props.handleChange}
                />
            </div>
            <div className={styles.option}>
                <span className={styles.label}>
                    Uniquement des QCM marqués
                </span>
                <RadioButton value={3} selected={selected} setSelected={setSelected} handleChange={props.handleChange}
                />
            </div>
        </div>
    )
}

export default QCMType