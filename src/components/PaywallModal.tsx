import { X, Crown, Star, Camera, Heart, MapPin, Ban, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePremium } from "@/contexts/PremiumContext";
import { useState } from "react";
import { toast } from "sonner";

const features = [
  { icon: Ban, label: "Ad-free experience", free: false },
  { icon: Camera, label: "Photo reviews", free: false },
  { icon: Heart, label: "Unlimited saved stations", free: false },
  { icon: MapPin, label: "Route planner", free: false },
  { icon: Star, label: "Verified reviewer badge", free: false },
  { icon: Sparkles, label: "Priority submissions", free: false },
];

const freeFeatures = [
  "Search & browse stations",
  "Text reviews",
  "Up to 5 saved stations",
  "Community access",
  "Get directions",
];

const PaywallModal = () => {
  const { showPaywall, setShowPaywall, togglePremium } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  const handleSubscribe = () => {
    togglePremium();
    setShowPaywall(false);
    toast.success("Welcome to MomStation Premium! 👑");
  };

  return (
    <AnimatePresence>
      {showPaywall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => setShowPaywall(false)}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-card rounded-t-3xl sm:rounded-3xl p-6 pb-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center">
                  <Crown size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-foreground">Go Premium</h2>
                  <p className="text-xs text-muted-foreground">Unlock all features</p>
                </div>
              </div>
              <button onClick={() => setShowPaywall(false)} className="p-2 rounded-full hover:bg-muted">
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Plan toggle */}
            <div className="flex bg-muted rounded-2xl p-1 mb-5">
              <button
                onClick={() => setSelectedPlan("monthly")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedPlan === "monthly"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan("yearly")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
                  selectedPlan === "yearly"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-1 bg-accent text-accent-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  SAVE 40%
                </span>
              </button>
            </div>

            {/* Price */}
            <div className="text-center mb-5">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display font-bold text-3xl text-foreground">
                  {selectedPlan === "monthly" ? "$4.99" : "$2.99"}
                </span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              {selectedPlan === "yearly" && (
                <p className="text-xs text-accent font-semibold mt-1">
                  $35.88/year — billed annually
                </p>
              )}
            </div>

            {/* Premium features */}
            <div className="space-y-2.5 mb-5">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-peach-light flex items-center justify-center flex-shrink-0">
                    <f.icon size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{f.label}</span>
                  <Crown size={12} className="text-primary ml-auto" />
                </div>
              ))}
            </div>

            {/* Free features */}
            <div className="bg-muted/50 rounded-2xl p-4 mb-5">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Always free
              </p>
              {freeFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2 py-1">
                  <Check size={14} className="text-accent" />
                  <span className="text-xs text-foreground/80">{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubscribe}
              className="w-full gradient-warm text-primary-foreground font-display font-bold py-4 rounded-2xl text-base shadow-soft mb-3"
            >
              Start Free 7-Day Trial
            </button>
            <p className="text-center text-[10px] text-muted-foreground">
              Cancel anytime. No commitment required.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaywallModal;
