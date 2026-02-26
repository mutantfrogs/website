import {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Splashtext from './Splashtext.jsx';

export default function Header() {

  const location = useLocation();
  const [mystery, setMystery] = useState(false);

  const getBannerText = () => {
    switch (location.pathname) {
      case '/':
        return "about";
      case '/explore':
        return "explore";
      case '/blog':
        return "blog";
      case '/notes/view':
        return "notes";
      case '/notes/create':
        return "notes";
      default:
        return "404";
    }
  };

  const mysteryClick = () => {
    setMystery(!mystery);
    if (!mystery)
      document.querySelector('html').style.filter = 'invert(100%)';
    else
      document.querySelector('html').style.filter = '';
  };

  return (
    <div className='flexContainerRow' style={{  marginTop: '15px' }}>
      <div className='window' style={{ position: 'relative', width: 650 }}>
        <Splashtext/>
        <div className="title-bar">
          <div className="title-bar-text">🐸 welcome to my website!</div>
            <div className="title-bar-controls">
              <button aria-label="Help" onClick={mysteryClick}></button>
              <button aria-label="Close"></button>
            </div>
        </div>

        <div>
          <h1 className='headerText'>{getBannerText()}</h1>
            <div className='flexContainerRow'>
              <Link to="/">
                <button className='headerNavigationBtn'>about</button>
                </Link>
              <Link to="/explore">
                <button className='headerNavigationBtn'>explore</button>
                </Link>
              <Link to="/notes/view">
                <button className='headerNavigationBtn'>notes</button>
                </Link>
            </div>
        </div>

        <div className="status-bar">
          <p style={{textAlign: 'center'}} className="status-bar-field"><marquee>welcome to my website and please enjoy your stay!</marquee></p>
        </div>

      </div>
    </div>
  )
}
