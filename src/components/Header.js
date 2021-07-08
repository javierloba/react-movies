import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const Header = () => {
    const classes = useStyle();

    return (
        <Typography onClick={() => window.scroll(0,0)} className={classes.header}> 🎬 React Movies 🎬 </Typography>
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
        fontSize: "5vw",
        fontFamily: "Montserrat",
        paddingBottom: "15px",
        boxShadow: "0px 1px 5px black",
        color: "white",
        zIndex: "100",
        [theme.breakpoints.down('sm')]: {
            paddingTop: "15px",
            fontSize: "6.4vw"
        }
    }
}))

export default Header
