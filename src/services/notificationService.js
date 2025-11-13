import api from './api';

const NOTIFICATION_BASE_URL = '/api/notifications';

export const notificationAPI = {
  // Get all notifications for a user
  getUserNotifications: async (userId) => {
    const response = await api.get(`${NOTIFICATION_BASE_URL}/user/${userId}`);
    return response.data;
  },

  // Get unread notifications
  getUnreadNotifications: async (userId) => {
    const response = await api.get(`${NOTIFICATION_BASE_URL}/user/${userId}/unread`);
    return response.data;
  },

  // Get unread count
  getUnreadCount: async (userId) => {
    const response = await api.get(`${NOTIFICATION_BASE_URL}/user/${userId}/count`);
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const response = await api.put(`${NOTIFICATION_BASE_URL}/${notificationId}/read`);
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async (userId) => {
    const response = await api.put(`${NOTIFICATION_BASE_URL}/user/${userId}/read-all`);
    return response.data;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    const response = await api.delete(`${NOTIFICATION_BASE_URL}/${notificationId}`);
    return response.data;
  },
};

export default notificationAPI;

