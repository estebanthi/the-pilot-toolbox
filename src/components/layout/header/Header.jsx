import Image from 'next/image'
import Link from "next/link";

import styles from "./Header.module.css"
import BasicButton from "../../buttons/basic-button/BasicButton";


const Header = () => {

    return (
        <div className={styles.header}>
            <Link href="/">
                <Image className={styles.logo} src={"/assets/pilot toolbox logo.jpg"} width={200} height={76} />
            </Link>
            <div className={styles.textualElements}>
                <Link href="/"><span>Accueil</span></Link>
                <Link href="/qcm"><span>QCM</span></Link>
                <Link href="/subscription"><span>Abonnement</span></Link>
                <BasicButton text="Se connecter" href="/login"/>
                <BasicButton text="Créer un compte" href="/register" />
            </div>
        </div>
    )

}

export default Header