export interface Coordinates {
  type: string;
  coordinates: number[];
}

export interface Location {
  address: string;
  landmark: string;
  coordinates: Coordinates;
}

export interface Car {
  _id: string;
  carName: string;
  brand: string;
  year: string;
  fuelType: string;
  rcBookNo: string;
  expectedWage: string;
  location: Location;
  verifyStatus: number;
  images: string[];
  videos: string[];
  owner: string;
  available: boolean;
  isDeleted: boolean;
  distance?: number;
}

export interface LocationMapViewProps {
  lat: number;
  lng: number;
}

export interface LocationPickerProps {
  onSelectLocation: (
    lat: number,
    lng: number,
    address?: string,
    landmark?: string
  ) => void;
  initialCoordinates?: { lat: number; lng: number };
}
