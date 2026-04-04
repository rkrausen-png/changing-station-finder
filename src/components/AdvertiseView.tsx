import { Megaphone, TrendingUp, Users, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "Reach Moms Daily",
    description: "Connect with thousands of moms actively looking for family-friendly locations.",
  },
  {
    icon: Eye,
    title: "Premium Visibility",
    description: "Sponsored listings appear at the top of search results and on the map.",
  },
  {
    icon: TrendingUp,
    title: "Drive Foot Traffic",
    description: "Moms discover your business when they need it most — on the go.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    features: ["1 location listing", "Basic analytics", "Standard placement"],
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    features: ["Up to 10 locations", "Featured placement", "Priority support", "Detailed analytics"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Unlimited locations", "Premium map pins", "Custom branding", "Dedicated manager"],
  },
];

const AdvertiseView = () => {
  return (
    <div className="px-4 py-6 pb-24 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 rounded-2xl gradient-warm flex items-center justify-center mx-auto mb-4">
          <Megaphone size={28} className="text-primary-foreground" />
        </div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Advertise With Us
        </h2>
        <p className="text-muted-foreground text-sm font-body max-w-xs mx-auto">
          Put your business in front of moms who are already looking for family-friendly spots.
        </p>
      </motion.div>

      <div className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 bg-card rounded-2xl p-4 shadow-card border border-border"
          >
            <div className="w-10 h-10 rounded-xl bg-mint-light flex items-center justify-center flex-shrink-0">
              <feature.icon size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-foreground">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <h3 className="font-display font-bold text-lg text-foreground mb-4 text-center">
        Choose Your Plan
      </h3>

      <div className="space-y-3 mb-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`rounded-2xl p-4 border ${
              plan.popular
                ? "border-primary shadow-soft bg-peach-light"
                : "border-border bg-card shadow-card"
            } relative`}
          >
            {plan.popular && (
              <div className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] font-semibold px-3 py-0.5 rounded-full">
                Most Popular
              </div>
            )}
            <div className="flex items-baseline justify-between mb-3">
              <h4 className="font-display font-semibold text-foreground">
                {plan.name}
              </h4>
              <div>
                <span className="font-display font-bold text-xl text-foreground">
                  {plan.price}
                </span>
                <span className="text-xs text-muted-foreground">{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-1.5">
              {plan.features.map((f) => (
                <li key={f} className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <button className="w-full gradient-warm text-primary-foreground font-display font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-soft">
        Get Started
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default AdvertiseView;
