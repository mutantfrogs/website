import React, { useState } from 'react';
import galleryData from '../../assets/galleryData.json'
import FullscreenImage from './FullscreenImage';
import goodnightGif from '../../assets/goodnight.gif';

export default function GalleryWindow() {

  const [selectedTab, setSelectedTab] = useState('art');
  const [imageSrc, setimageSrc] = useState(null);

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  const handleImageCLick = (src) => {
    setimageSrc(src);
  };

  const handleCloseFullscreen = () => {
    setimageSrc(null);
  };

  const populateArt = (year) => {
    return galleryData.filter(item => item.year === year).map(item => (
      <button key={item.id} className="galleryImage" onClick={() => handleImageCLick(item.artURL)}>
        <img src={item.thumbURL}></img>
      </button>
    ));
  }

  return (
    <div className='window windowMargin newWindow'>
        <div className="title-bar">
          <div className="title-bar-text">📁 file explorer</div>
        </div>
        <div className='flexContainerRow'>
          <section className="tabs" id='gallerySection'>
        <menu role="tablist" aria-label="Sample Tabs">
          <button
            role="tab"
            aria-selected={selectedTab === 'art'}
            aria-controls="art"
            onClick={() => handleTabClick('art')}
          >
            drawings
          </button>
          <button
            role="tab"
            aria-selected={selectedTab === 'more'}
            aria-controls="more"
            onClick={() => handleTabClick('more')}
          >
            more coming soon!
          </button>
        </menu>

            <article role="tabpanel" hidden={selectedTab !== 'art'}>
              <h2 className='tabHeader'>2025</h2>
              <hr/>
              <div id="2025" className='flexContainerRow galleryYear'>
              {populateArt(2025)}
              </div>
              <h2 className='tabHeader'>2024</h2>
              <hr/>
              <div id="2024" className='flexContainerRow galleryYear'>
              {populateArt(2024)}
              </div>
              <h2 className='tabHeader'>2023</h2>
              <hr/>
              <div id="2023" className='flexContainerRow galleryYear'>
                  {populateArt(2023)}
              </div>
              <h2 className='tabHeader'>2022</h2>
              <hr/>
              <div id="2022" className='flexContainerRow galleryYear'>
                  {populateArt(2022)}
              </div>
              <h2 className='tabHeader'>2021</h2>
              <hr/>
              <div id="2021" className='flexContainerRow galleryYear'>
                  {populateArt(2021)}
              </div>
              <h2 className='tabHeader'>2020 (and older)</h2>
              <hr/>
              <div id="2020" className='flexContainerRow galleryYear'>
                  {populateArt(2020)}
              </div>
            </article>

            <article role="tabpanel" hidden={selectedTab !== 'more'}>
              <div className='flexContainerRow'>
                <img src={goodnightGif} className='centeredText'></img>
              </div>
            </article>
          </section>
        </div>
        {imageSrc && (<FullscreenImage src={imageSrc} onClose={handleCloseFullscreen}/>)}
    </div>
  );
}