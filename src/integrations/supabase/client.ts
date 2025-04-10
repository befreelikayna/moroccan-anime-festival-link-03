
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
  // Add realtime for tickets 
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'tickets' 
  }, (payload) => {
    console.log('Change received on tickets!', payload);
  })
  // Add realtime for partners
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'partners' 
  }, (payload) => {
    console.log('Change received on partners!', payload);
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

// Define a Ticket interface for the tickets table
export interface Ticket {
  id: string;
  name: string;
  price: number;
  description: string | null;
  available: boolean;
  features?: string[];
  created_at?: string;
  updated_at?: string;
}

// Define a Partner interface for the partners table
export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  order_number: number;
  active: boolean;
  category: string | null;
  created_at?: string;
  updated_at?: string;
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

// Create a helper function to safely handle Supabase data
export function safeDataAccess<T>(item: any, defaultValue: T): T {
  return item !== undefined && item !== null ? item as T : defaultValue;
}

// Create a typed version of supabase client that includes better type safety
export const customSupabase = {
  from: (table: string) => {
    // Create a properly typed result by forcing any to help with TypeScript errors
    // This is a workaround for the Supabase typing issues
    return supabase.from(table as any);
  },
  // Add channel method to our custom client
  channel: (name: string) => {
    return supabase.channel(name);
  },
  // Add removeChannel method to our custom client
  removeChannel: (channel: any) => {
    return supabase.removeChannel(channel);
  }
};
