import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import toast from 'react-hot-toast';

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscribers = new Map();
  }

  connect(userId, onNotificationReceived) {
    if (this.connected) {
      console.log('WebSocket already connected');
      return;
    }

    const socket = new SockJS('http://localhost:8086/ws');

    this.client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      console.log('WebSocket Connected:', frame);
      this.connected = true;

      // Subscribe to user-specific queue
      const userSubscription = this.client.subscribe(
        `/user/${userId}/queue/notifications`,
        (message) => {
          const notification = JSON.parse(message.body);
          console.log('Received user notification:', notification);
          this.handleNotification(notification, onNotificationReceived);
        }
      );

      // Subscribe to user-specific topic
      const topicSubscription = this.client.subscribe(
        `/topic/notifications/${userId}`,
        (message) => {
          const notification = JSON.parse(message.body);
          console.log('Received topic notification:', notification);
          this.handleNotification(notification, onNotificationReceived);
        }
      );

      this.subscribers.set('user', userSubscription);
      this.subscribers.set('topic', topicSubscription);
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP error:', frame);
      this.connected = false;
    };

    this.client.onWebSocketClose = () => {
      console.log('WebSocket connection closed');
      this.connected = false;
    };

    this.client.activate();
  }

  handleNotification(notification, callback) {
    // Show toast notification
    const message = notification.message || notification.subject;

    switch (notification.type) {
      case 'ACCOUNT':
        toast.success(message, {
          duration: 5000,
          icon: '👤',
        });
        break;
      case 'APPOINTMENT':
        toast.info(message, {
          duration: 5000,
          icon: '📅',
        });
        break;
      case 'REPORT':
        toast.success(message, {
          duration: 5000,
          icon: '📄',
        });
        break;
      case 'SECURITY':
        toast.error(message, {
          duration: 6000,
          icon: '🔒',
        });
        break;
      default:
        toast(message, {
          duration: 4000,
          icon: '🔔',
        });
    }

    // Call the callback to update UI
    if (callback && typeof callback === 'function') {
      callback(notification);
    }
  }

  disconnect() {
    if (this.client && this.connected) {
      // Unsubscribe from all subscriptions
      this.subscribers.forEach((subscription) => {
        subscription.unsubscribe();
      });
      this.subscribers.clear();

      this.client.deactivate();
      this.connected = false;
      console.log('WebSocket disconnected');
    }
  }

  isConnected() {
    return this.connected;
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;

