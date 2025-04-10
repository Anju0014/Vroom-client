import Image from "next/image";

interface Props {
  images: string[];
  videoUrl: string;
}

export default function CarGallery({ images, videoUrl }: Props) {
  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <Image
          src={images[0]}
          alt="Car"
          width={400}
          height={300}
          className="rounded"
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <Image key={i} src={img} alt={`img-${i}`} width={100} height={80} />
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <iframe
          src={videoUrl}
          width="100%"
          height="300"
          className="rounded"
          allowFullScreen
        />
      </div>
    </div>
  );
}











// // components/CarGallery.tsx
// import React from 'react';

// interface Props {
//   images: string[];
//   videoUrl?: string;
// }

// export const CarGallery: React.FC<Props> = ({ images, videoUrl }) => {
//   return (
//     <div className="space-y-4">
//       <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
//         {videoUrl ? (
//           <video controls className="w-full h-full object-cover">
//             <source src={videoUrl} type="video/mp4" />
//           </video>
//         ) : (
//           <img src={images[0]} alt="Main" className="w-full h-full object-cover" />
//         )}
//       </div>
//       <div className="flex space-x-2">
//         {images.map((img, i) => (
//           <img
//             key={i}
//             src={img}
//             alt={`car-${i}`}
//             className="w-16 h-16 object-cover rounded-lg border"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
















// "use client";

// import { useState } from 'react';
// import Image from 'next/image';

// interface CarGalleryProps {
//   images: string[];
//   videoUrl: string;
// }


// export function CarGallery({ images, videoUrl }: CarGalleryProps) {
//   const [activeImage, setActiveImage] = useState(0);
//   const [showVideo, setShowVideo] = useState(false);

//   return (
//     <div className="mt-4">
//       <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
//         {showVideo ? (
//           <iframe 
//             src={videoUrl} 
//             className="w-full h-full"
//             title="Car video"
//             allowFullScreen
//             loading="lazy"
//           />
//         ) : images?.length > 0 ? (
//           <Image 
//             src={images[activeImage]} 
//             alt={`Car image ${activeImage}`}
//             fill 
//             className="object-cover"
//             priority
//           />
//         ) : (
//           <div className="flex items-center justify-center w-full h-full text-gray-500">
//             No images available
//           </div>
//         )}
//       </div>

//       <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
//         {images?.map((image, index) => (
//           <div 
//             key={index}
//             className={`w-24 h-16 relative cursor-pointer rounded-md overflow-hidden ${
//               activeImage === index && !showVideo ? 'ring-2 ring-blue-500' : ''
//             }`}
//             onClick={() => {
//               setActiveImage(index);
//               setShowVideo(false);
//             }}
//           >
//             <Image 
//               src={image} 
//               alt={`Car thumbnail ${index}`} 
//               fill 
//               className="object-cover"
//             />
//           </div>
//         ))}

//         {/* Video Thumbnail */}
//         <div 
//           key="video"
//           className={`w-24 h-16 relative cursor-pointer rounded-md overflow-hidden bg-gray-800 flex items-center justify-center ${
//             showVideo ? 'ring-2 ring-blue-500' : ''
//           }`}
//           onClick={() => setShowVideo(true)}
//         >
//           <div className="text-white text-xs font-medium">Play Video</div>
//         </div>
//       </div>
//     </div>
//   );
// }














// // "use client"
// //   // components/CarGallery.tsx
// //   import { useState } from 'react';
// //   import Image from 'next/image';
// //   import { Car1 } from '@/types/workTypes';
  
// //   interface CarGalleryProps {
// //     images: string[];
// //     videoUrl: string;
// //   }
// //   const cars: Car1[] = [
// //     {
// //       id: 'car-001',
// //       name: 'Tesla',
// //       model: 'Model 3',
// //       year: 2023,
// //       transmission: 'Automatic',
// //       seats: 5,
// //       price: 100,
// //       engine: 'Electric Motor',
// //       fuelEfficiency: '131 MPGe',
// //       images: [
// //         "https://vroom-car-images.s3.eu-north-1.amazonaws.com/car-images/1744181731042-pexels-anas-ahmed-1606053043-27575852.jpg",
       
// //       ],
// //       videoUrl: 'https://example.com/video-url',
// //       features: {
// //         interior: ['Heated Seats', 'Premium Audio', 'Glass Roof', 'Touchscreen Display'],
// //         safety: ['Autopilot', 'Emergency Braking', 'Lane Departure Warning'],
// //         additional: ['Supercharger Access', 'Premium Connectivity']
// //       },
// //       availability: {
// //         '2025-04-10': true,
// //         '2025-04-11': true,
// //         '2025-04-12': true,
// //         '2025-04-13': false,
// //         '2025-04-14': false,
// //         '2025-04-15': true,
// //         '2025-04-16': true,
// //       }
// //     }
// //   ];
  
  
// //   export default function CarGallery({ images, videoUrl }: CarGalleryProps) {
// //     const [activeImage, setActiveImage] = useState(0);
// //     const [showVideo, setShowVideo] = useState(false);
    
// //     return (
// //       <div className="mt-4">
// //         <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
// //           {showVideo ? (
// //             <div className="w-full h-full">
// //               <iframe 
// //                 src={videoUrl} 
// //                 className="w-full h-full"
// //                 title="Car video"
// //                 allowFullScreen
// //               />
// //             </div>
// //           ) : (

          
// //             <Image 
// //               src={images[activeImage]} 
// //               alt="Car image" 
// //               layout="fill" 
// //               objectFit="cover"
// //             />
// //           )}
// //         </div>
        
// //         <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
// //           {images.map((image, index) => (
// //             <div 
// //               key={index}
// //               className={`w-24 h-16 relative cursor-pointer rounded-md overflow-hidden ${
// //                 activeImage === index && !showVideo ? 'ring-2 ring-blue-500' : ''
// //               }`}
// //               onClick={() => {
// //                 setActiveImage(index);
// //                 setShowVideo(false);
// //               }}
// //             >
// //               <Image 
// //                 src={image} 
// //                 alt={`Car thumbnail ${index}`} 
// //                 layout="fill" 
// //                 objectFit="cover"
// //               />
// //             </div>
// //           ))}
// //           <div 
// //             className={`w-24 h-16 relative cursor-pointer rounded-md overflow-hidden bg-gray-800 flex items-center justify-center ${
// //               showVideo ? 'ring-2 ring-blue-500' : ''
// //             }`}
// //             onClick={() => setShowVideo(true)}
// //           >
// //             <div className="text-white text-xs font-medium">Play Video</div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }
  
  