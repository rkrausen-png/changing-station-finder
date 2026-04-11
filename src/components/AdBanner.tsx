import { usePremium } from "@/contexts/PremiumContext";
import { X, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdBannerProps {
  variant?: "inline" | "card";
  className?: string;
}

const ADS = [
  {
    title: "BabyGap",
    text: "New arrivals for little ones — 20% off this week!",
    color: "from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30",
    border: "border-blue-200/60",
  },
  {
    title: "Pampers",
    text: "Keep baby dry all day. Try new Pampers Premium — Free sample!",
    color: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    border: "border-green-200/60",
  },
  {
    title: "Buy Buy Baby",
    text: "Everything for your nursery. Shop the spring sale 🌸",
    color: "from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30",
    border: "border-pink-200/60",
  },
];

const AdBanner = ({ variant = "inline", className = "" }: AdBannerProps) => {
  const { isPremium, setShowPaywall } = usePremium();
  const [dismissed, setDismissed] = useState(false);
  const [ad] = useState(() => ADS[Math.floor(Math.random() * ADS.length)]);

  if (isPremium || dismissed) return null;

  if (variant === "card") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${ad.color} border ${ad.border} rounded-2xl p-3.5 relative ${className}`}
      >
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/5"
        >
          <X size={14} className="text-muted-foreground" />
        </button>
        <div className="flex items-center justify-between pr-6">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                Sponsored
              </span>
            </div>
            <p className="text-xs font-semibold text-foreground">{ad.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{ad.text}</p>
          </div>
          <ExternalLink size={14} className="text-muted-foreground flex-shrink-0" />
        </div>
        <button
          onClick={() => setShowPaywall(true)}
          className="text-[9px] text-primary font-semibold mt-2 underline underline-offset-2"
        >
          Remove ads with Premium
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center justify-between bg-gradient-to-r ${ad.color} border-y ${ad.border} px-4 py-2.5 ${className}`}
      >
        <div className="flex-1 mr-2">
          <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
            Sponsored
          </span>
          <p className="text-xs text-foreground font-medium">
            {ad.title}: {ad.text}
          </p>
        </div>
        <button onClick={() => setDismissed(true)}>
          <X size={14} className="text-muted-foreground" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdBanner;
