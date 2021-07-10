import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../config/config';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({media_type, id}) => {

    const classes = useStyles();
    const [credits, setCredits] = useState();


    const items = credits?.map(c => (
        <div className={classes.carouselItem}>
            <img 
            src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture} 
            alt={c.name} 
            onDragStart={handleDragStart} 
            className={classes.carouselItem_img} 
            />
            <b className={classes.carouselItem_txt}>{c.name}</b>
        </div>
    ));

    const responsive = {
        0: {
            items: 3
        },
        512: {
            items: 5
        },
        1024: {
            items: 7
        }
    }

    const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_MOVIES_KEY}&language=en-US`
        );
        setCredits(data.cast);
      };
    
      useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
      }, []);

    return (
        <AliceCarousel 
        autoPlay 
        responsive={responsive} 
        infinite 
        disableDotsControls 
        disableButtonsControls
        mouseTracking 
        items={items} />
    );
}

const useStyles = makeStyles((theme) => ({
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        objectFit: "contain",
        padding: "10px"
    },
    carouselItem_img: {
        borderRadius: "10px",
        marginBottom: "5px",
        boxShadow: "0px 0px 5px #000"
    }
    
  }));

export default Carousel;