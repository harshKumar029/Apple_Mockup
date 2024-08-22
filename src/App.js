import logo from './Assets/img/applelogo.svg';
import heroiphone1 from './Assets/img/heroiphone1.svg';
import IphoneFrame from './Assets/img/IphoneFrame.svg';
import onMic from './Assets/img/onMic.svg';
import ofMic from './Assets/img/ofMic.svg';
import assistant from './Assets/img/assistant.svg';
import sirivideo from './Assets/video/Sequence2.mp4';
import HeroAds from './Assets/video/herovideo.mp4';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Spline from '@splinetool/react-spline';

function App() {

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const [isMuted, setIsMuted] = useState(true);
  const [scale, setScale] = useState(1.5);
  const [translateY, setTranslateY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [showNextSection, setShowNextSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (inView) {
        const scrollPosition = window.scrollY;

        // Scale down the video
        const newScale = Math.max(0.2, 1.5 - scrollPosition / 550);
        setScale(newScale);

        // Move the video downward
        // const newTranslateY = Math.min(1500, scrollPosition / .7);
        // setTranslateY(newTranslateY);

        const divisor = 1.3 - (scrollPosition / 850) * (1.5 - 0.7);

        // Move the video downward
        const newTranslateY = Math.min(1200, scrollPosition / divisor);
        setTranslateY(newTranslateY);

        // Fade out the h1 elements
        const newOpacity = Math.max(0, 1 - scrollPosition / 200);
        setOpacity(newOpacity);

        // Check if the video has fully zoomed out
        if (newScale <= 0.2 && newOpacity === 0) {
          setShowNextSection(true);
        } else {
          setShowNextSection(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inView]);

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: false,
      easing: 'ease-in-out',
    });
  }, []);


  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    // Update the date and time every second
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format the date as "Monday, June, 5"
  const formattedDate = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Format the time as "9:41"
  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format
  }).replace(/AM|PM/, '');

  return (
    <div>
      {/* #0A0A0A */}
      <nav className='bg-[#151515] w-[100%] z-[100] fixed top-0 opacity-[72%] flex items-center justify-around p-4'>
        <img className='h-5' src={logo} alt='logo' />
        <div className='flex items-center space-x-8'>
          <ul className='flex space-x-14 text-[14px] text-white'>
            <li className='hover:text-gray-400 '>Mac</li>
            <li className='hover:text-gray-400 cursor-pointer'>iPad</li>
            <li className='hover:text-gray-400 cursor-pointer'>iPhone</li>
            <li className='hover:text-gray-400 cursor-pointer'>Watch</li>
            <li className='hover:text-gray-400 cursor-pointer'>TV</li>
            <li className='hover:text-gray-400 cursor-pointer'>Support</li>
          </ul>
          <button className='bg-[#202BA3] text-[14px] text-white px-4 rounded-full hover:bg-[#1A238C]'>
            Buy
          </button>
        </div>
      </nav>
      {/* hero section */}
      {/* <div className=' max-w-[90%] m-auto'>
        <div className='grid grid-cols-3 h-[90vh] items-center justify-items-center '>
          <h1 className=' text-[7rem] text-white font-bold opacity-50'>Hey</h1>
          <video
          className='w-[150%] max-w-[200%]'
            src={sirivideo}
            autoPlay
            loop
            muted
          />
          <h1 className=' w-60 text-[7rem] text-white font-bold opacity-50'>Siri</h1>
        </div>
      </div> */}
      <div className="h-[200vh] flex flex-col ">
        {/* Sticky Section */}
        <div className="h-screen sticky top-0 flex items-center justify-center">
          <div ref={ref} className="max-w-[90%] m-auto grid grid-cols-3 h-[90vh] items-center justify-items-center">
            <h1
              className="text-[7rem] text-white font-bold"
              style={{ opacity, transition: 'opacity 0.2s ease-out' }}
            >
              Hey
            </h1>

            <div
              className="overflow-hidden z-[-1]"
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transition: 'transform 0.2s ease-out',
                textAlign: '-webkit-center',
              }}
            >
              <video
                className="w-[65%] "
                src={sirivideo}
                autoPlay
                loop
                muted
              />
            </div>

            <h1
              className="w-60 text-[7rem] text-white font-bold"
              style={{ opacity, transition: 'opacity 0.2s ease-out' }}
            >
              Siri
            </h1>
          </div>
        </div>

        {/* Next Section */}
        <div
          className={`max-w-[90%] h-[100vh] relative z-[-1] m-auto grid grid-cols-3 items-center justify-items-center transition-opacity duration-1000 
            ${showNextSection ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className='h-[100vh]`'>
            <h1 className="text-[8.5rem] mt-[-50px] text-[#7B756A] relative right-[-3.75rem]">
              IPhone
            </h1>
          </div>
          <div
            className="text-center relative"
            style={{
              textAlign: '-webkit-center',
            }}
          >
            <img className="w-[80%]" src={heroiphone1} alt="iPhone" />
            <div className="absolute top-7 left-20 transform -translate-x-1/2 -translate-y-1/2 text-white">
              <p className="text-[0.688rem] font-bold mt-2">{formattedTime}</p>
            </div>
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
              <p className=" text-sm font-semibold">{formattedDate}</p>
              <p className="text-6xl font-bold mt-2">{formattedTime}</p>
            </div>
          </div>

          <div className="text-[#7B756A] h-[100vh] flex flex-col justify-around text-right ">
            <p className="text-[0.813rem] mb- ">Allow Mic to talk to Assistant</p>
            <div>
              <h1 className="text-[8.5rem] relative left-[-3.75rem]">15 Pro</h1>
              <h5 className="text-3xl relative left-[-4rem]">Titanium Edition</h5>
            </div>
            <div className=' flex gap-2 items-center justify-end'>
              <p className='text-[0.813rem]'>Tap to Talk</p>
              <img className=' w-5' src={assistant} alt='assistant' />
            </div>
          </div>
          <Spline className=' absolute z-[-10]' scene="https://prod.spline.design/S-uBrxHx0iAVU6q2/scene.splinecode" />

        </div>

      </div>
      {/* <div className=' py-52 text-center relative'
      style={{textAlign:'-webkit-center'}}
      >
        <img src={IphoneFrame} alt='IphoneFrame' />
        <video
          className="w-[65%]  "
          src={HeroAds}
          autoPlay
          loop
          muted
        />
      </div> */}
      <div className="relative py-52" style={{ textAlign: '-webkit-center' }}
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        <img
          className=' z-[1]'
          src={IphoneFrame}
          alt="IphoneFrame"
          style={{ position: 'relative' }}
        />
        <video
          className="absolute top-1/2 left-1/2"
          style={{
            width: '1100px',
            height: '500px',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
          }}
          src={HeroAds}
          autoPlay
          loop
          muted={isMuted}
        />{
          isMuted ? (<button className="absolute bottom-64  z-[2] right-[15rem] " onClick={() => setIsMuted(false)}><img src={ofMic} alt='ofMic' /></button>)
            : (<button className="absolute bottom-64 z-[2] right-[15rem] " onClick={() => setIsMuted(true)}><img src={onMic} alt='onMic' /></button>)
        }
      </div>


    </div>
  );
}

export default App;