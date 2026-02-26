import {useState, useEffect} from 'react';
import splashlist from '../assets/splashtext.json'

export default function Splashtext() {

  const [splashtext, setSplashtext] = useState(null);
  const [fontsize, setFontsize] = useState(null);

  useEffect(() => {
    let index = Math.floor(Math.random() * splashlist.length)
    let text = splashlist[index].value
    let size = Math.max(16,(40 - text.length * 0.6))
    setSplashtext(text)
    setFontsize(size)
  }, [])

  return (
    <h4 className='splashtext' style={{fontSize: fontsize}}>
        {splashtext}
    </h4>
  )
}
