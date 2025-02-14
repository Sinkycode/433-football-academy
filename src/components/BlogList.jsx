import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../services/blogServices"; // Ensure this matches your service file
import { formatDate } from "../utils/dateUtils";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article key={post.id} className="group">
          <Link to={`/blog/${post.slug}`}>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={post.postImage?.url} // Updated to match your schema
                alt={post.title}
                className="w-full h-64 object-cover transition-transform 
                  duration-300 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span
                  className="bg-coral-red text-white px-4 py-1 
                  rounded-full text-sm"
                >
                  {post.postCategory} {/* Updated to match your schema */}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h3
                className="text-xl font-bold text-slate-900 
                group-hover:text-coral-red"
              >
                {post.title}
              </h3>
              <p className="mt-2 text-slate-600 line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={post.author?.picture?.url} // Ensure this matches your schema
                  alt={post.author?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {post.author?.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {formatDate(post.date)}{" "}
                    {/* Ensure this matches your schema */}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
