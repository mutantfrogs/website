import Canvas3D from './Canvas3D.jsx'
import Socials from './Socials.jsx'

export default function AboutWindow() {

    return (
      <div className='flexContainerRow windowMargin'>
        <div className='window newWindow aboutWindow'>
          <div className="title-bar">
            <div className="title-bar-text">🖥️ my computer</div>
          </div>

          <div className='flexContainerColumn'>
                <article role="tabpanel" className='aboutArticle'>
                    <p style={{fontSize: '14px', textAlign:'center', marginBottom:'10px'}}>
                        hello! my name is <b>jules (they/them)</b> but i also go by <b>mutantfrogs</b> online. i'm a 25 year old nonbinary artist, programmer, and aspiring jack of all trades. i love minecraft, y2k aesthetics, rhythm games, personal web, and touching grass. this website is mostly a hub for my creations as i don't like posting to social media. expect semi-frequent updates and additions!<br/>thank you for visiting and enjoy your stay!<br/>
                        <br/>
                        <b>discord: @mutantfrogs</b>
                    </p>                   
                    <Canvas3D></Canvas3D>
                    <Socials></Socials>
                    <p style={{fontSize: '14px', textAlign:'center'}}></p>
                </article>
          </div>
        </div>
      </div>
    )
  }
  
