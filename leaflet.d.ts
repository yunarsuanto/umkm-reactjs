declare module 'react-leaflet' {
  import * as L from 'leaflet';
  export interface MarkerProps {
    position: L.LatLngExpression;
    icon?: L.Icon;
  }
}