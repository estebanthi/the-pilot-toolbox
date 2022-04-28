import styles from "./QCMType.module.css"
import {useEffect, useState} from "react";
import RadioButton from "../../buttons/radio button/RadioButton";
import {useSession} from "next-auth/react";
import {getQcmsFromOptions} from "../../../../services/qcm";


const QCMType = (props) => {

    const [selected, setSelected] = useState(0);
    const session = useSession()
    const disabled = session.status == 'authenticated' ? false: true

    const [allNb, setAllNb] = useState(0)
    const [failedOrNotSeenNb, setFailedOrNotSeenNb] = useState(0)
    const [alreadySeenNb, setAlreadySeenNb] = useState(0)
    const [markedNb, setMarkedNb] = useState(0)

    useEffect(() => {

        const setNbs = async () => {
            let options = Object.assign({} ,props.options)
            console.log(options)
            if (!options) {
                setAllNb(0)
                setAlreadySeenNb(0)
                setFailedOrNotSeenNb(0)
                setMarkedNb(0)
                return
            }
            if (!options.themes) {
                setAllNb(0)
                setAlreadySeenNb(0)
                setFailedOrNotSeenNb(0)
                setMarkedNb(0)
                return
            }

            options.number = 99999

            options.type = 0
            let qcms = await getQcmsFromOptions(options)
            setAllNb(qcms.length)

            options.type = 1
            qcms = await getQcmsFromOptions(options)
            setFailedOrNotSeenNb(qcms.length)

            options.type = 2
            qcms = await getQcmsFromOptions(options)
            setAlreadySeenNb(qcms.length)

            options.type = 3
            qcms = await getQcmsFromOptions(options)
            setMarkedNb(qcms.length)

        }
        setNbs()


    }, [props.options])

    return (
        <div className={styles.qcmType}>
            <div className={styles.option}>
                <span className={styles.label}>
                    Tout QCM ({allNb})
                </span>
                <RadioButton value={0} selected={selected} setSelected={setSelected} handleChange={props.handleChange}
                />
            </div>
            <div className={styles.option}>
                <span className={styles.label}>
                    Uniquement des QCM jamais vus ou ratés ({failedOrNotSeenNb})
                </span>
                <RadioButton disabled={disabled} value={1} selected={selected} setSelected={setSelected} handleChange={props.handleChange}
                />
            </div>
            <div className={styles.option}>
                <span className={styles.label}>
                    Uniquement des QCM déjà vus ({alreadySeenNb})
                </span>
                <RadioButton disabled={disabled} value={2} selected={selected} setSelected={setSelected} handleChange={props.handleChange}
                />
            </div>
            <div className={styles.option}>
                <span className={styles.label}>
                    Uniquement des QCM marqués ({markedNb})
                </span>
                <RadioButton disabled={disabled} value={3} selected={selected} setSelected={setSelected} handleChange={props.handleChange}
                />
            </div>
        </div>
    )
}

export default QCMType