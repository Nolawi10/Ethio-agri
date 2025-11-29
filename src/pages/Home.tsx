import { Button } from "@/components/ui/button";
import { Camera, BookOpen, MessageCircle, Leaf, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <img src={logo} alt="Ethio Agri Logo" className="w-24 h-24 mx-auto mb-4" />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full mb-4">
            <Leaf className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success ethiopic">
              AI የሚተገበር የእፅዋት ጤንነት ምርመራ
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold ethiopic leading-tight">
            የእፅዋት ጤንነት ምርመራ
            <span className="block text-primary mt-2">በአንድ ሰከንድ ውስጥ</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto ethiopic">
            ፎቶ ይውሰዱ፣ የእፅዋትዎን ጤንነት ያረጋግጡ እና የአካባቢያዊ ማዳበሪያ እና ሕክምና ምክሮችን ያግኙ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg h-14 px-8 bg-gradient-primary hover:opacity-90 shadow-medium ethiopic"
              onClick={() => navigate("/diagnose")}
            >
              <Camera className="w-5 h-5 mr-2" />
              ፊታ ይውሰዱ - ምርመራን ይጀምሩ
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg h-14 px-8 ethiopic"
              onClick={() => navigate("/guides")}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              መመሪያዎችን ይመልከቱ
            </Button>
            
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-lg h-14 px-8 ethiopic"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="w-5 h-5 mr-2" />
              ይግቡ / ይመዝገቡ
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div 
            className="bg-card p-6 rounded-xl shadow-soft border border-border hover:shadow-medium transition-all cursor-pointer"
            onClick={() => navigate("/diagnose")}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 ethiopic">ፈጣን ምርመራ</h3>
            <p className="text-muted-foreground ethiopic">
              በ AI የሚተገበር የምስል ትንታኔ የእፅዋት በሽታዎችን፣ ተባዮችን እና የንጥረ ነገሮችን እጥረት ይለያል
            </p>
          </div>

          <div 
            className="bg-card p-6 rounded-xl shadow-soft border border-border hover:shadow-medium transition-all cursor-pointer"
            onClick={() => navigate("/guides")}
          >
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2 ethiopic">ከመስመር ውጭ መመሪያዎች</h3>
            <p className="text-muted-foreground ethiopic">
              ለተለያዩ ሰብሎች የአግሮቤዮሎጂ ምክሮችን፣ የመከላከያ እርምጃዎችን እና ምርጥ ልምዶችን ያግኙ
            </p>
          </div>

          <div 
            className="bg-card p-6 rounded-xl shadow-soft border border-border hover:shadow-medium transition-all cursor-pointer"
            onClick={() => navigate("/market")}
          >
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-2 ethiopic">የአካባቢ ምክሮች</h3>
            <p className="text-muted-foreground ethiopic">
              በኢትዮጵያ የአየር ንብረት እና የአፈር ሁኔታዎች ላይ የተመሰረተ ምክሮች ያግኙ
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gradient-primary rounded-2xl p-8 md:p-12 text-primary-foreground">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90 ethiopic">የሰብል አይነቶች</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-sm md:text-base opacity-90 ethiopic">የትክክለኛነት መጠን</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm md:text-base opacity-90 ethiopic">ከመስመር ውጭ ድጋፍ</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
