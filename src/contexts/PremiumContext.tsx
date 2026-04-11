import { createContext, useContext, useState, ReactNode } from "react";

interface PremiumContextType {
  isPremium: boolean;
  togglePremium: () => void;
  showPaywall: boolean;
  setShowPaywall: (show: boolean) => void;
  favorites: string[];
  addFavorite: (id: string) => boolean;
  removeFavorite: (id: string) => void;
  FREE_FAVORITES_LIMIT: number;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

const FREE_FAVORITES_LIMIT = 5;

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const togglePremium = () => setIsPremium((p) => !p);

  const addFavorite = (id: string): boolean => {
    if (!isPremium && favorites.length >= FREE_FAVORITES_LIMIT) {
      setShowPaywall(true);
      return false;
    }
    setFavorites((prev) => [...prev, id]);
    return true;
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f !== id));
  };

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        togglePremium,
        showPaywall,
        setShowPaywall,
        favorites,
        addFavorite,
        removeFavorite,
        FREE_FAVORITES_LIMIT,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) throw new Error("usePremium must be used within PremiumProvider");
  return context;
};
