"use client"
import {useEffect,useState} from 'react'
import {Bell} from 'lucide-react'
import { Notification } from '@/types/notificationTypes'
import { io } from 'socket.io-client'
import { NotificationService } from '@/services/common/notificationService'
 
export default function NotificationBell({userId}:{userId:string}){
    const [notifications,setNotifications]=useState<Notification[]>([])
    const [unread,setUnread]=useState(0);
    const[open,setOpen]=useState(false);

     useEffect(() => {
    if (!userId) return; 

    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      query: { userId },
      withCredentials: true,
    });

    socket.emit("join", userId);


  socket.on("newNotification", (notification) => {
    console.log("Received live notification:", notification);
    setNotifications((prev) => [notification, ...prev]);
    setUnread((prev) => prev + 1);
  });

  const fetchNotifications = async () => {
    try {
      const [notifs, count] = await Promise.all([
        NotificationService.getNotifications(userId),
        NotificationService.getUnreadCount(userId)
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
    socket.off('notificationRead');
  };
}, [userId]);

    
    
  

    return(
      <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2">
        <Bell className="w-6 h-6" />
        {unread > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4 border-b font-bold">Notifications</div>
          <div className="max-h-96 overflow-y-auto">
            {Array.isArray(notifications) &&
  notifications.slice(0, 10).map((notif) => (
    <div key={notif.id} className={`p-3 border-b ${!notif.isRead ? 'bg-blue-50' : ''}`}>
                <h4 className="font-medium">{notif.title}</h4>
                <p className="text-sm text-gray-600">{notif.message}</p>
              </div>
  ))
}
            {/* {notifications.slice(0, 10).map(notif => (
              <div key={notif.id} className={`p-3 border-b ${!notif.isRead ? 'bg-blue-50' : ''}`}>
                <h4 className="font-medium">{notif.title}</h4>
                <p className="text-sm text-gray-600">{notif.message}</p>
              </div>
            ))} */}
          </div>
        </div>
      )}
    </div>
    )
}