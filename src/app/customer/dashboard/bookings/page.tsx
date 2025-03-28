// pages/dashboard/bookings.tsx
// "use client"
// import React from 'react';
// import { GetServerSideProps } from 'next';
// import { IUser,Booking,Car } from '@/types/authTypes';
// import DashboardLayout from '@/components/carOwner/Dashboard';

// interface BookingsPageProps {
//   user: IUser;
//   bookings: (Booking & { car: Car })[];
// }

// const BookingsPage: React.FC<BookingsPageProps> = ({ user, bookings }) => {
//   const getStatusColor = (status: Booking['status']) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'confirmed': return 'bg-blue-100 text-blue-800';
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <DashboardLayout user={user}>
//       <div className="bg-white shadow rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
//                 <th className="py-3 px-6 text-left">Car</th>
//                 <th className="py-3 px-6 text-left">Dates</th>
//                 <th className="py-3 px-6 text-left">Status</th>
//                 <th className="py-3 px-6 text-left">Price</th>
//                 <th className="py-3 px-6 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-600 text-sm">
//               {bookings.map((booking) => (
//                 <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="py-3 px-6 text-left">
//                     <div className="flex items-center">
//                       <div className="mr-2">
//                         <div className="w-10 h-10 relative">
//                           {/* <Image
//                             src={booking.car.image}
//                             alt={`${booking.car.make} ${booking.car.model}`}
//                             layout="fill"
//                             objectFit="cover"
//                             className="rounded"
//                           /> */}
//                         </div>
//                       </div>
//                       <span>{booking.car.make} {booking.car.model}</span>
//                     </div>
//                   </td>
//                   <td className="py-3 px-6 text-left">
//                     <div>
//                       <p>{new Date(booking.startDate).toLocaleDateString()}</p>
//                       <p className="text-xs text-gray-500">to</p>
//                       <p>{new Date(booking.endDate).toLocaleDateString()}</p>
//                     </div>
//                   </td>
//                   <td className="py-3 px-6 text-left">
//                     <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
//                       {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="py-3 px-6 text-left">
//                     ${booking.totalPrice.toFixed(2)}
//                   </td>
//                   <td className="py-3 px-6 text-left">
//                     <div className="flex space-x-2">
//                       <button className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200">
//                         View Details
//                       </button>
//                       {booking.status === 'pending' && (
//                         <button className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs hover:bg-red-200">
//                           Cancel
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // Fetch user, bookings, and car data from API or database
//   // This is just mock data for demonstration
//   const user: IUser = {
//     id: '1',
//     fullName: 'John Doe',
//     email: 'john@example.com',
//     profileImage: '/images/profile.jpg',
//     role:"carOwner"
//   };

//   const cars: Car[] = [
//     {
//       id: '1',
//       make: 'Toyota',
//       model: 'Camry',
//       year: 2022,
//       licensePlate: 'ABC123',
//       image: '/images/toyota-camry.jpg',
//     },
//     {
//       id: '2',
//       make: 'Honda',
//       model: 'Civic',
//       year: 2021,
//       licensePlate: 'XYZ789',
//       image: '/images/honda-civic.jpg',
//     },
//   ];

//   const bookings: (Booking & { car: Car })[] = [
//     {
//       id: '1',
//       carId: '1',
//       startDate: '2025-03-15',
//       endDate: '2025-03-18',
//       status: 'confirmed',
//       totalPrice: 240,
//       car: cars[0],
//     },
//     {
//       id: '2',
//       carId: '2',
//       startDate: '2025-03-25',
//       endDate: '2025-03-28',
//       status: 'pending',
//       totalPrice: 210,
//       car: cars[1],
//     },
//     {
//       id: '3',
//       carId: '1',
//       startDate: '2025-02-10',
//       endDate: '2025-02-12',
//       status: 'completed',
//       totalPrice: 160,
//       car: cars[0],
//     },
//   ];

//   return {
//     props: {
//       user,
//       bookings,
//     },
//   };
// };

// export default BookingsPage;











// "use client";
// import React, { useEffect, useState } from 'react';
// import { IUser, Booking, Car } from '@/types/authTypes';
// import DashboardLayout from '@/components/carOwner/Dashboard';

// const BookingsPage: React.FC = () => {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [bookings, setBookings] = useState<(Booking & { car: Car })[] | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       try {
//         // Simulate fetching data (replace with real API call)
//         const response = await fetch('/api/bookings');
//         if (!response.ok) throw new Error('Failed to fetch');
//         const data = await response.json();
//         setUser(data.user);
//         setBookings(data.bookings);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (!user || !bookings) return <div>No bookings found</div>;

//   const getStatusColor = (status: Booking['status']) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'confirmed': return 'bg-blue-100 text-blue-800';
//       case 'completed': return 'bg-green-100 text-green-800';
//       case 'cancelled': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <DashboardLayout user={user}>
//       <div className="bg-white shadow rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
//                 <th className="py-3 px-6 text-left">Car</th>
//                 <th className="py-3 px-6 text-left">Dates</th>
//                 <th className="py-3 px-6 text-left">Status</th>
//                 <th className="py-3 px-6 text-left">Price</th>
//                 <th className="py-3 px-6 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-600 text-sm">
//               {bookings.map((booking) => (
//                 <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="py-3 px-6 text-left">
//                     <div className="flex items-center">
//                       <div className="mr-2">
//                         <div className="w-10 h-10 relative">
//                           {/* Add Image Component if needed */}
//                         </div>
//                       </div>
//                       <span>{booking.car.make} {booking.car.model}</span>
//                     </div>
//                   </td>
//                   <td className="py-3 px-6 text-left">
//                     <div>
//                       <p>{new Date(booking.startDate).toLocaleDateString()}</p>
//                       <p className="text-xs text-gray-500">to</p>
//                       <p>{new Date(booking.endDate).toLocaleDateString()}</p>
//                     </div>
//                   </td>
//                   <td className="py-3 px-6 text-left">
//                     <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
//                       {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="py-3 px-6 text-left">${booking.totalPrice.toFixed(2)}</td>
//                   <td className="py-3 px-6 text-left">
//                     <div className="flex space-x-2">
//                       <button className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200">
//                         View Details
//                       </button>
//                       {booking.status === 'pending' && (
//                         <button className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs hover:bg-red-200">
//                           Cancel
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default BookingsPage;



