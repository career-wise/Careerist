import { supabase } from '../lib/supabase';
import { EventType, FeatureType } from '../lib/constants';

export const eventService = {
  /**
   * Log an event to the events table
   */
  async logEvent(eventType: EventType, payload: any, featureSource: FeatureType) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('Cannot log event: No user signed in');
        return null;
      }

      const { data, error } = await supabase
        .from('events')
        .insert({
          user_id: user.id,
          event_type: eventType,
          payload,
          feature_source: featureSource
        })
        .select()
        .single();

      if (error) {
        console.error('Error logging event:', error);
        throw error;
      }

      return data;
    } catch (err) {
      console.error('Failed to log event:', err);
      return null;
    }
  }
};
