import * as React from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState ,useEffect} from 'react';
import StarIcon from '@mui/icons-material/Star';
import "./app.css";
import axios from "axios";


function App() {
  const [pins, setPins] = useState([])
const [showPopup, setShowPopup] = useState(true);
useEffect(()=> {
  const getPins = async () => {
    try {
      const res = await axios.get("/pins");
      setPins(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  getPins();
},[]);
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
      {pins.map(p =>
      <>
      <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
      <img src="./pin.png" style={{width:17, height:25}} />
    </Marker> 
    {showPopup && (
      <Popup longitude={2.294694} latitude={48.858093}
        anchor="left"
        onClose={() => setShowPopup(false)}>
        <div className='card'>
          <label>Place</label>
          <h4 className='place'>Eiffel Tower</h4>
          <label>Rewiev</label>
          <p className='desc'>Beautiful place. I liked it a lot!</p>
          <label>Rating</label>
          <div>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
            <StarIcon className='star'/>
          </div>
          <label>Information:</label>
          <span className='username'>Created by <b>Kiril</b></span>
          <span className='date'>1 hour ago</span>
        </div>
      </Popup>)}
      </>
    )}
    </Map>
    </div>
  );
}

export default App;
