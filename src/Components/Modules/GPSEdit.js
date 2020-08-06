import React from "react";
import TextField from "@material-ui/core/TextField";

export default (props) => {
    return (
        <div>
            <TextField label="Latitude"
                       size="small"
                       type="number"
                       value={props.value.oa}
                       onChange={e => props.onChange({oa: parseFloat(e.target.value), ha: props.value.ha})}
            />
            <TextField label="Longitude"
                       size="small"
                       type="number"
                       value={props.value.ha}
                       onChange={e => props.onChange({ha: parseFloat(e.target.value), oa: props.value.oa})}
            />
        </div>
    )
}
