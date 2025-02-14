import { memo } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/dateUtils";

const BlogPost = memo(({ post }) => {
  console.log("post data:", post); // Debugging: Check the post object

  return (
    <article className="max-w-4xl mx-auto px-4">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="bg-coral-red text-white px-4 py-1 rounded-full text-sm">
            {post.postCategory}
          </span>
        </div>
        <h1 className="text-4xl font-montserrat font-bold text-slate-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-slate-gray">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">•</span>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      <img
        src={post.postImage.url}
        alt={post.title}
        className="w-full h-[60vh] object-cover rounded-xl mb-12"
      />

      <div
        className="prose prose-lg max-w-none prose-headings:font-montserrat 
          prose-headings:font-bold prose-a:text-coral-red"
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      />
    </article>
  );
});

BlogPost.displayName = "BlogPost";

BlogPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    postCategory: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    readTime: PropTypes.number.isRequired,
    postImage: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.shape({
      html: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogPost;
