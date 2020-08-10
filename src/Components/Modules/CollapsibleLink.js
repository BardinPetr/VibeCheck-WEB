import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default (props) => {
    const {data, collapse} = props;
    return (
        <Typography variant="body1" style={{"overflowWrap": "anywhere", "minWidth": "200px"}}>
            {collapse ? <Link href={data}>Click</Link> : data}
        </Typography>
    )
}