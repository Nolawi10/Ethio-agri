import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Leaf, Droplet, Shield, Download, ExternalLink, FileText, Sprout, 
  Trees, Mountain, Wheat, Search, Play, Calendar, HelpCircle, MessageCircle,
  CheckCircle, XCircle, Award, Clock, Users, Star, ChevronRight, Lightbulb,
  ThumbsUp, Filter, Sun, CloudRain, Thermometer
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Guide {
  id: number;
  titleAm: string;
  titleEn: string;
  descriptionAm: string;
  descriptionEn: string;
  contentAm: string[];
  contentEn: string[];
  bookUrl?: string;
  bookTitleAm?: string;
  bookTitleEn?: string;
  bookAuthor?: string;
  category: string;
}

interface QuizQuestion {
  id: number;
  questionAm: string;
  questionEn: string;
  options: { am: string; en: string }[];
  correctIndex: number;
  explanationAm: string;
  explanationEn: string;
}

const Guides = () => {
  const { language, t } = useLanguage();
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const indigenousMethods: Guide[] = [
    {
      id: 1,
      titleAm: "የቡና ቅርፊት ኮምፖስት ዝግጅት",
      titleEn: "Coffee Husk Composting",
      descriptionAm: "ከቡና ማቀነባበሪያ የሚወጣ ቅርፊት ወደ ጠቃሚ ማዳበሪያ መቀየር",
      descriptionEn: "Convert coffee processing waste into valuable fertilizer",
      contentAm: [
        "የቡና ቅርፊትን ከማቀነባበሪያ ቦታዎች ይሰብስቡ",
        "ከፍግ ጋር በ 3:1 መጠን ይቀላቅሉ",
        "በየሳምንቱ ውሃ ይረጩ እና ያናውጡ",
        "ከ2-3 ወር በኋላ ጥቁር እና ለስላሳ ኮምፖስት ይሆናል",
        "በሄክታር 5-10 ቶን ይተግብሩ"
      ],
      contentEn: [
        "Collect coffee husks from processing areas",
        "Mix with manure at 3:1 ratio",
        "Water and turn weekly",
        "After 2-3 months it becomes dark, soft compost",
        "Apply 5-10 tons per hectare"
      ],
      bookUrl: "https://www.moa.gov.et/documents",
      bookTitleAm: "የኢትዮጵያ የኦርጋኒክ ግብርና መመሪያ",
      bookTitleEn: "Ethiopian Organic Agriculture Guide",
      bookAuthor: "Ministry of Agriculture",
      category: "composting"
    },
    {
      id: 2,
      titleAm: "የአመድ ማዳበሪያ አጠቃቀም",
      titleEn: "Wood Ash Fertilizer",
      descriptionAm: "የእንጨት አመድ ለአፈር ጤንነት እና ለተባይ መከላከያ",
      descriptionEn: "Wood ash for soil health and pest prevention",
      contentAm: [
        "ከእንጨት ማገዶ የሚወጣ አመድ ይሰብስቡ",
        "ፖታሲየም እና ካልሲየም ለአፈር ይሰጣል",
        "በሄክታር 500-1000 ኪሎ ግራም ይተግብሩ",
        "የአፈር pH ደረጃ ያስተካክላል",
        "አንዳንድ ተባዮችን ለመከላከል ይረዳል"
      ],
      contentEn: [
        "Collect ash from wood burning",
        "Provides potassium and calcium to soil",
        "Apply 500-1000 kg per hectare",
        "Adjusts soil pH level",
        "Helps prevent some pests"
      ],
      bookUrl: "https://www.eiar.gov.et",
      bookTitleAm: "ባህላዊ የግብርና ዘዴዎች በኢትዮጵያ",
      bookTitleEn: "Traditional Farming Methods in Ethiopia",
      bookAuthor: "EIAR",
      category: "fertilizer"
    },
    {
      id: 3,
      titleAm: "አረንጓዴ ማዳበሪያ (Green Manure)",
      titleEn: "Green Manure Cover Crops",
      descriptionAm: "ሰብሎችን ወደ አፈር በማስገባት ናይትሮጅን ማበልጸግ",
      descriptionEn: "Enrich soil nitrogen by incorporating crops",
      contentAm: [
        "ልፍስ፣ ባቄላ ወይም ሌሎች ጥራጥሬዎችን ይዝሩ",
        "ከአበባ በፊት ወደ አፈር ይቅበሩ",
        "ናይትሮጅን ወደ አፈር ይጨምራል",
        "የአፈር መዋቅር ያሻሽላል",
        "ከ4-6 ሳምንታት በኋላ ዋና ሰብልዎን ይዝሩ"
      ],
      contentEn: [
        "Plant lentils, beans or other legumes",
        "Incorporate into soil before flowering",
        "Adds nitrogen to soil",
        "Improves soil structure",
        "Plant main crop 4-6 weeks later"
      ],
      bookUrl: "https://cgspace.cgiar.org",
      bookTitleAm: "ዘላቂ ግብርና ለኢትዮጵያ ገበሬዎች",
      bookTitleEn: "Sustainable Agriculture for Ethiopian Farmers",
      bookAuthor: "CGIAR",
      category: "fertilizer"
    },
    {
      id: 4,
      titleAm: "የእንስሳት ፍግ ዝግጅት",
      titleEn: "Animal Manure Preparation",
      descriptionAm: "ከብት፣ በግ እና ዶሮ ፍግ በትክክል ማዘጋጀት",
      descriptionEn: "Properly prepare cattle, sheep and chicken manure",
      contentAm: [
        "ፍግን ለ1-2 ወር ማበስበስ ይቻላል",
        "ከብቶች ፍግ ለአጠቃላይ ሰብሎች ተስማሚ",
        "የዶሮ ፍግ ናይትሮጅን ከፍ ያለ ነው",
        "በሄክታር 10-15 ቶን ይተግብሩ",
        "ከመዝራት 2-4 ሳምንታት በፊት ይተግብሩ"
      ],
      contentEn: [
        "Decompose manure for 1-2 months",
        "Cattle manure suitable for general crops",
        "Chicken manure has higher nitrogen",
        "Apply 10-15 tons per hectare",
        "Apply 2-4 weeks before planting"
      ],
      bookUrl: "https://www.fao.org/ethiopia",
      bookTitleAm: "የእንስሳት ፍግ አስተዳደር መመሪያ",
      bookTitleEn: "Animal Manure Management Guide",
      bookAuthor: "FAO Ethiopia",
      category: "composting"
    },
    {
      id: 5,
      titleAm: "የኒም ዘይት ፀረ ተባይ",
      titleEn: "Neem Oil Pesticide",
      descriptionAm: "ተፈጥሮአዊ የተባይ መከላከያ ከኒም ዛፍ",
      descriptionEn: "Natural pest control from neem tree",
      contentAm: [
        "የኒም ዘሮችን ይፍጩ እና በውሃ ይቀልቅሉ",
        "100 ግራም ዘር በ1 ሊትር ውሃ",
        "ለ12 ሰዓት ያስቀምጡ ከዚያ ያጣሩ",
        "በቅጠሎች ላይ ይረጩ",
        "ለአፊድ፣ ቅማል እና ሌሎች ተባዮች ውጤታማ"
      ],
      contentEn: [
        "Grind neem seeds and mix with water",
        "100 grams seed per 1 liter water",
        "Let sit for 12 hours then filter",
        "Spray on leaves",
        "Effective for aphids, mites and other pests"
      ],
      bookUrl: "https://www.icipe.org",
      bookTitleAm: "ተፈጥሮአዊ ፀረ ተባይ ዘዴዎች",
      bookTitleEn: "Natural Pest Control Methods",
      bookAuthor: "ICIPE",
      category: "pest-control"
    },
    {
      id: 6,
      titleAm: "የበርበሬ/ነጭ ሽንኩርት ፀረ ተባይ",
      titleEn: "Chili-Garlic Pesticide",
      descriptionAm: "በቤት የሚዘጋጅ ተፈጥሮአዊ ፀረ ተባይ",
      descriptionEn: "Homemade natural pesticide",
      contentAm: [
        "50 ግራም በርበሬ እና 50 ግራም ነጭ ሽንኩርት ይፍጩ",
        "በ1 ሊትር ውሃ ውስጥ ለ24 ሰዓት ያስቀምጡ",
        "ያጣሩ እና ትንሽ ሳሙና ይጨምሩ",
        "በቀን በማታ ሰዓት ይረጩ",
        "በየ5-7 ቀን ይድገሙ"
      ],
      contentEn: [
        "Grind 50g chili and 50g garlic",
        "Soak in 1 liter water for 24 hours",
        "Filter and add a little soap",
        "Spray in the evening",
        "Repeat every 5-7 days"
      ],
      bookUrl: "https://www.ippmedia.com",
      bookTitleAm: "የቤት ውስጥ ፀረ ተባይ ዘዴዎች",
      bookTitleEn: "Home Pest Control Methods",
      bookAuthor: "Practical Action Ethiopia",
      category: "pest-control"
    },
    {
      id: 7,
      titleAm: "ሸምበቆ ማልች (Mulching)",
      titleEn: "Straw Mulching",
      descriptionAm: "የአፈር እርጥበት ጥበቃ እና አረም መከላከያ",
      descriptionEn: "Soil moisture protection and weed control",
      contentAm: [
        "ከተሰበሰበ ሰብል ቅሪት ሸምበቆ ይሰብስቡ",
        "በ5-10 ሴንቲ ሜትር ውፍረት ይዝርጉ",
        "የአፈር እርጥበት ይጠብቃል",
        "አረም እንዳይበቅል ይከላከላል",
        "ቀስ በቀስ ወደ ኮምፖስት ይቀየራል"
      ],
      contentEn: [
        "Collect straw from harvested crops",
        "Spread 5-10 cm thick",
        "Protects soil moisture",
        "Prevents weed growth",
        "Gradually turns to compost"
      ],
      bookUrl: "https://ethiopian-agricultural-portal.org",
      bookTitleAm: "የውሃ ቆጣቢ ግብርና ዘዴዎች",
      bookTitleEn: "Water-Saving Farming Methods",
      bookAuthor: "ATA",
      category: "water"
    },
    {
      id: 8,
      titleAm: "የአፈር ጥበቃ ቴራስ",
      titleEn: "Soil Conservation Terracing",
      descriptionAm: "በተራራማ አካባቢ አፈር ለመጠበቅ",
      descriptionEn: "Protect soil in mountainous areas",
      contentAm: [
        "በተዳፋት መሬት ላይ ደረጃዎች ይገንቡ",
        "ውሃ እንዲቆም እና እንዳይሸረሸር ይረዳል",
        "በየ10-15 ሜትር ቴራስ ይገንቡ",
        "ዛፎች እና ሳር ለማጠናከር ይትከሉ",
        "ለብዙ ዓመታት የሚያገለግል ዘላቂ መፍትሄ"
      ],
      contentEn: [
        "Build steps on sloped land",
        "Helps water retention and prevents erosion",
        "Build terraces every 10-15 meters",
        "Plant trees and grass to strengthen",
        "Sustainable solution for many years"
      ],
      bookUrl: "https://www.worldagroforestry.org",
      bookTitleAm: "የኢትዮጵያ ደጋ አፈር ጥበቃ",
      bookTitleEn: "Ethiopian Highland Soil Conservation",
      bookAuthor: "World Agroforestry",
      category: "soil"
    },
    {
      id: 9,
      titleAm: "የዝናብ ውሃ ማጠራቀሚያ",
      titleEn: "Rainwater Harvesting",
      descriptionAm: "የዝናብ ውሃ ለመስኖ እና ለእንስሳት ማጠራቀም",
      descriptionEn: "Collect rainwater for irrigation and livestock",
      contentAm: [
        "ከጣሪያ የሚወርድ ውሃ ወደ ታንከር ያስገቡ",
        "የውሃ ማጠራቀሚያ ቦታ ያዘጋጁ",
        "በደንብ ይሸፍኑ እንዳይበከል",
        "ለደረቅ ወቅት ይጠቀሙ",
        "በዓመት ሺዎች ሊትር ውሃ ይቆጥባሉ"
      ],
      contentEn: [
        "Channel roof water into tanks",
        "Prepare water storage area",
        "Cover well to prevent contamination",
        "Use during dry season",
        "Save thousands of liters per year"
      ],
      bookUrl: "https://www.ata.gov.et",
      bookTitleAm: "የውሃ አጠቃቀም ማመቻቸት",
      bookTitleEn: "Water Use Optimization",
      bookAuthor: "ATA",
      category: "water"
    },
    {
      id: 10,
      titleAm: "የሰብል ፈረቃ (Crop Rotation)",
      titleEn: "Crop Rotation",
      descriptionAm: "የአፈር ጤንነት ለመጠበቅ ሰብሎችን መቀያየር",
      descriptionEn: "Rotate crops to maintain soil health",
      contentAm: [
        "ተመሳሳይ ሰብል በተከታታይ አይዝሩ",
        "ጥራጥሬ → እህል → ስራስር ቅደም ተከተል",
        "የአፈር ንጥረ ነገሮች ይጠበቃሉ",
        "በሽታ እና ተባይ ይቀንሳል",
        "ምርት በ20-30% ያድጋል"
      ],
      contentEn: [
        "Don't plant same crop consecutively",
        "Legumes → Grains → Roots rotation",
        "Soil nutrients are preserved",
        "Reduces disease and pests",
        "Yield increases by 20-30%"
      ],
      bookUrl: "https://www.cimmyt.org",
      bookTitleAm: "ዘመናዊ ሰብል ፈረቃ ዘዴዎች",
      bookTitleEn: "Modern Crop Rotation Methods",
      bookAuthor: "CIMMYT",
      category: "soil"
    }
  ];

  const guideCategories = [
    { id: "all", icon: BookOpen, labelAm: "ሁሉም", labelEn: "All" },
    { id: "composting", icon: Leaf, labelAm: "ኮምፖስት", labelEn: "Composting" },
    { id: "fertilizer", icon: Sprout, labelAm: "ማዳበሪያ", labelEn: "Fertilizer" },
    { id: "pest-control", icon: Shield, labelAm: "ተባይ መከላከያ", labelEn: "Pest Control" },
    { id: "water", icon: Droplet, labelAm: "ውሃ", labelEn: "Water" },
    { id: "soil", icon: Mountain, labelAm: "አፈር", labelEn: "Soil" },
  ];

  const [selectedVideo, setSelectedVideo] = useState<{youtubeId: string, title: string} | null>(null);

  const videoTutorials = [
    {
      id: 1,
      titleAm: "የቡና ኮምፖስት ዝግጅት ቪዲዮ",
      titleEn: "Coffee Composting Video Tutorial",
      duration: "12:45",
      views: "15.2K",
      thumbnail: "https://img.youtube.com/vi/z_rIUz17mR4/maxresdefault.jpg",
      youtubeId: "z_rIUz17mR4"
    },
    {
      id: 2,
      titleAm: "ኦርጋኒክ ፀረ ተባይ ማዘጋጀት",
      titleEn: "Preparing Organic Pesticide",
      duration: "8:30",
      views: "23.1K",
      thumbnail: "https://img.youtube.com/vi/k141Jh28UCw/maxresdefault.jpg",
      youtubeId: "k141Jh28UCw"
    },
    {
      id: 3,
      titleAm: "የጤፍ ዘመናዊ ዝርያ ዘዴዎች",
      titleEn: "Modern Teff Planting Techniques",
      duration: "15:20",
      views: "45.8K",
      thumbnail: "https://img.youtube.com/vi/DVKRdPjZHu0/maxresdefault.jpg",
      youtubeId: "DVKRdPjZHu0"
    },
    {
      id: 4,
      titleAm: "ጠብታ መስኖ ማዘጋጃ",
      titleEn: "Drip Irrigation Setup",
      duration: "10:15",
      views: "18.9K",
      thumbnail: "https://img.youtube.com/vi/Xej22GsLLQA/maxresdefault.jpg",
      youtubeId: "Xej22GsLLQA"
    }
  ];

  const plantingCalendar = [
    { monthAm: "መስከረም", monthEn: "September", crops: ["ጤፍ", "በቆሎ"], icon: Sun },
    { monthAm: "ጥቅምት", monthEn: "October", crops: ["ስንዴ", "ገብስ"], icon: CloudRain },
    { monthAm: "ኅዳር", monthEn: "November", crops: ["ባቄላ", "አተር"], icon: CloudRain },
    { monthAm: "ታኅሣሥ", monthEn: "December", crops: ["ሽንኩርት", "ነጭ ሽንኩርት"], icon: Thermometer },
    { monthAm: "ጥር", monthEn: "January", crops: ["ድንች", "ካሮት"], icon: Thermometer },
    { monthAm: "የካቲት", monthEn: "February", crops: ["ቲማቲም", "በርበሬ"], icon: Sun },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      questionAm: "የቡና ቅርፊት ኮምፖስት ለመሆን ምን ያህል ጊዜ ይፈጅበታል?",
      questionEn: "How long does coffee husk take to become compost?",
      options: [
        { am: "1 ሳምንት", en: "1 week" },
        { am: "2-3 ወር", en: "2-3 months" },
        { am: "6 ወር", en: "6 months" },
        { am: "1 ዓመት", en: "1 year" }
      ],
      correctIndex: 1,
      explanationAm: "የቡና ቅርፊት በትክክል ከተያዘ ከ2-3 ወር በኋላ ጥቁር እና ለስላሳ ኮምፖስት ይሆናል።",
      explanationEn: "When properly managed, coffee husk becomes dark and soft compost after 2-3 months."
    },
    {
      id: 2,
      questionAm: "የኒም ዘይት ፀረ ተባይ ለማዘጋጀት ምን ያህል ዘር በ1 ሊትር ውሃ ይጠቀማሉ?",
      questionEn: "How much neem seed do you use per 1 liter of water?",
      options: [
        { am: "50 ግራም", en: "50 grams" },
        { am: "100 ግራም", en: "100 grams" },
        { am: "200 ግራም", en: "200 grams" },
        { am: "500 ግራም", en: "500 grams" }
      ],
      correctIndex: 1,
      explanationAm: "100 ግራም የኒም ዘር በ1 ሊትር ውሃ ውስጥ ለ12 ሰዓት ይቀመጣል።",
      explanationEn: "100 grams of neem seed is soaked in 1 liter of water for 12 hours."
    },
    {
      id: 3,
      questionAm: "አረንጓዴ ማዳበሪያ (Green Manure) ለአፈር ምን ንጥረ ነገር ይጨምራል?",
      questionEn: "What nutrient does green manure add to soil?",
      options: [
        { am: "ፎስፈረስ", en: "Phosphorus" },
        { am: "ናይትሮጅን", en: "Nitrogen" },
        { am: "ፖታሲየም", en: "Potassium" },
        { am: "ካልሲየም", en: "Calcium" }
      ],
      correctIndex: 1,
      explanationAm: "ጥራጥሬዎች ወደ አፈር ሲቀበሩ ናይትሮጅን ይጨምራሉ።",
      explanationEn: "Legumes add nitrogen to the soil when incorporated."
    },
    {
      id: 4,
      questionAm: "ሸምበቆ ማልች በምን ያህል ውፍረት ይዘረጋል?",
      questionEn: "How thick should straw mulch be spread?",
      options: [
        { am: "1-2 ሴ.ሜ", en: "1-2 cm" },
        { am: "5-10 ሴ.ሜ", en: "5-10 cm" },
        { am: "15-20 ሴ.ሜ", en: "15-20 cm" },
        { am: "25-30 ሴ.ሜ", en: "25-30 cm" }
      ],
      correctIndex: 1,
      explanationAm: "ሸምበቆ በ5-10 ሴንቲ ሜትር ውፍረት መዘርጋት አለበት።",
      explanationEn: "Straw mulch should be spread 5-10 cm thick."
    },
    {
      id: 5,
      questionAm: "የሰብል ፈረቃ (Crop Rotation) ምርትን በምን ያህል መቶኛ ያሳድጋል?",
      questionEn: "By how much percent does crop rotation increase yield?",
      options: [
        { am: "5-10%", en: "5-10%" },
        { am: "20-30%", en: "20-30%" },
        { am: "50-60%", en: "50-60%" },
        { am: "80-90%", en: "80-90%" }
      ],
      correctIndex: 1,
      explanationAm: "ትክክለኛ የሰብል ፈረቃ ምርትን በ20-30% ያሳድጋል።",
      explanationEn: "Proper crop rotation increases yield by 20-30%."
    }
  ];

  const communityQuestions = [
    {
      id: 1,
      questionAm: "የጤፍ ቅጠል ቢጫ እየሆነ ነው፣ ምን እናድርግ?",
      questionEn: "Teff leaves are turning yellow, what should we do?",
      answersCount: 12,
      likes: 45,
      askedBy: "ፋርመር ከወሎ"
    },
    {
      id: 2,
      questionAm: "በበቆሎ ላይ ተባይ እንዴት እከላከላለሁ?",
      questionEn: "How do I prevent pests on maize?",
      answersCount: 8,
      likes: 32,
      askedBy: "ገበሬ ከኦሮሚያ"
    },
    {
      id: 3,
      questionAm: "ኦርጋኒክ ማዳበሪያ ከኬሚካል የተሻለ ነው?",
      questionEn: "Is organic fertilizer better than chemical?",
      answersCount: 23,
      likes: 89,
      askedBy: "አረሶ አደር"
    }
  ];

  const researchBooks = [
    {
      titleAm: "የኢትዮጵያ ዘላቂ ግብርና መመሪያ",
      titleEn: "Ethiopian Sustainable Agriculture Guide",
      author: "Ethiopian Agricultural Transformation Agency (ATA)",
      url: "https://www.ata.gov.et/resources/",
      yearAm: "2023"
    },
    {
      titleAm: "የአፈር ጤንነት አስተዳደር",
      titleEn: "Soil Health Management Manual",
      author: "Ethiopian Institute of Agricultural Research (EIAR)",
      url: "https://www.eiar.gov.et/publications",
      yearAm: "2022"
    },
    {
      titleAm: "ኦርጋኒክ ግብርና ለኢትዮጵያ",
      titleEn: "Organic Farming for Ethiopia",
      author: "FAO Ethiopia",
      url: "https://www.fao.org/ethiopia/resources",
      yearAm: "2021"
    },
    {
      titleAm: "የተቀናጀ ተባይ አስተዳደር",
      titleEn: "Integrated Pest Management",
      author: "ICIPE",
      url: "https://www.icipe.org/resources",
      yearAm: "2023"
    },
    {
      titleAm: "የእህል ምርት ማሻሻያ ቴክኒኮች",
      titleEn: "Grain Crop Improvement Techniques",
      author: "CGIAR/CIMMYT",
      url: "https://www.cimmyt.org/resources",
      yearAm: "2022"
    },
    {
      titleAm: "የአየር ንብረት ለውጥ እና ግብርና",
      titleEn: "Climate Change and Agriculture",
      author: "Ministry of Agriculture",
      url: "https://www.moa.gov.et/climate",
      yearAm: "2023"
    }
  ];

  const filteredMethods = indigenousMethods.filter(method => {
    const matchesSearch = 
      method.titleAm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.descriptionAm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || method.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === quizQuestions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold ethiopic">
              {language === "am" ? "የግብርና መመሪያዎች" : "Agricultural Guides"}
            </h1>
            <p className="text-muted-foreground ethiopic">
              {language === "am" 
                ? "ከመስመር ውጭ ሊደረሱ የሚችሉ ሙሉ የግብርና ምክሮች እና መመሪያዎች"
                : "Comprehensive agricultural tips and guides available offline"}
            </p>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="guides" className="w-full">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto">
              <TabsTrigger value="guides" className="text-xs md:text-sm">
                <BookOpen className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{language === "am" ? "መመሪያዎች" : "Guides"}</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="text-xs md:text-sm">
                <Play className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{language === "am" ? "ቪዲዮዎች" : "Videos"}</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-xs md:text-sm">
                <Calendar className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{language === "am" ? "ቀን መቁጠሪያ" : "Calendar"}</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="text-xs md:text-sm">
                <HelpCircle className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{language === "am" ? "ፈተና" : "Quiz"}</span>
              </TabsTrigger>
              <TabsTrigger value="community" className="text-xs md:text-sm">
                <MessageCircle className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">{language === "am" ? "ማህበረሰብ" : "Community"}</span>
              </TabsTrigger>
            </TabsList>

            {/* Guides Tab */}
            <TabsContent value="guides" className="space-y-6 mt-6">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={language === "am" ? "መመሪያ ይፈልጉ..." : "Search guides..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {guideCategories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.id)}
                      className="ethiopic text-xs"
                    >
                      <cat.icon className="w-3 h-3 mr-1" />
                      {language === "am" ? cat.labelAm : cat.labelEn}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Indigenous Methods Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMethods.map((method) => (
                  <Card 
                    key={method.id} 
                    className="p-4 shadow-soft hover:shadow-medium transition-all cursor-pointer group hover:border-primary/50"
                    onClick={() => setSelectedGuide(method)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Leaf className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full ethiopic">
                          {guideCategories.find(c => c.id === method.category)?.[language === "am" ? "labelAm" : "labelEn"]}
                        </span>
                      </div>
                      <h4 className="font-bold ethiopic text-sm leading-tight">
                        {language === "am" ? method.titleAm : method.titleEn}
                      </h4>
                      <p className="text-xs text-muted-foreground ethiopic line-clamp-2">
                        {language === "am" ? method.descriptionAm : method.descriptionEn}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-primary group-hover:underline">
                        <FileText className="w-3 h-3" />
                        <span className="ethiopic">{language === "am" ? "መመሪያ ያንብቡ" : "Read Guide"}</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredMethods.length === 0 && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground ethiopic">
                    {language === "am" ? "ምንም ውጤት አልተገኘም" : "No results found"}
                  </p>
                </div>
              )}

              {/* Research Books Section */}
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold ethiopic">
                      {language === "am" ? "የምርምር መጽሐፍት" : "Research Books"}
                    </h2>
                    <p className="text-muted-foreground ethiopic text-sm">
                      {language === "am" ? "ለተጨማሪ ንባብ የሚረዱ ሀብቶች" : "Resources for further reading"}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {researchBooks.map((book, idx) => (
                    <Card key={idx} className="p-4 shadow-soft hover:shadow-medium transition-all">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <span className="text-xs text-muted-foreground ethiopic">{book.yearAm}</span>
                        </div>
                        <div>
                          <h4 className="font-bold ethiopic text-sm mb-1">
                            {language === "am" ? book.titleAm : book.titleEn}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {language === "am" ? book.titleEn : book.titleAm}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">{book.author}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full ethiopic text-xs"
                          onClick={() => window.open(book.url, "_blank")}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {language === "am" ? "ድረ ገፅ ጎብኝ" : "Visit Website"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {videoTutorials.map((video) => (
                  <Card 
                    key={video.id} 
                    className="overflow-hidden shadow-soft hover:shadow-medium transition-all cursor-pointer group"
                    onClick={() => setSelectedVideo({
                      youtubeId: video.youtubeId,
                      title: language === "am" ? video.titleAm : video.titleEn
                    })}
                  >
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={language === "am" ? video.titleAm : video.titleEn}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold ethiopic">
                        {language === "am" ? video.titleAm : video.titleEn}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {video.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {video.duration}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* YouTube Video Modal */}
              <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="ethiopic">{selectedVideo?.title}</DialogTitle>
                  </DialogHeader>
                  <div className="relative pt-[56.25%] w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo?.youtubeId}?autoplay=1`}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold ethiopic">
                      {language === "am" ? "ተጨማሪ ቪዲዮዎች በቅርቡ" : "More Videos Coming Soon"}
                    </h3>
                    <p className="text-sm text-muted-foreground ethiopic">
                      {language === "am" 
                        ? "በየሳምንቱ አዲስ የትምህርት ቪዲዮዎች ይጨመራሉ"
                        : "New educational videos are added weekly"}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-6 mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold ethiopic mb-4">
                  {language === "am" ? "የወቅት ዘር ቀን መቁጠሪያ" : "Seasonal Planting Calendar"}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plantingCalendar.map((month, idx) => (
                    <Card key={idx} className="p-4 border-2 hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <month.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold ethiopic">
                            {language === "am" ? month.monthAm : month.monthEn}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {language === "am" ? month.monthEn : month.monthAm}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {month.crops.map((crop, cropIdx) => (
                          <div key={cropIdx} className="flex items-center gap-2 text-sm">
                            <Sprout className="w-4 h-4 text-success" />
                            <span className="ethiopic">{crop}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-success/10 border-success/20">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-8 h-8 text-success flex-shrink-0" />
                  <div>
                    <h4 className="font-bold ethiopic mb-2">
                      {language === "am" ? "ጠቃሚ ምክር" : "Helpful Tip"}
                    </h4>
                    <p className="text-muted-foreground ethiopic text-sm">
                      {language === "am"
                        ? "ሁልጊዜ የአካባቢዎን የአየር ሁኔታ እና የዝናብ ወቅት ግምት ውስጥ ያስገቡ። የዚህ ቀን መቁጠሪያ ለአማካይ የኢትዮጵያ ክልሎች ነው።"
                        : "Always consider your local weather and rainfall patterns. This calendar is for average Ethiopian regions."}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="space-y-6 mt-6">
              {!quizStarted ? (
                <Card className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold ethiopic mb-2">
                    {language === "am" ? "የግብርና እውቀት ፈተና" : "Agricultural Knowledge Quiz"}
                  </h3>
                  <p className="text-muted-foreground ethiopic mb-6">
                    {language === "am"
                      ? "የተማሩትን ይፈትሹ! 5 ጥያቄዎች በባህላዊ ግብርና ዘዴዎች ላይ"
                      : "Test what you've learned! 5 questions on traditional farming methods"}
                  </p>
                  <Button onClick={() => setQuizStarted(true)} size="lg" className="ethiopic">
                    <Play className="w-4 h-4 mr-2" />
                    {language === "am" ? "ፈተና ጀምር" : "Start Quiz"}
                  </Button>
                </Card>
              ) : quizCompleted ? (
                <Card className="p-8 text-center">
                  <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-10 h-10 text-success" />
                  </div>
                  <h3 className="text-2xl font-bold ethiopic mb-2">
                    {language === "am" ? "እንኳን ደስ አለዎት!" : "Congratulations!"}
                  </h3>
                  <p className="text-4xl font-bold text-primary mb-2">{score}/{quizQuestions.length}</p>
                  <p className="text-muted-foreground ethiopic mb-6">
                    {language === "am"
                      ? `${quizQuestions.length} ጥያቄዎች ውስጥ ${score} ትክክል መለሱ`
                      : `You answered ${score} out of ${quizQuestions.length} correctly`}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={resetQuiz} variant="outline" className="ethiopic">
                      {language === "am" ? "እንደገና ይሞክሩ" : "Try Again"}
                    </Button>
                    <Button onClick={() => { resetQuiz(); }} className="ethiopic">
                      {language === "am" ? "መመሪያዎች ያንብቡ" : "Read Guides"}
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground ethiopic">
                        {language === "am" ? `ጥያቄ ${currentQuestion + 1} ከ ${quizQuestions.length}` : `Question ${currentQuestion + 1} of ${quizQuestions.length}`}
                      </span>
                      <span className="text-sm font-medium text-primary ethiopic">
                        {language === "am" ? `ውጤት: ${score}` : `Score: ${score}`}
                      </span>
                    </div>
                    <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
                  </div>

                  <h3 className="text-xl font-bold ethiopic mb-6">
                    {language === "am" 
                      ? quizQuestions[currentQuestion].questionAm 
                      : quizQuestions[currentQuestion].questionEn}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {quizQuestions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => !showResult && handleAnswerSelect(idx)}
                        disabled={showResult}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ethiopic ${
                          showResult
                            ? idx === quizQuestions[currentQuestion].correctIndex
                              ? "border-success bg-success/10"
                              : selectedAnswer === idx
                              ? "border-destructive bg-destructive/10"
                              : "border-muted"
                            : selectedAnswer === idx
                            ? "border-primary bg-primary/10"
                            : "border-muted hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {showResult && idx === quizQuestions[currentQuestion].correctIndex && (
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                          )}
                          {showResult && selectedAnswer === idx && idx !== quizQuestions[currentQuestion].correctIndex && (
                            <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                          )}
                          <span>{language === "am" ? option.am : option.en}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {showResult && (
                    <div className={`p-4 rounded-lg mb-6 ${
                      selectedAnswer === quizQuestions[currentQuestion].correctIndex
                        ? "bg-success/10 border border-success/20"
                        : "bg-destructive/10 border border-destructive/20"
                    }`}>
                      <p className="ethiopic text-sm">
                        {language === "am"
                          ? quizQuestions[currentQuestion].explanationAm
                          : quizQuestions[currentQuestion].explanationEn}
                      </p>
                    </div>
                  )}

                  {showResult && (
                    <Button onClick={handleNextQuestion} className="w-full ethiopic">
                      {currentQuestion < quizQuestions.length - 1
                        ? (language === "am" ? "ቀጣይ ጥያቄ" : "Next Question")
                        : (language === "am" ? "ውጤት ይመልከቱ" : "See Results")}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </Card>
              )}
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold ethiopic">
                  {language === "am" ? "ማህበረሰብ ጥያቄዎች" : "Community Questions"}
                </h3>
                <Button className="ethiopic">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {language === "am" ? "ጥያቄ ይጠይቁ" : "Ask Question"}
                </Button>
              </div>

              <div className="space-y-4">
                {communityQuestions.map((q) => (
                  <Card key={q.id} className="p-4 hover:shadow-medium transition-all cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold ethiopic mb-1">
                          {language === "am" ? q.questionAm : q.questionEn}
                        </h4>
                        <p className="text-sm text-muted-foreground ethiopic mb-3">
                          {language === "am" ? `በ${q.askedBy} የተጠየቀ` : `Asked by ${q.askedBy}`}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <MessageCircle className="w-4 h-4" />
                            {q.answersCount} {language === "am" ? "መልሶች" : "answers"}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <ThumbsUp className="w-4 h-4" />
                            {q.likes}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-accent/10 border-accent/20">
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-accent" />
                  <div>
                    <h4 className="font-bold ethiopic">
                      {language === "am" ? "ማህበረሰባችንን ይቀላቀሉ" : "Join Our Community"}
                    </h4>
                    <p className="text-sm text-muted-foreground ethiopic">
                      {language === "am"
                        ? "ከሌሎች ገበሬዎች ጋር ልምድ ይለዋወጡ፣ ጥያቄዎች ይጠይቁ እና መልሶች ያግኙ"
                        : "Share experiences with other farmers, ask questions and get answers"}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Offline Access Info */}
          <Card className="p-6 bg-success/10 border-success/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 ethiopic">
                  {language === "am" ? "ከመስመር ውጭ መዳረሻ" : "Offline Access"}
                </h3>
                <p className="text-muted-foreground ethiopic leading-relaxed mb-4">
                  {language === "am"
                    ? "ሁሉም መመሪያዎች ኢንተርኔት ከሌለ በኋላ ሊደረሱ ይችላሉ። አንዴ ከተመለከቱ በኋላ፣ በመሳሪያዎ ላይ ተቀምጠዋል።"
                    : "All guides are accessible offline. Once viewed, they are saved on your device."}
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="ethiopic">{language === "am" ? "አማርኛ" : "Amharic"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="ethiopic">{language === "am" ? "አፋን ኦሮሞ" : "Afan Oromo"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="ethiopic">{language === "am" ? "ትግርኛ" : "Tigrinya"}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Guide Detail Dialog */}
      <Dialog open={!!selectedGuide} onOpenChange={() => setSelectedGuide(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedGuide && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl ethiopic">
                  {language === "am" ? selectedGuide.titleAm : selectedGuide.titleEn}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground ethiopic">
                  {language === "am" ? selectedGuide.descriptionAm : selectedGuide.descriptionEn}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-bold ethiopic">
                    {language === "am" ? "የአሰራር ደረጃዎች" : "Steps"}
                  </h4>
                  <div className="space-y-2">
                    {(language === "am" ? selectedGuide.contentAm : selectedGuide.contentEn).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="ethiopic text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedGuide.bookUrl && (
                  <Card className="p-4 bg-accent/10 border-accent/20">
                    <div className="space-y-2">
                      <h4 className="font-bold ethiopic text-sm">
                        {language === "am" ? "ተዛማጅ መጽሐፍ" : "Related Book"}
                      </h4>
                      <p className="ethiopic text-sm">
                        {language === "am" ? selectedGuide.bookTitleAm : selectedGuide.bookTitleEn}
                      </p>
                      <p className="text-xs text-muted-foreground">{selectedGuide.bookAuthor}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full ethiopic"
                        onClick={() => window.open(selectedGuide.bookUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {language === "am" ? "ሙሉ መጽሐፍ ይመልከቱ" : "View Full Book"}
                      </Button>
                    </div>
                  </Card>
                )}

                <Button variant="outline" className="w-full ethiopic" onClick={() => setSelectedGuide(null)}>
                  {language === "am" ? "ዝጋ" : "Close"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Guides;
