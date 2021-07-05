import React from 'react';
import { makeStyles } from '@material-ui/core';

const Header = () => {
    const classes = useStyle();

    return (
        <span className={classes.header}> React movies </span>
    )
}

const useStyle = makeStyles(theme => ({
    header: {
        width: "100%",
        cursor: "pointer",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        textTransform: "uppercase",
        backgroundColor: "#39445a",
        fontFamily: "Montserrat",
        fontSize: "5vw",
        paddingBottom: "15px",
        boxShadow: "0px 1px 5px black",
        color: "white",
        zIndex: "100"
    }
}))

export default Header
