import { SearchOutlined } from '@ant-design/icons';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {  Input, Space , Popconfirm, Table ,Tag, Button, ConfigProvider } from 'antd';
import { MapContainer, TileLayer, Marker,Circle , Popup ,Tooltip,Polygon, useMapEvent, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { useEventHandlers } from '@react-leaflet/core';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useMap } from 'react-leaflet';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useEventCallback } from '@mui/material';
import { getArticlesQ2, getArticlesQ1, getArticlesQ3,getArticlesQ4 } from '../Utils/DashboardRequest';
const markerVenue = new L.Icon({
    iconUrl: require("./../Assets/images/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });
  const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }
  
  const BOUNDS_STYLE = { weight: 1 }
  
  function MinimapBounds({ parentMap, zoom }) {
    const minimap = useMap()
  
    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      (e) => {
        parentMap.setView(e.latlng, parentMap.getZoom())
      },
      [parentMap],
    )
    useMapEvent('click', onClick)
  
    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds())
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])
  
    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
    useEventHandlers({ instance: parentMap }, handlers)
  
    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
  }
  
  function MinimapControl({ position, zoom }) {
    const parentMap = useMap()
    const mapZoom = zoom || 0
  
    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
      () => (
        <MapContainer
          style={{ height: 80, width: 80 }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      [],
    )
  
    const positionClass =
      (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
      <div className={positionClass}>
        <div className="leaflet-control leaflet-bar">{minimap}</div>
      </div>
    )
  }
export default function Map(props) {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    console.log(props.Q1.filter(objet => objet.country === "Pakistan" )[0])
    const[Pakistan,setPakistan]=useState(props.Q1.filter(objet => objet.country === "Pakistan" )[0])
    const[SouthKorea,setSouthKorea]=useState(props.Q1.filter(objet => objet.country === "South Korea" )[0])
    const[Portugal,setPortugal]=useState(props.Q1.filter(objet => objet.country === "Portugal" )[0])
    const[China,setChina]=useState(props.Q1.filter(objet => objet.country === "China")[0])
    const[Denmark,setDenmark]=useState(props.Q1.filter(objet => objet.country ==="Denmark" )[0])
    const[Canada,setCanada]=useState(props.Q1.filter(objet => objet.country ==="Canada" )[0])
    const[Australia,setAustralia]=useState(props.Q1.filter(objet => objet.country ==="Australia" )[0])
    const[Netherlands,setNetherlands]=useState(props.Q1.filter(objet => objet.country ==="Netherlands" )[0])
    const[UnitedStates,setUnitedStates]=useState(props.Q1.filter(objet => objet.country ==="United States" )[0])
    const[UnitedKingdom,setUnitedKingdom]=useState(props.Q1.filter(objet => objet.country ==="United Kingdom" )[0])
    const[Switzerland,setSwitzerland]=useState(props.Q1.filter(objet => objet.country ==="Switzerland" )[0])
    const mapRef = useRef(null)
	const markerRef1 = useRef(null)
	const markerRef2 = useRef(null)
	const markerRef3 = useRef(null)
	const markerRef4 = useRef(null)
	const markerRef5= useRef(null)
	const markerRef6= useRef(null)
	const markerRef7= useRef(null)
	const markerRef8= useRef(null)
	const markerRef9= useRef(null)
	const markerRef10= useRef(null)
	const markerRef11= useRef(null)
    const FlyToLocation = ({ latitude, longitude }) => {
        const map = useMap();
      
        React.useEffect(() => {
          if (latitude && longitude) {
            map.flyTo([latitude, longitude], 6, {
              duration: 2  // Duration in seconds
            });
          }
        }, [latitude, longitude, map]);
      
        return null;
      };
	const onClickShowMarker = (lat,lng) => {
        setLat(lat)
        setLng(lng)
        let marker
        if(lat===59.213890){
          marker = markerRef1.current
          markerRef2.current.closePopup()
          markerRef3.current.closePopup()
          markerRef4.current.closePopup()
          markerRef5.current.closePopup()
          markerRef6.current.closePopup()
          markerRef7.current.closePopup()
          markerRef8.current.closePopup()
          markerRef9.current.closePopup()
          markerRef10.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===44.500000){
          marker = markerRef2.current
          markerRef1.current.closePopup()
          markerRef3.current.closePopup()
          markerRef4.current.closePopup()
          markerRef5.current.closePopup()
          markerRef6.current.closePopup()
          markerRef7.current.closePopup()
          markerRef8.current.closePopup()
          markerRef9.current.closePopup()
          markerRef10.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===54.320883){
          marker = markerRef3.current
          markerRef2.current.closePopup()
          markerRef1.current.closePopup()
          markerRef4.current.closePopup()
          markerRef5.current.closePopup()
          markerRef6.current.closePopup()
          markerRef7.current.closePopup()
          markerRef8.current.closePopup()
          markerRef9.current.closePopup()
          markerRef10.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===40.404687){
          marker = markerRef4.current
          markerRef2.current.closePopup()
          markerRef3.current.closePopup()
          markerRef1.current.closePopup()
          markerRef5.current.closePopup()
          markerRef6.current.closePopup()
          markerRef7.current.closePopup()
          markerRef8.current.closePopup()
          markerRef9.current.closePopup()
          markerRef10.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===55.579765){
          marker = markerRef5.current
          markerRef2.current.closePopup()
          markerRef3.current.closePopup()
          markerRef4.current.closePopup()
          markerRef1.current.closePopup()
          markerRef6.current.closePopup()
          markerRef7.current.closePopup()
          markerRef8.current.closePopup()
          markerRef9.current.closePopup()
          markerRef10.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===46.989531){
          marker = markerRef6.current
          markerRef2.current.closePopup()
          markerRef3.current.closePopup()
          markerRef4.current.closePopup()
          markerRef5.current.closePopup()
          markerRef1.current.closePopup()
          markerRef7.current.closePopup()
          markerRef8.current.closePopup()
          markerRef9.current.closePopup()
          markerRef10.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===52.048622){
          marker = markerRef7.current
          markerRef2.current.closePopup()
          markerRef3.current.closePopup()
          markerRef4.current.closePopup()
          markerRef5.current.closePopup()
          markerRef6.current.closePopup()
          markerRef1.current.closePopup()
          markerRef8.current.closePopup()
          markerRef9.current.closePopup()
          markerRef10.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===30.3753){
          marker = markerRef8.current
          markerRef2.current.closePopup()
          markerRef3.current.closePopup()
          markerRef4.current.closePopup()
          markerRef5.current.closePopup()
          markerRef6.current.closePopup()
          markerRef7.current.closePopup()
          markerRef1.current.closePopup()
          markerRef9.current.closePopup()
          markerRef10.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===36.098323){
          marker = markerRef9.current
          markerRef2.current.closePopup()
          markerRef3.current.closePopup()
          markerRef4.current.closePopup()
          markerRef5.current.closePopup()
          markerRef6.current.closePopup()
          markerRef7.current.closePopup()
          markerRef8.current.closePopup()
          markerRef1.current.closePopup()
          markerRef10.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===-27.002463){
          marker = markerRef10.current
          markerRef2.current.closePopup()
          markerRef3.current.closePopup()
          markerRef4.current.closePopup()
          markerRef5.current.closePopup()
          markerRef6.current.closePopup()
          markerRef7.current.closePopup()
          markerRef8.current.closePopup()
          markerRef9.current.closePopup()
          markerRef1.current.closePopup()
          markerRef11.current.closePopup()
        }else if(lat===36.922647){
          marker = markerRef11.current
          markerRef2.current.closePopup()
          markerRef3.current.closePopup()
          markerRef4.current.closePopup()
          markerRef5.current.closePopup()
          markerRef6.current.closePopup()
          markerRef7.current.closePopup()
          markerRef8.current.closePopup()
          markerRef9.current.closePopup()
          markerRef10.current.closePopup()
          markerRef1.current.closePopup()
        }
		if (marker) {
			marker.openPopup()
      
		}
	}
  const[q,setQ]=useState("Q1")
  async function Q1(){
    setQ("Q1")
    props.handleOpenLoader()
    await getArticlesQ1().then((res) => {
      setPakistan(res.data.filter(objet => objet.country === "Pakistan" )[0])
      setSouthKorea(res.data.filter(objet => objet.country === "South Korea" )[0])
      setPortugal(res.data.filter(objet => objet.country === "Portugal" )[0])
      setChina(res.data.filter(objet => objet.country === "China")[0])
      setDenmark(res.data.filter(objet => objet.country ==="Denmark" )[0])
      setCanada(res.data.filter(objet => objet.country ==="Canada" )[0])
      setAustralia(res.data.filter(objet => objet.country ==="Australia" )[0])
      setNetherlands(res.data.filter(objet => objet.country ==="Netherlands" )[0])
      setUnitedStates(res.data.filter(objet => objet.country ==="United States" )[0])
      setUnitedKingdom(res.data.filter(objet => objet.country ==="United Kingdom" )[0])
      setSwitzerland(res.data.filter(objet => objet.country ==="Switzerland" )[0])
      props.handleCloseLoader()
    })
  }
  async function Q2(){
    setQ("Q2")
    props.handleOpenLoader()
    await getArticlesQ2().then((res) => {
      setPakistan(res.data.filter(objet => objet.country === "Pakistan" )[0])
      setSouthKorea(res.data.filter(objet => objet.country === "South Korea" )[0])
      setPortugal(res.data.filter(objet => objet.country === "Portugal" )[0])
      setChina(res.data.filter(objet => objet.country === "China")[0])
      setDenmark(res.data.filter(objet => objet.country ==="Denmark" )[0])
      setCanada(res.data.filter(objet => objet.country ==="Canada" )[0])
      setAustralia(res.data.filter(objet => objet.country ==="Australia" )[0])
      setNetherlands(res.data.filter(objet => objet.country ==="Netherlands" )[0])
      setUnitedStates(res.data.filter(objet => objet.country ==="United States" )[0])
      setUnitedKingdom(res.data.filter(objet => objet.country ==="United Kingdom" )[0])
      setSwitzerland(res.data.filter(objet => objet.country ==="Switzerland" )[0])
      props.handleCloseLoader()
    })
  }
  async function Q3(){
    props.handleOpenLoader()
    setQ("Q3")
    await getArticlesQ3().then((res) => {
      setPakistan(res.data.filter(objet => objet.country === "Pakistan" )[0])
      setSouthKorea(res.data.filter(objet => objet.country === "South Korea" )[0])
      setPortugal(res.data.filter(objet => objet.country === "Portugal" )[0])
      setChina(res.data.filter(objet => objet.country === "China")[0])
      setDenmark(res.data.filter(objet => objet.country ==="Denmark" )[0])
      setCanada(res.data.filter(objet => objet.country ==="Canada" )[0])
      setAustralia(res.data.filter(objet => objet.country ==="Australia" )[0])
      setNetherlands(res.data.filter(objet => objet.country ==="Netherlands" )[0])
      setUnitedStates(res.data.filter(objet => objet.country ==="United States" )[0])
      setUnitedKingdom(res.data.filter(objet => objet.country ==="United Kingdom" )[0])
      setSwitzerland(res.data.filter(objet => objet.country ==="Switzerland" )[0])
      props.handleCloseLoader()
    })
  }
  async function Q4(){
    setQ("Q4")
    props.handleOpenLoader()
    await getArticlesQ4().then((res) => {
      setPakistan(res.data.filter(objet => objet.country === "Pakistan" )[0])
      setSouthKorea(res.data.filter(objet => objet.country === "South Korea" )[0])
      setPortugal(res.data.filter(objet => objet.country === "Portugal" )[0])
      setChina(res.data.filter(objet => objet.country === "China")[0])
      setDenmark(res.data.filter(objet => objet.country ==="Denmark" )[0])
      setCanada(res.data.filter(objet => objet.country ==="Canada" )[0])
      setAustralia(res.data.filter(objet => objet.country ==="Australia" )[0])
      setNetherlands(res.data.filter(objet => objet.country ==="Netherlands" )[0])
      setUnitedStates(res.data.filter(objet => objet.country ==="United States" )[0])
      setUnitedKingdom(res.data.filter(objet => objet.country ==="United Kingdom" )[0])
      setSwitzerland(res.data.filter(objet => objet.country ==="Switzerland" )[0])
      props.handleCloseLoader()
    })
  }
return(
    <>
    <div style={{  width: '100%',position:"relative",height:"82vh",overflowY:"hidden" }}>
    <FloatButton.Group
      shape="square"
      style={{
        left: 10,zIndex:1000,bottom:85
      }}
    >
      <FloatButton description="Q1" onClick={Q1}/>
      <FloatButton description="Q2" onClick={Q2}/>
      <FloatButton description="Q3" onClick={Q3}/>
      <FloatButton  description="Q4" onClick={Q4}/>
    </FloatButton.Group>
    <MapContainer ref={mapRef}  center={{ lat: 31.7917, lng: 7.0926 }} zoom={2}    style={{position:"absolute",top:"0",left:"0" , width: '100%' }}>
    <TileLayer
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
        // url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
        
        attribution=""
    />
      <div style={{zIndex:"11"}}>
  <Marker  ref={markerRef8} position={{ lat: 30.3753, lng: 69.3451 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
      Pakistan
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{Pakistan!==undefined &&Pakistan.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{Pakistan!==undefined &&Pakistan.sum_articles}</span></h2>
    </Popup>
  </Marker>
  <Circle center={{ lat: 30.3753, lng: 69.3451 }} radius={(Pakistan.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker ref={markerRef3}  position={{ lat: 54.320883, lng: -2.004531 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  United Kingdom
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{UnitedKingdom!==undefined &&UnitedKingdom.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{UnitedKingdom!==undefined &&UnitedKingdom.sum_articles}</span></h2>
    </Popup>

  </Marker>
  <Circle center={{ lat: 54.320883, lng: -2.004531 }} radius={(UnitedKingdom.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker  ref={markerRef6} position={{ lat:   46.989531, lng: 8.498027 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  Switzerland
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{Switzerland!==undefined &&Switzerland.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{Switzerland!==undefined &&Switzerland.sum_articles}</span></h2>
    </Popup>

  </Marker>
  <Circle center={{ lat:   46.989531, lng: 8.498027 }} radius={(Switzerland.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker ref={markerRef7}  position={{ lat: 52.048622, lng: 5.705354 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  Netherlands
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{Netherlands!==undefined &&Netherlands.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{Netherlands!==undefined &&Netherlands.sum_articles}</span></h2>
    </Popup>
  </Marker>
  <Circle center={{ lat: 52.048622, lng: 5.705354 }} radius={(Netherlands.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker ref={markerRef2}  position={{ lat: 44.500000, lng: -89.500000 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  United States
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{UnitedStates!==undefined &&UnitedStates.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{UnitedStates!==undefined &&UnitedStates.sum_articles}</span></h2>
    </Popup>
  </Marker>
  <Circle center={{ lat: 44.500000, lng: -89.500000 }} radius={(UnitedStates.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker ref={markerRef1} position={{ lat: 59.213890, lng: -106.584167 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  Canada
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{Canada!==undefined &&Canada.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{Canada!==undefined &&Canada.sum_articles}</span></h2>
    </Popup>
  </Marker>
  <Circle center={{ lat: 59.213890, lng: -106.584167 }} radius={(Canada.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker ref={markerRef10}  position={{ lat: -27.002463, lng: 134.471699 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  Australia
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{Australia!==undefined &&Australia.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{Australia!==undefined &&Australia.sum_articles}</span></h2>
    </Popup>
  </Marker>
  <Circle center={{ lat: -27.002463, lng: 134.471699 }} radius={(Australia.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker ref={markerRef9}  position={{ lat: 36.098323, lng: 103.148414}} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  China
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{China!==undefined &&China.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{China!==undefined &&China.sum_articles}</span></h2>
    </Popup>
  </Marker>
  <Circle center={{ lat: 36.098323, lng: 103.148414}} radius={(China.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker ref={markerRef5}  position={{ lat: 55.579765, lng: 9.475051 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  Denmark
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{Denmark!==undefined &&Denmark.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{Denmark!==undefined &&Denmark.sum_articles}</span></h2>
    </Popup>
  </Marker>
  <Circle center={{ lat: 55.579765, lng: 9.475051 }} radius={(Denmark.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker ref={markerRef11}  position={{ lat: 36.922647, lng: 127.649347 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  South Korea
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{SouthKorea!==undefined &&SouthKorea.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{SouthKorea!==undefined &&SouthKorea.sum_articles}</span></h2>
    </Popup>
  </Marker>
  <Circle center={{ lat: 36.922647, lng: 127.649347 }} radius={(SouthKorea.sum_journals * 1000000)/100} color={'purple'}/>
  <Marker ref={markerRef4} position={{ lat: 40.404687, lng: -8.171425 }} icon={markerVenue}>
  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
  Portugal
    </Tooltip>
    <Popup >
      <h1>{q}</h1>
      <h2>journals : <span style={{color:"rgb(145, 85, 253)"}}>{Portugal!==undefined &&Portugal.sum_journals}</span></h2>
      <h2>articles : <span style={{color:"rgb(145, 85, 253)"}}>{Portugal!==undefined &&Portugal.sum_articles}</span></h2>
    </Popup>
  </Marker>
  <Circle center={{ lat: 40.404687, lng: -8.171425 }} radius={(Portugal.sum_journals * 1000000)/100} color={'purple'}/>
  </div>

    <FlyToLocation latitude={lat} longitude={lng} />
    <MinimapControl position="topright" />
</MapContainer>
</div>
<div style={{marginTop:"1vh"}}>
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker(59.213890,-106.584167 )}} class="fi fi-ca"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker(44.500000,-89.500000)}} class="fi fi-um"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker(54.320883, -2.004531 )}} class="fi fi-gb"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker(40.404687,-8.171425)}} class="fi fi-pt"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker(55.579765, 9.475051)}} class="fi fi-dk"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker(46.989531,  8.498027)}} class="fi fi-ch"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker(52.048622, 5.705354)}} class="fi fi-nl"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker(30.3753,69.3451)}} class="fi fi-pk"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker(36.098323, 103.148414)}} class="fi fi-cn"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker( -27.002463, 134.471699)}} class="fi fi-at"></span> 
<span style={{width:"6vw",height:"5vh",cursor:"pointer"}} onClick={()=>{onClickShowMarker( 36.922647, 127.649347 )}} class="fi fi-kr"></span> 
</div>
{/* <button onClick={onClickShowMarker}>Show marker</button> */}
</>
)
}