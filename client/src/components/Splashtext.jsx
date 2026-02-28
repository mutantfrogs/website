import {useState, useEffect} from 'react';
import splashes from '../assets/splashtext.json'

export default function Splashtext() {
  const [currentSplash, setCurrentSplash] = useState(null);
  const [fontsize, setFontsize] = useState(null);

  //returns list of splashes available for the current date
  const filterSplashes = () => {
    let now = new Date(Date.now())
    let month = now.getMonth() + 1
    let day = now.getDate()

    //decrease granularity of filters
    const filters = [
      s => s.month === month && s.day === day,
      s => s.month === month && s.day == null,
      s => s.month == null && s.day == null
    ];

    //keep applying filters until one returns a value
    for(const filter of filters){
      const result = splashes.filter(filter);
      if (result.length) return result;
    }

    //default value (should never happen)
    return [{value:"Something went horribly wrong..."}]
  }

  //pick value from filtered list
  const loadSplash = () => {
    const filteredSplashes = filterSplashes()
    const index = Math.floor(Math.random() * filteredSplashes.length)

    const text = filteredSplashes[index].value
    const size = 40 - text.length * 0.6

    setCurrentSplash(text)
    setFontsize(size)
  }

  useEffect(() => {
    loadSplash()
  }, [])

  return (
    <h4 className='splashtext' onClick={loadSplash} style={{fontSize: fontsize}}>
        {currentSplash}
    </h4>
  )
}
