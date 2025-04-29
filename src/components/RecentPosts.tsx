
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share } from "lucide-react";

interface Post {
  id: string;
  content: string;
  images: string[];
  platform: string;
  date: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const mockPosts: Post[] = [
  {
    id: "1",
    content: "Exciting news! We're launching our new product next week. Stay tuned for more details! #ProductLaunch #Innovation",
    images: ["https://source.unsplash.com/random/600x400?product"],
    platform: "twitter",
    date: "2 hours ago",
    metrics: { likes: 24, comments: 5, shares: 7 }
  },
  {
    id: "2",
    content: "We had a great time at the industry conference last weekend. Thanks to everyone who stopped by our booth!",
    images: ["https://source.unsplash.com/random/600x400?conference", "https://source.unsplash.com/random/600x400?meeting"],
    platform: "facebook",
    date: "Yesterday",
    metrics: { likes: 57, comments: 12, shares: 3 }
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, { bg: string, icon: string }> = {
    twitter: { bg: "bg-black", icon: "X" },
    facebook: { bg: "bg-blue-600", icon: "f" },
    instagram: { bg: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500", icon: "IG" },
    linkedin: { bg: "bg-blue-700", icon: "in" },
  };
  
  const { bg, icon } = icons[platform] || { bg: "bg-gray-500", icon: "?" };
  
  return (
    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${bg}`}>
      {icon}
    </span>
  );
};

const RecentPosts = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Recent Posts</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div>
        {mockPosts.map((post) => (
          <div key={post.id} className="p-4 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm">Your Business Name</p>
                  <div className="flex items-center gap-1">
                    <PlatformIcon platform={post.platform} />
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">@yourbusiness</p>
              </div>
            </div>
            
            <p className="text-sm mb-3">{post.content}</p>
            
            {post.images.length > 0 && (
              <div className={`grid ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2 mb-3`}>
                {post.images.map((img, index) => (
                  <img key={index} src={img} alt="" className="rounded-md w-full h-48 object-cover" />
                ))}
              </div>
            )}
            
            <div className="flex justify-between text-xs text-gray-600 pt-2">
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 h-auto">
                  <Heart size={14} /> <span>{post.metrics.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 h-auto">
                  <MessageSquare size={14} /> <span>{post.metrics.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 h-auto">
                  <Share size={14} /> <span>{post.metrics.shares}</span>
                </Button>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Boost Post
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
