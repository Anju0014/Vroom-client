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
    const { data } = await api.get(API_ROUTES.notification.getUnreadCount, {
      params: { userId }
    });
    return data.count; 
  },

  async markAsRead(id: string, userId: string) {
    await api.patch(`${API_ROUTES.notification.markAsRead}/${id}`, null, {
      params: { userId }
    });
  }
};
