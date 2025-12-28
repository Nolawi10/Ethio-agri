import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MapPin, Phone, X, Leaf, Package, Truck, Star, Check, Sprout, Store, Search, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Product {
  id: number;
  nameAm: string;
  nameEn: string;
  price: number;
  unit: string;
  distance: string;
  vendor: string;
  vendorLocation: string;
  image: string;
  category: string;
  descriptionAm: string;
  benefitsAm: string[];
  usageAm: string;
  availabilityAm: string;
  phone: string;
  isLocal?: boolean;
  alternativeAm?: string;
  rating?: number;
}

const Market = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const products: Product[] = [
    // Chemical Fertilizers
    {
      id: 1,
      nameAm: "ዩሪያ ማዳበሪያ",
      nameEn: "Urea Fertilizer",
      price: 450,
      unit: "50 kg",
      distance: "2.5 ኪሜ",
      vendor: "አዲስ አግሮ ኬሚካልስ",
      vendorLocation: "አዲስ አበባ፣ መርካቶ",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
      category: "ማዳበሪያ",
      descriptionAm: "ዩሪያ ከፍተኛ ናይትሮጅን ይዘት ያለው ኬሚካዊ ማዳበሪያ ነው። ለሁሉም የሰብል አይነቶች ተስማሚ ሲሆን በተለይ ለጤፍ፣ በቆሎ እና ስንዴ ጥሩ ውጤት ይሰጣል።",
      benefitsAm: ["46% ናይትሮጅን ይዘት", "ፈጣን እድገት ያስገኛል", "ቅጠሎችን አረንጓዴ ያደርጋል", "ለሁሉም ሰብሎች ተስማሚ"],
      usageAm: "በሄክታር 50-100 ኪሎ ግራም ይጠቀሙ። ከዝናብ በፊት ወይም ከመስኖ ጋር ይተግብሩ።",
      availabilityAm: "በዓመት ሙሉ ይገኛል",
      phone: "+251911234567",
      alternativeAm: "ባህላዊ አማራጭ: የዶሮ ፍግ ወይም የቡና ኮምፖስት",
      rating: 4.5
    },
    {
      id: 2,
      nameAm: "DAP ማዳበሪያ",
      nameEn: "DAP Fertilizer",
      price: 550,
      unit: "50 kg",
      distance: "3 ኪሜ",
      vendor: "ኢትዮ-አግሪ ድርጅት",
      vendorLocation: "አዲስ አበባ፣ ቦሌ",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
      category: "ማዳበሪያ",
      descriptionAm: "DAP (Diammonium Phosphate) ፎስፎረስ እና ናይትሮጅን ያለው ማዳበሪያ ነው። ለስር እድገት እና ለፍሬ ማብሰል ወሳኝ ነው።",
      benefitsAm: ["18% ናይትሮጅን + 46% ፎስፎረስ", "ስርን ያጠናክራል", "ፍሬ ማብሰልን ያፋጥናል", "ለአዝርዕት ተስማሚ"],
      usageAm: "በሄክታር 100 ኪሎ ግራም በዘር ወቅት ይተግብሩ።",
      availabilityAm: "በዓመት ሙሉ ይገኛል",
      phone: "+251933456789",
      alternativeAm: "ባህላዊ አማራጭ: የአጥንት ዱቄት ወይም የእንጨት አመድ",
      rating: 4.7
    },
    {
      id: 3,
      nameAm: "NPSB ማዳበሪያ",
      nameEn: "NPSB Fertilizer",
      price: 620,
      unit: "50 kg",
      distance: "4.5 ኪሜ",
      vendor: "የኢትዮጵያ ኬሚካል ኮርፖሬሽን",
      vendorLocation: "አዲስ አበባ፣ ካሊቲ",
      image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&h=300&fit=crop",
      category: "ማዳበሪያ",
      descriptionAm: "NPSB (ናይትሮጅን፣ ፎስፎረስ፣ ሰልፈር፣ ቦሮን) ለኢትዮጵያ አፈር የተመረጠ ውስብስብ ማዳበሪያ ነው።",
      benefitsAm: ["4 ንጥረ ነገሮች በአንድ", "ለኢትዮጵያ አፈር ተስማሚ", "የሰልፈር እጥረትን ያስተካክላል", "ምርትን ይጨምራል"],
      usageAm: "በሄክታር 100 ኪሎ ግራም በዘር ወቅት ይተግብሩ።",
      availabilityAm: "በዓመት ሙሉ ይገኛል",
      phone: "+251977890123",
      rating: 4.6
    },
    {
      id: 4,
      nameAm: "NPK ማዳበሪያ (15-15-15)",
      nameEn: "NPK Fertilizer",
      price: 580,
      unit: "50 kg",
      distance: "3.5 ኪሜ",
      vendor: "ሀገር ፋርም ሱፕላይ",
      vendorLocation: "ደብረ ዘይት",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop",
      category: "ማዳበሪያ",
      descriptionAm: "ሚዛናዊ NPK ማዳበሪያ ናይትሮጅን፣ ፎስፎረስ እና ፖታሲየም በእኩል መጠን ይይዛል።",
      benefitsAm: ["ሚዛናዊ ንጥረ ነገሮች", "ለአትክልት ተስማሚ", "ለአበባ እና ፍራፍሬ ጥሩ", "ቀላል አጠቃቀም"],
      usageAm: "በሄክታር 150-200 ኪሎ ግራም ይተግብሩ።",
      availabilityAm: "በዓመት ሙሉ ይገኛል",
      phone: "+251911555666",
      rating: 4.4
    },
    {
      id: 5,
      nameAm: "ፖታሲየም ክሎራይድ (MOP)",
      nameEn: "Potassium Chloride",
      price: 520,
      unit: "50 kg",
      distance: "5 ኪሜ",
      vendor: "አግሮ ኢንፑት ድርጅት",
      vendorLocation: "አዲስ አበባ፣ ጎፋ",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      category: "ማዳበሪያ",
      descriptionAm: "ፖታሲየም ለአበባ፣ ፍራፍሬ እና ስር እድገት ወሳኝ ንጥረ ነገር ነው።",
      benefitsAm: ["60% ፖታሲየም ይዘት", "ፍሬ ጥራት ያሻሽላል", "ድርቅን መቋቋም ይጨምራል", "ለሁሉም ሰብሎች ተስማሚ"],
      usageAm: "በሄክታር 50-100 ኪሎ ግራም ይተግብሩ።",
      availabilityAm: "በዓመት ሙሉ ይገኛል",
      phone: "+251922333444",
      rating: 4.3
    },

    // Ethiopian Local/Organic Products
    {
      id: 6,
      nameAm: "የቡና ቅርፊት ኮምፖስት",
      nameEn: "Coffee Husk Compost",
      price: 200,
      unit: "ቶን",
      distance: "5 ኪሜ",
      vendor: "ጅማ ኮምፖስት ማህበር",
      vendorLocation: "ጅማ ዞን፣ ኦሮሚያ",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
      category: "ኦርጋኒክ",
      descriptionAm: "የቡና ቅርፊት ኮምፖስት ከቡና ማቀነባበሪያ የሚመነጭ ተፈጥሮአዊ ማዳበሪያ ነው። ለአፈር ጤንነት እና ለረጅም ጊዜ ምርታማነት በጣም ጠቃሚ ነው።",
      benefitsAm: ["የአፈር መዋቅር ያሻሽላል", "ውሃ የመያዝ አቅም ይጨምራል", "ጠቃሚ ባክቴሪያዎችን ይደግፋል", "ርካሽ እና ተደራሽ"],
      usageAm: "በሄክታር 5-10 ቶን ይጠቀሙ። ከመዝራት 2-4 ሳምንታት በፊት ይተግብሩ።",
      availabilityAm: "ከቡና ወቅት በኋላ በብዛት ይገኛል",
      phone: "+251471112233",
      isLocal: true,
      rating: 4.8
    },
    {
      id: 7,
      nameAm: "የከብት ፍግ (ደረቅ)",
      nameEn: "Dried Cattle Manure",
      price: 100,
      unit: "ቶን",
      distance: "2 ኪሜ",
      vendor: "ደብረ ብርሃን ገበሬዎች ማህበር",
      vendorLocation: "ደብረ ብርሃን፣ አማራ",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop",
      category: "ኦርጋኒክ",
      descriptionAm: "የከብት ፍግ በደንብ የደረቀ እና የበሰበሰ ተፈጥሮአዊ ማዳበሪያ ነው። ለአፈር ጤንነት በጣም ጠቃሚ ነው።",
      benefitsAm: ["ርካሽ እና ተደራሽ", "የአፈር መዋቅር ያሻሽላል", "ንጥረ ነገሮችን ቀስ በቀስ ይለቃል", "ለኦርጋኒክ ግብርና ተስማሚ"],
      usageAm: "በሄክታር 10-15 ቶን ከመዝራት 1 ወር በፊት ይተግብሩ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251116812345",
      isLocal: true,
      rating: 4.5
    },
    {
      id: 8,
      nameAm: "የዶሮ ፍግ",
      nameEn: "Poultry Manure",
      price: 150,
      unit: "ቶን",
      distance: "4 ኪሜ",
      vendor: "አልማ ዶሮ እርባታ",
      vendorLocation: "ሰበታ፣ ኦሮሚያ",
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop",
      category: "ኦርጋኒክ",
      descriptionAm: "የዶሮ ፍግ ከፍተኛ ናይትሮጅን ይዘት ያለው ተፈጥሮአዊ ማዳበሪያ ነው። ከሁሉም የእንስሳት ፍግ የበለጠ ጠንካራ ነው።",
      benefitsAm: ["ከፍተኛ ናይትሮጅን ይዘት", "ፈጣን ውጤት", "ለአትክልት ተስማሚ", "ርካሽ ዋጋ"],
      usageAm: "በሄክታር 3-5 ቶን ይተግብሩ። ከመዝራት 3 ሳምንታት በፊት ይተግብሩ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251114667788",
      isLocal: true,
      rating: 4.6
    },
    {
      id: 9,
      nameAm: "የእንጨት አመድ",
      nameEn: "Wood Ash",
      price: 50,
      unit: "ቶን",
      distance: "1 ኪሜ",
      vendor: "አካባቢ ገበሬዎች",
      vendorLocation: "ሁሉም ቦታዎች",
      image: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?w=400&h=300&fit=crop",
      category: "ኦርጋኒክ",
      descriptionAm: "የእንጨት አመድ ፖታሲየም እና ካልሲየም ለአፈር ይሰጣል። ለፍራፍሬ እና ለስር አትክልቶች ተስማሚ ነው።",
      benefitsAm: ["ፖታሲየም ይይዛል", "የአፈር pH ያስተካክላል", "ተባዮችን ይከላከላል", "በነፃ ይገኛል"],
      usageAm: "በሄክታር 500-1000 ኪሎ ግራም ይተግብሩ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251933222333",
      isLocal: true,
      rating: 4.2
    },
    {
      id: 10,
      nameAm: "ቬርሚኮምፖስት (የትል ማዳበሪያ)",
      nameEn: "Vermicompost",
      price: 300,
      unit: "100 kg",
      distance: "6 ኪሜ",
      vendor: "ግሪን ኢኮ ፋርም",
      vendorLocation: "ሆለታ፣ ኦሮሚያ",
      image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&h=300&fit=crop",
      category: "ኦርጋኒክ",
      descriptionAm: "በትሎች የተዘጋጀ ከፍተኛ ጥራት ያለው ኮምፖስት። ለአትክልት እና ለፍራፍሬ ዛፎች በጣም ጥሩ ነው።",
      benefitsAm: ["ከፍተኛ ንጥረ ነገር", "ጠቃሚ ባክቴሪያዎች ይይዛል", "ለአትክልት ተስማሚ", "ሽታ የለውም"],
      usageAm: "በተክል ዙሪያ 1-2 ኪሎ ግራም ይጨምሩ።",
      availabilityAm: "በትዕዛዝ ይመጣል",
      phone: "+251112345678",
      isLocal: true,
      rating: 4.9
    },
    {
      id: 11,
      nameAm: "ባዮጋዝ ቅሪት ማዳበሪያ",
      nameEn: "Biogas Slurry",
      price: 80,
      unit: "ቶን",
      distance: "3 ኪሜ",
      vendor: "ባዮ ኢነርጂ ኢትዮጵያ",
      vendorLocation: "ደብረ ዘይት",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop",
      category: "ኦርጋኒክ",
      descriptionAm: "ከባዮጋዝ ምርት የሚወጣ ፈሳሽ ማዳበሪያ። ናይትሮጅን እና ፎስፎረስ የበለጸገ ነው።",
      benefitsAm: ["ፈሳሽ ስለሆነ ቀላል አጠቃቀም", "ፈጣን ውጤት", "ጥሩ ሽታ", "ከባዮጋዝ ምርት ይገኛል"],
      usageAm: "በውሃ ቀላቅሎ በመስኖ ይተግብሩ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251911888999",
      isLocal: true,
      rating: 4.4
    },

    // Pesticides
    {
      id: 12,
      nameAm: "ተፈጥሮአዊ ፀረ ተባይ (ኒም)",
      nameEn: "Neem Organic Pesticide",
      price: 150,
      unit: "1 ሊትር",
      distance: "4 ኪሜ",
      vendor: "ኢኮ ግሪን ኢትዮጵያ",
      vendorLocation: "አዲስ አበባ፣ ቦሌ",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop",
      category: "ፀረ ተባይ",
      descriptionAm: "ከኒም ዛፍ የተሰራ ተፈጥሮአዊ ፀረ ተባይ። ለሰው እና ለአካባቢ ደህንነቱ የተጠበቀ ሲሆን ብዙ ተባዮችን ይቆጣጠራል።",
      benefitsAm: ["100% ተፈጥሮአዊ", "ለአካባቢ ደህንነቱ የተጠበቀ", "ብዙ ተባዮችን ይቆጣጠራል", "ለኦርጋኒክ ግብርና ተስማሚ"],
      usageAm: "በ10 ሊትር ውሃ 50 ሚሊ ሊትር ቀላቅለው ይረጩ። በየ7-10 ቀን ይድገሙ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251911987654",
      isLocal: true,
      rating: 4.7
    },
    {
      id: 13,
      nameAm: "ፀረ አፊድ ኬሚካል",
      nameEn: "Aphid Insecticide",
      price: 280,
      unit: "500 ml",
      distance: "5 ኪሜ",
      vendor: "ሳይንስ አግሮ ኬሚካልስ",
      vendorLocation: "አዳማ፣ ኦሮሚያ",
      image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&h=300&fit=crop",
      category: "ፀረ ተባይ",
      descriptionAm: "ለአፊድ፣ ቅማል እና ሌሎች ትናንሽ ነፍሳት የተዘጋጀ ውጤታማ ፀረ ተባይ።",
      benefitsAm: ["ፈጣን ውጤት", "ለብዙ ተባዮች ውጤታማ", "ቀላል አጠቃቀም", "ረጅም ጊዜ ይጠብቃል"],
      usageAm: "በ15 ሊትር ውሃ 30 ሚሊ ሊትር ይቀላቅሉ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251222345678",
      alternativeAm: "ባህላዊ አማራጭ: የበርበሬ እና ነጭ ሽንኩርት መፍትሄ",
      rating: 4.3
    },
    {
      id: 14,
      nameAm: "ፀረ ፈንገስ (Fungicide)",
      nameEn: "Fungicide",
      price: 350,
      unit: "500 g",
      distance: "6 ኪሜ",
      vendor: "ፋርማ አግሮ ማዕከል",
      vendorLocation: "ባህር ዳር፣ አማራ",
      image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&h=300&fit=crop",
      category: "ፀረ ተባይ",
      descriptionAm: "ለቅጠል ዝገት፣ ሻጋታ እና ሌሎች የፈንገስ በሽታዎች የተዘጋጀ ፀረ ፈንገስ።",
      benefitsAm: ["የፈንገስ በሽታዎችን ይቆጣጠራል", "ቅጠሎችን ይጠብቃል", "ምርትን ይጨምራል", "ቀላል አጠቃቀም"],
      usageAm: "በ10 ሊትር ውሃ 20 ግራም ይቀላቅሉ። በየ14 ቀን ይረጩ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251582123456",
      rating: 4.5
    },
    {
      id: 15,
      nameAm: "ፀረ አረም (Herbicide)",
      nameEn: "Herbicide",
      price: 420,
      unit: "1 ሊትር",
      distance: "7 ኪሜ",
      vendor: "ፕላንት ፕሮቴክት ኢትዮጵያ",
      vendorLocation: "ሀዋሳ፣ ሲዳማ",
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=300&fit=crop",
      category: "ፀረ ተባይ",
      descriptionAm: "አረሞችን ለማስወገድ የሚያገለግል ኬሚካል። ለሰፋፊ እርሻዎች ተስማሚ ነው።",
      benefitsAm: ["ፈጣን ውጤት", "ብዙ አረሞችን ይገድላል", "ለሰብሎች ደህንነቱ የተጠበቀ", "ቀላል አጠቃቀም"],
      usageAm: "በ20 ሊትር ውሃ 100 ሚሊ ሊትር ይቀላቅሉ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251462234567",
      rating: 4.2
    },
    {
      id: 16,
      nameAm: "የበርበሬ ፀረ ተባይ (ባህላዊ)",
      nameEn: "Chili Pepper Pesticide",
      price: 80,
      unit: "1 ሊትር",
      distance: "2 ኪሜ",
      vendor: "ባህላዊ ግብርና ማህበር",
      vendorLocation: "ጎንደር፣ አማራ",
      image: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=300&fit=crop",
      category: "ፀረ ተባይ",
      descriptionAm: "ከበርበሬ እና ነጭ ሽንኩርት የተዘጋጀ ባህላዊ ፀረ ተባይ። ለአካባቢ ደህንነቱ የተጠበቀ ነው።",
      benefitsAm: ["100% ተፈጥሮአዊ", "ርካሽ ዋጋ", "በቤት ይዘጋጃል", "ለአካባቢ ደህንነቱ የተጠበቀ"],
      usageAm: "በቅጠሎች ላይ በጠዋት ወይም በማታ ይረጩ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251581234567",
      isLocal: true,
      rating: 4.6
    },

    // Seeds
    {
      id: 17,
      nameAm: "የተሻሻለ ጤፍ ዘር (ቁንጮ)",
      nameEn: "Improved Teff Seed - Quncho",
      price: 85,
      unit: "kg",
      distance: "8 ኪሜ",
      vendor: "የኢትዮጵያ ዘር ድርጅት",
      vendorLocation: "አዲስ አበባ፣ ቦሌ ቡልቡላ",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
      category: "ዘር",
      descriptionAm: "ቁንጮ ከፍተኛ ምርት የሚሰጥ የተሻሻለ የጤፍ ዝርያ ነው። በኢትዮጵያ ምርምር ተቋም የተዘጋጀ።",
      benefitsAm: ["ከፍተኛ ምርት", "ለደጋ ተስማሚ", "ነጭ ቀለም", "ጥሩ ጣዕም"],
      usageAm: "በሄክታር 25-30 ኪሎ ግራም ይዝሩ።",
      availabilityAm: "በዘር ወቅት ይገኛል",
      phone: "+251115508888",
      rating: 4.8
    },
    {
      id: 18,
      nameAm: "የተሻሻለ ስንዴ ዘር (ካካባ)",
      nameEn: "Improved Wheat Seed - Kakaba",
      price: 65,
      unit: "kg",
      distance: "7 ኪሜ",
      vendor: "ኩልምሳ ግብርና ምርምር ማዕከል",
      vendorLocation: "ኩልምሳ፣ ኦሮሚያ",
      image: "https://images.unsplash.com/photo-1437252611977-07f74518abd7?w=400&h=300&fit=crop",
      category: "ዘር",
      descriptionAm: "በሽታን የሚቋቋም እና ከፍተኛ ምርት የሚሰጥ የተሻሻለ የስንዴ ዝርያ።",
      benefitsAm: ["ዝገትን ይቋቋማል", "ከፍተኛ ምርት", "ለዳቦ ተስማሚ", "ጥሩ ጥራት"],
      usageAm: "በሄክታር 150 ኪሎ ግራም ይዝሩ።",
      availabilityAm: "በዘር ወቅት ይገኛል",
      phone: "+251223334455",
      rating: 4.7
    },
    {
      id: 19,
      nameAm: "የበቆሎ ዘር (BH-661)",
      nameEn: "Maize Seed - BH-661",
      price: 120,
      unit: "kg",
      distance: "6 ኪሜ",
      vendor: "አምቦ ዘር ማባዣ",
      vendorLocation: "አምቦ፣ ኦሮሚያ",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
      category: "ዘር",
      descriptionAm: "BH-661 ድርቅን የሚቋቋም እና ከፍተኛ ምርት የሚሰጥ የበቆሎ ዝርያ ነው።",
      benefitsAm: ["ድርቅን ይቋቋማል", "ከፍተኛ ምርት", "ለቆላ ተስማሚ", "ትልቅ ፍሬ"],
      usageAm: "በሄክታር 25 ኪሎ ግራም ይዝሩ።",
      availabilityAm: "በዘር ወቅት ይገኛል",
      phone: "+251112776655",
      rating: 4.6
    },
    {
      id: 20,
      nameAm: "የአተር ዘር",
      nameEn: "Field Pea Seed",
      price: 45,
      unit: "kg",
      distance: "4 ኪሜ",
      vendor: "ሆለታ ምርምር ማዕከል",
      vendorLocation: "ሆለታ፣ ኦሮሚያ",
      image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=300&fit=crop",
      category: "ዘር",
      descriptionAm: "ከፍተኛ ምርት የሚሰጥ የተሻሻለ የአተር ዝርያ።",
      benefitsAm: ["ናይትሮጅን ይጨምራል", "ለአፈር ጤና ጠቃሚ", "ቀላል እንክብካቤ", "ጥሩ ገበያ"],
      usageAm: "በሄክታር 100 ኪሎ ግራም ይዝሩ።",
      availabilityAm: "በዘር ወቅት ይገኛል",
      phone: "+251113456789",
      isLocal: true,
      rating: 4.5
    },
    {
      id: 21,
      nameAm: "የሽምብራ ዘር",
      nameEn: "Chickpea Seed",
      price: 55,
      unit: "kg",
      distance: "5 ኪሜ",
      vendor: "ደብረ ዘይት ዘር ማዕከል",
      vendorLocation: "ደብረ ዘይት",
      image: "https://images.unsplash.com/photo-1515543904787-c01b6e5e8b8c?w=400&h=300&fit=crop",
      category: "ዘር",
      descriptionAm: "ከፍተኛ ምርት የሚሰጥ የተሻሻለ የሽምብራ ዝርያ። ለኢትዮጵያ አየር ንብረት ተስማሚ።",
      benefitsAm: ["ድርቅን ይቋቋማል", "ጥሩ ገበያ ዋጋ", "ናይትሮጅን ይጨምራል", "ለምግብ እና ለሽያጭ"],
      usageAm: "በሄክታር 120 ኪሎ ግራም ይዝሩ።",
      availabilityAm: "በዘር ወቅት ይገኛል",
      phone: "+251114567890",
      rating: 4.4
    },
    {
      id: 22,
      nameAm: "የቲማቲም ዘር",
      nameEn: "Tomato Seeds",
      price: 250,
      unit: "100 g",
      distance: "3 ኪሜ",
      vendor: "አትክልት ዘር ማዕከል",
      vendorLocation: "አዲስ አበባ፣ ሜክሲኮ",
      image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop",
      category: "ዘር",
      descriptionAm: "ከፍተኛ ምርት የሚሰጥ የቲማቲም ዘር። ለአትክልት አምራቾች ተስማሚ።",
      benefitsAm: ["ከፍተኛ ምርት", "በሽታ ይቋቋማል", "ትልቅ ፍሬ", "ጥሩ ጣዕም"],
      usageAm: "በመዝሪያ ክፍል ዘርተው ወደ ማሳ ያዛውሩ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251911456789",
      rating: 4.6
    },
    {
      id: 23,
      nameAm: "የጎመን ዘር",
      nameEn: "Cabbage Seeds",
      price: 180,
      unit: "100 g",
      distance: "4 ኪሜ",
      vendor: "ቢሾፍቱ አትክልት ማዕከል",
      vendorLocation: "ቢሾፍቱ",
      image: "https://images.unsplash.com/photo-1594282486552-05a6f0cfdd42?w=400&h=300&fit=crop",
      category: "ዘር",
      descriptionAm: "ትልቅ እና ጠንካራ ጎመን የሚሰጥ ጥራት ያለው ዘር።",
      benefitsAm: ["ትልቅ መጠን", "ጠንካራ ቅጠል", "በሽታ ይቋቋማል", "ረጅም ጊዜ ይቆያል"],
      usageAm: "በመዝሪያ ክፍል ዘርተው ከ4 ሳምንት በኋላ ያዛውሩ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251114678901",
      rating: 4.5
    },

    // Tools and Equipment
    {
      id: 24,
      nameAm: "የማዳበሪያ መርጫ",
      nameEn: "Fertilizer Spreader",
      price: 3500,
      unit: "ክፍል",
      distance: "10 ኪሜ",
      vendor: "ኢትዮ መሳሪያ ንግድ",
      vendorLocation: "አዲስ አበባ፣ መገናኛ",
      image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=400&h=300&fit=crop",
      category: "መሳሪያ",
      descriptionAm: "በእጅ የሚገፋ የማዳበሪያ መርጫ። ማዳበሪያን በእኩል ለመበተን ይረዳል እና ጊዜ እና ጉልበት ይቆጥባል።",
      benefitsAm: ["ማዳበሪያን በእኩል ይበትናል", "ጊዜ እና ጉልበት ይቆጥባል", "ተንቀሳቃሽ እና ቀላል", "ለ3-5 ዓመት ይሰራል"],
      usageAm: "ከመጠቀምዎ በፊት የማዳበሪያውን መጠን ያስተካክሉ። ከተጠቀሙ በኋላ ያፅዱ።",
      availabilityAm: "በትዕዛዝ ይመጣል",
      phone: "+251911223344",
      rating: 4.4
    },
    {
      id: 25,
      nameAm: "የውሃ ፓምፕ (2 ኢንች)",
      nameEn: "Water Pump 2-inch",
      price: 8500,
      unit: "ክፍል",
      distance: "12 ኪሜ",
      vendor: "ተክለሃይማኖት መስኖ መሳሪያ",
      vendorLocation: "አዲስ አበባ፣ ተክለሃይማኖት",
      image: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=400&h=300&fit=crop",
      category: "መሳሪያ",
      descriptionAm: "2 ኢንች የዲዝል ውሃ ፓምፕ። ለመስኖ እና ለውሃ ማጓጓዝ ተስማሚ።",
      benefitsAm: ["በሰዓት 500 ሊትር አቅም", "ዲዝል ነዳጅ ይጠቀማል", "ተንቀሳቃሽ ዲዛይን", "2 ዓመት ዋስትና"],
      usageAm: "በየ50 ሰዓት ነዳጅ እና ዘይት ይቀይሩ። ዝገት እንዳይዝ ያድርቁ።",
      availabilityAm: "በማከማቻ ይገኛል",
      phone: "+251115509999",
      rating: 4.7
    },
    {
      id: 26,
      nameAm: "የአፈር ፈተና መሳሪያ",
      nameEn: "Soil Testing Kit",
      price: 1200,
      unit: "ክፍል",
      distance: "8 ኪሜ",
      vendor: "ላብ ኢኩዊፕመንት ኢትዮጵያ",
      vendorLocation: "አዲስ አበባ፣ ሳር ቤት",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400&h=300&fit=crop",
      category: "መሳሪያ",
      descriptionAm: "በቀላሉ የአፈር pH እና ንጥረ ነገር ደረጃን ለመለካት የሚያገለግል መሳሪያ።",
      benefitsAm: ["ቀላል አጠቃቀም", "ፈጣን ውጤት", "ትክክለኛ መለኪያ", "20+ ፈተናዎች ይሰራል"],
      usageAm: "የአፈር ናሙና ይውሰዱ፣ ውሃ ጨምሩ እና ውጤቱን ያንብቡ።",
      availabilityAm: "በትዕዛዝ ይመጣል",
      phone: "+251116789012",
      rating: 4.5
    },
    {
      id: 27,
      nameAm: "የእጅ መርጫ (Sprayer)",
      nameEn: "Knapsack Sprayer",
      price: 2200,
      unit: "ክፍል",
      distance: "9 ኪሜ",
      vendor: "መካኒክ አብሮ ንግድ",
      vendorLocation: "አዳማ፣ ኦሮሚያ",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=300&fit=crop",
      category: "መሳሪያ",
      descriptionAm: "16 ሊትር አቅም ያለው የጀርባ መርጫ። ለፀረ ተባይ እና ለማዳበሪያ መርጨት ተስማሚ።",
      benefitsAm: ["16 ሊትር አቅም", "ምቹ ማሸጊያ", "ቀላል አጠቃቀም", "ዝገት የማይይዝ"],
      usageAm: "ከተጠቀሙ በኋላ በንጹህ ውሃ ያጠቡ።",
      availabilityAm: "በማከማቻ ይገኛል",
      phone: "+251222111333",
      rating: 4.6
    },
    {
      id: 28,
      nameAm: "ባህላዊ ማረሻ (ጎተራ)",
      nameEn: "Traditional Plow",
      price: 1800,
      unit: "ክፍል",
      distance: "3 ኪሜ",
      vendor: "ወንድማገኝ አንጥረኛ",
      vendorLocation: "ደብረ ማርቆስ፣ አማራ",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
      category: "መሳሪያ",
      descriptionAm: "ከጠንካራ ብረት የተሰራ ባህላዊ ማረሻ። ለኢትዮጵያ ገበሬዎች ተስማሚ ዲዛይን።",
      benefitsAm: ["ጠንካራ ብረት", "ለበሬ ተስማሚ", "ረጅም ጊዜ ይሰራል", "ቀላል ጥገና"],
      usageAm: "ከአጠቃቀም በኋላ ያጽዱ እና ዘይት ይቀቡ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251587123456",
      isLocal: true,
      rating: 4.8
    },
    {
      id: 29,
      nameAm: "የእጅ ማጭድ (ማጬ)",
      nameEn: "Hand Sickle",
      price: 350,
      unit: "ክፍል",
      distance: "1 ኪሜ",
      vendor: "የአካባቢ ብረታ ብረት",
      vendorLocation: "ሁሉም ገበያዎች",
      image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=400&h=300&fit=crop",
      category: "መሳሪያ",
      descriptionAm: "ለሰብል ማጨድ የሚያገለግል ባህላዊ የብረት መሳሪያ።",
      benefitsAm: ["ጠንካራ ብረት", "ሹል ምላጭ", "ቀላል", "ረጅም ዕድሜ"],
      usageAm: "በየጊዜው ያሹሉ። ከውሃ ያርቁ።",
      availabilityAm: "ሁል ጊዜ ይገኛል",
      phone: "+251911000111",
      isLocal: true,
      rating: 4.3
    },
    {
      id: 30,
      nameAm: "ጠብታ መስኖ ኪት",
      nameEn: "Drip Irrigation Kit",
      price: 4500,
      unit: "ስብስብ",
      distance: "10 ኪሜ",
      vendor: "ስማርት ፋርም ኢትዮጵያ",
      vendorLocation: "አዲስ አበባ፣ ቦሌ",
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=300&fit=crop",
      category: "መሳሪያ",
      descriptionAm: "ውሃን በቁጠባ ለመጠቀም የሚያገለግል ዘመናዊ የመስኖ ስርዓት። ለአትክልት እና ለፍራፍሬ ተስማሚ።",
      benefitsAm: ["70% ውሃ ይቆጥባል", "ቀላል ጭነት", "ለ1000 ካሬ ሜትር ይበቃል", "ረጅም ጊዜ ይሰራል"],
      usageAm: "የመሳሪያ መመሪያ ተከትለው ይጭኑ።",
      availabilityAm: "በትዕዛዝ ይመጣል",
      phone: "+251911777888",
      rating: 4.7
    },
    {
      id: 31,
      nameAm: "ሶላር ፓምፕ",
      nameEn: "Solar Water Pump",
      price: 25000,
      unit: "ስብስብ",
      distance: "15 ኪሜ",
      vendor: "ግሪን ኢነርጂ ኢትዮጵያ",
      vendorLocation: "አዲስ አበባ",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
      category: "መሳሪያ",
      descriptionAm: "በፀሐይ ኃይል የሚሰራ የውሃ ፓምፕ። ነዳጅ አያስፈልገውም።",
      benefitsAm: ["ነዳጅ አያስፈልግም", "ዝቅተኛ ወጪ", "አካባቢ ወዳድ", "5 ዓመት ዋስትና"],
      usageAm: "በፀሐይ ቦታ ይጫኑ። በቀን 8 ሰዓት ይሰራል።",
      availabilityAm: "በትዕዛዝ ይመጣል",
      phone: "+251911555777",
      rating: 4.9
    },
    {
      id: 32,
      nameAm: "የአትክልት መቁረጫ ቢላ",
      nameEn: "Pruning Shears",
      price: 450,
      unit: "ክፍል",
      distance: "2 ኪሜ",
      vendor: "ጋርደን ቱልስ ኢትዮጵያ",
      vendorLocation: "አዲስ አበባ፣ ሜክሲኮ",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      category: "መሳሪያ",
      descriptionAm: "ለዛፎች እና ቁጥቋጦዎች መቁረጥ የሚያገለግል ሹል መሳሪያ።",
      benefitsAm: ["ሹል ምላጭ", "ምቹ እጅ መያዣ", "ዝገት የማይይዝ", "ቀላል"],
      usageAm: "ከተጠቀሙ በኋላ ያጽዱ እና ዘይት ይቀቡ።",
      availabilityAm: "በማከማቻ ይገኛል",
      phone: "+251914567890",
      rating: 4.4
    }
  ];

  const categories = ["ሁሉም", "ማዳበሪያ", "ኦርጋኒክ", "ፀረ ተባይ", "ዘር", "መሳሪያ"];
  const [selectedCategory, setSelectedCategory] = useState("ሁሉም");

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "ሁሉም" || p.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      p.nameAm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold ethiopic bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              የግብርና ገበያ
            </h1>
            <p className="text-muted-foreground ethiopic max-w-2xl mx-auto">
              በአቅራቢያዎ ያሉ ማዳበሪያዎች፣ መሳሪያዎች እና አገልግሎቶች ያግኙ
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ምርት ወይም ሻጭ ይፈልጉ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 ethiopic"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span className="ethiopic">{filteredProducts.length} ምርቶች ተገኝተዋል</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="ethiopic transition-all hover:scale-105"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Local Products Banner */}
          <Card className="p-4 bg-success/10 border-success/20">
            <div className="flex items-center gap-3">
              <Sprout className="w-6 h-6 text-success" />
              <div>
                <h3 className="font-bold ethiopic">የአካባቢ ምርቶች</h3>
                <p className="text-sm text-muted-foreground ethiopic">
                  <Leaf className="w-3 h-3 inline mr-1" />
                  ምልክት ያላቸው ምርቶች ባህላዊ/ኦርጋኒክ ናቸው
                </p>
              </div>
            </div>
          </Card>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden shadow-soft hover:shadow-medium transition-all cursor-pointer group hover:-translate-y-1"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Product Image */}
                <div className="h-48 bg-muted overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.nameAm}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {product.isLocal && (
                      <div className="bg-success text-success-foreground px-2 py-1 rounded text-xs ethiopic flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        ባህላዊ
                      </div>
                    )}
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs ethiopic">
                      {product.category}
                    </div>
                  </div>
                  {product.rating && (
                    <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold ethiopic mb-1">{product.nameAm}</h3>
                    <p className="text-sm text-muted-foreground">{product.vendor}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()}</span>
                    <span className="text-muted-foreground ethiopic">ብር</span>
                    <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Store className="w-4 h-4" />
                    <span className="ethiopic line-clamp-1">{product.vendorLocation}</span>
                  </div>

                  <Button variant="outline" className="w-full ethiopic group-hover:bg-primary group-hover:text-primary-foreground transition-colors" size="lg">
                    <Package className="w-4 h-4 mr-2" />
                    ዝርዝሩን ይመልከቱ
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Info Banner */}
          <Card className="p-6 bg-accent/10 border-accent/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 ethiopic">የምርት ጥያቄዎች</h3>
                <p className="text-sm text-muted-foreground ethiopic">
                  ማንኛውንም ምርት ጠቅ በማድረግ ዝርዝር መረጃ እና የአቅራቢ ስልክ ቁጥር ያገኛሉ። 
                  ሁሉም የዋጋ መረጃዎች የጊዜያዊ እና በአካባቢ ይለያያሉ።
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl ethiopic">{selectedProduct.nameAm}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedProduct.nameEn}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                <div className="h-64 rounded-lg overflow-hidden relative">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.nameAm}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.isLocal && (
                    <div className="absolute top-3 right-3 bg-success text-success-foreground px-3 py-1 rounded-full text-sm ethiopic flex items-center gap-1">
                      <Leaf className="w-4 h-4" />
                      ባህላዊ/ኦርጋኒክ
                    </div>
                  )}
                </div>

                {/* Price & Location */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                    <span className="text-2xl font-bold text-primary">{selectedProduct.price.toLocaleString()}</span>
                    <span className="text-muted-foreground ethiopic">ብር / {selectedProduct.unit}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                    <MapPin className="w-4 h-4" />
                    <span className="ethiopic">{selectedProduct.vendorLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                    <Truck className="w-4 h-4" />
                    <span className="ethiopic">{selectedProduct.availabilityAm}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-bold ethiopic mb-2">ዝርዝር መግለጫ</h4>
                  <p className="text-muted-foreground ethiopic">{selectedProduct.descriptionAm}</p>
                </div>

                {/* Ethiopian Alternative */}
                {selectedProduct.alternativeAm && (
                  <Card className="p-4 bg-success/10 border-success/20">
                    <div className="flex items-start gap-3">
                      <Sprout className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold ethiopic text-sm mb-1">የኢትዮጵያ ባህላዊ አማራጭ</h4>
                        <p className="text-sm ethiopic text-muted-foreground">{selectedProduct.alternativeAm}</p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Benefits */}
                <div>
                  <h4 className="font-bold ethiopic mb-2">ጥቅሞች</h4>
                  <ul className="space-y-2">
                    {selectedProduct.benefitsAm.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="ethiopic text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Usage */}
                <div>
                  <h4 className="font-bold ethiopic mb-2">የአጠቃቀም መመሪያ</h4>
                  <p className="text-muted-foreground ethiopic bg-muted p-4 rounded-lg">{selectedProduct.usageAm}</p>
                </div>

                {/* Vendor Info */}
                <Card className="p-4 bg-accent/10 border-accent/20">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="font-bold ethiopic">{selectedProduct.vendor}</h4>
                      <p className="text-sm text-muted-foreground ethiopic">{selectedProduct.vendorLocation}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span>{selectedProduct.rating || 4.5} (23 ግምገማዎች)</span>
                      </div>
                    </div>
                    <Button className="ethiopic" onClick={() => window.open(`tel:${selectedProduct.phone}`)}>
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedProduct.phone}
                    </Button>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button className="flex-1 ethiopic" size="lg" onClick={() => window.open(`tel:${selectedProduct.phone}`)}>
                    <Phone className="w-5 h-5 mr-2" />
                    ደውሉ
                  </Button>
                  <Button variant="outline" className="ethiopic" size="lg" onClick={() => setSelectedProduct(null)}>
                    <X className="w-5 h-5 mr-2" />
                    ዝጋ
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Market;
