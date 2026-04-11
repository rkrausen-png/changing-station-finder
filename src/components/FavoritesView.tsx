import { Heart, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { usePremium } from "@/contexts/PremiumContext";
import AdBanner from "@/components/AdBanner";

const FavoritesView = () => {
  const { favorites, isPremium, FREE_FAVORITES_LIMIT, setShowPaywall } = usePremium();

  return (
    <div className="px-4 py-6 pb-24 overflow-y-auto">
      {/* Favorites limit indicator for free users */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-3 mb-4 flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-foreground">
              {favorites.length}/{FREE_FAVORITES_LIMIT} saved stations
            </p>
            <p className="text-[10px] text-muted-foreground">
              Upgrade for unlimited saves
            </p>
          </div>
          <button
            onClick={() => setShowPaywall(true)}
            className="flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1.5 rounded-full"
          >
            <Crown size={10} /> Upgrade
          </button>
        </motion.div>
      )}

      {/* Ad banner */}
      <AdBanner variant="card" className="mb-4" />

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-peach-light flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-primary animate-bounce-gentle" />
            </div>
            <h2 className="font-display font-bold text-xl text-foreground mb-2">
              No Saved Stations Yet
            </h2>
            <p className="text-muted-foreground text-sm font-body max-w-xs mx-auto">
              Tap the heart icon on any station to save it here for quick access later!
            </p>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-2">
          {favorites.map((id) => (
            <div key={id} className="bg-card rounded-2xl p-3 border border-border shadow-card">
              <p className="text-sm font-medium text-foreground">Station {id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
