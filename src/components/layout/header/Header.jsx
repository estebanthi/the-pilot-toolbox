import Image from 'next/image'
import Link from "next/link";

import styles from "./Header.module.css"
import BasicButton from "../../buttons/basic-button/BasicButton";
import {useRouter} from "next/router";
import {signOut, useSession} from "next-auth/react";
import {Logout} from "@mui/icons-material";


const Header = () => {

    const router = useRouter()
    const session = useSession()

    const authenticated = session.status == 'authenticated'

    return (
        <div className={styles.header}>
            <Link href="/">
                <Image className={styles.logo} src={"/assets/pilot toolbox logo.jpg"} width={200} height={76} />
            </Link>
            <div className={styles.headerElements}>
                <Link href="/"><span className={router.pathname == "/" && styles.selected}>Accueil</span></Link>
                <Link href="/qcm"><span className={router.pathname == "/qcm" && styles.selected}>QCM</span></Link>
                <Link href="/abonnement"><span className={router.pathname == "/abonnement" && styles.selected}>Abonnement</span></Link>
                {authenticated && <BasicButton text="Mon profil" href="/me/profile"/>}
                {authenticated && <Logout onClick={signOut} style={{cursor: "pointer"}}/>}
                {!authenticated && <BasicButton text="Se connecter" href="/auth/signin"/>}
                {!authenticated && <BasicButton text="Créer un compte" href="/auth/register" />}
            </div>
        </div>
    )

}

export default Header