import styles from "./QCMQuestion.module.css"
import {useState} from "react";
import RadioButton from "../../buttons/radio button/RadioButton";
import Image from "next/image";
import Link from "next/link"


const QCMQuestion = (props) => {

    const qcm = props.qcm

    const responses = [1, 2, 3, 4]

    const [selected, setSelected] = useState(null)

    return (
        <div className={styles.container}>
            <div className={styles.question}>
                <span className={styles.index}>{props.index}.</span>
                <span>{qcm.question}</span>
                {qcm.linked_image && <div className={styles.questionImage}><Link href={qcm.linked_image} passHref><a target="_blank" rel="noopener noreferrer"><Image src={qcm.linked_image} width={50} height={50}/></a></Link></div>}
            </div>
            <div className={styles.responses}>
                {responses.map((response) => <div className={styles.response}>
                    <span className={styles.number}>{response} : </span>
                    <span> {qcm.responses[response-1]}</span>
                    <div><RadioButton small={true} value={responses[response-1]} selected={selected} setSelected={setSelected} /></div>
                    </div>
                )}
            </div>
        </div>
    )

}

export default QCMQuestion