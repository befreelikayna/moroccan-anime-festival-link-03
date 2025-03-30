
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, MapPin, Instagram, Facebook, Youtube, Twitter, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FestivalLink from "@/components/FestivalLink";
import Footer from "@/components/Footer";
import DiscordIcon from "@/components/icons/DiscordIcon";
import TicketPackage from "@/components/TicketPackage";

const Index = () => {
  const [email, setEmail] = useState("");
  const [ticketPackages, setTicketPackages] = useState([
    {
      id: "1",
      name: "Pass 1 Jour",
      price: 150,
      description: "Accès à tous les événements pour une journée",
      features: [
        "Accès à toutes les expositions",
        "Accès aux panels et discussions",
        "Accès aux projections",
        "Accès à la zone marchande"
      ],
      isPopular: false
    },
    {
      id: "2",
      name: "Pass 3 Jours",
      price: 350,
      description: "Accès à tous les événements pendant les trois jours du festival",
      features: [
        "Accès complet aux trois jours",
        "Accès à toutes les expositions",
        "Accès aux panels et discussions",
        "Accès aux projections",
        "Accès à la zone marchande",
        "T-shirt exclusif du festival"
      ],
      isPopular: true
    },
    {
      id: "3",
      name: "Pass VIP",
      price: 500,
      description: "Accès prioritaire, cadeaux exclusifs et rencontres avec les invités spéciaux",
      features: [
        "Accès complet aux trois jours",
        "Entrée prioritaire sans file d'attente",
        "Accès aux zones VIP",
        "Kit souvenir exclusif",
        "Rencontre avec les invités spéciaux",
        "Place réservée pour les événements principaux"
      ],
      isPopular: false
    }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, you would send this to a backend
    // For now, we'll just show a success message
    toast({
      title: "Inscription réussie!",
      description: "Merci de vous être inscrit à notre newsletter.",
    });
    
    // Reset form
    setEmail("");
    
    // In a real app, you would also send the email to your backend or email service
    console.log(`Email newsletter subscription: ${email}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <HeroSection />

      {/* Ticket Packages Section */}
      <section className="py-20" id="tickets">
        <div className="festival-container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <h2 className="section-heading inline-block">Billets</h2>
            <p className="text-festival-secondary max-w-2xl mx-auto mt-4">
              Choisissez le type de billet qui vous convient et préparez-vous à vivre une expérience inoubliable au festival SHOTAKU.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ticketPackages.map((pkg) => (
              <TicketPackage 
                key={pkg.id}
                name={pkg.name}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                isPopular={pkg.isPopular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="festival-container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-soft border border-slate-100"
              variants={sectionVariants}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 mb-6">
                <CalendarDays className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-festival-primary">3 Jours d'Événements</h3>
              <p className="text-festival-secondary">
                Profitez de trois jours complets remplis d'activités, de spectacles et d'expériences uniques autour de la culture japonaise.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-soft border border-slate-100"
              variants={sectionVariants}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-50 mb-6">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-festival-primary">Communauté Passionnée</h3>
              <p className="text-festival-secondary">
                Rejoignez des milliers de fans d'anime et de manga pour célébrer ensemble notre passion commune pour la culture japonaise.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-soft border border-slate-100"
              variants={sectionVariants}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-50 mb-6">
                <MapPin className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-festival-primary">Lieu Exceptionnel</h3>
              <p className="text-festival-secondary">
                Un espace unique au cœur de Casablanca transformé en véritable paradis pour les amateurs de culture japonaise et geek.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="festival-container">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <h2 className="section-heading inline-block">Rejoignez-nous en ligne</h2>
            <p className="text-festival-secondary max-w-2xl mx-auto mt-4">
              Suivez-nous sur les réseaux sociaux pour rester informé des dernières actualités, annonces et coulisses du festival.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto flex flex-col space-y-4">
            <FestivalLink
              title="Instagram"
              description="Photos, stories et actualités"
              url="https://www.instagram.com/shotakume/"
              icon={<Instagram className="h-5 w-5 text-pink-600" />}
            />
            <FestivalLink
              title="Facebook"
              description="Événements et communauté"
              url="https://facebook.com/OTAKU.sho"
              icon={<Facebook className="h-5 w-5 text-blue-600" />}
            />
            <FestivalLink
              title="YouTube"
              description="Vidéos et diffusions en direct"
              url="https://www.youtube.com/@MarocEvents"
              icon={<Youtube className="h-5 w-5 text-red-600" />}
            />
            <FestivalLink
              title="Discord - Shotaku Talk"
              description="Rejoignez notre communauté Discord"
              url="https://discord.gg/KKGCF86z"
              icon={<DiscordIcon className="h-5 w-5 text-indigo-600" />}
            />
            <FestivalLink
              title="Twitter"
              description="Suivez nos actualités"
              url="https://x.com/shotakume"
              icon={<Twitter className="h-5 w-5 text-blue-400" />}
            />
            <FestivalLink
              title="Groupe Facebook Communautaire"
              description="Rejoignez notre groupe de fans"
              url="https://www.facebook.com/groups/1627285827526134"
              icon={<Facebook className="h-5 w-5 text-blue-600" />}
            />
            <FestivalLink
              title="SHOTAKU TV"
              description="Notre chaîne dédiée à l'anime"
              url="https://www.youtube.com/@ShotakuTv"
              icon={<Youtube className="h-5 w-5 text-red-600" />}
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-festival-primary text-white">
        <div className="festival-container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Restez informé
            </h2>
            <p className="text-slate-300 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir les dernières informations sur le festival, les invités spéciaux et les offres exclusives.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-grow px-4 py-3 rounded-full focus:outline-none text-festival-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-festival-accent text-white font-medium 
                shadow-accent transition-all duration-300 hover:shadow-lg hover:bg-opacity-90"
              >
                S'inscrire
              </button>
            </form>
            <p className="text-xs text-slate-400 mt-4">
              En vous inscrivant, vous acceptez de recevoir nos emails et confirmez avoir lu notre politique de confidentialité.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
