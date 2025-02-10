import { memo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const BlogImage = memo(({ image, title, category }) => (
  <div className="relative overflow-hidden rounded-xl aspect-[16/10]">
    <picture>
      {/* WebP version */}
      <source srcSet={`${image.replace(".jpg", ".webp")}`} type="image/webp" />
      {/* Fallback jpg */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-110 
          transition-transform duration-300"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <div className="absolute top-4 left-4">
      <span className="bg-coral-red text-white px-4 py-1 rounded-full text-sm">
        {category}
      </span>
    </div>
  </div>
));

BlogImage.displayName = "BlogImage";

BlogImage.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

const BlogMeta = memo(({ date, readTime }) => (
  <div className="flex items-center gap-4 text-slate-gray text-sm mb-2">
    <p>{date}</p>
    <span aria-hidden="true">•</span>
    <p>{readTime} min read</p>
  </div>
));

BlogMeta.displayName = "BlogMeta";

BlogMeta.propTypes = {
  date: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired,
};

const BlogCard = memo(({ post }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <BlogImage image={post.image} title={post.title} category={post.category} />

    <div className="mt-4">
      <BlogMeta date={post.date} readTime={post.readTime} />

      <h3
        className="font-montserrat font-bold text-xl mb-2 group-hover:text-coral-red 
        transition-colors line-clamp-2"
      >
        {post.title}
      </h3>

      <p className="text-slate-gray line-clamp-2">{post.excerpt}</p>
    </div>
  </motion.article>
));

BlogCard.displayName = "BlogCard";

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readTime: PropTypes.number.isRequired,
  }).isRequired,
};

export default BlogCard;
