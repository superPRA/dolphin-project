import { MapContainer, TileLayer, Marker } from "react-leaflet";

type Props = {};

export default function MapInfo({}: Props) {
  return (
    <div className="text-center">
      <h1 className="text-red-600 text-lg font-semibold mb-3">ادرس رستوران</h1>
      <h2 className="mb-3">سالاریه، نبش میدان میثم</h2>
      <h3 className="mb-4">تلفن:32141000</h3>
      <div className="h-96 w-5/6 my-8 mx-auto border">
        <MapContainer
          id="map"
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
          <Marker position={[34.613419, 50.843572]}></Marker>
        </MapContainer>
      </div>
    </div>
  );
}
