import {Grid} from "@mui/material";
import Image from "next/image";

import styles from "./Category.module.css"
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

const data = {nb: 2000}

const Category = (props) => {

    const router = useRouter()
    const [qcmNb, setQcmNb] = useState(0)

    useEffect(() => {
        const getNb = async () => {
            const qcms = await axios.get("/api/qcms", {params: {category: props.category._id.toString()}})
                .then((res) => res.data)
            setQcmNb(qcms.length)
        }
        getNb()
    }, [])

    return (
        <Grid item xs={props.xs ? props.xs : 4} className={styles.container} onClick={() => router.push("/qcm/"+props.category.slug)}>
            {props.image}
            <h3>{props.category.full_name}</h3>
            <span>{qcmNb} QCM</span>
        </Grid>
    )

}

export default Category