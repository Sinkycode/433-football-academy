import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import { fadeIn, staggerContainer } from "../constants/animations";
import { getAllPosts } from "../services/blogService";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Memoize categories - we'll get unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(posts.map((post) => post.postCategory)),
    ];
    return ["All", ...uniqueCategories];
  }, [posts]);

  // Memoize filtered posts
  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) =>
          activeCategory === "All" || post.postCategory === activeCategory
      ),
    [posts, activeCategory]
  );

  // Memoize category change handler
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const fetchedPosts = await getAllPosts();
        if (!abortController.signal.aborted) {
          console.log("Fetched posts:", fetchedPosts); // Log fetched posts
          setPosts(fetchedPosts);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Failed to fetch posts:", error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => abortController.abort();
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-container"
    >
      {/* Header */}
      <motion.div variants={fadeIn("up")} className="text-center mb-12">
        <h2 className="text-4xl font-montserrat font-bold mb-4">
          Latest <span className="text-coral-red">Insights</span>
        </h2>
        <p className="text-slate-gray max-w-lg mx-auto">
          Stay updated with our latest football news, tactical analysis, and
          training tips
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-2 rounded-full font-montserrat transition-all
              ${
                activeCategory === category
                  ? "bg-coral-red text-white"
                  : "bg-white text-slate-gray hover:bg-gray-100"
              }`}
            disabled={loading}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Blog Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            // Show skeletons while loading
            [...Array(6)].map((_, index) => (
              <BlogCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : filteredPosts.length > 0 ? (
            // Show filtered posts
            filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={{
                  ...post,
                  image: post.postImage.url, // Map Hygraph image URL to your existing structure
                  date: post.date, // Map publishedAt to date
                }}
              />
            ))
          ) : (
            // Show empty state
            <motion.div
              variants={fadeIn("up")}
              className="col-span-full text-center py-12"
            >
              <p className="text-slate-gray text-lg">
                No posts found for this category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Blog;
