
"use client";

import { useState } from "react";
import CarGallery from "@/components/CarGallery";
import AvailabilityCalendar from "@/components/AvailabilityCalender";
import BookingForm from "@/components/BookingForm";
import { Car } from "@/types/workTypes";

export default function CarDetailsPage() {
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState<{ start: string; end: string } | null>(
    null
  );

  const car: Car = {
    id: "1",
    name: "Tata Curvv EV",
    model: "EV s2",
    fuelType: "EV",
    price: 1500,
    features: ["Digital Instrument Cluster", "Parking Sensors", "Panoramic SunRoof"],
    images: [
      "https://vroom-car-images.s3.eu-north-1.amazonaws.com/car-images/1744181731042-pexels-anas-ahmed-1606053043-27575852.jpg"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    availability: {
      "2025-04-09": true,
      "2025-04-10": true,
      "2025-04-11": true,
      "2025-04-13": true, // ← try a gap here to test continuity check
      "2025-04-14": true
    }
  };

  const handleBookingComplete = (dates: { start: string; end: string }) => {
    setBooking(dates);
    alert(`Booked from ${dates.start} to ${dates.end} at ₹${car.price}/day`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{car.name}</h1>
      <CarGallery images={car.images} videoUrl={car.videoUrl} />

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p>₹{car.price}/Day</p>
          <p>Model: {car.model}</p>
          <p>Fuel: {car.fuelType}</p>
          <ul className="list-disc ml-6 mt-2">
            {car.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        <AvailabilityCalendar car={car} onBook={() => setShowBooking(true)} />
      </div>

      {showBooking && <BookingForm car={car} onConfirm={handleBookingComplete} />}
    </div>
  );
}





// app/car/[id]/page.tsx
// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { CarGallery } from '@/components/Trycheck';
// import { BookingCalendar } from '@/components/Calender';

// interface Car {
//   id: string;
//   name: string;
//   model: string;
//   fuelType: string;
//   price: number;
//   features: string[];
//   images: string[];
//   videoUrl?: string;
//   availability: { [date: string]: boolean };
//   owner: {
//     name: string;
//     id: string;
//   };
// }

// const dummyCar: Car = {
//   id: '1',
//   name: 'Tata Curvv EV',
//   model: 'EV s2',
//   fuelType: 'EV',
//   price: 1500,
//   features: [
//     'Digital Instrument Cluster',
//     'Parking Sensors',
//     'Panoramic SunRoof'
//   ],
//   images: [
//     '/car1.png',
//     '/car2.png',
//     '/car3.png',
//     '/car4.png'
//   ],
//   videoUrl: '/car-video.mp4',
//   availability: {
//     '2025-07-10': true,
//     '2025-07-11': true,
//     '2025-07-12': false
//   },
//   owner: {
//     name: 'Alasha Sharma',
//     id: 'owner1'
//   }
// };

// export default function CarDetailsPage() {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDates, setSelectedDates] = useState<string[]>([]);

//   const handleBooking = () => {
//     alert(`Car booked for: ${selectedDates.join(', ')}`);
//   };

//   return (
//     <div className="grid md:grid-cols-3 gap-6 p-4">
//       {/* Left Section - Gallery */}
//       <div className="col-span-1 space-y-4">
//         <CarGallery images={dummyCar.images} videoUrl={dummyCar.videoUrl} />

//         <button
//           onClick={() => setShowCalendar(!showCalendar)}
//           className="bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-yellow-500"
//         >
//           Check Availability
//         </button>

//         {showCalendar && (
//           <BookingCalendar
//             car={dummyCar}
//             selectedDates={selectedDates}
//             setSelectedDates={setSelectedDates}
//           />
//         )}
//       </div>

//       {/* Right Section - Car Info */}
//       <div className="col-span-2">
//         <div className="rounded-3xl bg-gradient-to-br from-yellow-100 to-indigo-100 p-6 shadow-xl space-y-4">
//           <h2 className="text-2xl font-bold">{dummyCar.name}</h2>
//           <p className="text-lg font-semibold">₹ {dummyCar.price}/Day</p>

//           <p><strong>Model:</strong> {dummyCar.model}</p>
//           <p><strong>Fuel Type:</strong> {dummyCar.fuelType}</p>

//           <div>
//             <p className="font-semibold">Features:</p>
//             <ul className="list-disc list-inside">
//               {dummyCar.features.map((feature, idx) => (
//                 <li key={idx}>{feature}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="bg-pink-100 p-4 rounded-xl">
//             <p className="font-semibold">Owner Details</p>
//             <div className="flex items-center justify-between">
//               <p>👤 {dummyCar.owner.name}</p>
//               <button className="bg-black text-white px-4 py-1 rounded-full">CHAT</button>
//             </div>
//           </div>

//           {selectedDates.length > 0 && (
//             <button
//               onClick={handleBooking}
//               className="bg-black text-white px-6 py-2 rounded-full mt-4"
//             >
//               Book Now
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




















// "use client"
// import CarGallery from '@/components/Trycheck';
// import Calender from '@/components/calender';

// export default function TestGalleryPage() {
//   const dummyImages = [
//     "https://vroom-car-images.s3.eu-north-1.amazonaws.com/car-images/1744181731042-pexels-anas-ahmed-1606053043-27575852.jpg",
//     "https://images.unsplash.com/photo-1517948430535-1e2460bcec0a",
//     "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
//   ];

//   const dummyVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

//   const dummyCar = {
//     id: 'car-001',
//     name: 'Tesla',
//     model: 'Model 3',
//     year: 2023,
//     transmission: 'Automatic',
//     seats: 5,
//     price: 100,
//     engine: 'Electric Motor',
//     fuelEfficiency: '131 MPGe',
//     images: dummyImages,
//     videoUrl: dummyVideoUrl,
//     features: {
//       interior: ['Heated Seats', 'Premium Audio', 'Glass Roof', 'Touchscreen Display'],
//       safety: ['Autopilot', 'Emergency Braking', 'Lane Departure Warning'],
//       additional: ['Supercharger Access', 'Premium Connectivity']
//     },
//     availability: {
//       '2025-04-10': true,
//       '2025-04-11': true,
//       '2025-04-12': true,
//       '2025-04-13': false,
//       '2025-04-14': false,
//       '2025-04-15': true,
//       '2025-04-16': true,
//     }
//   }
    
  

//   const handleBookingComplete = (bookingDetails: any) => {
//     console.log('Booking complete!', bookingDetails);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Test Car Gallery</h1>
//       <CarGallery images={dummyImages} videoUrl={dummyVideoUrl} />
//       <Calender car={dummyCar} onBookingComplete={handleBookingComplete} />
//     </div>
//   );
// }
