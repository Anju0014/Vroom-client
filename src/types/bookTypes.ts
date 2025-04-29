export interface Location {
    address?: string;
    city?: string;
    state?: string;
    coordinates?: [number, number];
  }
  
  export interface Car {
    _id: string;
    carName: string;
    brand: string;
    expectedWage: string;
    location: Location;
  }
  
  export interface Booking {
    _id?: string;
    carId: string;
    startDate: Date;
    endDate: Date;
  }
  
  export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
  }

  
  

export interface IBooking {
  _id: string;
  bookingId:string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
  };
  carOwnerId: {
    _id: string;
    fullName: string;
    email: string;
  };
  carId: {
    _id: string;
    carName: string;
    brand: string;
    model: string;
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}
  