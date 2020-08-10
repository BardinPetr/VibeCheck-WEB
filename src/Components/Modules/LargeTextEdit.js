import React from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "max-content",
        fontSize: "13px"
    }
}));


export default (props) => {
    const styles = useStyles();
    const {label, value} = props;

    return (
        <TextField
            multiline
            // size="small"
            label={label}
            value={value}
            className={styles.textField}
            onChange={e => props.onChange(e.target.value)}
        />
    )
}
