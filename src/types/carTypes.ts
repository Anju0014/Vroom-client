export interface Car {
  id: string;
  carName: string;
  brand: string;
  year?: string;
  fuelType?: string;
  rcBookNo?: string;
  expectedWage: string;
  location: {
    coordinates: {
        lat: number;
        lng: number;
      };
      address: string;
      landmark?: string;
  };
  make?: string;
  carModel?: string;
  verifyStatus: number;
  images: string[];
  videos?: string[];
  owner:{
    fullName:string,
    id:string,
    email:string,
  };
  available: boolean;
  createdAt: Date;
}

export interface CarVerifyProps {
  carType?: string;
}

