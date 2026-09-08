import { apiFetch } from '../lib/api';
import { EventType, FeatureType } from '../lib/constants';

export const eventService = {
  /**
   * Log an event to the events table
   */
  async logEvent(eventType: EventType, payload: any, featureSource: FeatureType) {
    try {
      return await apiFetch('/events/', {
        method: 'POST',
        body: JSON.stringify({
          event_type: eventType,
          payload,
          feature_source: featureSource
        })
      });
    } catch (err) {
      console.error('Failed to log event:', err);
      return null;
    }
  }
};
