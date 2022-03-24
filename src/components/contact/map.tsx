import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const defaultCenter = { lat: 5.564524666302273, lng: -0.1796627085839316 };

const defaultOptions = { scrollwheel: false };

const RegularMap = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={defaultCenter}
      defaultOptions={defaultOptions}
    >
      <Marker position={defaultCenter} />
    </GoogleMap>
  ))
);

const loadingElementStyle = { height: '100%' };
const containerElementStyle = { height: '280px' };
const mapElementStyle = { height: '100%' };

export default function GoogleMaps() {
  return (
    <RegularMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}
    />
  );
}
