import Header from './components/Header';
import { makeStyles } from '@material-ui/core';
import SimpleBottomNavigation from './components/MainNav';

function App() {
  const classes = useStyle();

  return (
    <div>
      <Header />
      <div className={classes.App}>
      dvdzsfgzdgd
      </div>
      <SimpleBottomNavigation />
    </div>
  );
}

const useStyle = makeStyles(theme => ({
  App: {
    minHeight: "100vh",
    backgroundColor: "#39445a",
    color: "white",
    paddingTop: "130px",
    paddingBottom: "70px",
    [theme.breakpoints.down('sm')]: {
      paddingTop: "100px"
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: "180px"
    },
    [theme.breakpoints.between('sm', "md")]: {
      paddingTop: "120px"
    }
  }
}))

export default App;
