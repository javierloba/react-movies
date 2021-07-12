import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomPagination from '../../components/CustomPagination';
import SingleContent from '../../components/SingleContent';

const Trending = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([])

    const classes = useStyle();

    const fetchTrending = async() => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIES_KEY}&page=${page}`
        );
        setContent(data.results);
    }

    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, [page]);

    return (
        <div>
            <Typography className={classes.pageTitle}>Trending</Typography>
            <div className={classes.trending}>
                { content && content.map((c) => 
                    <SingleContent 
                    key={c.id} 
                    id={c.id} 
                    poster={c.poster_path} 
                    title={c.title || c.name} 
                    date={c.first_air_date || c.release_date}
                    media_type={c.media_type}
                    vote_average={c.vote_average}
                    />
                )}
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    trending: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    pageTitle: {
        textTransform: "uppercase",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Montserrat",
        fontSize: "4vw",
        padding: theme.spacing(1),
        borderRadius: "50px",
        color: "#fff"
    }
}))

export default Trending;
