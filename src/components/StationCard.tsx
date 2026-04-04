import { Star, Clock, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { ChangingStation } from "@/data/stations";

interface StationCardProps {
  station: ChangingStation;
  onSelect?: (station: ChangingStation) => void;
}

const StationCard = ({ station, onSelect }: StationCardProps) => {
  return (
    <motion.button
      onClick={() => onSelect?.(station)}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left bg-card rounded-2xl p-4 shadow-card border border-border relative overflow-hidden"
    >
      {station.isSponsored && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-peach-light text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full">
          <Sparkles size={10} />
          Sponsored
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground text-lg font-display font-bold">
            {station.storeName[0]}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground text-sm truncate">
            {station.name}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground truncate">
              {station.address}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-primary fill-primary" />
              <span className="text-xs font-semibold text-foreground">
                {station.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({station.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {station.hours}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {station.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-[10px] font-medium bg-mint-light text-accent px-2 py-0.5 rounded-full"
              >
                {amenity}
              </span>
            ))}
            {station.amenities.length > 3 && (
              <span className="text-[10px] text-muted-foreground">
                +{station.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default StationCard;
