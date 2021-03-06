import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if(value === 0) history.push("/");
    else if (value === 1) history.push("/movies");
    else if (value === 2) history.push("/series");
    else if (value === 3) history.push("/search");
  }, [value, history])


  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={classes.icons} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction className={classes.icons} label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction className={classes.icons} label="TV Series" icon={<TvIcon />} />
      <BottomNavigationAction className={classes.icons} label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}

const useStyles = makeStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: "0",
      backgroundColor: "#222938",
      zIndex: "100"
    },
    icons: {
        color: "#fff"
    }
  });