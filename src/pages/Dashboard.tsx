import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Leaf,
  Calendar,
  TrendingUp,
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Prediction {
  id: number;
  date: string;
  cropAm: string;
  cropEn: string;
  diagnosisAm: string;
  diagnosisEn: string;
  confidence: number;
  imageUrl: string;
  recommendations: string[];
  status: "healthy" | "deficiency" | "disease" | "pest";
}

const Dashboard = () => {
  const { toast } = useToast();
  
  const [predictions] = useState<Prediction[]>([
    { 
      id: 1, 
      date: "2024-01-15", 
      cropAm: "ጤፍ", 
      cropEn: "Teff",
      diagnosisAm: "የናይትሮጅን እጥረት", 
      diagnosisEn: "Nitrogen Deficiency",
      confidence: 92, 
      imageUrl: "https://c8.alamy.com/comp/2P4FTNT/nitrogen-deficiency-in-wheat-triticum-aestivum-close-up-of-the-leaves-2P4FTNT.jpg",
      recommendations: [
        "ዩሪያ ማዳበሪያ በሄክታር 100 ኪሎ ግራም ይጨምሩ",
        "ከዝናብ በኋላ ማዳበሪያውን ይተግብሩ",
        "በ2 ሳምንት ውስጥ ድጋሜ ይፈትሹ"
      ],
      status: "deficiency"
    },
    { 
      id: 2, 
      date: "2024-01-14", 
      cropAm: "በቆሎ", 
      cropEn: "Maize",
      diagnosisAm: "ጤናማ ሰብል", 
      diagnosisEn: "Healthy Crop",
      confidence: 95, 
      imageUrl: "https://media.istockphoto.com/id/1061097354/photo/the-corn-plant-in-the-field.jpg?s=612x612&w=0&k=20&c=NEEzE5il-up8g7NZj_7HJUpyVep18zBRfhnMZ5laLiQ=&fit=crop",
      recommendations: [
        "የአሁኑን እንክብካቤ ይቀጥሉ",
        "በየ2 ሳምንቱ ይፈትሹ"
      ],
      status: "healthy"
    },
    { 
      id: 3, 
      date: "2024-01-12", 
      cropAm: "ቡና", 
      cropEn: "Coffee",
      diagnosisAm: "የቅጠል ዝገት በሽታ", 
      diagnosisEn: "Leaf Rust Disease",
      confidence: 87, 
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROSUEuxrZPGTok0fLeOahviyD0BAe3kn3zuQ&s",
      recommendations: [
        "የመዳብ ላይ የተመሰረተ ፈንገስ መድሃኒት ይጠቀሙ",
        "የተጎዱ ቅጠሎችን ያስወግዱ",
        "በዙሪያው ያሉ ሰብሎችን ይፈትሹ"
      ],
      status: "disease"
    },
    { 
      id: 4, 
      date: "2024-01-10", 
      cropAm: "ስንዴ", 
      cropEn: "Wheat",
      diagnosisAm: "አፊድ ወረራ", 
      diagnosisEn: "Aphid Infestation",
      confidence: 89, 
      imageUrl: "https://thumbs.dreamstime.com/b/aphid-infestation-green-leaves-showing-pests-plant-foliage-natural-garden-environment-aphid-infestation-green-leaves-412722530.jpg",
      recommendations: [
        "ተፈጥሮአዊ ፀረ ተባይ ይጠቀሙ",
        "ጠቃሚ ነፍሳትን ያስተዋውቁ",
        "በየቀኑ ይፈትሹ"
      ],
      status: "pest"
    },
    { 
      id: 5, 
      date: "2024-01-08", 
      cropAm: "ማሽላ", 
      cropEn: "Sorghum",
      diagnosisAm: "የፖታሲየም እጥረት", 
      diagnosisEn: "Potassium Deficiency",
      confidence: 84, 
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuRkzVcWcvEGWQMeUCkecTB5PVhazEVNsfw&s",
      recommendations: [
        "ፖታሲየም ያለው ማዳበሪያ ይጨምሩ",
        "የአፈር ምርመራ ያድርጉ"
      ],
      status: "deficiency"
    },
    { 
      id: 6, 
      date: "2024-01-06", 
      cropAm: "ሽንኩርት", 
      cropEn: "Onion",
      diagnosisAm: "የፈንገስ በሽታ", 
      diagnosisEn: "Fungal Disease",
      confidence: 91, 
      imageUrl: "https://www.shutterstock.com/image-photo/antracnose-disease-on-bulb-onion-260nw-2422860189.jpg",
      recommendations: [
        "የፈንገስ መድሃኒት ይጠቀሙ",
        "የውሃ ፍሰት ያሻሽሉ",
        "የተጎዱ ተክሎችን ያስወግዱ"
      ],
      status: "disease"
    },
    { 
      id: 7, 
      date: "2024-01-05", 
      cropAm: "ድንች", 
      cropEn: "Potato",
      diagnosisAm: "ጤናማ ሰብል", 
      diagnosisEn: "Healthy Crop",
      confidence: 93, 
      imageUrl: "https://www.garden.eco/wp-content/uploads/2018/01/potato-leaves.jpg",
      recommendations: [
        "የአሁኑን እንክብካቤ ይቀጥሉ",
        "ማዳበሪያ በወቅቱ ይጨምሩ"
      ],
      status: "healthy"
    },
  ]);

  const stats = {
    totalPredictions: predictions.length,
    healthyCount: predictions.filter(p => p.status === "healthy").length,
    issueCount: predictions.filter(p => p.status !== "healthy").length,
    avgConfidence: Math.round(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-success text-success-foreground";
      case "deficiency": return "bg-accent text-accent-foreground";
      case "disease": return "bg-destructive text-destructive-foreground";
      case "pest": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "healthy": return "ጤናማ";
      case "deficiency": return "እጥረት";
      case "disease": return "በሽታ";
      case "pest": return "ተባይ";
      default: return status;
    }
  };

  const handleExport = () => {
    toast({
      title: "ወደ ውጭ እየተላከ ነው",
      description: "የምርመራ ታሪክዎ እየተዘጋጀ ነው..."
    });
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold ethiopic flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-primary" />
                የእኔ ዳሽቦርድ
              </h1>
              <p className="text-muted-foreground ethiopic mt-1">
                የምርመራ ታሪክዎን እና ውጤቶችን ይመልከቱ
              </p>
            </div>
            <Button onClick={handleExport} variant="outline" className="ethiopic">
              <Download className="w-4 h-4 mr-2" />
              ታሪክ ያውርዱ
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalPredictions}</div>
                  <div className="text-sm text-muted-foreground ethiopic">ጠቅላላ ምርመራዎች</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.healthyCount}</div>
                  <div className="text-sm text-muted-foreground ethiopic">ጤናማ ሰብሎች</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.issueCount}</div>
                  <div className="text-sm text-muted-foreground ethiopic">ችግር ያለባቸው</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.avgConfidence}%</div>
                  <div className="text-sm text-muted-foreground ethiopic">አማካይ ትክክለኛነት</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Predictions Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all" className="ethiopic">ሁሉም</TabsTrigger>
              <TabsTrigger value="healthy" className="ethiopic">ጤናማ</TabsTrigger>
              <TabsTrigger value="issues" className="ethiopic">ችግሮች</TabsTrigger>
              <TabsTrigger value="recent" className="ethiopic">የቅርብ</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {predictions.map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} getStatusColor={getStatusColor} getStatusLabel={getStatusLabel} />
              ))}
            </TabsContent>

            <TabsContent value="healthy" className="space-y-4">
              {predictions.filter(p => p.status === "healthy").map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} getStatusColor={getStatusColor} getStatusLabel={getStatusLabel} />
              ))}
            </TabsContent>

            <TabsContent value="issues" className="space-y-4">
              {predictions.filter(p => p.status !== "healthy").map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} getStatusColor={getStatusColor} getStatusLabel={getStatusLabel} />
              ))}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              {predictions.slice(0, 3).map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} getStatusColor={getStatusColor} getStatusLabel={getStatusLabel} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface PredictionCardProps {
  prediction: Prediction;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

const PredictionCard = ({ prediction, getStatusColor, getStatusLabel }: PredictionCardProps) => {
  return (
    <Card className="p-4 hover:shadow-medium transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={prediction.imageUrl} 
            alt={prediction.cropAm}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold ethiopic text-lg">{prediction.diagnosisAm}</h3>
              <p className="text-sm text-muted-foreground">{prediction.diagnosisEn}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ethiopic ${getStatusColor(prediction.status)}`}>
              {getStatusLabel(prediction.status)}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Leaf className="w-4 h-4" />
              <span className="ethiopic">{prediction.cropAm}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {prediction.date}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {prediction.confidence}%
            </span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="ethiopic self-start">
              <Eye className="w-4 h-4 mr-1" />
              ዝርዝር
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="ethiopic">{prediction.diagnosisAm}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={prediction.imageUrl} 
                  alt={prediction.cropAm}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground ethiopic">ሰብል</p>
                  <p className="font-medium ethiopic">{prediction.cropAm} ({prediction.cropEn})</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground ethiopic">ትክክለኛነት</p>
                  <p className="font-medium">{prediction.confidence}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground ethiopic">ቀን</p>
                  <p className="font-medium">{prediction.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground ethiopic">ሁኔታ</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ethiopic ${getStatusColor(prediction.status)}`}>
                    {getStatusLabel(prediction.status)}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-medium ethiopic mb-2">ምክሮች</p>
                <ul className="space-y-2">
                  {prediction.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span className="ethiopic">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default Dashboard;
