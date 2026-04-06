import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoIcon from "@/assets/logo-icon.png";

const FILTER_AMENITIES = [
  "Warm Water", "Wipes", "Clean", "Spacious", "Accessible",
  "Nursing Room", "Diaper Vending", "Lounge Seating",
];

interface WelcomeHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
}

const WelcomeHeader = ({ searchQuery, onSearchChange, selectedFilters, onFiltersChange }: WelcomeHeaderProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (amenity: string) => {
    onFiltersChange(
      selectedFilters.includes(amenity)
        ? selectedFilters.filter((f) => f !== amenity)
        : [...selectedFilters, amenity]
    );
  };

  const activeFilterCount = selectedFilters.length;

  return (
    <div className="bg-card safe-top border-b border-border">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src={logoIcon} alt="ChangeMate" className="w-8 h-8" />
            <h1 className="font-display font-bold text-lg text-foreground">
              ChangeMate
            </h1>
          </div>
          <span className="text-xs text-muted-foreground font-body italic">
            One diaper at a time 🍼
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search stations, stores..."
              className="w-full bg-muted rounded-xl py-2.5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X size={14} className="text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative p-2.5 rounded-xl transition-colors ${
              showFilters || activeFilterCount > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <SlidersHorizontal size={18} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-3">
                {FILTER_AMENITIES.map((amenity) => {
                  const isActive = selectedFilters.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      onClick={() => toggleFilter(amenity)}
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full transition-all ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isActive && "✓ "}{amenity}
                    </button>
                  );
                })}
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => onFiltersChange([])}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full text-primary underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WelcomeHeader;
