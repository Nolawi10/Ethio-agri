import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Eye,
  Download,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Leaf
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  nameAm: string;
  nameEn: string;
  price: number;
  unit: string;
  category: string;
  status: "active" | "inactive";
}

interface DiagnosisRecord {
  id: number;
  date: string;
  cropAm: string;
  diagnosisAm: string;
  confidence: number;
  region: string;
  status: "pending" | "reviewed";
}

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    { id: 1, nameAm: "ዩሪያ ማዳበሪያ", nameEn: "Urea Fertilizer", price: 450, unit: "50 kg", category: "ማዳበሪያ", status: "active" },
    { id: 2, nameAm: "የቡና ኮምፖስት", nameEn: "Coffee Compost", price: 200, unit: "5 ቶን", category: "ኦርጋኒክ", status: "active" },
    { id: 3, nameAm: "DAP ማዳበሪያ", nameEn: "DAP Fertilizer", price: 550, unit: "50 kg", category: "ማዳበሪያ", status: "active" },
    { id: 4, nameAm: "ተፈጥሮአዊ ፀረ ተባይ", nameEn: "Organic Pesticide", price: 150, unit: "1 ሊትር", category: "ፀረ ተባይ", status: "active" },
    { id: 5, nameAm: "የማዳበሪያ መርጫ", nameEn: "Fertilizer Spreader", price: 3500, unit: "ክፍል", category: "መሳሪያ", status: "inactive" },
  ]);

  const [diagnoses] = useState<DiagnosisRecord[]>([
    { id: 1, date: "2024-01-15", cropAm: "ጤፍ", diagnosisAm: "የናይትሮጅን እጥረት", confidence: 92, region: "ኦሮሚያ", status: "reviewed" },
    { id: 2, date: "2024-01-14", cropAm: "በቆሎ", diagnosisAm: "የቅጠል ዝገት በሽታ", confidence: 87, region: "አማራ", status: "pending" },
    { id: 3, date: "2024-01-14", cropAm: "ቡና", diagnosisAm: "አፊድ ወረራ", confidence: 94, region: "SNNPR", status: "reviewed" },
    { id: 4, date: "2024-01-13", cropAm: "ስንዴ", diagnosisAm: "የፎስፎረስ እጥረት", confidence: 85, region: "ትግራይ", status: "pending" },
    { id: 5, date: "2024-01-13", cropAm: "ማሽላ", diagnosisAm: "የፖታሲየም እጥረት", confidence: 88, region: "ኦሮሚያ", status: "reviewed" },
  ]);

  const [newProduct, setNewProduct] = useState({
    nameAm: "",
    nameEn: "",
    price: "",
    unit: "",
    category: ""
  });

  const stats = {
    totalDiagnoses: 1247,
    activeProducts: products.filter(p => p.status === "active").length,
    totalUsers: 856,
    pendingReviews: diagnoses.filter(d => d.status === "pending").length,
    topDeficiency: "የናይትሮጅን እጥረት",
    topRegion: "ኦሮሚያ",
    weeklyGrowth: 12.5,
    monthlyDiagnoses: 342,
    activeExtensionWorkers: 45,
    totalGuides: 28
  };

  const regionStats = [
    { region: "ኦሮሚያ", count: 423, percentage: 34 },
    { region: "አማራ", count: 312, percentage: 25 },
    { region: "SNNPR", count: 249, percentage: 20 },
    { region: "ትግራይ", count: 163, percentage: 13 },
    { region: "ሌሎች", count: 100, percentage: 8 },
  ];

  const cropStats = [
    { crop: "ጤፍ", count: 456, trend: "+15%" },
    { crop: "በቆሎ", count: 312, trend: "+8%" },
    { crop: "ስንዴ", count: 234, trend: "+12%" },
    { crop: "ቡና", count: 189, trend: "+5%" },
    { crop: "ማሽላ", count: 56, trend: "-2%" },
  ];

  const recentUsers = [
    { name: "አብርሃም ተስፋዬ", region: "ኦሮሚያ", date: "2024-01-15", role: "ገበሬ" },
    { name: "ሳራ ገብረ", region: "አማራ", date: "2024-01-14", role: "ኤክስቴንሽን" },
    { name: "ዳዊት ሞላ", region: "ትግራይ", date: "2024-01-14", role: "ገበሬ" },
    { name: "ሜሮን አበበ", region: "SNNPR", date: "2024-01-13", role: "ገበሬ" },
  ];

  const handleAddProduct = () => {
    if (!newProduct.nameAm || !newProduct.price) {
      toast({
        title: "ስህተት",
        description: "እባክዎን ሁሉንም መረጃዎች ያስገቡ",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: products.length + 1,
      nameAm: newProduct.nameAm,
      nameEn: newProduct.nameEn,
      price: Number(newProduct.price),
      unit: newProduct.unit,
      category: newProduct.category,
      status: "active"
    };

    setProducts([...products, product]);
    setNewProduct({ nameAm: "", nameEn: "", price: "", unit: "", category: "" });
    toast({
      title: "ተሳክቷል",
      description: "አዲስ ምርት ተጨምሯል"
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "ተሳክቷል",
      description: "ምርቱ ተወግዷል"
    });
  };

  const toggleProductStatus = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p
    ));
  };

  const handleExportCSV = () => {
    toast({
      title: "ወደ ውጭ መላክ",
      description: "CSV ፋይል እየተዘጋጀ ነው..."
    });
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold ethiopic flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-primary" />
                ዳሽቦርድ
              </h1>
              <p className="text-muted-foreground ethiopic mt-1">
                የ Ethio Agri አፕሊኬሽን አስተዳደር ፓነል
              </p>
            </div>
            <Button onClick={handleExportCSV} className="ethiopic">
              <Download className="w-4 h-4 mr-2" />
              CSV ወደ ውጭ ላክ
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
                  <div className="text-2xl font-bold">{stats.totalDiagnoses}</div>
                  <div className="text-sm text-muted-foreground ethiopic">ጠቅላላ ምርመራዎች</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.activeProducts}</div>
                  <div className="text-sm text-muted-foreground ethiopic">ንቁ ምርቶች</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <div className="text-sm text-muted-foreground ethiopic">ተጠቃሚዎች</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.pendingReviews}</div>
                  <div className="text-sm text-muted-foreground ethiopic">በመጠባበቅ ላይ</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-lg">
              <TabsTrigger value="overview" className="ethiopic">ማጠቃለያ</TabsTrigger>
              <TabsTrigger value="products" className="ethiopic">ምርቶች</TabsTrigger>
              <TabsTrigger value="diagnoses" className="ethiopic">ምርመራዎች</TabsTrigger>
              <TabsTrigger value="settings" className="ethiopic">ቅንብሮች</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Top Deficiencies */}
                <Card className="p-6">
                  <h3 className="font-bold ethiopic mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    ዋና እጥረቶች
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "የናይትሮጅን እጥረት", count: 423, color: "bg-primary" },
                      { name: "የፎስፎረስ እጥረት", count: 287, color: "bg-accent" },
                      { name: "የቅጠል ዝገት", count: 198, color: "bg-destructive" },
                      { name: "አፊድ ወረራ", count: 156, color: "bg-success" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="ethiopic flex-1">{item.name}</span>
                        <span className="font-bold">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Regional Distribution */}
                <Card className="p-6">
                  <h3 className="font-bold ethiopic mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    በክልል የተከፋፈለ
                  </h3>
                  <div className="space-y-3">
                    {regionStats.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="ethiopic">{item.region}</span>
                          <span className="text-muted-foreground">{item.count} ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="font-bold ethiopic mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  የቅርብ ጊዜ እንቅስቃሴ
                </h3>
                <div className="space-y-3">
                  {diagnoses.slice(0, 5).map((d) => (
                    <div key={d.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${d.status === "reviewed" ? "bg-success" : "bg-accent"}`} />
                        <div>
                          <div className="font-medium ethiopic">{d.diagnosisAm}</div>
                          <div className="text-sm text-muted-foreground ethiopic">{d.cropAm} • {d.region}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{d.confidence}%</div>
                        <div className="text-xs text-muted-foreground">{d.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl ethiopic">የምርት አስተዳደር</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="ethiopic">
                      <Plus className="w-4 h-4 mr-2" />
                      አዲስ ምርት
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="ethiopic">አዲስ ምርት ይጨምሩ</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label className="ethiopic">ስም (አማርኛ)</Label>
                        <Input 
                          value={newProduct.nameAm}
                          onChange={(e) => setNewProduct({...newProduct, nameAm: e.target.value})}
                          className="ethiopic"
                          placeholder="የምርት ስም"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Name (English)</Label>
                        <Input 
                          value={newProduct.nameEn}
                          onChange={(e) => setNewProduct({...newProduct, nameEn: e.target.value})}
                          placeholder="Product name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="ethiopic">ዋጋ (ብር)</Label>
                          <Input 
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="ethiopic">ክፍል</Label>
                          <Input 
                            value={newProduct.unit}
                            onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                            placeholder="50 kg"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="ethiopic">ምድብ</Label>
                        <Select value={newProduct.category} onValueChange={(v) => setNewProduct({...newProduct, category: v})}>
                          <SelectTrigger className="ethiopic">
                            <SelectValue placeholder="ምድብ ይምረጡ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ማዳበሪያ" className="ethiopic">ማዳበሪያ</SelectItem>
                            <SelectItem value="ኦርጋኒክ" className="ethiopic">ኦርጋኒክ</SelectItem>
                            <SelectItem value="ፀረ ተባይ" className="ethiopic">ፀረ ተባይ</SelectItem>
                            <SelectItem value="መሳሪያ" className="ethiopic">መሳሪያ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddProduct} className="w-full ethiopic">
                        <Plus className="w-4 h-4 mr-2" />
                        ምርት ጨምር
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 ethiopic font-medium">ምርት</th>
                        <th className="text-left p-4 ethiopic font-medium">ምድብ</th>
                        <th className="text-left p-4 ethiopic font-medium">ዋጋ</th>
                        <th className="text-left p-4 ethiopic font-medium">ሁኔታ</th>
                        <th className="text-right p-4 ethiopic font-medium">ድርጊቶች</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-t border-border">
                          <td className="p-4">
                            <div className="font-medium ethiopic">{product.nameAm}</div>
                            <div className="text-sm text-muted-foreground">{product.nameEn}</div>
                          </td>
                          <td className="p-4 ethiopic">{product.category}</td>
                          <td className="p-4">
                            <span className="font-medium">{product.price}</span>
                            <span className="text-muted-foreground ethiopic"> ብር/{product.unit}</span>
                          </td>
                          <td className="p-4">
                            <span 
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                product.status === "active" 
                                  ? "bg-success/10 text-success" 
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {product.status === "active" ? (
                                <><CheckCircle className="w-3 h-3" /> ንቁ</>
                              ) : (
                                <><AlertTriangle className="w-3 h-3" /> ቆመ</>
                              )}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => toggleProductStatus(product.id)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Diagnoses Tab */}
            <TabsContent value="diagnoses" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xl ethiopic">የምርመራ መዝገቦች</h3>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 ethiopic">
                      <SelectValue placeholder="ሁኔታ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="ethiopic">ሁሉም</SelectItem>
                      <SelectItem value="pending" className="ethiopic">በመጠባበቅ</SelectItem>
                      <SelectItem value="reviewed" className="ethiopic">ተገምግሟል</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={handleExportCSV} className="ethiopic">
                    <Download className="w-4 h-4 mr-2" />
                    ላክ
                  </Button>
                </div>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 ethiopic font-medium">ቀን</th>
                        <th className="text-left p-4 ethiopic font-medium">ሰብል</th>
                        <th className="text-left p-4 ethiopic font-medium">ምርመራ</th>
                        <th className="text-left p-4 ethiopic font-medium">እርግጠኝነት</th>
                        <th className="text-left p-4 ethiopic font-medium">ክልል</th>
                        <th className="text-left p-4 ethiopic font-medium">ሁኔታ</th>
                        <th className="text-right p-4 ethiopic font-medium">ድርጊቶች</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diagnoses.map((d) => (
                        <tr key={d.id} className="border-t border-border">
                          <td className="p-4 text-muted-foreground">{d.date}</td>
                          <td className="p-4 ethiopic">{d.cropAm}</td>
                          <td className="p-4 ethiopic font-medium">{d.diagnosisAm}</td>
                          <td className="p-4">
                            <span className={`font-medium ${d.confidence >= 90 ? "text-success" : d.confidence >= 80 ? "text-accent" : "text-destructive"}`}>
                              {d.confidence}%
                            </span>
                          </td>
                          <td className="p-4 ethiopic">{d.region}</td>
                          <td className="p-4">
                            <span 
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                d.status === "reviewed" 
                                  ? "bg-success/10 text-success" 
                                  : "bg-accent/10 text-accent"
                              }`}
                            >
                              {d.status === "reviewed" ? "ተገምግሟል" : "በመጠባበቅ"}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <FileText className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-xl ethiopic mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  የስርዓት ቅንብሮች
                </h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="ethiopic">የአፕሊኬሽን ስም</Label>
                      <Input defaultValue="Ethio Agri" />
                    </div>
                    <div className="space-y-2">
                      <Label className="ethiopic">ነባሪ ቋንቋ</Label>
                      <Select defaultValue="am">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="am" className="ethiopic">አማርኛ</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="om">Afaan Oromo</SelectItem>
                          <SelectItem value="ti" className="ethiopic">ትግርኛ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="ethiopic">የድጋፍ ኢሜይል</Label>
                    <Input type="email" defaultValue="support@ethioagri.com" />
                  </div>

                  <div className="space-y-2">
                    <Label className="ethiopic">የስርዓት ማስታወቂያ</Label>
                    <Textarea 
                      className="ethiopic"
                      placeholder="ለተጠቃሚዎች የሚታይ ማስታወቂያ..."
                      rows={3}
                    />
                  </div>

                  <Button className="ethiopic">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    ቅንብሮችን አስቀምጥ
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-destructive/20">
                <h3 className="font-bold text-xl ethiopic mb-4 text-destructive">አደገኛ ቦታ</h3>
                <p className="text-muted-foreground ethiopic mb-4">
                  እነዚህ ድርጊቶች የማይቀለበሱ ናቸው። እባክዎን በጥንቃቄ ይጠቀሙ።
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" className="ethiopic border-destructive text-destructive hover:bg-destructive/10">
                    ሁሉንም ዳታ አጥፋ
                  </Button>
                  <Button variant="outline" className="ethiopic border-destructive text-destructive hover:bg-destructive/10">
                    መሸጎጫ አፅዳ
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
