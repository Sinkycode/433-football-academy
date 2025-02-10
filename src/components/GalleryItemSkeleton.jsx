import Skeleton from "./Skeleton";

const GalleryItemSkeleton = () => (
  <div className="relative group">
    <Skeleton
      className="w-full aspect-square rounded-xl"
      variant="rectangular"
    />
    <div className="absolute inset-0 bg-black/20 rounded-xl" />
  </div>
);

export default GalleryItemSkeleton;
