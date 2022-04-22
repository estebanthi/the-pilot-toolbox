import Select from "react-select";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated()


const MultiSelect = (props) => {

    return (
        <Select options={props.options} isMulti components={animatedComponents}/>
    )

}

export default MultiSelect