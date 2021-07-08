import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const Search = () => {
    const classes = useStyle();

    return (
        <div>
            <Typography className={classes.pageTitle}>Search</Typography>
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    pageTitle: {
        textTransform: "uppercase",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Montserrat",
        fontSize: "4vw",
        padding: "4px",
        borderRadius: "50px",
        color: "#fff"
    }
}))

export default Search
