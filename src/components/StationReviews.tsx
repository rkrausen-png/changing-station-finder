import { useState } from "react";
import { Star, ThumbsUp, User, Camera, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { usePremium } from "@/contexts/PremiumContext";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Sarah M.",
    rating: 5,
    text: "Super clean and spacious! Had warm water and plenty of counter space. My favorite spot in the area.",
    date: "2 days ago",
    helpful: 12,
  },
  {
    id: "r2",
    author: "Jessica L.",
    rating: 4,
    text: "Good changing station but it can get busy on weekends. Wipes were stocked though!",
    date: "1 week ago",
    helpful: 5,
  },
  {
    id: "r3",
    author: "Emily R.",
    rating: 5,
    text: "Love this place. Staff is so helpful and the restroom is always clean. Highly recommend for new moms!",
    date: "2 weeks ago",
    helpful: 8,
  },
];

interface StationReviewsProps {
  stationId: string;
}

const StationReviews = ({ stationId }: StationReviewsProps) => {
  const [reviews] = useState<Review[]>(MOCK_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState("");
  const [helpfulIds, setHelpfulIds] = useState<Set<string>>(new Set());
  const { isPremium, setShowPaywall } = usePremium();

  const handleSubmit = () => {
    if (newRating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!newText.trim()) {
      toast.error("Please write a review");
      return;
    }
    toast.success("Review submitted! Thanks for helping other moms 💕");
    setShowForm(false);
    setNewRating(0);
    setNewText("");
  };

  const toggleHelpful = (id: string) => {
    setHelpfulIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="mt-5 border-t border-border pt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-foreground">
          Reviews ({reviews.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm font-semibold text-primary"
        >
          {showForm ? "Cancel" : "+ Write Review"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="bg-muted rounded-2xl p-4 space-y-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setNewRating(star)}>
                    <Star
                      size={24}
                      className={
                        star <= newRating
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Share your experience to help other moms..."
                className="w-full bg-card border border-border rounded-xl p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {/* Photo upload - premium only */}
              <button
                onClick={() => {
                  if (!isPremium) {
                    setShowPaywall(true);
                    return;
                  }
                  toast.info("Photo upload coming soon!");
                }}
                className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl border border-border ${
                  isPremium ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Camera size={14} />
                Add Photo
                {!isPremium && <Crown size={10} className="text-primary" />}
              </button>
              <button
                onClick={handleSubmit}
                className="w-full gradient-warm text-primary-foreground font-display font-semibold py-2.5 rounded-xl text-sm"
              >
                Submit Review
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className="bg-muted/50 rounded-2xl p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                  <User size={14} className="text-muted-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {review.author}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {review.date}
              </span>
            </div>
            <div className="flex gap-0.5 mb-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  className={
                    star <= review.rating
                      ? "text-primary fill-primary"
                      : "text-muted-foreground"
                  }
                />
              ))}
            </div>
            <p className="text-sm text-foreground/80 mb-2">{review.text}</p>
            <button
              onClick={() => toggleHelpful(review.id)}
              className={`flex items-center gap-1 text-xs ${
                helpfulIds.has(review.id)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <ThumbsUp size={12} />
              Helpful ({review.helpful + (helpfulIds.has(review.id) ? 1 : 0)})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationReviews;
