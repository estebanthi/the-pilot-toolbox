import {ArrowBack} from "@mui/icons-material";
import Link from "next/link";
import styles from "../../../styles/RegisterPage.module.css"
import ErrorAlert from "../../components/alerts/error alert/ErrorAlert";
import BasicButton from "../../components/buttons/basic-button/BasicButton";
import {useState} from "react";
import Spinner from "../../components/spinner/Spinner";
import {useRouter} from "next/router";
import {sendValidationCode, generateValidationToken, checkEmailTaken} from "../../../services/auth";
import axios from "axios";

export default function RegisterPage () {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [spinner, setSpinner] = useState(false)

    const [allFieldsError, setAllFieldsError] = useState(false)
    const [notValidEmailError, setNotValidEmailError] = useState(false)
    const [emailAlreadyTaken, setEmailAlreadyTaken] = useState(false)

    const errors = [
        {error: allFieldsError, setter: setAllFieldsError, text: "Tous les champs sont requis."},
        {error: notValidEmailError, setter: setNotValidEmailError, text: "Veuillez entrer un email valide."},
        {error: emailAlreadyTaken, setter: setEmailAlreadyTaken, text: "Cet email est déjà utilisé."}
    ]

    const router = useRouter()

    const handleSubmit = async () => {
        setSpinner(false)
        errors.map((error) => error.setter(false))

        if (!(username && email && password)) {
            setAllFieldsError(true)
            return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setNotValidEmailError(true)
            return
        }

        setSpinner(true)
        const emailTaken = await checkEmailTaken(email)
        if (emailTaken) {
            setSpinner(false)
            setEmailAlreadyTaken(true)
            return
        }

        const code = Math.round((Math.random() * (999999-100000) + 100000))
        const token = await generateValidationToken(code, username, email, password)
        await sendValidationCode(code, email)
            .then(() => router.push({pathname: "/auth/verify", query: {token: JSON.stringify(token)}}))

    }

    return (
        <div className={styles.container}>
            <div className={styles.back}>
                <ArrowBack onClick={() => router.push('/')}/>
                <Link href="/"><span>Retour</span></Link>
            </div>
            <div className={styles.form}>
                <h1>Créer un compte</h1>
                <div className={styles.formElement}>
                    <span>Pseudonyme</span>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className={styles.formElement}>
                    <span>Email</span>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.formElement}>
                    <span>Mot de passe</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {errors.map((error) => error.error && <div className={styles.alert}><ErrorAlert text={error.text}/></div>)}
                <div className={styles.button}>
                    <BasicButton text="Envoyer" onClick={handleSubmit}/>
                </div>
                {spinner && <div className={styles.spinner}>
                    <Spinner/>
                </div>}
                <p className={styles.subtext}>Vos données personnelles sont conservées uniquement dans le cadre du site. Voir : {<Link href={"/legal/politique-de-confidentialite"}><span className={styles.link}>Politique de Confidentialité</span></Link>}.</p>
            </div>
        </div>
    )
}