import Pagination from '@material-ui/lab/Pagination';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';

const darkTheme = createTheme({
    palette: {
      type: "dark",
    }
  });

const CustomPagination = ({ setPage, numOfPages = 10 }) => {

    const classes = useStyle();

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    };

    return (
        <div className={classes.pagination}>
            <ThemeProvider theme={darkTheme}>
                <Pagination 
                count={numOfPages} 
                onChange={(e) => handlePageChange(e.target.textContent)} 
                hideNextButton
                hidePrevButton
                color="primary"
                />
            </ThemeProvider>
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    pagination: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(2)
    }
}))

export default CustomPagination;
