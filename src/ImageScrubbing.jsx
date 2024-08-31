// import React, { useState, useEffect, useRef } from 'react';

// const ImageScrubbing = () => {
//   const [imageIndex, setImageIndex] = useState(1);
//   const totalImages = 99;
//   const [isInView, setIsInView] = useState(false);
//   const triggerRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsInView(entry.isIntersecting);
//       },
//       { threshold: 0.1 } // Adjust based on your layout
//     );

//     if (triggerRef.current) {
//       observer.observe(triggerRef.current);
//     }

//     return () => {
//       if (triggerRef.current) {
//         observer.unobserve(triggerRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!isInView) return;

//     const handleScroll = () => {
//       if (!triggerRef.current) return;

//       const scrollTop = window.scrollY;
//       const triggerTop = triggerRef.current.getBoundingClientRect().top + window.scrollY;
//       const triggerHeight = triggerRef.current.offsetHeight;
//       const maxScroll = triggerHeight - window.innerHeight; // Adjusted to use visible part
//       const scrollWithinTrigger = Math.max(0, scrollTop - triggerTop);
//       const scrollFraction = scrollWithinTrigger / maxScroll;
//       const newIndex = Math.min(
//         totalImages,
//         Math.floor(scrollFraction * totalImages) + 1
//       );

//       setImageIndex(newIndex);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [isInView, totalImages]);
  
//   const currentImage = `/scrollimg/${imageIndex}.webp`;

//   return (
//     <>
//       <div ref={triggerRef} style={{ height: '300vh', position: 'relative' }}>
//         <img
//          className=' sticky top-0 w-full h-fit object-cover'
//           src={currentImage}
//           alt={`Scene ${imageIndex}`}
//         />
//       </div>
//     </>
//   );
// };

// export default ImageScrubbing;


import React, { useState, useEffect, useRef } from 'react';

const ImageScrubbing = () => {
  const [imageIndex, setImageIndex] = useState(1);
  const totalImages = 99;
  const [isInView, setIsInView] = useState(false);
  const triggerRef = useRef(null);

  // Preload images function
  const preloadImages = (totalImages) => {
    for (let i = 1; i <= totalImages; i++) {
      const img = new Image();
      img.src = `/scrollimg/${i}.webp`; // Ensure that the path matches your image directory
    }
  };

  // Preload images when the component mounts
  useEffect(() => {
    preloadImages(totalImages);
  }, [totalImages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust based on your layout
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const handleScroll = () => {
      if (!triggerRef.current) return;

      const scrollTop = window.scrollY;
      const triggerTop = triggerRef.current.getBoundingClientRect().top + window.scrollY;
      const triggerHeight = triggerRef.current.offsetHeight;
      const maxScroll = triggerHeight - window.innerHeight; // Adjusted to use visible part
      const scrollWithinTrigger = Math.max(0, scrollTop - triggerTop);
      const scrollFraction = scrollWithinTrigger / maxScroll;
      const newIndex = Math.min(
        totalImages,
        Math.floor(scrollFraction * totalImages) + 1
      );

      setImageIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInView, totalImages]);
  
  const currentImage = `/scrollimg/${imageIndex}.webp`;

  return (
    <>
      <div ref={triggerRef} style={{ height: '300vh', position: 'relative' }}>
        <img
         className='sticky top-0 w-full h-fit object-cover'
          src={currentImage}
          alt={`Scene ${imageIndex}`}
        />
      </div>
    </>
  );
};

export default ImageScrubbing;
