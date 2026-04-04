import { motion } from "framer-motion";
import StationCard from "./StationCard";
import type { ChangingStation } from "@/data/stations";

interface ListViewProps {
  stations: ChangingStation[];
  onStationSelect: (station: ChangingStation) => void;
}

const ListView = ({ stations, onStationSelect }: ListViewProps) => {
  return (
    <div className="px-4 py-4 pb-24 space-y-3 overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-bold text-lg text-foreground">
          Nearby Stations
        </h2>
        <span className="text-xs text-muted-foreground font-body">
          {stations.length} found
        </span>
      </div>
      {stations.map((station, i) => (
        <motion.div
          key={station.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <StationCard station={station} onSelect={onStationSelect} />
        </motion.div>
      ))}
    </div>
  );
};

export default ListView;
