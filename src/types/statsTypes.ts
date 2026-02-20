export interface StatsData {
  totalCars: number;
  totalCustomers?: number;
  totalCarOwners?: number;
  totalBookings: number;

  // enable later
  // totalRevenue?: number;
  activeRentals?: number;
  // monthlyRevenue?: { month: string; revenue: number }[];
}

export interface RecentBooking {
  id: string;
  bookingId: string;
  car: { carName: string; brand: string };
  carOwner: { fullName: string };
  customer: { fullName: string };
  status: string;
  totalPrice: number;
  createdAt: string;
}