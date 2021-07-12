import { useState, useEffect } from 'react';
import { Button, createTheme, makeStyles, Tabs, Tab, TextField, ThemeProvider, Typography } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search"
import axios from 'axios';
import CustomPagination from '../../components/CustomPagination';
import SingleContent from '../../components/SingleContent';

const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
          main: "#fff"
      }
    }
  });

const Search = () => {
    const classes = useStyle();

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();

    const fetchSearch = async() => {
        const { data } =await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
                process.env.REACT_APP_MOVIES_KEY
              }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
        )
    
        setContent(data.results);
        setNumOfPages(data.total_pages)
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return (
        <div>
            <Typography className={classes.pageTitle}>Search</Typography>
            <ThemeProvider theme={darkTheme}>
                <div className={classes.searchContainer}>
                    <TextField
                    className={classes.searchBox}
                    label="Search"
                    variant="filled"
                    onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button 
                    className={classes.searchButton} 
                    variant="contained"
                    onClick={fetchSearch}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <Tabs
                className={classes.tabs}
                value={type} 
                indicatorColor="primary" 
                textColor="primary"
                onChange={(event, newValue) => {
                    setType(newValue);
                    setPage(1);
                }}
                >
                <Tab className={classes.tab} label="Search Movies" />
                <Tab className={classes.tab} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
            <div className={classes.search}>
                { content && content.map((c) => (
                    <SingleContent 
                    key = {c.id} 
                    id = {c.id} 
                    poster = {c.poster_path} 
                    title = {c.title || c.name} 
                    date = {c.first_air_date || c.release_date}
                    media_type = {type ? "tv" : "movie"}
                    vote_average = {c.vote_average}
                    />
                ))}
                {searchText && !content && 
                    (type ? <h2>No series found</h2> : <h2>No movies found</h2>)}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
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
    search: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    searchBox: {
        flex: "1"
    },
    searchButton: {
        marginLeft: theme.spacing(2)
    },
    searchContainer: {
        display: "flex",
        margin: theme.spacing(2, 0)
    },
    tabs: {
        paddingBottom: theme.spacing(1)
    },
    tab: {
        width: "50%"
    }
}))

export default Search;
