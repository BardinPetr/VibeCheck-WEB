import React from "react";
import TextField from "@material-ui/core/TextField";

export default (props) => {
    console.log(props)
    return (
        <div>
            <TextField label="Latitude"
                       size="small"
                       type="number"
                       value={props.value ? props.value.oa : 0.0}
                       onChange={e => props.onChange({...props.value, oa: parseFloat(e.target.value)})}
            />
            <TextField label="Longitude"
                       size="small"
                       type="number"
                       value={props.value ? props.value.ha : 0.0}
                       onChange={e => props.onChange({...props.value, ha: parseFloat(e.target.value)})}
            />
        </div>
    )
}
