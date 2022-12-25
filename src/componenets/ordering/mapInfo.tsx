import { LatLngExpression } from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from "react-leaflet";

type Props = {};

export default function MapInfo({}: Props) {
  const [makerPosition, setMakerPosition]: [LatLngExpression, any] = useState([34.613419, 50.843572])
  // const map = useMapEvents({
  //   click: ()=>{
  //     map.locate()
  //   },
  //   locationfound: (e)=>{
  //     setMakerPosition(e.latlng)
  //     map.flyTo(e.latlng, map.getZoom())
  //   }
  // })
  return (
    <div className="text-center">
      <h1 className="text-red-600 text-lg font-semibold mb-3">ادرس رستوران</h1>
      <h2 className="mb-3">سالاریه، نبش میدان میثم</h2>
      <h3 className="mb-4">تلفن:32141000</h3>
      <div className="h-96 w-5/6 my-8 mx-auto border">
        <MapContainer
          className="h-full w-full"
          style={{ overflow: "clip" }}
          center={[34.613419, 50.843572]}
          zoom={16}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={makerPosition}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
