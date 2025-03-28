// "use client"
// import React from 'react';
// import { GetServerSideProps } from 'next';
// import Image from 'next/image';
// import { IUser,Car } from '@/types/authTypes';
// import DashboardLayout from './Dashboard';

// interface CarsPageProps {
//   user: IUser;
//   cars: Car[];
// }

// const CarsPage: React.FC<CarsPageProps> = ({ user, cars }) => {
//   return (
//     <DashboardLayout user={user}>
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">My Cars</h1>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             Add New Car
//           </button>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars.map((car) => (
//             <div key={car.id} className="border rounded-lg overflow-hidden shadow-sm">
//               <div className="h-48 relative">
//                 {/* <Image
//                   src={car.image}
//                   alt={`${car.make} ${car.model}`}
//                   layout="fill"
//                   objectFit="cover"
//                 /> */}
//               </div>
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold">
//                   {car.make} {car.model} ({car.year})
//                 </h3>
//                 <p className="text-gray-600 mb-2">License: {car.licensePlate}</p>
//                 <div className="flex space-x-2">
//                   <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300">
//                     Edit
//                   </button>
//                   <button className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200">
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // Fetch user and cars data from API or database
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
//     {
//       id: '3',
//       make: 'Tesla',
//       model: 'Model 3',
//       year: 2023,
//       licensePlate: 'ELK456',
//       image: '/images/tesla-model3.jpg',
//     },
//   ];

//   return {
//     props: {
//       user,
//       cars,
//     },
//   };
// };

// export default CarsPage;