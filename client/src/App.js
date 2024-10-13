import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './app.css';
import axios from 'axios';
import { format } from 'timeago.js';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 15,
    latitude: 47,
    zoom: 4
  });
  

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/api/pins');
        setPins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  // When a marker is clicked, update viewState to move the map to that marker
  const handleMarkerClick = (lat, long, id) => {
    setCurrentPlaceId(id);
    setViewState({
      ...viewState,
      longitude: long,
      latitude: lat,
      zoom: 8,
      transitionDuration: 'flyTo'
    });
  };

  const handleAddClick = (e) => {
    const lat = e.lngLat.lat;
    const long = e.lngLat.lng;
    setNewPlace({
      lat,
      long
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      long: newPlace.long,
      lat: newPlace.lat,
      
    }
    console.log(newPin)
    try {
      const res = await axios.post("/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
        transitionDuration = "200"
      >
        {pins.map((p) => (
          <React.Fragment key={p._id}>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom">
              <LocationOnIcon
                style={{
                  color: p.username === currentUser ? 'tomato' : 'slateblue',
                  cursor: 'pointer'
                }}
                onClick={() => handleMarkerClick(p.lat, p.long, p._id)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div>
                    {Array(p.rating).fill(<StarIcon className="star" />)}
                  </div>
                  <label>Information:</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </React.Fragment>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input placeholder='Enter a itle' onChange={(e)=>setTitle(e.target.value)}/>
                <label>Rewiev</label>
                <textarea placeholder='Say us something about this place'
                onChange={(e)=>setDesc(e.target.value)}/>
                <label>Rating</label>
                <select onChange={(e)=>setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className='submitButton' type='submit'>Add Pin</button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
      <button className='button logout'>Log out</button>)
      : (
      <div className='controls'>
        <button className='button login' onClick={()=>setShowLogin(true)}>Log in</button>
        <button className='button register'onClick={()=>setShowRegister(true)}>Register</button>
        </div>
      )}
        {showRegister &&<Register setShowRegister={setShowRegister}/> }
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage}/>}
      </Map> 
      
    </div>
  );
}

export default App;
