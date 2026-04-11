import { useState } from "react";
import { ArrowLeft, MessageCircle, ThumbsUp, Plus, Clock, TrendingUp, User, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Post {
  id: string;
  author: string;
  title: string;
  body: string;
  category: string;
  timeAgo: string;
  upvotes: number;
  commentCount: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  text: string;
  timeAgo: string;
}

const CATEGORIES = ["All", "Tips", "Questions", "Recommendations", "Rants", "Wins"];

const SAMPLE_POSTS: Post[] = [
  {
    id: "p1",
    author: "MamaBear2024",
    title: "Best changing stations at airports?",
    body: "Flying with my 6-month-old next week. Which airports have the best changing facilities? Any tips for diaper changes mid-flight? 😅",
    category: "Questions",
    timeAgo: "2h ago",
    upvotes: 24,
    commentCount: 8,
    comments: [
      { id: "c1", author: "TravelMom", text: "ATL has family restrooms near every gate! They even have little toddler seats. Highly recommend.", timeAgo: "1h ago" },
      { id: "c2", author: "JessicaW", text: "Pro tip: bring a portable changing pad for the airplane. The fold-down ones in lavatories are tiny!", timeAgo: "45m ago" },
    ],
  },
  {
    id: "p2",
    author: "NewMomNYC",
    title: "Shoutout to Target Herald Square! 🎯",
    body: "Just want to say their changing station is ALWAYS clean. Warm water, stocked wipes, and the staff is so kind. If you're in Midtown, this is the spot!",
    category: "Wins",
    timeAgo: "5h ago",
    upvotes: 42,
    commentCount: 5,
    comments: [
      { id: "c3", author: "SarahM", text: "Yes!! I love this Target. They really go above and beyond for parents.", timeAgo: "3h ago" },
    ],
  },
  {
    id: "p3",
    author: "DadOfTwins",
    title: "Why are men's restrooms still lacking changing tables?",
    body: "I'm a dad and I can't tell you how many times I've had to change diapers on the floor because men's restrooms don't have changing tables. It's 2026 — let's do better! Can we add a flag for this in the app?",
    category: "Rants",
    timeAgo: "8h ago",
    upvotes: 89,
    commentCount: 15,
    comments: [
      { id: "c4", author: "MamaBear2024", text: "THIS. My husband deals with this all the time. Absolutely needs more visibility.", timeAgo: "7h ago" },
      { id: "c5", author: "AdminTeam", text: "Great idea! We're looking into adding a 'Men's Room' amenity tag. Stay tuned! 🙌", timeAgo: "6h ago" },
    ],
  },
  {
    id: "p4",
    author: "OrganicMama",
    title: "Diaper bag essentials — what am I missing?",
    body: "Currently packing: diapers, wipes, change of clothes, plastic bags, hand sanitizer, snacks. What else should I always have?",
    category: "Tips",
    timeAgo: "12h ago",
    upvotes: 31,
    commentCount: 12,
    comments: [
      { id: "c6", author: "ExperiencedMom", text: "Portable changing pad, diaper cream, and a small toy to keep them distracted during changes!", timeAgo: "10h ago" },
    ],
  },
  {
    id: "p5",
    author: "ChicagoMom",
    title: "Any recommendations near Millennium Park?",
    body: "Taking my toddler downtown this weekend. Where can I find a good changing station near Millennium Park / the Bean area?",
    category: "Recommendations",
    timeAgo: "1d ago",
    upvotes: 15,
    commentCount: 6,
    comments: [
      { id: "c7", author: "WindyCityParent", text: "The Cultural Center on Michigan Ave has a nice family restroom on the 2nd floor!", timeAgo: "20h ago" },
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Tips: "bg-accent/10 text-accent",
  Questions: "bg-primary/10 text-primary",
  Recommendations: "bg-accent/10 text-accent",
  Rants: "bg-destructive/10 text-destructive",
  Wins: "bg-primary/10 text-primary",
};

const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"hot" | "new">("hot");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  // New post form
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState("Questions");

  // Reply
  const [replyText, setReplyText] = useState("");

  const filteredPosts = posts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => (sortBy === "hot" ? b.upvotes - a.upvotes : 0));

  const handleUpvote = (id: string) => {
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNewPost = () => {
    if (!newTitle.trim() || !newBody.trim()) {
      toast.error("Please fill in title and body");
      return;
    }
    const post: Post = {
      id: `p${Date.now()}`,
      author: "You",
      title: newTitle,
      body: newBody,
      category: newCategory,
      timeAgo: "Just now",
      upvotes: 0,
      commentCount: 0,
      comments: [],
    };
    setPosts([post, ...posts]);
    setShowNewPost(false);
    setNewTitle("");
    setNewBody("");
    toast.success("Post published! 🎉");
  };

  const handleReply = (postId: string) => {
    if (!replyText.trim()) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              commentCount: p.commentCount + 1,
              comments: [
                ...p.comments,
                { id: `c${Date.now()}`, author: "You", text: replyText, timeAgo: "Just now" },
              ],
            }
          : p
      )
    );
    setReplyText("");
    toast.success("Reply posted!");
  };

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border px-4 pt-3 pb-2 safe-top">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate("/")} className="p-1">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">Mom Community</h1>
            <p className="text-xs text-muted-foreground">Ask, share & support each other 💛</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                activeCategory === cat
                  ? "gradient-warm text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={() => setSortBy("hot")}
            className={`flex items-center gap-1 text-xs font-medium ${sortBy === "hot" ? "text-primary" : "text-muted-foreground"}`}
          >
            <TrendingUp size={14} /> Hot
          </button>
          <button
            onClick={() => setSortBy("new")}
            className={`flex items-center gap-1 text-xs font-medium ${sortBy === "new" ? "text-primary" : "text-muted-foreground"}`}
          >
            <Clock size={14} /> New
          </button>
        </div>
      </div>

      {/* New Post FAB */}
      <button
        onClick={() => setShowNewPost(true)}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 rounded-full gradient-warm shadow-soft flex items-center justify-center"
      >
        <Plus size={28} className="text-primary-foreground" />
      </button>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/40 flex items-end"
            onClick={() => setShowNewPost(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card w-full max-w-lg mx-auto rounded-t-3xl p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-display font-bold text-foreground text-lg mb-4">New Post</h2>
              <div className="flex gap-2 mb-3 overflow-x-auto">
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewCategory(cat)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      newCategory === cat
                        ? "gradient-warm text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title..."
                className="w-full bg-muted border border-border rounded-xl px-3 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Share your thoughts, questions, or tips..."
                className="w-full bg-muted border border-border rounded-xl p-3 text-sm resize-none h-28 mb-4 focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleNewPost}
                className="w-full gradient-warm text-primary-foreground font-display font-semibold py-3 rounded-xl"
              >
                Post
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts */}
      <div className="px-4 py-4 space-y-3 pb-24">
        {filteredPosts.map((post) => {
          const isExpanded = expandedPost === post.id;
          const isUpvoted = upvotedIds.has(post.id);
          return (
            <motion.div
              key={post.id}
              layout
              className="bg-card rounded-2xl border border-border p-4 shadow-card"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                  <User size={14} className="text-muted-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground">{post.author}</span>
                <span className="text-xs text-muted-foreground">· {post.timeAgo}</span>
                <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[post.category] || "bg-muted text-muted-foreground"}`}>
                  {post.category}
                </span>
              </div>

              <h3 className="font-display font-semibold text-foreground text-sm mb-1">{post.title}</h3>
              <p className="text-sm text-foreground/75 mb-3">{post.body}</p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleUpvote(post.id)}
                  className={`flex items-center gap-1 text-xs font-medium ${isUpvoted ? "text-primary" : "text-muted-foreground"}`}
                >
                  <ThumbsUp size={14} />
                  {post.upvotes + (isUpvoted ? 1 : 0)}
                </button>
                <button
                  onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                  className="flex items-center gap-1 text-xs text-muted-foreground font-medium"
                >
                  <MessageCircle size={14} />
                  {post.commentCount} {post.commentCount === 1 ? "reply" : "replies"}
                </button>
              </div>

              {/* Expanded Comments */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User size={10} className="text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-foreground">{comment.author}</span>
                              <span className="text-[10px] text-muted-foreground">{comment.timeAgo}</span>
                            </div>
                            <p className="text-xs text-foreground/75">{comment.text}</p>
                          </div>
                        </div>
                      ))}

                      {/* Reply Input */}
                      <div className="flex gap-2 pt-1">
                        <input
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="flex-1 bg-muted border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                          onKeyDown={(e) => e.key === "Enter" && handleReply(post.id)}
                        />
                        <button
                          onClick={() => handleReply(post.id)}
                          className="p-2 gradient-warm rounded-xl"
                        >
                          <Send size={14} className="text-primary-foreground" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Community;
