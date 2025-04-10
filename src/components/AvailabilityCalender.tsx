
import { Car } from "@/types/workTypes";

interface Props {
  car: Car;
  onBook: () => void;
}

export default function AvailabilityCalendar({ car, onBook }: Props) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toISOString().split("T")[0];
    const isAvailable = car.availability[dateStr] === true;

    return { day, dateStr, isAvailable };
  });

  return (
    <div className="mt-4 bg-white p-4 rounded shadow w-fit">
      <h3 className="text-lg font-bold mb-2">Check Availability</h3>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map(({ day, dateStr, isAvailable }) => (
          <div
            key={dateStr}
            className={`p-2 text-center text-sm rounded ${
              isAvailable ? "bg-green-300" : "bg-gray-200 text-gray-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <button
        onClick={onBook}
        className="mt-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
      >
        Book Now
      </button>
    </div>
  );
}


































// // components/BookingCalendar.tsx
// import React from 'react';

// interface BookingCalendarProps {
//   car: {
//     availability: { [date: string]: boolean };
//   };
//   selectedDates: string[];
//   setSelectedDates: (dates: string[]) => void;
// }

// export const BookingCalendar: React.FC<BookingCalendarProps> = ({
//   car,
//   selectedDates,
//   setSelectedDates
// }) => {
//   const today = new Date();
//   const currentMonth = today.getMonth();
//   const currentYear = today.getFullYear();

//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//   const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
//     const day = i + 1;
//     const date = new Date(currentYear, currentMonth, day);
//     const dateString = date.toISOString().split('T')[0];
//     const isAvailable = car?.availability?.[dateString] !== false;
//     return { day, date, dateString, isAvailable };
//   });

//   const toggleDate = (dateString: string) => {
//     setSelectedDates((prev: string[]) =>
//         prev.includes(dateString)
//           ? prev.filter((d: string) => d !== dateString)
//           : [...prev, dateString]
//       );
//   };

//   return (
//     <div className="border rounded-lg p-4 bg-white mt-4 shadow">
//       <h3 className="font-semibold text-lg mb-2">Select Available Dates</h3>
//       <div className="grid grid-cols-7 gap-2 text-center text-sm">
//         {daysArray.map(({ day, dateString, isAvailable }) => (
//           <button
//             key={dateString}
//             disabled={!isAvailable}
//             className={`p-2 rounded-full ${
//               selectedDates.includes(dateString)
//                 ? 'bg-black text-white'
//                 : isAvailable
//                 ? 'bg-green-200 hover:bg-green-300'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//             onClick={() => toggleDate(dateString)}
//           >
//             {day}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };







































// // components/BookingCalendar.tsx
// "use client"
// import { useState } from 'react';
// import { Car1, BookingDetails1 } from '@/types/workTypes';

// interface BookingCalendarProps {
//   car: Car1;
//   onBookingComplete: (bookingDetails: BookingDetails1) => void;
// }

// export function BookingCalendar({ car, onBookingComplete }: BookingCalendarProps) {
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
//   const [customerName, setCustomerName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
  
//   // Generate calendar days for current month
//   const currentDate = new Date();
//   const currentMonth = currentDate.getMonth();
//   const currentYear = currentDate.getFullYear();
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
//   const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
//     const day = i + 1;
//     const date = new Date(currentYear, currentMonth, day);
//     const dateString = date.toISOString().split('T')[0];
//     const isAvailable = car.availability[dateString] !== false;
    
//     return { day, date, isAvailable };
//   });
  
//   const handleDayClick = (date: Date) => {
//     if (!startDate) {
//       setStartDate(date);
//     } else if (!endDate && date > startDate) {
//       setEndDate(date);
//       setIsBookingFormOpen(true);
//     } else {
//       setStartDate(date);
//       setEndDate(null);
//     }
//   };
  
//   const calculateTotalPrice = () => {
//     if (!startDate || !endDate) return 0;
    
//     const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//     return diffDays * car.price;
//   };
  
//   const handleBookingSubmit = () => {
//     if (!startDate || !endDate) return;
    
//     onBookingComplete({
//       startDate,
//       endDate,
//       totalPrice: calculateTotalPrice(),
//       carId: car.id
//     });
    
//     // Reset form
//     setStartDate(null);
//     setEndDate(null);
//     setIsBookingFormOpen(false);
//     setCustomerName('');
//     setEmail('');
//     setPhone('');
//   };
  
//   return (
//     <div className="mt-8 bg-white p-6 rounded-lg shadow">
//       <h3 className="text-xl font-semibold mb-4">Book This Car</h3>
      
//       <div className="mb-4">
//         <div className="grid grid-cols-7 gap-1 mb-2">
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div key={day} className="text-center text-sm font-medium">{day}</div>
//           ))}
//         </div>
        
//         <div className="grid grid-cols-7 gap-1">
//           {calendarDays.map(({ day, date, isAvailable }) => {
//             const isSelected = 
//               (startDate && date.getTime() === startDate.getTime()) || 
//               (endDate && date.getTime() === endDate.getTime());
            
//             const isInRange = 
//               startDate && 
//               endDate && 
//               date > startDate && 
//               date < endDate;
            
//             return (
//               <div 
//                 key={day}
//                 onClick={() => isAvailable && handleDayClick(date)}
//                 className={`
//                   p-2 text-center rounded cursor-pointer
//                   ${!isAvailable ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}
//                   ${isSelected ? 'bg-blue-500 text-white' : ''}
//                   ${isInRange ? 'bg-blue-100' : ''}
//                   ${isAvailable && !isSelected && !isInRange ? 'hover:bg-gray-100' : ''}
//                 `}
//               >
//                 {day}
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//       {(startDate || endDate) && (
//         <div className="mb-4">
//           <p className="text-sm">
//             {startDate && `Start: ${startDate.toLocaleDateString()}`}
//             {startDate && endDate && ' - '}
//             {endDate && `End: ${endDate.toLocaleDateString()}`}
//           </p>
//           {startDate && endDate && (
//             <p className="font-semibold">Total: ${calculateTotalPrice()}</p>
//           )}
//         </div>
//       )}
      
//       {isBookingFormOpen && (
//         <div className="mt-4 border-t pt-4">
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
//             <input
//               id="name"
//               type="text"
//               className="w-full p-2 border rounded"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               className="w-full p-2 border rounded"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
//             <input
//               id="phone"
//               type="tel"
//               className="w-full p-2 border rounded"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />
//           </div>
          
//           <button
//             onClick={handleBookingSubmit}
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//           >
//             Complete Booking
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

