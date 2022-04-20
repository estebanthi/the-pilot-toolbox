import {Grid} from "@mui/material";
import Image from "next/image";

import styles from "./Category.module.css"
import {useRouter} from "next/router";

const data = {nb: 2000}

const Category = (props) => {

    const router = useRouter()

    return (
        <Grid item xs={props.xs ? props.xs : 4} className={styles.container} onClick={() => router.push("/qcm/"+props.categorySlug)}>
            {props.image}
            <h3>{props.title}</h3>
            <span>{data.nb} QCM</span>
        </Grid>
    )

}

export default Category