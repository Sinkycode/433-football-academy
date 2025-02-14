import { memo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateUtils"; // We'll create this

const BlogImage = memo(({ postImage, title, postCategory }) => (
  <div className="relative overflow-hidden rounded-xl aspect-[16/10]">
    <img
      src={postImage.url}
      alt={title}
      className="w-full h-full object-cover transform group-hover:scale-110 
        transition-transform duration-300"
      loading="lazy"
      decoding="async"
    />
    <div className="absolute top-4 left-4">
      <span className="bg-coral-red text-white px-4 py-1 rounded-full text-sm">
        {postCategory}
      </span>
    </div>
  </div>
));

BlogImage.displayName = "BlogImage";

BlogImage.propTypes = {
  postImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  postCategory: PropTypes.string.isRequired,
};

const BlogMeta = memo(({ date, readTime }) => (
  <div className="flex items-center gap-4 text-slate-gray text-sm mb-2">
    <p>{formatDate(date)}</p>
    <span aria-hidden="true">•</span>
    <p>{readTime} min read</p>
  </div>
));

BlogMeta.displayName = "BlogMeta";

BlogMeta.propTypes = {
  date: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired,
};

const BlogCard = memo(({ post }) => {
  console.log("Blog post data:", post); // Debugging: Check the post object
  return (
    <Link to={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group cursor-pointer"
      >
        <BlogImage
          postImage={post.postImage}
          title={post.title}
          postCategory={post.postCategory}
        />

        <div className="mt-4">
          <BlogMeta date={post.date} readTime={post.readTime} />

          <h3
            className="font-montserrat font-bold text-xl mb-2 group-hover:text-coral-red 
          transition-colors line-clamp-2"
          >
            {post.title}
          </h3>

          <p className="text-slate-gray line-clamp-2">{post.content.text}</p>
        </div>
      </motion.article>
    </Link>
  );
});

BlogCard.displayName = "BlogCard";

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    postImage: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    postCategory: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readTime: PropTypes.number.isRequired,
  }).isRequired,
};

export default BlogCard;
