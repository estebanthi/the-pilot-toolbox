import styles from "../../../styles/VerifyPage.module.css"
import {useEffect, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import Link from "next/link";
import ErrorAlert from "../../components/alerts/error alert/ErrorAlert";
import BasicButton from "../../components/buttons/basic-button/BasicButton";
import Spinner from "../../components/spinner/Spinner";
import {useRouter} from "next/router";
import jwt from "jsonwebtoken";
import SuccessAlert from "../../components/alerts/success alert/SuccessAlert";
import {registerUser, sendValidationCode} from "../../../services/auth";
import {signIn} from "next-auth/react";


export default function VerifyPage () {

    const router = useRouter()

    const [token, setToken] = useState(null)
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [tempCode, setTempCode] = useState(null)
    const [code, setCode] = useState()

    const [spinner, setSpinner] = useState(false)

    const [wrongCodeError, setWrongCodeError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [newMailSent, setNewMailSent] = useState(false)

    useEffect(() => {
        const token = JSON.parse(router.query.token)
        const verifiedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SIGN)
        setToken(verifiedToken)
        setUsername(verifiedToken.username)
        setEmail(verifiedToken.email)
        setPassword(verifiedToken.password)
        setTempCode(verifiedToken.code)
    }, [])

    const handleVerify = async () => {
        setNewMailSent(false)
        setWrongCodeError(false)
        setSpinner(true)
        setSuccess(false)

        if (!token) {
            setWrongCodeError(true)
            setSpinner(false)
            return
        }

        if (code != tempCode) {
            setWrongCodeError(true)
            setSpinner(false)
            return
        }

        await registerUser(username, email, password)
            .then(() => setSuccess(true))
            .then(async () => await signIn("credentials", {email: email, password: password, callbackUrl: "/"}))
    }

    const sendNew = async () => {
        setNewMailSent(false)
        setWrongCodeError(false)
        setSpinner(true)
        const newCode = Math.round((Math.random() * (999999-100000) + 100000))
        setTempCode(newCode)
        await sendValidationCode(newCode, email)
        setNewMailSent(true)
        setSpinner(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.back}>
                <ArrowBack onClick={() => router.push('/')}/>
                <Link href="/"><span>Retourner à l'accueil</span></Link>
            </div>
            <div className={styles.form}>
                <h1>Vérification</h1>
                <p>Entrez ici le code que vous avez reçu par mail afin de valider la création de votre compte.</p>
                <div className={styles.formElement}>
                    <span>Code</span>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
                </div>
                <div className={styles.button}>
                    <BasicButton text="Vérifier" onClick={handleVerify}/>
                </div>
                <div className={styles.button}>
                    <BasicButton text="Renvoyer un mail" onClick={sendNew} />
                </div>
                {spinner && <div className={styles.spinner}>
                    <Spinner/>
                </div>}
                {wrongCodeError && <ErrorAlert className={styles.alert} text="Code incorrect."/>}
                {success && <SuccessAlert text="Compte vérifié avec succès !"/>}
                {newMailSent && <SuccessAlert text="Un nouveau code vous a été envoyé."/>}
            </div>
        </div>
    )

}