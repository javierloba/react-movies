import Header from './components/Header';
import { makeStyles, Container } from '@material-ui/core';
import SimpleBottomNavigation from './components/MainNav';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';

function App() {
  const classes = useStyle();

  return (
    <BrowserRouter>
      <Header />
      <div className={classes.App}>
        <Container>
          <Switch>
            <Route exact path='/' component={Trending} />
            <Route path='/movies' component={Movies} />
            <Route path='/series' component={Series} />
            <Route path='/search' component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

const useStyle = makeStyles(theme => ({
  App: {
    minHeight: "100vh",
    backgroundColor: "#39445a",
    color: "#fff",
    paddingTop: "130px",
    paddingBottom: "70px",
    [theme.breakpoints.down('sm')]: {
      paddingTop: "100px"
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: "140px"
    },
    [theme.breakpoints.between('sm', "md")]: {
      paddingTop: "120px"
    }
  }
}))

export default App;
