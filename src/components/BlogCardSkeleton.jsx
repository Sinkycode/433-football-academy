import Skeleton from "./Skeleton";

const BlogCardSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="w-full h-[250px] rounded-xl" />
    <div className="space-y-4">
      <div className="flex gap-4">
        <Skeleton className="w-20 h-4" variant="text" />
        <Skeleton className="w-20 h-4" variant="text" />
      </div>
      <Skeleton className="w-3/4 h-6" variant="text" />
      <Skeleton className="w-full h-4" variant="text" />
      <Skeleton className="w-2/3 h-4" variant="text" />
    </div>
  </div>
);

export default BlogCardSkeleton;
