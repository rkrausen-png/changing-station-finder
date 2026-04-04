import { Search } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const WelcomeHeader = () => {
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

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for changing stations nearby..."
            className="w-full bg-muted rounded-xl py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
