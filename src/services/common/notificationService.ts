import { API_ROUTES } from "@/code/constants/apiRoutes";
import axiosInstance from "@/lib/axiosInstance";

const commonApi = axiosInstance;

export const NotificationService = {
  async getNotifications(userId: string) {
    const { data } = await commonApi.get(API_ROUTES.notification.getNotification, {
      params: { userId }
    });
    return data.data; 
  },

  async getUnreadCount(userId: string) {
    const { data } = await commonApi.get(API_ROUTES.notification.getUnreadCount, {
      params: { userId }
    });
    return data.count; 
  },

  async markAsRead(id: string, userId: string) {
    await commonApi.patch(`${API_ROUTES.notification.markAsRead}/${id}`, null, {
      params: { userId }
    });
  }
};
