import { Crown } from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";

const PremiumBadge = () => {
  const { isPremium, setShowPaywall } = usePremium();

  if (isPremium) {
    return (
      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
        <Crown size={10} /> Premium
      </span>
    );
  }

  return (
    <button
      onClick={() => setShowPaywall(true)}
      className="inline-flex items-center gap-1 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full hover:from-primary/20"
    >
      <Crown size={10} /> Upgrade
    </button>
  );
};

export default PremiumBadge;
