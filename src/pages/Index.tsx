import { useState, useMemo } from "react";
import WelcomeHeader from "@/components/WelcomeHeader";
import BottomNav from "@/components/BottomNav";
import MapView from "@/components/MapView";
import ListView from "@/components/ListView";
import FavoritesView from "@/components/FavoritesView";
import AdvertiseView from "@/components/AdvertiseView";
import SubmitStationView from "@/components/SubmitStationView";
import StationDetail from "@/components/StationDetail";
import AdBanner from "@/components/AdBanner";
import PremiumBadge from "@/components/PremiumBadge";
import { SAMPLE_STATIONS, type ChangingStation } from "@/data/stations";

const Index = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [selectedStation, setSelectedStation] = useState<ChangingStation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filteredStations = useMemo(() => {
    let results = SAMPLE_STATIONS;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.storeName.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
      );
    }

    if (selectedFilters.length > 0) {
      results = results.filter((s) =>
        selectedFilters.every((f) => s.amenities.includes(f))
      );
    }

    return results;
  }, [searchQuery, selectedFilters]);

  const handleStationSelect = (station: ChangingStation) => {
    setSelectedStation(station);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto relative">
      <WelcomeHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilters={selectedFilters}
        onFiltersChange={setSelectedFilters}
      />

      {/* Premium badge in header area */}
      <div className="flex justify-end px-4 -mt-1 mb-1">
        <PremiumBadge />
      </div>

      {/* Ad banner for free users */}
      {(activeTab === "list" || activeTab === "favorites") && (
        <AdBanner variant="inline" />
      )}

      <div className="flex-1 relative">
        {activeTab === "map" && (
          <div className="absolute inset-0 pb-20">
            <MapView stations={filteredStations} onStationSelect={handleStationSelect} />
          </div>
        )}
        {activeTab === "list" && (
          <ListView stations={filteredStations} onStationSelect={handleStationSelect} />
        )}
        {activeTab === "add" && <SubmitStationView />}
        {activeTab === "favorites" && <FavoritesView />}
        {activeTab === "advertise" && <AdvertiseView />}
        {activeTab === "community" && null}
      </div>

      <StationDetail station={selectedStation} onClose={() => setSelectedStation(null)} />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
