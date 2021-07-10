import React, { useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { img_500, unavailable, unavailableLandscape } from "../config/config";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { Button } from '@material-ui/core';
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from './Carousel';

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_MOVIES_KEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MOVIES_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div type="button" className={classes.media} onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
                <div className={classes.contentModal}>
                    <img 
                    className={classes.content_portrait}
                    src={
                        content.poster_path ? `${img_500}/${content.poster_path}` : unavailable
                    }
                    alt={content.name || content.title} 
                    />

                    <img 
                    className={classes.content_landscape}
                    src={
                        content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape
                    }
                    alt={content.name || content.title} 
                    />

                    <div className={classes.content_about}>
                        <span className={classes.content_title}>
                            { content.name || content.title } 
                            (
                                {(
                                    content.first_air_date || content.release_date || "-----"
                                ).substring(0, 4)}
                            )
                        </span>

                        {content.tagline && (
                            <i className={classes.tagline}>{content.tagline}</i>
                        )}
        
                        <span className={classes.content_description}>
                            {content.overview}
                        </span>

                        <div>
                            <Carousel media_type={media_type} id={id} />
                        </div>

                        <Button
                        variant="contained"
                        startIcon={<YouTubeIcon />}
                        color="secondary"
                        target="__blank"
                        href={`https://www.youtube.com/watch?v=${video}`}
                        >
                            Watch the Trailer
                        </Button>
                    </div>
                </div>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentModal: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
        [theme.breakpoints.up('md')]: {
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "10px 0"
        },
        "&::-webkit-scrollbar": {
            display: "none"
        }
    },
    paper: {
      width:  "90%",
      height: "80%",
      backgroundColor: "#39445a",
      border: "1px solid #282c34",
      borderRadius: "10",
      color: "#fff",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 3)
    },
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
        }
        
    },
    content_landscape: {
        objectFit: "contain",
        borderRadius: "10px",
        [theme.breakpoints.up('md')]: {
            display: "none"
        }
    },
    content_portrait: {
        display: "none",
        objectFit: "contain",
        borderRadius: "10px",
        [theme.breakpoints.up('md')]: {
            display: "flex",
            width: "38%"
        }
    },
    tagline: {
        paddingBottom: "10px",
        alignSelf: "center",
    },
    content_about: {
        padding: "10px",
        width: "95%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Roboto",
        justifyContent: "space-evenly",
        fontWeight: "300",
        [theme.breakpoints.up('md')]: {
            width: "58%",
            padding: "0",
            height: "100%"
        }
    },
    content_title: {
        height: "12%",
        fontSize: "5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.up('md')]: {
            fontSize: "3.5vw"
        }
    },
    content_description: {
        display: "flex",
        height: "40%",
        overflowY: "scroll",
        padding: "15px",
        borderRadius: "20px",
        scrollbarWidth: "thin",
        boxShadow: "inset 0 0 5px #000000",
        textAlign: "justify",
        [theme.breakpoints.up('md')]: {
            fontSize: "22px"
        },
        "&::-webkit-scrollbar": {
            display: "none"
        }

    }
    
  }));