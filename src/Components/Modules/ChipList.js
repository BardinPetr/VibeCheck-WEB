import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import React from "react";

export default (props) => {
    const {data, chipColor} = props
    const styles = makeStyles((theme) => ({
        chip: {
            margin: theme.spacing(0.5)
        },
        chipList: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: theme.spacing(0.5),
            margin: 0,
            background: 'transparent',
        }
    }))();

    return (
        <Paper component="ul" className={styles.chipList}>
            {data.map((i, id) => {
                return (
                    <li key={id}>
                        <Chip
                            color={chipColor || "primary"}
                            label={i}
                            variant="outlined"
                            size="small"
                            className={styles.chip}
                        />
                    </li>
                );
            })}
        </Paper>
    )
}