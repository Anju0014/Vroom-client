// "use client"
// import {useEffect,useState} from 'react'
// import {Bell} from 'lucide-react'
// import { Notification } from '@/types/notificationTypes'
// import { io } from 'socket.io-client'
// import { NotificationService } from '@/services/common/notificationService'
// import { notificationIconMap, severityStyles } from '@/code/constants/notificationIcons';

// export default function NotificationBell({userId}:{userId:string}){
//     const [notifications,setNotifications]=useState<Notification[]>([])
//     const [unread,setUnread]=useState(0);
//     const[open,setOpen]=useState(false);


//     useEffect(() => {
//   if (!userId) return; 

//   const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
//     query: { userId },
//     withCredentials: true,
//   });

//   socket.on('connect', () => {
//     console.log('Socket connected successfully');
//   });

//   socket.on('connect_error', (err) => {
//     console.error('Socket connection error:', err);
//   });

//   socket.on("newNotification", (notification) => {
//     console.log("Received live notification:", notification);
//     setNotifications((prev) => [notification, ...prev]);
//     setUnread((prev) => prev + 1);
//   });

//   // If implementing mark-as-read real-time:
//   // socket.on('notificationRead', ({ id }) => {
//   //   setNotifications((prev) =>
//   //     prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
//   //   );
//   //   setUnread((prev) => Math.max(0, prev - 1));
//   // });

//   const fetchNotifications = async () => {
//     try {
//       const [notifs, count] = await Promise.all([
//         NotificationService.getNotifications(userId),
//         NotificationService.getUnreadCount(userId)
//       ]);
//       setNotifications(notifs);
//       setUnread(count);
//     } catch (err) {
//       console.error('Failed to load notifications', err);
//     }
//   };
  
//   fetchNotifications();

//   return () => {
//     socket.off('newNotification'); 
//     socket.off('notificationRead');
//     socket.disconnect();  // Add this to clean up on unmount (prevents leaks)
//   };
// }, [userId]);
    
  

//     return(
//       <div className="relative">
//       <button onClick={() => setOpen(!open)} className="relative p-2">
//         <Bell className="w-6 h-6" />
//         {unread > 0 && (
//           <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//             {unread}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
//           <div className="p-4 border-b font-bold">Notifications</div>
//           <div className="max-h-96 overflow-y-auto">
//             {Array.isArray(notifications) &&
//   notifications.slice(0, 10).map((notif) => (
//     <div key={notif.id} className={`p-3 border-b ${!notif.isRead ? 'bg-blue-50' : ''}`}>
//                 <h4 className="font-medium">{notif.title}</h4>
//                 <p className="text-sm text-gray-600">{notif.message}</p>
//               </div>
//   ))
// }
//             {/* {notifications.slice(0, 10).map(notif => (
//               <div key={notif.id} className={`p-3 border-b ${!notif.isRead ? 'bg-blue-50' : ''}`}>
//                 <h4 className="font-medium">{notif.title}</h4>
//                 <p className="text-sm text-gray-600">{notif.message}</p>
//               </div>
//             ))} */}
//           </div>
//         </div>
//       )}
//     </div>
//     )
// }


"use client";
import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Notification } from '@/types/notificationTypes';
import { io } from 'socket.io-client';
import { NotificationService } from '@/services/common/notificationService';
import { notificationIconMap, severityStyles } from '@/code/constants/notificationIcons';
import LoadingButton from './LoadingButton';

export default function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      query: { userId },
      withCredentials: true,
    });

    socket.on('newNotification', (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnread((prev) => prev + 1);
    });

    const fetchNotifications = async () => {
      try {
        const [notifs, count] = await Promise.all([
          NotificationService.getNotifications(userId),
          NotificationService.getUnreadCount(userId),
        ]);
        setNotifications(notifs);
        setUnread(count);
      } catch (err) {
        console.error('Failed to load notifications', err);
      }
    };

    fetchNotifications();

    return () => {
      socket.off('newNotification');
      socket.disconnect();
    };
  }, [userId]);

  return (
    <div className="relative">
      <LoadingButton onClick={() => setOpen(!open)} className="relative p-2">
        <Bell className="w-6 h-6" />
        {unread > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unread}
          </span>
        )}
      </LoadingButton>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b font-bold">Notifications</div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.slice(0, 10).map((notif) => {
              const Icon =
                notificationIconMap[notif.iconKey] ?? Bell;
              const severityClass =
                severityStyles[notif.severity] ?? 'text-gray-600 bg-gray-50';

              return (
                <div
                  key={notif.id}
                  className={`flex gap-3 p-3 border-b ${
                    !notif.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${severityClass}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className={`flex-1`}>
                    <h4 className="font-medium">{notif.title}</h4>
                    <p className="text-sm text-gray-60">{notif.message}</p>
                  </div>
                </div>
              );
            })}

            {notifications.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
