import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export default (props) => {
    const {tagList, label} = props

    const [value, setNewValue] = React.useState(props.value);
    const [newTags, setNewTags] = React.useState([]);

    return (
        <div>
            <Autocomplete
                multiple
                freeSolo
                controlled
                size="small"
                options={tagList}
                value={value}

                onInputChange={event => event.stopPropagation()}
                onChange={(event, newValue) => {
                    event.stopPropagation()
                    setNewValue(newValue)
                    props.onChange(newValue)
                }}
                onBlur={() => setNewTags(value.filter(i => !tagList.includes(i)))}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        variant="standard"
                    />
                )}
            />
            <Dialog
                open={newTags.length > 0}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Будут созданы следующие теги:</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {newTags.join(", ")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewTags([])} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}