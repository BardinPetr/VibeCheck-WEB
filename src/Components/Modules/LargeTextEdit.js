import React from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default (props) => {
    const {label, value} = props;

    return (
        <TextField
            multiline
            size="small"
            label={label}
            value={value}
            onChange={e => props.onChange(e.target.value)}
        />
    )
}
