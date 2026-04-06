import { Star, Clock, MapPin, X, Sparkles, Navigation, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChangingStation } from "@/data/stations";
import { openDirections } from "@/lib/maps";
import { toast } from "sonner";

interface StationDetailProps {
  station: ChangingStation | null;
  onClose: () => void;
}

const StationDetail = ({ station, onClose }: StationDetailProps) => {
  const handleGetDirections = () => {
    if (!station) return;
    openDirections(station.lat, station.lng, station.name);
  };

  const handleShare = async () => {
    if (!station) return;
    const text = `Check out this changing station at ${station.name} - ${station.address}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: station.name, text, url: window.location.href });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <AnimatePresence>
      {station && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-3xl shadow-soft border-t border-border max-h-[70vh] overflow-y-auto safe-bottom"
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-1 bg-border rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
              <button onClick={handleShare} className="p-1 rounded-full bg-muted">
                <Share2 size={16} className="text-muted-foreground" />
              </button>
              <button onClick={onClose} className="p-1 rounded-full bg-muted">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl gradient-warm flex items-center justify-center">
                <span className="text-primary-foreground text-xl font-display font-bold">
                  {station.storeName[0]}
                </span>
              </div>
              <div>
                <h2 className="font-display font-bold text-foreground text-lg">
                  {station.name}
                </h2>
                {station.isSponsored && (
                  <div className="inline-flex items-center gap-1 bg-peach-light text-primary text-xs font-semibold px-2 py-0.5 rounded-full mt-1">
                    <Sparkles size={10} />
                    Featured Partner
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-primary fill-primary" />
                <span className="text-sm font-semibold">{station.rating}</span>
                <span className="text-sm text-muted-foreground">({station.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{station.hours}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mb-4">
              <MapPin size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{station.address}</span>
            </div>

            <div className="mb-5">
              <h3 className="font-display font-semibold text-sm text-foreground mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {station.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="text-xs font-medium bg-mint-light text-accent px-3 py-1.5 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleGetDirections}
                className="flex-1 gradient-warm text-primary-foreground font-display font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-soft"
              >
                <Navigation size={18} />
                Get Directions
              </button>
              <button
                onClick={handleShare}
                className="px-4 bg-muted text-foreground font-display font-semibold py-3.5 rounded-2xl flex items-center justify-center"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StationDetail;
