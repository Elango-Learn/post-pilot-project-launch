
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Image, Send, Smile, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const platforms: Platform[] = [
  { id: "twitter", name: "Twitter/X", icon: "X", color: "bg-black" },
  { id: "facebook", name: "Facebook", icon: "f", color: "bg-blue-600" },
  { id: "instagram", name: "Instagram", icon: "IG", color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" },
  { id: "linkedin", name: "LinkedIn", icon: "in", color: "bg-blue-700" },
];

const PostComposer = () => {
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter"]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  const handleImageUpload = () => {
    // In a real app, this would open a file picker
    // For this demo, we'll add a placeholder image
    setUploadedImages(prev => [...prev, "https://source.unsplash.com/random/300x200"]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handlePostSubmit = () => {
    // In a real app, this would send the post to the backend
    console.log({
      content,
      platforms: selectedPlatforms,
      images: uploadedImages,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
    });
    
    // Reset form
    setContent("");
    setUploadedImages([]);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", 
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg">Create Post</h2>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {platforms.map((platform) => (
            <Button
              key={platform.id}
              variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
              className={cn("gap-1", selectedPlatforms.includes(platform.id) ? "bg-gray-800 hover:bg-gray-700" : "")}
              onClick={() => handlePlatformToggle(platform.id)}
            >
              <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold", platform.color)}>
                {platform.icon}
              </span>
              <span className="text-sm">{platform.name}</span>
            </Button>
          ))}
        </div>
        
        <Tabs defaultValue="compose">
          <TabsList className="mb-4">
            <TabsTrigger value="compose" onClick={() => setPreviewMode(false)}>Compose</TabsTrigger>
            <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[120px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt="" className="h-32 w-full object-cover rounded-md" />
                    <button
                      className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="font-semibold text-sm">Your Business Name</p>
                  <p className="text-xs text-gray-500">@yourbusiness</p>
                </div>
              </div>
              
              <p className="text-sm mb-3">{content || "Your post preview will appear here"}</p>
              
              {uploadedImages.length > 0 && (
                <div className={`grid ${uploadedImages.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2 mb-3`}>
                  {uploadedImages.map((img, index) => (
                    <img key={index} src={img} alt="" className="rounded-md w-full h-40 object-cover" />
                  ))}
                </div>
              )}
              
              <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span>{format(new Date(), "MMM d, yyyy")}</span>
                <div className="flex gap-4">
                  <span>0 Likes</span>
                  <span>0 Shares</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-gray-50 p-4 flex flex-wrap items-center gap-2">
        <Button variant="outline" size="icon" onClick={handleImageUpload}>
          <Image size={18} />
        </Button>
        <Button variant="outline" size="icon">
          <Smile size={18} />
        </Button>
        
        <div className="ml-auto flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-1 text-sm">
                <CalendarIcon size={16} />
                {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Schedule date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-1 text-sm" disabled={!selectedDate}>
                <Clock size={16} />
                {selectedTime || "Select time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="end">
              <div className="grid grid-cols-2 gap-1 p-2 max-h-[200px] overflow-y-auto">
                {timeSlots.map((time) => (
                  <Button 
                    key={time} 
                    variant="ghost" 
                    className="text-xs justify-start"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            className="bg-brand-blue hover:bg-blue-600" 
            onClick={handlePostSubmit}
            disabled={content.trim() === "" || selectedPlatforms.length === 0}
          >
            {selectedDate && selectedTime ? "Schedule" : "Post Now"}
            <Send size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
