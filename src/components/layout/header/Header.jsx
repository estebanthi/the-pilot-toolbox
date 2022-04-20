import Image from 'next/image'
import Link from "next/link";

import styles from "./Header.module.css"
import BasicButton from "../../buttons/basic-button/BasicButton";
import {useRouter} from "next/router";


const Header = () => {

    const router = useRouter()

    return (
        <div className={styles.header}>
            <Link href="/">
                <Image className={styles.logo} src={"/assets/pilot toolbox logo.jpg"} width={200} height={76} />
            </Link>
            <div className={styles.textualElements}>
                <Link href="/"><span className={router.pathname == "/" && styles.selected}>Accueil</span></Link>
                <Link href="/qcm"><span className={router.pathname == "/qcm" && styles.selected}>QCM</span></Link>
                <Link href="/abonnement"><span className={router.pathname == "/abonnement" && styles.selected}>Abonnement</span></Link>
                <BasicButton text="Se connecter" href="/login"/>
                <BasicButton text="Créer un compte" href="/register" />
            </div>
        </div>
    )

}

export default Header