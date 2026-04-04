import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const FavoritesView = () => {
  return (
    <div className="px-4 py-6 pb-24 flex flex-col items-center justify-center min-h-[60vh]">
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
  );
};

export default FavoritesView;
