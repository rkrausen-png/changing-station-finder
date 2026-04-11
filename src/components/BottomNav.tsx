import { Map, List, Heart, MessageCircle, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "map", icon: Map, label: "Map" },
  { id: "list", icon: List, label: "Nearby" },
  { id: "add", icon: PlusCircle, label: "Add" },
  { id: "favorites", icon: Heart, label: "Saved" },
  { id: "community", icon: MessageCircle, label: "Community" },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const navigate = useNavigate();

  const handleTabChange = (tabId: string) => {
    if (tabId === "community") {
      navigate("/community");
      return;
    }
    onTabChange(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isAddButton = tab.id === "add";
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative flex flex-col items-center gap-0.5 py-1 px-2 ${
                isAddButton ? "-mt-4" : ""
              }`}
            >
              {isActive && !isAddButton && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full gradient-warm"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {isAddButton ? (
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-soft ${
                  isActive ? "gradient-warm" : "bg-primary"
                }`}>
                  <tab.icon size={24} className="text-primary-foreground" />
                </div>
              ) : (
                <tab.icon
                  size={22}
                  className={isActive ? "text-primary" : "text-muted-foreground"}
                />
              )}
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
