import React, { useState, useEffect, useRef } from 'react';
import logo from './Assets/img/applelogo.svg';
import heroiphone1 from './Assets/img/heroiphone1.svg';
import IphoneFrame from './Assets/img/IphoneFrame.svg';
import Datatransfer from './Assets/img/Datatransfer.svg';
import iphoneblackfm from './Assets/img/iphoneframeblackbg.svg';
import sutter from './Assets/img/sutter.svg';
import A17pro from './Assets/img/A17pro.svg';
import play from './Assets/img/play.svg';
import onMic from './Assets/img/onMic.svg';
import ofMic from './Assets/img/ofMic.svg';
import assistant from './Assets/img/assistant.svg';
import sirivideo from './Assets/video/Sequence2.mp4';
import quickbuttonad from './Assets/video/button_feature_ad.mp4';
import videoscrollad from './Assets/video/scrollingvideo_ad1.mp4';
import cameraAd from './Assets/video/cameraAd.mp4';
import iphonevarient from './Assets/video/iphone_color.mp4';
import HeroAds from './Assets/video/herovideo.mp4';
import './App.css';
import { useInView } from 'react-intersection-observer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Spline from '@splinetool/react-spline';
import ImageScrubbing from './ImageScrubbing';

function App() {

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const [isMuted, setIsMuted] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);
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
        const divisor = 1.3 - (scrollPosition / 850) * (1.5 - 0.7);
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
        // setIsMuted(false);
      }
      // else{
      //   setIsMuted(true);
      // }
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

  const scrollerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -1200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 1200, behavior: 'smooth' });
    }
  };

  const videoRef = useRef(null);
  const imageRef = useRef(null);
  const [zoomedIn, setZoomedIn] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const image = imageRef.current;
      const video = videoRef.current;
      const rect = video.getBoundingClientRect();

      const startZoomOffset = window.innerHeight * 0.3;
      const offset = window.innerHeight / 2 - rect.top;

      if (offset > startZoomOffset && !zoomedIn) {
        const scale = Math.min(1 + (offset - startZoomOffset) / (window.innerHeight * 0.1), 6);
        image.style.transform = `scale(${scale})`;
        if (scale >= 6) {
          setZoomedIn(true);
        }
      } else if (offset <= startZoomOffset) {
        setZoomedIn(false);
        image.style.transform = 'scale(1)';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [zoomedIn]);



  return (
    <div>

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
                src='https://www.w3schools.com/html/mov_bbb.mp4'
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

      <div className=' py-52'>
        <div className='w-[68%] mb-[3rem] m-auto'>
          <div className='flex items-center justify-between '>
            <h1 className='font-bold text-5xl text-[#8F8F8F]' >Get the highlights.</h1>
            <p className='flex gap-3 text-[17px] font-light text-[#247BCE]'>Experience Cinematic Film.<img className=' w-5' src={play} alt='play' /></p>
          </div>
        </div>
        <div className="relative flex items-center justify-center w-full mx-auto">
          <button
            className="absolute left-0 h-[70vh] w-[6.5vw] z-10 p-2  "
            onClick={scrollLeft}
          >

          </button>
          <div
            className="flex space-x-36 overflow-x-auto scrollbar-hide"
            ref={scrollerRef}
          >
            <div className="flex-none relative w-[1050px] ml-56 h-auto rounded-[32px] border border-white border-opacity-30 overflow-hidden shadow-lg">
              <h2 className="absolute top-6 font-bold text-2xl z-[2] left-[1.6rem] text-white ">A17 Pro: Power Redefined.</h2>
              <img className="w-full h-auto" a src={A17pro} alt='A17pro' />
            </div>
            <div className="flex-none relative w-[1050px] h-auto  rounded-[32px] border border-white border-opacity-30 overflow-hidden shadow-lg">
              <h2 className="absolute top-6 font-bold text-2xl z-[2] left-[1.6rem] text-white ">Discover the Spectrum of Elegance.</h2>
              <video src={iphonevarient} autoPlay loop muted className="w-full rounded-[32px] h-auto" />
            </div>
            <div className="flex-none relative w-[1050px] mr-56 h-auto  rounded-[32px] border border-white border-opacity-30 overflow-hidden shadow-lg"
              style={{ marginRight: '224px' }}
            >
              <h2 className="absolute top-6 font-bold text-2xl z-[2] left-[1.6rem] text-white ">All-new Action button.<br />What will yours do?</h2>
              <video src={quickbuttonad} autoPlay loop muted className="w-full rounded-[32px] h-auto" />
            </div>
          </div>
          <button
            className="absolute right-0 h-[70vh] w-[6.5vw] z-10 p-2"
            onClick={scrollRight}
          >

          </button>
        </div>
      </div>

      <div>
        <div className='w-[68%] mb-[0.5rem] m-auto'>
          <h1 className='font-bold text-5xl text-[#8F8F8F]' >Take Closer Look</h1>
        </div>
        <div>
          <Spline
            scene="https://prod.spline.design/xkzM4Z1DgihWp4oK/scene.splinecode"
          />
        </div>

      </div>


      <div className=' flex justify-between w-[90%] items-center'>
        <img className=' w-[40rem]' src={Datatransfer} alt='transfer' />
        <div className=' mt-[-130px]'>
          <h4 className=' text-[#8F8F8F] font-bold text-3xl'>Upto 10mbps</h4>
          <h1 className=' font-bold text-5xl mt-2 text-white'>seamless Data Transfer</h1>
          <div className=' flex gap-24 mt-6'>
            <div className=' space-y-5'>
              <p className=' text-[#86868B] text-base'>
                iPhone 15 Pro is the first iPhone to<br />
                support USB 3,4 for a <span className=' text-white'> huge leap in<br />
                  data transfer speeds </span> and faster<br />
                pro workflows than ever before.</p>
              <p className=' text-[#86868B] font-semibold text-base'>The new USB‑C connector lets<br />
                you<span className=' text-white text-base'> charge your Mac or iPad with<br />
                  the same cable you use to charge<br />
                  iPhone 15 Pro.</span> Bye‑bye,<br />
                cable clutter.</p>
            </div>
            <div className=' space-y-5'>
              <p className=' text-[#86868B] font-semibold text-base' >Up to<br />
                <span className=' text-white font font-semibold text-4xl'>
                  20x faster<br />
                </span>
                file transfers</p>
              <p className=' text-[#86868B] font-semibold text-base'>
                And with all‑new Wi‑Fi 6E you'll<br />
                get<span className=' text-white'> two times faster wireless<br />
                  speeds.</span> So you can upload,<br />
                download, and transfer files<br />
                in a flash.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='flex relative justify-between items-center'>
        <div className="absolute z-[1] w-full h-full flex justify-center bg-[#00000052] items-center">
          <img
            className='z-[1]'
            src={iphoneblackfm}
            alt="IphoneFrame"
            style={{
              transform: 'rotate(0deg) scale(1)',
              transition: 'transform 0.5s ease-out',
            }}
          />
        </div>
        <video
          className="h-screen top-0 w-full"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.5s ease-out', // Smooth transition for video movement
          }}
          src={videoscrollad}
          autoPlay
          loop
          muted={isMuted}
        />
      </div> */}

      {/* <div className='relative flex justify-center items-center h-[300vh] overflow-hidden'> */}

      <div className="h-screen my-52 relative overflow-hidden">
        <div className="sticky top-0 h-screen w-full">
          <div className="relative h-screen w-full overflow-hidden">
            <video
              ref={videoRef}
              className="absolute top-0 h-full w-full object-cover"
              src={videoscrollad}
              autoPlay
              loop
              muted
            />
            <div className="absolute flex justify-center items-center w-full h-full">
              <img
                ref={imageRef}
                className="z-[1]"
                src={iphoneblackfm}
                alt="IphoneFrame"
                style={{
                  transform: 'scale(1)',
                  transition: 'transform 0.5s ease-out',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div >
        <div className='w-[68%] m-auto'>
          <h1 className=' flex gap-4 items-center font-bold text-5xl text-[#fff]'><img src={sutter} alt='camera' />Camera that capture everything</h1>
          <p className=' w-[57rem] text-[#8F8F8F] font-bold text-3xl'>From dramatic framing flexibility to next-generation portraits, see what you can do with our most powerful iPhone camera system.</p>
        </div>

        <div className="relative mt-24" style={{ textAlign: '-webkit-center' }}
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
            className="absolute top-1/2 left-1/2 rounded-xl"
            style={{
              width: '1100px',
              height: '500px',
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover',
            }}
            src={cameraAd}
            autoPlay
            loop
            muted={isMuted2}
          />{
            isMuted2 ? (<button className="absolute bottom-16  z-[2] right-[15rem] " onClick={() => setIsMuted2(false)}><img src={ofMic} alt='ofMic' /></button>)
              : (<button className="absolute bottom-16 z-[2] right-[15rem] " onClick={() => setIsMuted2(true)}><img src={onMic} alt='onMic' /></button>)
          }
        </div>
      </div>

      <div className=' mt-[13rem]'>
        <h1 className=' w-[68%] m-auto flex gap-4 items-center font-bold text-5xl text-[#8F8F8F]'>Parallax Scrolling : Scroll and See iPhone’s True Depth</h1>
        <div>
          <ImageScrubbing />
        </div>
      </div>



    </div>
  );
}

export default App;

