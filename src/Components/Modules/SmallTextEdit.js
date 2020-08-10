import React from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";


export default (props) => {
    const {label, value, numeric} = props;

    return (
        <TextField
            // size="small"
            label={label}
            value={value}
            type={numeric ? 'number' : 'text'}
            // style={{minWidth: 'max-content'}}
            onChange={e => props.onChange(e.target.value)}
        />
    )
}
