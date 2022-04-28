import {useEffect, useState} from "react";
import {ArrowBack} from "@mui/icons-material";
import Link from "next/link";
import BasicButton from "../../components/buttons/basic-button/BasicButton";
import Spinner from "../../components/spinner/Spinner";
import ErrorAlert from "../../components/alerts/error alert/ErrorAlert";
import SuccessAlert from "../../components/alerts/success alert/SuccessAlert";
import {useRouter} from "next/router";
import {registerUser, sendNewPasswordCode, sendValidationCode} from "../../../services/auth";
import {signIn} from "next-auth/react";
import styles from "../../../styles/NewPasswordPage.module.css";
import axios from "axios";

export default function NewPasswordPage (props) {

    const router = useRouter()

    const [email, setEmail] = useState()
    const [code, setCode] = useState()
    const [spinner1, setSpinner1] = useState(false)
    const [spinner2, setSpinner2] = useState(false)

    const [wrongCodeError, setWrongCodeError] = useState(false)
    const [wrongPasswordsError, setWrongPasswordsError] = useState(false)
    const [success1, setSuccess1] = useState(false)
    const [success2, setSuccess2] = useState(false)
    const [newMailSent, setNewMailSent] = useState(false)
    const [token, setToken] = useState(null)
    const [newPassword, setNewPassword] = useState()
    const [confirmNewPassword, setConfirmNewPassword] = useState()

    const handleSend = async () => {
        setSpinner1(true)
        await sendNewPasswordCode(email)
            .then((res) => setToken(res.data))
        setSuccess1(true)
        setTimeout(() => setSuccess1(false), 3000)
        setSpinner1(false)
    }

    const sendNew = async () => {
        setNewMailSent(false)
        setWrongCodeError(false)
        setSpinner2(true)
        await sendNewPasswordCode(email)
            .then((res) => setToken(res.data))
        setNewMailSent(true)
        setTimeout(() => setNewMailSent(false), 3000)
        setSpinner2(false)
    }

    const validate = async () => {
        setWrongCodeError(false)
        setWrongPasswordsError(false)

        if (newPassword != confirmNewPassword) {
            setWrongPasswordsError(true)
            return
        }
        setSpinner2(true)
        const res = await axios.put('/api/users/password', {token: token, code: code, password: newPassword}, {params: {email: email}})
            .then(() => {
                setSuccess2(true)
                signIn('credentials', {email: email, password: newPassword, callbackUrl: '/'})
            })
            .catch((err) => {
                setWrongCodeError(true)
                setTimeout(() => setWrongCodeError(false), 3000)
            })

    }

    return (
        <div className={styles.container}>
            <div className={styles.back}>
                <ArrowBack onClick={() => router.push('/')}/>
                <Link href="/"><span>Retour</span></Link>
            </div>
            <div className={styles.form}>
                <h1>Mot de passe oublié</h1>
                <p>Entrez ici votre adresse email afin de recevoir un code pour réinitialiser votre mot de passe.</p>
                <div className={styles.formElement}>
                    <span>Email</span>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.button}>
                    <BasicButton text="Envoyer" onClick={handleSend}/>
                </div>
                {spinner1 && <div className={styles.spinner}>
                    <Spinner/>
                </div>}
                {success1 && <SuccessAlert text="Un mail vous a été envoyé !"/>}
                <div className={styles.formElement}>
                    <span>Code</span>
                    <input disabled={token == null} type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
                </div>
                <div className={styles.formElement}>
                    <span>Nouveau mot de passe</span>
                    <input disabled={token == null} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                </div>
                <div className={styles.formElement}>
                    <span>Confirmer le nouveau mot de passe</span>
                    <input disabled={token == null} type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                </div>
                <div className={styles.button}>
                    <BasicButton text="Renvoyer un mail" onClick={sendNew} />
                </div>
                {newMailSent && <SuccessAlert text="Un nouveau code vous a été envoyé."/>}
                {token && <div className={styles.button}>
                    <BasicButton text="Réinitialiser" onClick={validate}/>
                </div>}
                {spinner2 && <div className={styles.spinner}>
                    <Spinner/>
                </div>}
                {wrongPasswordsError && <ErrorAlert className={styles.alert} text="Les mots de passe sont différents."/>}
                {wrongCodeError && <ErrorAlert className={styles.alert} text="Code incorrect."/>}
                {success2 && <SuccessAlert text="Mot de passe changé avec succès !"/>}
            </div>
        </div>
    )

}