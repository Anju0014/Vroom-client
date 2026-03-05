import { API_ROUTES } from "@/code/constants/apiRoutes";
// import { plainAxios } from "@/code/plainAxios";
import api from "@/code/axiosInstance";

// const commonApi = plainAxios;

export const NotificationService = {
  async getNotifications(userId: string) {
    const { data } = await api.get(API_ROUTES.notification.getNotification, {
      params: { userId }
    });
    return data.data; 
  },

  async getUnreadCount(userId: string) {
    const { data } = await api.get(API_ROUTES.notification.getUnreadCount, 
      { params: { userId }
    });
    return data.count; 
  },

  async markAllAsRead(userId: string) {
    console.log("markas",userId)
    await api.patch(API_ROUTES.notification.markAllAsRead,
      null,
      { params: { userId }
    });
    console.log("response")
  }
};
