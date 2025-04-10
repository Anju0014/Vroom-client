
// export interface Car1 {
//     id: string;
//     name: string;
//     model: string;
//     year: number;
//     transmission: string;
//     seats: number;
//     price: number;
//     engine: string;
//     fuelEfficiency: string;
//     images: string[];
//     videoUrl: string;
//     features: {
//       interior: string[];
//       safety: string[];
//       additional: string[];
//     };
//     availability: {
//       [date: string]: boolean;
//     };
//   }
  
//   export interface BookingDetails1 {
//     startDate: Date;
//     endDate: Date;
//     totalPrice: number;
//     carId: string;
//   }
  
 
  
export interface Car {
    id: string;
    name: string;
    model: string;
    fuelType: string;
    price: number;
    features: string[];
    images: string[];
    videoUrl: string;
    availability: { [date: string]: boolean }; // "2025-04-10": true
  }
  