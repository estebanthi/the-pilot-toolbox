import styles from "./demoAlert.module.css"
import ArrowButton from "../../buttons/arrow-button/ArrowButton";


const DemoAlert = (props) => {

    return (
        <div className={styles.demoAlert}>
            <p className={styles.text}>
                <span className={styles.coloredText}>Vous êtes en mode démo. </span>
                Consultez la section abonnement si vous souhaitez avoir accès à tous les QCM.<br/><br/>
                <span className={styles.coloredText}> Vous avez accès à 100 QCM sur un total de 1000.</span>
            </p>
            <div className={styles.button}>
                <ArrowButton text="Abonnement" href="/abonnement"/>
            </div>
        </div>
    )

}


export default DemoAlert