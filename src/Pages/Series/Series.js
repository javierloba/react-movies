import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomPagination from '../../components/CustomPagination';
import Genres from '../../components/Genres';
import SingleContent from '../../components/SingleContent';
import useGenres from '../../hooks/useGenre';

const Series = () => {
    const classes = useStyle();

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres)

    const fetchMovies = async() => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIES_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        )
        console.log(data)
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page, genreforURL])

    return (
        <div>
            <Typography className={classes.pageTitle}>Series</Typography>
            <Genres 
            type = "tv"
            selectedGenres = {selectedGenres}
            setSelectedGenres = {setSelectedGenres}
            genres = {genres}
            setGenres = {setGenres}
            setPage = {setPage}
            />
            <div className={classes.series}>
                { content && content.map((c) => 
                    <SingleContent 
                    key = {c.id} 
                    id = {c.id} 
                    poster = {c.poster_path} 
                    title = {c.title || c.name} 
                    date = {c.first_air_date || c.release_date}
                    media_type = "tv"
                    vote_average = {c.vote_average}
                    />
                )}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
            )}
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
        padding: theme.spacing(1),
        borderRadius: "50px",
        color: "#fff"
    },
    series: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    }
}))

export default Series;
