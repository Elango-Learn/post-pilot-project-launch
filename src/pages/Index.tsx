
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import PostComposer from "@/components/PostComposer";
import RecentPosts from "@/components/RecentPosts";
import AnalyticsSummary from "@/components/AnalyticsSummary";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <PostComposer />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <RecentPosts />
              </div>
              <div className="lg:col-span-5">
                <AnalyticsSummary />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
