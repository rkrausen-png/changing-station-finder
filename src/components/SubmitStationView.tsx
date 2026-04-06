import { useState } from "react";
import { MapPin, Send, CheckCircle, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const AMENITY_OPTIONS = [
  "Warm Water", "Wipes", "Clean", "Spacious", "Accessible",
  "Nursing Room", "Diaper Vending", "Lounge Seating", "Microwave",
  "Compact", "Quiet", "Private",
];

const SubmitStationView = () => {
  const [submitted, setSubmitted] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [stationName, setStationName] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location not supported on this device");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          );
          const data = await res.json();
          if (data.display_name) {
            setAddress(data.display_name);
            toast.success("Location found!");
          }
        } catch {
          toast.error("Could not get address from location");
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        toast.error("Could not get your location");
        setIsLocating(false);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim() || !address.trim()) {
      toast.error("Please fill in the store name and address");
      return;
    }
    // TODO: Save to database when backend is connected
    setSubmitted(true);
    toast.success("Thank you for helping other moms! 💕");
  };

  const handleReset = () => {
    setSubmitted(false);
    setStoreName("");
    setStationName("");
    setAddress("");
    setHours("");
    setSelectedAmenities([]);
    setNotes("");
  };

  return (
    <div className="px-4 py-4 pb-24 overflow-y-auto">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-20 h-20 rounded-full bg-mint-light flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={36} className="text-accent" />
            </div>
            <h2 className="font-display font-bold text-xl text-foreground mb-2">
              Station Submitted! 🎉
            </h2>
            <p className="text-muted-foreground text-sm font-body max-w-xs mx-auto mb-6">
              Your submission will be reviewed and added to help other parents. You're making a difference!
            </p>
            <button
              onClick={handleReset}
              className="gradient-warm text-primary-foreground font-display font-semibold py-3 px-8 rounded-2xl flex items-center gap-2 shadow-soft"
            >
              <Plus size={18} />
              Add Another Station
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl gradient-warm flex items-center justify-center mx-auto mb-3">
                <MapPin size={24} className="text-primary-foreground" />
              </div>
              <h2 className="font-display font-bold text-xl text-foreground">
                Add a Changing Station
              </h2>
              <p className="text-muted-foreground text-xs font-body mt-1">
                Help fellow parents by sharing stations you've found!
              </p>
            </div>

            {/* Store Name */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground mb-1.5 block">
                Store / Place Name *
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="e.g. Target, Starbucks, Library"
                className="w-full bg-muted rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Station Name (optional) */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground mb-1.5 block">
                Station Name <span className="text-muted-foreground font-body font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="e.g. Family Restroom, Women's Room"
                className="w-full bg-muted rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Address */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground mb-1.5 block">
                Address *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full street address"
                className="w-full bg-muted rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                onClick={handleUseLocation}
                disabled={isLocating}
                className="mt-2 text-xs font-semibold text-primary flex items-center gap-1"
              >
                <MapPin size={12} />
                {isLocating ? "Finding your location..." : "Use my current location"}
              </button>
            </div>

            {/* Hours */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground mb-1.5 block">
                Hours <span className="text-muted-foreground font-body font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g. 8am - 10pm"
                className="w-full bg-muted rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground mb-2 block">
                Amenities Available
              </label>
              <div className="flex flex-wrap gap-2">
                {AMENITY_OPTIONS.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                        isSelected
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isSelected && "✓ "}{amenity}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="font-display font-semibold text-sm text-foreground mb-1.5 block">
                Additional Notes <span className="text-muted-foreground font-body font-normal">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any tips for other parents? e.g. 'Located near the pharmacy section'"
                rows={3}
                className="w-full bg-muted rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full gradient-warm text-primary-foreground font-display font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-soft"
            >
              <Send size={18} />
              Submit Station
            </button>

            <p className="text-[10px] text-muted-foreground text-center font-body">
              Submissions are reviewed before being published. Thank you for helping! 💕
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubmitStationView;
