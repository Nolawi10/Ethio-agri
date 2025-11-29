import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Leaf, Droplet, Shield, Download } from "lucide-react";

const Guides = () => {
  const guideCategories = [
    {
      icon: Leaf,
      titleAm: "የሰብል እንክብካቤ",
      titleEn: "Crop Care",
      descAm: "ለተለያዩ ሰብሎች የእድገት ደረጃዎች እና የአጠባበቅ ምክሮች",
      guides: ["ጤፍ", "በቆሎ", "ስንዴ", "ማሽላ"],
    },
    {
      icon: Shield,
      titleAm: "የበሽታ መከላከያ",
      titleEn: "Disease Prevention",
      descAm: "ከተለመዱ የእፅዋት በሽታዎች እና ተባዮች እንዴት መከላከል እንደሚቻል",
      guides: ["የፈንገስ በሽታዎች", "ነፍሳት ተባዮች", "የባክቴሪያ ኢንፌክሽኖች"],
    },
    {
      icon: Droplet,
      titleAm: "የውሃ አስተዳደር",
      titleEn: "Water Management",
      descAm: "ውጤታማ የውሃ አጠቃቀም እና የመስኖ ቴክኒኮች",
      guides: ["የዝናብ ወቅት", "ድርቅ አስተዳደር", "የመስኖ ዘዴዎች"],
    },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold ethiopic">የግብርና መመሪያዎች</h1>
            <p className="text-muted-foreground ethiopic">
              ከመስመር ውጭ ሊደረሱ የሚችሉ ሙሉ የግብርና ምክሮች እና መመሪያዎች
            </p>
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-3 gap-6">
            {guideCategories.map((category, idx) => (
              <Card key={idx} className="p-6 shadow-soft hover:shadow-medium transition-all cursor-pointer">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 ethiopic">{category.titleAm}</h3>
                    <p className="text-sm text-muted-foreground ethiopic">{category.descAm}</p>
                  </div>
                  <div className="space-y-2 pt-2">
                    {category.guides.map((guide, gIdx) => (
                      <div
                        key={gIdx}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm ethiopic">{guide}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Featured Guide */}
          <Card className="p-8 shadow-medium bg-gradient-to-br from-primary/5 to-success/5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium ethiopic">
                  ተወዳጅ
                </div>
                <Button variant="outline" size="sm" className="ethiopic">
                  <Download className="w-4 h-4 mr-2" />
                  ያውርዱ (PDF)
                </Button>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold ethiopic">
                የጤፍ የእድገት ደረጃዎች እና እንክብካቤ
              </h2>
              <p className="text-muted-foreground ethiopic leading-relaxed">
                ጤፍ በኢትዮጵያ በጣም አስፈላጊ ከሆኑ የእህል ሰብሎች አንዱ ነው። ይህ መመሪያ ከዘር መዝራት እስከ ማጨድ ድረስ ያሉትን ሁሉንም ደረጃዎች ይሸፍናል።
                የአፈር ዝግጅት፣ የመዝሪያ መጠን፣ የማዳበሪያ አጠቃቀም እና የተለመዱ የበሽታ አስተዳደር ጉዳዮችን ያካትታል።
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-success font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-medium ethiopic">የዘር ዝግጅት</div>
                    <div className="text-sm text-muted-foreground ethiopic">ጥራት ያለው ዘር መምረጥ</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-success font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-medium ethiopic">መዝራት</div>
                    <div className="text-sm text-muted-foreground ethiopic">ትክክለኛ ጊዜ እና ጥልቀት</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-success font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-medium ethiopic">እንክብካቤ</div>
                    <div className="text-sm text-muted-foreground ethiopic">ማዳበሪያ እና ውሃ</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-success font-bold">4</span>
                  </div>
                  <div>
                    <div className="font-medium ethiopic">ማጨድ</div>
                    <div className="text-sm text-muted-foreground ethiopic">ትክክለኛው ጊዜ</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Offline Access Info */}
          <Card className="p-6 bg-success/10 border-success/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2 ethiopic">ከመስመር ውጭ መዳረሻ</h3>
                <p className="text-muted-foreground ethiopic leading-relaxed mb-4">
                  ሁሉም መመሪያዎች ኢንተርኔት ከሌለ በኋላ ሊደረሱ ይችላሉ። አንዴ ከተመለከቱ በኋላ፣ 
                  በመሳሪያዎ ላይ ተቀምጠዋል። በ PDF ፎርማት ማውረድ ይችላሉ።
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="ethiopic">አማርኛ</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="ethiopic">አፋን ኦሮሞ</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="ethiopic">ትግርኛ</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Guides;
