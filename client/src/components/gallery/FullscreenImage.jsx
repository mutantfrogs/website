import React, { useState, useEffect, useRef } from 'react';
import galleryData from '../../assets/data/gallery.json';
import leftArrow from '../../assets/images/leftArrow.webp'
import rightArrow from '../../assets/images/rightArrow.webp'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function FullscreenImage({ src, onClose }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const imageRef = useRef(null);

  const fileName = currentSrc.replace(/^.*[\\/]/, '');

  const closeFullscreenByClick = () => {
    
  }

  const nextImage = (event, resetTransform) => {
    event.stopPropagation();
    const currentIndex = galleryData.findIndex(art => art.artURL === currentSrc);
    const newIndex = (currentIndex + 1) % galleryData.length;
    setCurrentSrc(galleryData[newIndex].artURL);
    resetTransform();
    setLoading(true);
  }

  const previousImage = (event, resetTransform) => {
    event.stopPropagation();
    const currentIndex = galleryData.findIndex(art => art.artURL === currentSrc);
    const newIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    setCurrentSrc(galleryData[newIndex].artURL);
    resetTransform();
    setLoading(true);
  }

  useEffect(() => {
    const updatePosition = () => {
      if (imageRef.current) {
        const { width, height } = imageRef.current;

        const newX = (window.innerWidth - width) / 2;
        const newY = (window.innerHeight - height) / 2;
        setInitialPosition({ x: newX, y: newY });
      }
    };
    updatePosition();
  }, [currentSrc]);

  return (
    <div className='fullscreenBackground' onClick={closeFullscreenByClick}>
      <div className='flexContainerRow' id="fullScreenContainer" style={{ height: '100%' }}>
        <div className='window' style={{ minHeight: '150px' }}>
          <div className="title-bar">
            <div className="title-bar-text">🌎 {fileName} - Windows Picture Viewer</div>
            <div className="title-bar-controls">
              <button aria-label="Close" onClick={onClose}></button>
            </div>
          </div>

          <div className='flexContainerColumn'>
          {loading && (<progress style={{
                  position: 'absolute',
                  top: '50%',
                  zIndex: 100,
                  left: '50%',
                  transform: 'translate(-50%, -50%)', // Center the progress bar
                }} ></progress>)}
            <TransformWrapper initialScale={1} initialPositionX={initialPosition.x} initialPositionY={initialPosition.y} doubleClick={{ mode: "reset" }}>
              {({ resetTransform }) => (
                <>
                  <TransformComponent>
                    <img 
                      ref={imageRef}
                      className="fullscreenImage" 
                      src={currentSrc} 
                      alt="gallery" 
                      onLoad={() => {
                        setLoading(false);
                        resetTransform;
                      }}
                    />
                  </TransformComponent>
                  <div className='flexContainerRow'>
                      <img onClick={(e) => previousImage(e, resetTransform)} className='galleryArrows' style={{left: '20px'}} src={leftArrow}></img>
                      <img onClick={(e) => nextImage(e, resetTransform)} className='galleryArrows' style={{right: '20px'}} src={rightArrow}></img>
                  </div>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
