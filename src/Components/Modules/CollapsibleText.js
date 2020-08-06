import React from "react";
import Typography from "@material-ui/core/Typography";

export default (props) => {
    const {data, collapse, limit} = props
    return (
        <Typography variant="body2">
            {collapse ? data.substring(0, limit) + '...' : data}
        </Typography>
    )
}