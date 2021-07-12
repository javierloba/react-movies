import { makeStyles, Typography, Badge } from '@material-ui/core';
import { img_300, unavailable } from '../config/config';
import ContentModal from './ContentModal';

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
        <ContentModal media_type= {media_type} id={id}>
            <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"} />
            <img className={classes.poster} src={ poster ? `${img_300}/${poster}` : `${unavailable}`} alt={title} />
            <Typography variant="h6" className={classes.title}>{title}</Typography>
            <span className={classes.subtitle} >{media_type === "tv" ? "TV Series" : "Movie"}
                <span className={classes.subtitle}> 
                    {date}
                </span>
            </span>
        </ContentModal>
    )
}

const useStyle = makeStyles(theme => ({
    poster: {
        borderRadius: "10px"
    },
    title: {
        width: "100%",
        textAlign: "center",
        fontSize: "17px",
        padding: theme.spacing(2, 0)
    },
    subtitle: {
        display: "flex",
        justifyContent: "space-between",
        padding: theme.spacing(0, 1, 1, 1),
        fontWeight: "200"
    }

}))

export default SingleContent;
