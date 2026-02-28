import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewNotes() {

    const [noteEntries, setNoteEntries] = useState([]);

    useEffect(() => {
        //axios.get("http://localhost:3001/getNotes")
        axios.get("https://mutantfro-gs-server.onrender.com/getNotes")
            .then(result => setNoteEntries(result.data))
            .catch(err => console.log(err))
    }, []);

    const renderNotes = () => {
        return noteEntries.map((note) => {
            return <div>
                <img style={{ width: 125, backgroundColor: 'white' }} src={note.img}></img>
                <p style={{ maxWidth: 125}}>{note.comment}</p>
            </div>
        })
    };

    return (
        <div className='flexContainerRow windowMargin'>
            <div className='window newWindow aboutWindow'>
                <div className="title-bar">
                    <div className="title-bar-text">🎨 paint</div>
                </div>
                <div className='flexContainerColumn'>
                    <h4 style={{ marginBottom: 0 }} className="urgentHeader">work in progress! expect bugs!</h4>
                    <h5 className="urgentHeader">server takes time to spin up, notes may take up to 30 seconds to load</h5>
                    <div style={{ marginTop: 10 }} className='flexContainerRow'>
                        {renderNotes()}
                    </div>
                    <Link to="/notes/create">
                        <button className='headerNavigationBtn'>create note</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}