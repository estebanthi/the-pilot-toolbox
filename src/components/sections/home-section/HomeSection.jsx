import styles from "./HomeSection.module.css"
import ArrowButton from "../../buttons/arrow-button/ArrowButton";


const HomeSection = (props) => {

    return (
        <div className={styles.homeSection}>
            <h1>{props.title}</h1>
            <div className={styles.container}>
                {props.left && <div className={styles.image}>{props.image}</div>}
                <div className={styles.textContainer}>
                    <p>{props.text}</p>
                    <ArrowButton text={props.buttonText} href={props.buttonHref} />
                </div>
                {props.right && <div className={styles.image}>{props.image}</div>}
            </div>
        </div>
    )

}


export default HomeSection