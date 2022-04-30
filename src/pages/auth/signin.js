import Layout from "../../components/layout/Layout";
import styles from "../../../styles/SigninPage.module.css"
import BasicButton from "../../components/buttons/basic-button/BasicButton";
import {useEffect, useState} from "react";

import Link from "next/link"
import ErrorAlert from "../../components/alerts/error alert/ErrorAlert";
import Spinner from "../../components/spinner/Spinner";
import {Login} from "../../../services/auth";
import {ArrowBack} from "@mui/icons-material";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";


export default function SigninPage () {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [rememberMe, setRememberMe] = useState(true)

    const [allFieldsError, setAllFieldsError] = useState(false)
    const [wrongCredentialsError, setWrongCredentialsError] = useState(false)

    const [spinner, setSpinner] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (router.query.error == "CredentialsSignin") {
            setWrongCredentialsError(true)
        }
    })

    const handleSignin = async () => {
        setAllFieldsError(false)
        setWrongCredentialsError(false)

        if(!(email && password)) {
            setAllFieldsError(true)
            return
        }

        setSpinner(true)
        await signIn('credentials-signin', {password: password, email: email, callbackUrl: "/"})
        setSpinner(false)
    }

    return (
        <div className={styles.signinPage}>
            <div className={styles.back}>
                <ArrowBack onClick={() => router.push('/')}/>
                <Link href="/"><span>Retour</span></Link>
            </div>
            <div className={styles.container}>
            <div className={styles.signin}>
                <h1>Connexion</h1>
                <div className={styles.formElement}>
                    <span>Email</span>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.formElement}>
                    <span>Mot de passe</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={styles.rememberMe}>
                    <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>
                    <span>Se souvenir de moi</span>
                </div>
                {allFieldsError && <div className={styles.alert}><ErrorAlert text="Tous les champs sont requis."/></div>}
                {wrongCredentialsError && <div className={styles.alert}><ErrorAlert text="Identifiants incorrects."/></div>}
                <div className={styles.button}>
                    <BasicButton text="Se connecter" onClick={handleSignin}/>
                </div>
                <Link href='/auth/new-password'>
                    <span className={styles.forgottenPassword}>Mot de passe oublié ?</span>
                </Link>
                {spinner && <div className={styles.spinner}>
                    <Spinner/>
                </div>}
            </div>
            <div className={styles.signin}>
                <h1>Pas encore de compte ?</h1>
                <BasicButton text="Créer un compte" href="/auth/register"/>
            </div>
            </div>

        </div>
    )

}
