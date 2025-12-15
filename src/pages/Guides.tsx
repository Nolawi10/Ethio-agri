import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Leaf, Droplet, Shield, Download, ExternalLink, FileText, Sprout, Trees, Mountain, Wheat } from "lucide-react";

interface Guide {
  id: number;
  titleAm: string;
  titleEn: string;
  descriptionAm: string;
  contentAm: string[];
  bookUrl?: string;
  bookTitleAm?: string;
  bookAuthor?: string;
}

const Guides = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const indigenousMethods: Guide[] = [
    {
      id: 1,
      titleAm: "የቡና ቅርፊት ኮምፖስት ዝግጅት",
      titleEn: "Coffee Husk Composting",
      descriptionAm: "ከቡና ማቀነባበሪያ የሚወጣ ቅርፊት ወደ ጠቃሚ ማዳበሪያ መቀየር",
      contentAm: [
        "የቡና ቅርፊትን ከማቀነባበሪያ ቦታዎች ይሰብስቡ",
        "ከፍግ ጋር በ 3:1 መጠን ይቀላቅሉ",
        "በየሳምንቱ ውሃ ይረጩ እና ያናውጡ",
        "ከ2-3 ወር በኋላ ጥቁር እና ለስላሳ ኮምፖስት ይሆናል",
        "በሄክታር 5-10 ቶን ይተግብሩ"
      ],
      bookUrl: "https://www.moa.gov.et/documents",
      bookTitleAm: "የኢትዮጵያ የኦርጋኒክ ግብርና መመሪያ",
      bookAuthor: "የግብርና ሚኒስቴር"
    },
    {
      id: 2,
      titleAm: "የአመድ ማዳበሪያ አጠቃቀም",
      titleEn: "Wood Ash Fertilizer",
      descriptionAm: "የእንጨት አመድ ለአፈር ጤንነት እና ለተባይ መከላከያ",
      contentAm: [
        "ከእንጨት ማገዶ የሚወጣ አመድ ይሰብስቡ",
        "ፖታሲየም እና ካልሲየም ለአፈር ይሰጣል",
        "በሄክታር 500-1000 ኪሎ ግራም ይተግብሩ",
        "የአፈር pH ደረጃ ያስተካክላል",
        "አንዳንድ ተባዮችን ለመከላከል ይረዳል"
      ],
      bookUrl: "https://www.eiar.gov.et",
      bookTitleAm: "ባህላዊ የግብርና ዘዴዎች በኢትዮጵያ",
      bookAuthor: "የኢትዮጵያ ግብርና ምርምር ኢንስቲትዩት"
    },
    {
      id: 3,
      titleAm: "አረንጓዴ ማዳበሪያ (Green Manure)",
      titleEn: "Green Manure Cover Crops",
      descriptionAm: "ሰብሎችን ወደ አፈር በማስገባት ናይትሮጅን ማበልጸግ",
      contentAm: [
        "ልፍስ፣ ባቄላ ወይም ሌሎች ጥራጥሬዎችን ይዝሩ",
        "ከአበባ በፊት ወደ አፈር ይቅበሩ",
        "ናይትሮጅን ወደ አፈር ይጨምራል",
        "የአፈር መዋቅር ያሻሽላል",
        "ከ4-6 ሳምንታት በኋላ ዋና ሰብልዎን ይዝሩ"
      ],
      bookUrl: "https://cgspace.cgiar.org",
      bookTitleAm: "ዘላቂ ግብርና ለኢትዮጵያ ገበሬዎች",
      bookAuthor: "CGIAR"
    },
    {
      id: 4,
      titleAm: "የእንስሳት ፍግ ዝግጅት",
      titleEn: "Animal Manure Preparation",
      descriptionAm: "ከብት፣ በግ እና ዶሮ ፍግ በትክክል ማዘጋጀት",
      contentAm: [
        "ፍግን ለ1-2 ወር ማበስበስ ይቻላል",
        "ከብቶች ፍግ ለአጠቃላይ ሰብሎች ተስማሚ",
        "የዶሮ ፍግ ናይትሮጅን ከፍ ያለ ነው",
        "በሄክታር 10-15 ቶን ይተግብሩ",
        "ከመዝራት 2-4 ሳምንታት በፊት ይተግብሩ"
      ],
      bookUrl: "https://www.fao.org/ethiopia",
      bookTitleAm: "የእንስሳት ፍግ አስተዳደር መመሪያ",
      bookAuthor: "FAO Ethiopia"
    },
    {
      id: 5,
      titleAm: "የኒም ዘይት ፀረ ተባይ",
      titleEn: "Neem Oil Pesticide",
      descriptionAm: "ተፈጥሮአዊ የተባይ መከላከያ ከኒም ዛፍ",
      contentAm: [
        "የኒም ዘሮችን ይፍጩ እና በውሃ ይቀልቅሉ",
        "100 ግራም ዘር በ1 ሊትር ውሃ",
        "ለ12 ሰዓት ያስቀምጡ ከዚያ ያጣሩ",
        "በቅጠሎች ላይ ይረጩ",
        "ለአፊድ፣ ቅማል እና ሌሎች ተባዮች ውጤታማ"
      ],
      bookUrl: "https://www.icipe.org",
      bookTitleAm: "ተፈጥሮአዊ ፀረ ተባይ ዘዴዎች",
      bookAuthor: "ICIPE"
    },
    {
      id: 6,
      titleAm: "የበርበሬ/ነጭ ሽንኩርት ፀረ ተባይ",
      titleEn: "Chili-Garlic Pesticide",
      descriptionAm: "በቤት የሚዘጋጅ ተፈጥሮአዊ ፀረ ተባይ",
      contentAm: [
        "50 ግራም በርበሬ እና 50 ግራም ነጭ ሽንኩርት ይፍጩ",
        "በ1 ሊትር ውሃ ውስጥ ለ24 ሰዓት ያስቀምጡ",
        "ያጣሩ እና ትንሽ ሳሙና ይጨምሩ",
        "በቀን በማታ ሰዓት ይረጩ",
        "በየ5-7 ቀን ይድገሙ"
      ],
      bookUrl: "https://www.ippmedia.com",
      bookTitleAm: "የቤት ውስጥ ፀረ ተባይ ዘዴዎች",
      bookAuthor: "Practical Action Ethiopia"
    },
    {
      id: 7,
      titleAm: "ሸምበቆ ማልች (Mulching)",
      titleEn: "Straw Mulching",
      descriptionAm: "የአፈር እርጥበት ጥበቃ እና አረም መከላከያ",
      contentAm: [
        "ከተሰበሰበ ሰብል ቅሪት ሸምበቆ ይሰብስቡ",
        "በ5-10 ሴንቲ ሜትር ውፍረት ይዝርጉ",
        "የአፈር እርጥበት ይጠብቃል",
        "አረም እንዳይበቅል ይከላከላል",
        "ቀስ በቀስ ወደ ኮምፖስት ይቀየራል"
      ],
      bookUrl: "https://ethiopian-agricultural-portal.org",
      bookTitleAm: "የውሃ ቆጣቢ ግብርና ዘዴዎች",
      bookAuthor: "ATA"
    },
    {
      id: 8,
      titleAm: "የአፈር ጥበቃ ቴራስ",
      titleEn: "Soil Conservation Terracing",
      descriptionAm: "በተራራማ አካባቢ አፈር ለመጠበቅ",
      contentAm: [
        "በተዳፋት መሬት ላይ ደረጃዎች ይገንቡ",
        "ውሃ እንዲቆም እና እንዳይሸረሸር ይረዳል",
        "በየ10-15 ሜትር ቴራስ ይገንቡ",
        "ዛፎች እና ሳር ለማጠናከር ይትከሉ",
        "ለብዙ ዓመታት የሚያገለግል ዘላቂ መፍትሄ"
      ],
      bookUrl: "https://www.worldagroforestry.org",
      bookTitleAm: "የኢትዮጵያ ደጋ አፈር ጥበቃ",
      bookAuthor: "World Agroforestry"
    }
  ];

  const guideCategories = [
    {
      icon: Leaf,
      titleAm: "የሰብል እንክብካቤ",
      titleEn: "Crop Care",
      descAm: "ለተለያዩ ሰብሎች የእድገት ደረጃዎች እና የአጠባበቅ ምክሮች",
      guides: ["ጤፍ", "በቆሎ", "ስንዴ", "ማሽላ", "ገብስ"],
    },
    {
      icon: Shield,
      titleAm: "የበሽታ መከላከያ",
      titleEn: "Disease Prevention",
      descAm: "ከተለመዱ የእፅዋት በሽታዎች እና ተባዮች እንዴት መከላከል እንደሚቻል",
      guides: ["የፈንገስ በሽታዎች", "ነፍሳት ተባዮች", "የባክቴሪያ ኢንፌክሽኖች", "የቫይረስ በሽታዎች"],
    },
    {
      icon: Droplet,
      titleAm: "የውሃ አስተዳደር",
      titleEn: "Water Management",
      descAm: "ውጤታማ የውሃ አጠቃቀም እና የመስኖ ቴክኒኮች",
      guides: ["የዝናብ ወቅት", "ድርቅ አስተዳደር", "የመስኖ ዘዴዎች", "ጠብታ መስኖ"],
    },
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

          {/* Indigenous Methods Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-2xl font-bold ethiopic">ባህላዊ የግብርና ዘዴዎች</h2>
                <p className="text-muted-foreground ethiopic text-sm">በኢትዮጵያ ለዘመናት የተሞከሩ ዘላቂ ዘዴዎች</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {indigenousMethods.map((method) => (
                <Card 
                  key={method.id} 
                  className="p-4 shadow-soft hover:shadow-medium transition-all cursor-pointer group"
                  onClick={() => setSelectedGuide(method)}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Leaf className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold ethiopic text-sm leading-tight">{method.titleAm}</h4>
                    <p className="text-xs text-muted-foreground ethiopic line-clamp-2">{method.descriptionAm}</p>
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <FileText className="w-3 h-3" />
                      <span className="ethiopic">መመሪያ ያንብቡ</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Research Books Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold ethiopic">የምርምር መጽሐፍት እና ሰነዶች</h2>
                <p className="text-muted-foreground ethiopic text-sm">ለተጨማሪ ንባብ የሚረዱ ሀብቶች</p>
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
                      <h4 className="font-bold ethiopic text-sm mb-1">{book.titleAm}</h4>
                      <p className="text-xs text-muted-foreground">{book.titleEn}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full ethiopic text-xs"
                      onClick={() => window.open(book.url, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      ድረ ገፅ ጎብኝ
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
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

      {/* Guide Detail Dialog */}
      <Dialog open={!!selectedGuide} onOpenChange={() => setSelectedGuide(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedGuide && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl ethiopic">{selectedGuide.titleAm}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-muted-foreground ethiopic">{selectedGuide.descriptionAm}</p>
                
                <div className="space-y-2">
                  <h4 className="font-bold ethiopic">የአሰራር ደረጃዎች</h4>
                  <div className="space-y-2">
                    {selectedGuide.contentAm.map((step, idx) => (
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
                      <h4 className="font-bold ethiopic text-sm">ተዛማጅ መጽሐፍ</h4>
                      <p className="ethiopic text-sm">{selectedGuide.bookTitleAm}</p>
                      <p className="text-xs text-muted-foreground">{selectedGuide.bookAuthor}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full ethiopic"
                        onClick={() => window.open(selectedGuide.bookUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        ሙሉ መጽሐፍ ይመልከቱ
                      </Button>
                    </div>
                  </Card>
                )}

                <Button variant="outline" className="w-full ethiopic" onClick={() => setSelectedGuide(null)}>
                  ዝጋ
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