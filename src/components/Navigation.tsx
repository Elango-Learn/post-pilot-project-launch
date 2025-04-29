
import { Bell, Calendar, Image, MessageSquare, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="hidden md:flex flex-col h-screen w-16 bg-white border-r border-gray-200">
      <div className="flex flex-col items-center py-4">
        <div className="mb-8">
          <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center">
            <span className="text-white font-bold">SM</span>
          </div>
        </div>
        
        <nav className="flex flex-col items-center space-y-6">
          <Link to="/" className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-brand-light hover:text-brand-blue transition-colors">
            <MessageSquare size={20} />
          </Link>
          <Link to="/calendar" className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-brand-light hover:text-brand-blue transition-colors">
            <Calendar size={20} />
          </Link>
          <Link to="/media" className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-brand-light hover:text-brand-blue transition-colors">
            <Image size={20} />
          </Link>
          <Link to="/audience" className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-brand-light hover:text-brand-blue transition-colors">
            <Users size={20} />
          </Link>
          <Link to="/notifications" className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-brand-light hover:text-brand-blue transition-colors">
            <Bell size={20} />
          </Link>
        </nav>
        
        <div className="mt-auto">
          <Link to="/settings" className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-brand-light hover:text-brand-blue transition-colors">
            <Settings size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
