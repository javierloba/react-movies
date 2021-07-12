import { Chip, makeStyles } from '@material-ui/core';
import axios from 'axios'
import { useEffect } from 'react'

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {
    const classes = useStyle();

    const handleAdd = genre => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIES_KEY}&language=en-US`
        )
        setGenres(data.genres)
    }

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({})
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.genres}>
            {selectedGenres.map(genre => (
                <Chip 
                className={classes.chips}
                label = {genre.name}
                key={genre.id}
                color="primary"
                clickable
                size="small"
                onDelete={() => handleRemove(genre)}
                />
            ))}
            {genres.map(genre => (
                <Chip 
                className={classes.chips}
                label={genre.name}
                key={genre.id}
                clickable
                size="small"
                onClick={() => handleAdd(genre)}
                />
            ))}
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    genres: {
        padding: theme.spacing(2, 0)
    },
    chips: {
        margin: theme.spacing(.4)
    }
}))

export default Genres;
