import { AllPostsQueryResult } from "@/sanity.types";
import PostCard from './PostCard';

interface PostGridProps {
  posts: AllPostsQueryResult;
}

export default function PostGrid({ posts }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No posts available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <PostCard 
          key={post._id} 
          post={post} 
          isFeatured={index < 3} 
        />
      ))}
    </div>
  );
}