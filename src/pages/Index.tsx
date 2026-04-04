import { useState } from "react";
import WelcomeHeader from "@/components/WelcomeHeader";
import BottomNav from "@/components/BottomNav";
import MapView from "@/components/MapView";
import ListView from "@/components/ListView";
import FavoritesView from "@/components/FavoritesView";
import AdvertiseView from "@/components/AdvertiseView";
import StationDetail from "@/components/StationDetail";
import { SAMPLE_STATIONS, type ChangingStation } from "@/data/stations";

const Index = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [selectedStation, setSelectedStation] = useState<ChangingStation | null>(null);

  const handleStationSelect = (station: ChangingStation) => {
    setSelectedStation(station);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative">
      <WelcomeHeader />

      <div className="flex-1 relative">
        {activeTab === "map" && (
          <div className="absolute inset-0 pb-20">
            <MapView stations={SAMPLE_STATIONS} onStationSelect={handleStationSelect} />
          </div>
        )}
        {activeTab === "list" && (
          <ListView stations={SAMPLE_STATIONS} onStationSelect={handleStationSelect} />
        )}
        {activeTab === "favorites" && <FavoritesView />}
        {activeTab === "advertise" && <AdvertiseView />}
      </div>

      <StationDetail station={selectedStation} onClose={() => setSelectedStation(null)} />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
