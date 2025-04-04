
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bgnngzkkpeifzayrjvbz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbm5nemtrcGVpZnpheXJqdmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDQ5ODcsImV4cCI6MjA1ODkyMDk4N30.5JDoF8xK3e1fLv14TUZ4tTrbE4llP_6fqtg0PY-dYlw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: localStorage
  }
});

// Enable realtime for all tables we use in admin panel
const channel = supabase.channel('admin-panel-changes')
  // Realtime for slider images
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'slider_images' 
  }, (payload) => {
    console.log('Change received on slider_images!', payload);
  })
  // Realtime for social links
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'social_links' 
  }, (payload) => {
    console.log('Change received on social_links!', payload);
  })
  // Realtime for gallery items
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'gallery_items' 
  }, (payload) => {
    console.log('Change received on gallery_items!', payload);
  })
  // Realtime for events
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'events' 
  }, (payload) => {
    console.log('Change received on events!', payload);
  })
  .subscribe();

// Export the channel for potential cleanup
export const realtimeChannel = channel;

// Define a base event interface that all components can use
export interface Event {
  id: string;
  name: string;
  description: string | null;
  place: string;
  location: string | null;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  image_url: string | null;
  category: string;
  created_at?: string;
  updated_at?: string;
  past?: boolean;
  
  // Additional fields needed for EventItem component
  title?: string;
  date?: string;
  time?: string;
  image?: string;
  registrationLink?: string;
}

// Define interfaces for the tables not included in the auto-generated types
export interface PageContent {
  id: string;
  page_id: string;
  content: Json;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

// Define a Json type to match Supabase's Json type
export type Json = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

// Create a typed version of supabase client that handles our custom tables
export const customSupabase = {
  from: (table: string) => {
    // This type assertion tells TypeScript to trust us that the table exists
    return supabase.from(table as any);
  },
  // Add channel method to our custom client
  channel: (name: string) => {
    return supabase.channel(name);
  },
  // Add removeChannel method to our custom client
  removeChannel: (channel: any) => {
    return supabase.removeChannel(channel);
  },
  // Add storage methods to our custom client
  storage: {
    from: (bucket: string) => supabase.storage.from(bucket),
    listBuckets: () => supabase.storage.listBuckets(),
    createBucket: (id: string, options?: { public: boolean }) => 
      supabase.storage.createBucket(id, options)
  }
};
