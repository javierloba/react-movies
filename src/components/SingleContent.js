import React from 'react';
import { makeStyles, alpha, Typography, Badge } from '@material-ui/core';
import { img_300, unavailable } from '../config/config';

const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
}) => {

    const classes = useStyle();

    return (
        <div className={classes.media}>
            <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"} />
            <img className={classes.poster} src={ poster ? `${img_300}/${poster}` : `${unavailable}`} alt={title} />
            <Typography variant="h6" className={classes.title}>{title}</Typography>
            <span className={classes.subtitle} >{media_type === "tv" ? "TV Series" : "Movie"}
                <span className={classes.subtitle}> 
                    {date}
                </span>
            </span>
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    media: {
        display: "flex",
        flexDirection: "column",
        width: "200px",
        padding: "5px",
        margin: "5px 0",
        backgroundColor: "#282c34",
        borderRadius: "10px",
        position: "relative",
        fontFamily: "Montserrat",
        "&:hover": {
            backgroundColor: alpha('#fff', .75),
            color: alpha('#000', .75)
        },
        [theme.breakpoints.down('sm')]: {
            width: "46%"
        }
    },
    poster: {
        borderRadius: "10px"
    },
    title: {
        width: "100%",
        textAlign: "center",
        fontSize: "17px",
        padding: "8px 0"
    },
    subtitle: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0 3px 3px 3px",
        fontWeight: "200"
    }

}))

export default SingleContent
