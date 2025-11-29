import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import ureaFertilizer from "@/assets/products/urea-fertilizer.jpg";
import coffeeCompost from "@/assets/products/coffee-compost.jpg";
import dapFertilizer from "@/assets/products/dap-fertilizer.jpg";
import organicPesticide from "@/assets/products/organic-pesticide.jpg";
import fertilizerSpreader from "@/assets/products/fertilizer-spreader.jpg";
import waterPump from "@/assets/products/water-pump.jpg";

const Market = () => {
  const products = [
    {
      nameAm: "ዩሪያ ማዳበሪያ",
      nameEn: "Urea Fertilizer",
      price: 450,
      unit: "50 kg",
      distance: "2.5 ኪሜ",
      vendor: "የግብርና ድርጅት",
      image: ureaFertilizer,
    },
    {
      nameAm: "የቡና ኮምፖስት",
      nameEn: "Coffee Compost",
      price: 200,
      unit: "5 ቶን",
      distance: "5 ኪሜ",
      vendor: "የአካባቢ ገበሬዎች ማህበር",
      image: coffeeCompost,
    },
    {
      nameAm: "DAP ማዳበሪያ",
      nameEn: "DAP Fertilizer",
      price: 550,
      unit: "50 kg",
      distance: "3 ኪሜ",
      vendor: "የግብርና ድርጅት",
      image: dapFertilizer,
    },
    {
      nameAm: "ተፈጥሮአዊ ፀረ ተባይ",
      nameEn: "Organic Pesticide",
      price: 150,
      unit: "1 ሊትር",
      distance: "4 ኪሜ",
      vendor: "ኢኮ ግሪን",
      image: organicPesticide,
    },
    {
      nameAm: "የማዳበሪያ መርጫ",
      nameEn: "Fertilizer Spreader",
      price: 3500,
      unit: "ክፍል",
      distance: "10 ኪሜ",
      vendor: "የግብርና መሳሪያዎች",
      image: fertilizerSpreader,
    },
    {
      nameAm: "የውሃ ፓምፕ",
      nameEn: "Water Pump",
      price: 8500,
      unit: "ክፍል",
      distance: "12 ኪሜ",
      vendor: "የመስኖ መፍትሄዎች",
      image: waterPump,
    },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold ethiopic">የግብርና ገበያ</h1>
            <p className="text-muted-foreground ethiopic">
              በአቅራቢያዎ ያሉ ማዳበሪያዎች፣ መሳሪያዎች እና አገልግሎቶች ያግኙ
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <Card key={idx} className="overflow-hidden shadow-soft hover:shadow-medium transition-all">
                {/* Product Image */}
                <div className="h-48 bg-muted overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.nameAm}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold ethiopic mb-1">{product.nameAm}</h3>
                    <p className="text-sm text-muted-foreground">{product.vendor}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <span className="text-muted-foreground ethiopic">ብር</span>
                    <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="ethiopic">{product.distance}</span>
                  </div>

                  <Button variant="outline" className="w-full ethiopic" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    መረጃ ጠይቅ
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
                  "መረጃ ጠይቅ" የሚለውን ቁልፍ ጠቅ በማድረግ በቀጥታ ከአቅራቢዎች ጋር ለመገናኘት ቀላል ቅጽ ያገኛሉ። 
                  ሁሉም የዋጋ መረጃዎች የጊዜያዊ እና በአካባቢ ይለያያሉ።
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Market;
