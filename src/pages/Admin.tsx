
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryManager from "@/components/admin/GalleryManager";
import SocialLinksEditor from "@/components/admin/SocialLinksEditor";
import TicketManager from "@/components/admin/TicketManager";
import TicketPackageManager from "@/components/admin/TicketPackageManager";
import NewsletterSubscriptions from "@/components/admin/NewsletterSubscriptions";
import SliderManager from "@/components/admin/SliderManager";
import ContentManager from "@/components/admin/ContentManager";
import EventManager from "@/components/admin/EventManager";
import AdminLogin from "@/components/admin/AdminLogin";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("slider");

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (data && data.session) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans le panneau d'administration",
      });
    }
  };
  
  // Check if there's a hash in the URL to set the active tab
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tab = hash.replace('#', '');
      setActiveTab(tab);
    } else {
      // Default to slider tab if no hash is present
      setActiveTab('slider');
      // Update URL hash using history API
      window.history.replaceState(null, '', `#slider`);
    }
  }, []);

  // Update the URL hash when the active tab changes
  useEffect(() => {
    if (isAuthenticated && activeTab) {
      window.history.replaceState(null, '', `#${activeTab}`);
    }
  }, [activeTab, isAuthenticated]);

  // Handle tab value change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL hash using history API to avoid full page reload
    window.history.replaceState(null, '', `#${value}`);
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-festival-primary align-[-0.125em]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-festival-secondary">Chargement du panneau d'administration...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <div className="pt-20 md:pt-32 pb-20 px-4 md:px-0">
          <div className="festival-container">
            <AdminLogin onLogin={handleLogin} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <div className="pt-20 md:pt-32 pb-20 px-4 md:px-0">
        <div className="festival-container">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-festival-primary text-center md:text-left">
              Panneau d'Administration
            </h1>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6 md:mb-8 w-full overflow-x-auto">
              <TabsTrigger value="slider" className="whitespace-nowrap">Slider</TabsTrigger>
              <TabsTrigger value="gallery" className="whitespace-nowrap">Galerie</TabsTrigger>
              <TabsTrigger value="events" className="whitespace-nowrap">Événements</TabsTrigger>
              <TabsTrigger value="tickets" className="whitespace-nowrap">Billets</TabsTrigger>
              <TabsTrigger value="packages" className="whitespace-nowrap">Forfaits</TabsTrigger>
              <TabsTrigger value="content" className="whitespace-nowrap hidden md:block">Contenu</TabsTrigger>
              <TabsTrigger value="social" className="whitespace-nowrap hidden md:block">Liens</TabsTrigger>
              <TabsTrigger value="newsletter" className="whitespace-nowrap hidden md:block">Newsletter</TabsTrigger>
            </TabsList>
            
            {/* Second row for small screens */}
            <TabsList className="grid grid-cols-3 mb-6 w-full overflow-x-auto md:hidden">
              <TabsTrigger value="content" className="whitespace-nowrap">Contenu</TabsTrigger>
              <TabsTrigger value="social" className="whitespace-nowrap">Liens</TabsTrigger>
              <TabsTrigger value="newsletter" className="whitespace-nowrap">Newsletter</TabsTrigger>
            </TabsList>

            <TabsContent value="slider" className="p-4 md:p-6 bg-white rounded-xl shadow-soft">
              <SliderManager />
            </TabsContent>

            <TabsContent value="gallery" className="p-4 md:p-6 bg-white rounded-xl shadow-soft">
              <GalleryManager />
            </TabsContent>

            <TabsContent value="events" className="p-4 md:p-6 bg-white rounded-xl shadow-soft">
              <EventManager />
            </TabsContent>

            <TabsContent value="tickets" className="p-4 md:p-6 bg-white rounded-xl shadow-soft">
              <TicketManager />
            </TabsContent>

            <TabsContent value="packages" className="p-4 md:p-6 bg-white rounded-xl shadow-soft">
              <TicketPackageManager />
            </TabsContent>

            <TabsContent value="content" className="p-4 md:p-6 bg-white rounded-xl shadow-soft">
              <ContentManager />
            </TabsContent>

            <TabsContent value="social" className="p-4 md:p-6 bg-white rounded-xl shadow-soft">
              <SocialLinksEditor />
            </TabsContent>

            <TabsContent value="newsletter" className="p-4 md:p-6 bg-white rounded-xl shadow-soft">
              <NewsletterSubscriptions />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
