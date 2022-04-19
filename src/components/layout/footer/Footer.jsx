import Link from "next/link";

import styles from "./Footer.module.css"


const Footer = () => {

    return (
        <div className={styles.footer}>
            <hr className={styles.line}/>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <h3 className={styles.title}>Navigation</h3>
                    <Link href={"/"}>
                        <span>Accueil</span>
                    </Link>
                    <Link href={"/qcm"}>
                        <span>QCM</span>
                    </Link>
                    <Link href={"/subscription"}>
                        <span>Abonnement</span>
                    </Link>
                    <Link href={"/login"}>
                        <span>Se connecter</span>
                    </Link>
                    <Link href={"/register"}>
                        <span>Créer un compte</span>
                    </Link>
                </div>
                <div className={styles.subContainer}>
                    <h3 className={styles.title}>Pages légales</h3>
                    <Link href={"/politique-de-confidentialité"}>
                        <span>Politique de confidentialité</span>
                    </Link>
                    <Link href={"/mentions-legales"}>
                        <span>Mentions légales</span>
                    </Link>
                    <Link href={"/cgv"}>
                        <span>Conditions générales de vente</span>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Footer