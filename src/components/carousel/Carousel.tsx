import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import styles from "./Carousel.module.css";

const Carousel: React.FC = () => {
  const data = [
    {
      image: "/src/assets/images/slide-1.png"
    },
    {
      image: "/src/assets/images/slide-2.png"
    },
    {
      image: "/src/assets/images/slide-3.png"
    }
  ]

  const itemComponent = data.map((element) => {
    return <img src={element.image} />;
  });

  const renderDotsItem = ({ isActive }: {isActive: boolean;}) => {
    return (isActive 
      ? <div className={`${styles.indicator} ${styles.indicatorSelected}`}/> 
      : <div className={`${styles.indicator}`}/> );
  };

  return (
    <div className={styles.carouselContainer}>
      <AliceCarousel
        autoHeight
        autoPlay
        autoPlayInterval={3000}  
        infinite
        mouseTracking
        disableButtonsControls
        renderDotsItem={renderDotsItem}
        items={itemComponent}
      />
    </div>
  );
};

export default Carousel;