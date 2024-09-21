import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Typography } from '@mui/material';

interface BannerProps {
    items: { 
      imgUrl: string; 
      path: string; 
      buttonText: string ;
      carouselText: string;
    }[]; 
  }

const Banner: React.FC<BannerProps> = ({items}) => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  
  
    const handlePrevSlide = () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? items.length - 1 : prevSlide - 1));
      }
    };
  
    const handleNextSlide = () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentSlide((prevSlide) => (prevSlide === items.length - 1 ? 0 : prevSlide + 1));
      }
    };
  
    const handleSelectSlide = (index: number) => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentSlide(index);
      }
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (!isTransitioning) {
          setIsTransitioning(true);
          setCurrentSlide((prevSlide) => (prevSlide === items.length - 1 ? 0 : prevSlide + 1));
        }
      }, 3000);
  
      return () => clearInterval(interval);
    }, [items.length, isTransitioning]);
  
  
    useEffect(() => {
      const transitionTimeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 500); 
  
      return () => clearTimeout(transitionTimeout);
    }, [currentSlide]);
  
  
    return (
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex transition-transform duration-500 delay-150" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {items.map(({ imgUrl, path }, index) => (
            <div key={index} className="min-w-full">
              <img
                src={imgUrl}
                alt={`Slide ${index}`}
                className="w-full h-[55vh] object-cover lg:h-[88vh]"
              />
            </div>
          ))}
        </div>
        
        <div className={`absolute top-1/2 transform -translate-y-1/2 left-0 z-20 ${isHovered ? 'opacity-100 transition-opacity duration-300 ' : 'opacity-0 transition-opacity duration-300'}`}>
          <button className="ml-5 bg-black bg-opacity-50 text-white p-2 md:p-6 rounded-full" onClick={handlePrevSlide}>
            <ArrowBackIosIcon />
          </button>
        </div>
        <div className={`absolute top-1/2 transform -translate-y-1/2 right-0 z-20 ${isHovered ? 'opacity-100 transition-opacity duration-300 ' : 'opacity-0 transition-opacity duration-300'}`}>
          <button className="mr-5 bg-black bg-opacity-50 text-white p-2 md:p-6 rounded-full" onClick={handleNextSlide}>
            <ArrowForwardIosIcon />
          </button>
        </div>
  
        <div id="imgContent" className={`absolute  px-2 w-[60%] sm:w-[45%] transition-transform duration-500 transform delay-150  ${isTransitioning ? 'translate-x-[-110%]' : 'top-[25%] md:left-20 lg:left-24 translate-x-0 '}`}>
            <Typography className=' text-white text-xl text-[24px] leading-[30px] md:text-[42px] md:leading-[50px] lg:text-[80px] lg:leading-[88px] mb-4  h-full'>{items[currentSlide]?.carouselText}</Typography>
            <Typography className='text-white tracking-wide text-sm md:text-lg mb-4 '>Check out our latest collection of Gym equipments and build your very own Gym.</Typography>
            <Button className=" bg-white text-black hover:bg-white hover:text-black border-black bg-opacity-80 py-2 px-3 md:px-6 rounded" onClick={() => navigate(items[currentSlide].path)}>
              {items[currentSlide]?.buttonText}
            </Button>
        </div>
  
  
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          {items.map((_, index) => (
            <button
              key={index}
              className={`mx-2 w-4 h-4 rounded-full bg-black ${index === currentSlide ? 'opacity-75 bg-blue-500' : 'opacity-50'}`}
              onClick={() => handleSelectSlide(index)}
            />
          ))}
        </div>
      </div>
    );
}

export default Banner

