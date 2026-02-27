import {useState, useEffect} from 'react';
import splashlist from '../assets/splashtext.json'

export default function Splashtext() {

  const [splashtext, setSplashtext] = useState(null);
  const [fontsize, setFontsize] = useState(null);

  useEffect(() => {
    let now = new Date(Date.now())
    let month = now.getMonth() + 1
    let day = now.getDate()

    let filteredSplashlist
    filteredSplashlist = splashlist.filter(s => s.month == month && s.day == day)
    if(filteredSplashlist.length == 0){
      filteredSplashlist = splashlist.filter(s => s.month == month && s.day == undefined)
      if(filteredSplashlist.length == 0){
        filteredSplashlist = splashlist.filter(s => s.month == undefined && s.day == undefined)
      }
    }
    
    let index = Math.floor(Math.random() * filteredSplashlist.length)
    let text = filteredSplashlist[index].value
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
