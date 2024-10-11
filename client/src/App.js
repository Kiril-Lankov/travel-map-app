import * as React from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState ,useEffect} from 'react';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./app.css";
import axios from "axios";
import {format} from "timeago.js";



function App() {
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

useEffect(()=> {
  const getPins = async () => {
    try {
      const res = await axios.get("/api/pins");
      setPins(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  getPins();
},[]);

const handleMarkerClick = (id) => {
  console.log("Marker clicked: ", id);
  setCurrentPlaceId(id)
}
  return (
    <div className="App">
  <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: 15,
        latitude: 47,
        zoom: 4,
      
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {pins.map((p) => (
  <React.Fragment key={p._id}>
    <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
      <LocationOnIcon style={{color: "#5D3FD3"}}
        onClick={() => handleMarkerClick(p._id)} />
    </Marker> 
    {p._id === currentPlaceId && (
      <Popup key={p._id} longitude={p.long} latitude={p.lat} anchor="left"
      closeOnClick={false} 
  onClose={() => setCurrentPlaceId(null)}>
        <div className='card'>
          <label>Place</label>
          <h4 className='place'>{p.title}</h4>
          <label>Review</label>
          <p className='desc'>{p.desc}</p>
          <label>Rating</label>
          <div>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
          </div>
          <label>Information:</label>
          <span className='username'>Created by <b>{p.username}</b></span>
          <span className='date'>{format(p.createdAt)}</span>
        </div>
      </Popup>
    )}
  </React.Fragment>
))}
      
    </Map>
    </div>
  );
}

export default App;
