import React from "react";
import {Circles} from "react-loader-spinner";


const Spinner = (props) => {

    return (<Circles
        color={props.color || "#6e2fa4"}
        height={30}
        width={30}
        visible={props.visible}
    />)

}

export default Spinner