import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Thermometer, Sunrise, Sunset, CloudSun, CloudDrizzle, AlertTriangle, Leaf, Calendar, MapPin, Gauge, Umbrella, TrendingUp, TrendingDown, Zap, CloudLightning } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Weather = () => {
  const [selectedRegion, setSelectedRegion] = useState("addis-ababa");
  const [activeTab, setActiveTab] = useState<"hourly" | "daily" | "farming">("daily");

  const regions = [
    { id: "addis-ababa", nameAm: "አዲስ አበባ", nameEn: "Addis Ababa" },
    { id: "bahir-dar", nameAm: "ባህር ዳር", nameEn: "Bahir Dar" },
    { id: "hawassa", nameAm: "ሀዋሳ", nameEn: "Hawassa" },
    { id: "mekelle", nameAm: "መቀሌ", nameEn: "Mekelle" },
    { id: "jimma", nameAm: "ጅማ", nameEn: "Jimma" },
    { id: "dire-dawa", nameAm: "ድሬ ዳዋ", nameEn: "Dire Dawa" },
    { id: "gondar", nameAm: "ጎንደር", nameEn: "Gondar" },
    { id: "dessie", nameAm: "ደሴ", nameEn: "Dessie" },
  ];

  const weatherData: { [key: string]: any } = {
    "addis-ababa": {
      current: {
        location: "አዲስ አበባ",
        locationEn: "Addis Ababa",
        temp: 22,
        feelsLike: 20,
        condition: "ደመና ያለ",
        conditionEn: "Cloudy",
        humidity: 65,
        wind: 12,
        windDirection: "NE",
        visibility: 10,
        uvIndex: 6,
        pressure: 1013,
        sunrise: "6:15",
        sunset: "18:30",
        rainChance: 40,
        airQuality: 45
      },
      forecast: [
        { day: "ሰኞ", dayEn: "Mon", high: 24, low: 14, icon: Sun, condition: "ፀሐያማ", rainChance: 10 },
        { day: "ማክሰኞ", dayEn: "Tue", high: 23, low: 15, icon: Cloud, condition: "ደመና ያለ", rainChance: 30 },
        { day: "ረቡዕ", dayEn: "Wed", high: 20, low: 13, icon: CloudRain, condition: "ዝናብ", rainChance: 80 },
        { day: "ሐሙስ", dayEn: "Thu", high: 21, low: 14, icon: CloudDrizzle, condition: "ቀላል ዝናብ", rainChance: 60 },
        { day: "አርብ", dayEn: "Fri", high: 25, low: 16, icon: Sun, condition: "ፀሐያማ", rainChance: 5 },
        { day: "ቅዳሜ", dayEn: "Sat", high: 26, low: 15, icon: CloudSun, condition: "ከፊል ደመና", rainChance: 20 },
        { day: "እሁድ", dayEn: "Sun", high: 24, low: 14, icon: Sun, condition: "ፀሐያማ", rainChance: 10 },
      ],
      alerts: [
        { type: "rain", messageAm: "ረቡዕ ላይ ከባድ ዝናብ ይጠበቃል - ማዳበሪያ ከዝናቡ በኋላ ይተግብሩ", severity: "warning" },
        { type: "temp", messageAm: "የሙቀት መጠን ጥሩ ነው - ለመዝራት ተስማሚ ወቅት", severity: "info" }
      ]
    },
    "bahir-dar": {
      current: {
        location: "ባህር ዳር",
        locationEn: "Bahir Dar",
        temp: 28,
        feelsLike: 30,
        condition: "ፀሐያማ",
        conditionEn: "Sunny",
        humidity: 55,
        wind: 8,
        windDirection: "SW",
        visibility: 15,
        uvIndex: 8,
        pressure: 1015,
        sunrise: "6:10",
        sunset: "18:25",
        rainChance: 20,
        airQuality: 38
      },
      forecast: [
        { day: "ሰኞ", dayEn: "Mon", high: 30, low: 18, icon: Sun, condition: "ፀሐያማ", rainChance: 5 },
        { day: "ማክሰኞ", dayEn: "Tue", high: 31, low: 19, icon: Sun, condition: "ፀሐያማ", rainChance: 10 },
        { day: "ረቡዕ", dayEn: "Wed", high: 29, low: 17, icon: CloudSun, condition: "ከፊል ደመና", rainChance: 25 },
        { day: "ሐሙስ", dayEn: "Thu", high: 27, low: 16, icon: CloudRain, condition: "ዝናብ", rainChance: 70 },
        { day: "አርብ", dayEn: "Fri", high: 28, low: 17, icon: CloudDrizzle, condition: "ቀላል ዝናብ", rainChance: 45 },
        { day: "ቅዳሜ", dayEn: "Sat", high: 29, low: 18, icon: Sun, condition: "ፀሐያማ", rainChance: 15 },
        { day: "እሁድ", dayEn: "Sun", high: 30, low: 19, icon: Sun, condition: "ፀሐያማ", rainChance: 10 },
      ],
      alerts: [
        { type: "heat", messageAm: "ከፍተኛ ሙቀት - በጠዋት ወይም በማታ ማዳበሪያ ይተግብሩ", severity: "warning" }
      ]
    }
  };

  const regionData = weatherData[selectedRegion] || weatherData["addis-ababa"];
  const currentWeather = regionData.current;
  const forecast = regionData.forecast;
  const alerts = regionData.alerts;

  const farmingAdvice = [
    {
      icon: CloudRain,
      titleAm: "የዝናብ ትንበያ",
      descAm: "ረቡዕ ላይ ከባድ ዝናብ ይጠበቃል። ማዳበሪያ ከዝናቡ በኋላ ለማድረግ ይሞክሩ።",
      priorityAm: "ከፍተኛ",
      color: "bg-blue-500"
    },
    {
      icon: Thermometer,
      titleAm: "የሙቀት ሁኔታ",
      descAm: "የአየር ሙቀት ለግብርና ስራ ተስማሚ ነው። በ15-25°C መካከል ያለው ሙቀት ለብዙ ሰብሎች ጥሩ ነው።",
      priorityAm: "መካከለኛ",
      color: "bg-orange-500"
    },
    {
      icon: Droplets,
      titleAm: "የእርጥበት ሁኔታ",
      descAm: "የአፈር እርጥበት ጥሩ ነው። ይህ ለዘር መዝሪያ ምቹ ጊዜ ነው።",
      priorityAm: "ከፍተኛ",
      color: "bg-cyan-500"
    },
    {
      icon: Wind,
      titleAm: "የንፋስ ሁኔታ",
      descAm: "ንፋሱ ቀላል ነው። ለማዳበሪያ መርጨት እና ለፀረ ተባይ መተግበር ተስማሚ ነው።",
      priorityAm: "መካከለኛ",
      color: "bg-teal-500"
    }
  ];

  const hourlyForecast = [
    { time: "06:00", temp: 14, icon: Sunrise, condition: "ብሩህ", rain: 5 },
    { time: "09:00", temp: 18, icon: Sun, condition: "ፀሐያማ", rain: 0 },
    { time: "12:00", temp: 22, icon: CloudSun, condition: "ከፊል ደመና", rain: 10 },
    { time: "15:00", temp: 23, icon: Cloud, condition: "ደመና", rain: 25 },
    { time: "18:00", temp: 20, icon: Sunset, condition: "ምሽት", rain: 15 },
    { time: "21:00", temp: 16, icon: Cloud, condition: "ደመና", rain: 5 },
    { time: "00:00", temp: 13, icon: Cloud, condition: "ደመና", rain: 0 },
    { time: "03:00", temp: 12, icon: Cloud, condition: "ደመና", rain: 0 },
  ];

  const seasonalCalendar = [
    { monthAm: "መስከረም", activity: "የበልግ ሰብሎች መዝራት", crops: "ጤፍ, ስንዴ", status: "active" },
    { monthAm: "ጥቅምት", activity: "የዋና ሰብል እንክብካቤ", crops: "ማዳበሪያ ማድረግ", status: "upcoming" },
    { monthAm: "ህዳር", activity: "የአትክልት መዝራት", crops: "ጎመን, ካሮት", status: "upcoming" },
    { monthAm: "ታህሳስ", activity: "ማጨድ", crops: "ጤፍ, በቆሎ", status: "upcoming" },
    { monthAm: "ጥር", activity: "የድርቅ ወቅት ዝግጅት", crops: "መስኖ ዝግጅት", status: "upcoming" },
    { monthAm: "የካቲት", activity: "የበልግ ዝግጅት", crops: "መሬት ማዘጋጀት", status: "upcoming" }
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header with Glassmorphism */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold ethiopic bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              የአየር ሁኔታ ትንበያ
            </h1>
            <p className="text-muted-foreground ethiopic">
              ለግብርናዎ የሚያስፈልግ የአየር ሁኔታ መረጃ
            </p>
          </div>

          {/* Region Selector */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3 bg-background/80 backdrop-blur-lg p-3 rounded-2xl shadow-lg border border-border/50">
              <MapPin className="w-5 h-5 text-primary" />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48 ethiopic border-0 bg-transparent focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region.id} value={region.id} className="ethiopic">
                      {region.nameAm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Weather Alerts */}
          {alerts.length > 0 && (
            <div className="space-y-2">
              {alerts.map((alert, idx) => (
                <Card key={idx} className={`p-4 ${alert.severity === 'warning' ? 'bg-gradient-to-r from-accent/20 to-orange-500/20 border-accent' : 'bg-gradient-to-r from-primary/10 to-cyan-500/10 border-primary/30'} backdrop-blur-sm`}>
                  <div className="flex items-center gap-3">
                    {alert.severity === 'warning' ? (
                      <CloudLightning className="w-5 h-5 text-accent animate-pulse" />
                    ) : (
                      <Zap className="w-5 h-5 text-primary" />
                    )}
                    <p className="ethiopic text-sm font-medium">{alert.messageAm}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Main Weather Card - Futuristic Design */}
          <Card className="p-6 md:p-8 shadow-xl bg-gradient-to-br from-primary/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-lg border-primary/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              {/* Main Weather */}
              <div className="text-center md:text-left space-y-4">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Live</span>
                </div>
                <h2 className="text-xl font-bold ethiopic">{currentWeather.location}</h2>
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="text-7xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{currentWeather.temp}°</span>
                </div>
                <p className="text-lg ethiopic text-muted-foreground">{currentWeather.condition}</p>
                <div className="flex items-center gap-2 justify-center md:justify-start text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span>ከፍ: {forecast[0]?.high}°</span>
                  <TrendingDown className="w-4 h-4 text-blue-500" />
                  <span>ዝቅ: {forecast[0]?.low}°</span>
                </div>
                
                {/* Sunrise/Sunset */}
                <div className="flex justify-center md:justify-start gap-6 pt-2">
                  <div className="flex items-center gap-2 text-sm bg-background/50 px-3 py-2 rounded-lg">
                    <Sunrise className="w-4 h-4 text-accent" />
                    <span>{currentWeather.sunrise}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-background/50 px-3 py-2 rounded-lg">
                    <Sunset className="w-4 h-4 text-orange-500" />
                    <span>{currentWeather.sunset}</span>
                  </div>
                </div>
              </div>
              
              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center gap-2 p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                  <Droplets className="w-6 h-6 text-blue-500" />
                  <span className="text-2xl font-bold">{currentWeather.humidity}%</span>
                  <span className="text-xs text-muted-foreground ethiopic">እርጥበት</span>
                  <Progress value={currentWeather.humidity} className="h-1 w-full" />
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                  <Wind className="w-6 h-6 text-teal-500" />
                  <span className="text-2xl font-bold">{currentWeather.wind}</span>
                  <span className="text-xs text-muted-foreground ethiopic">km/h {currentWeather.windDirection}</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                  <Umbrella className="w-6 h-6 text-cyan-500" />
                  <span className="text-2xl font-bold">{currentWeather.rainChance}%</span>
                  <span className="text-xs text-muted-foreground ethiopic">የዝናብ እድል</span>
                  <Progress value={currentWeather.rainChance} className="h-1 w-full" />
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                  <Gauge className="w-6 h-6 text-purple-500" />
                  <span className="text-2xl font-bold">{currentWeather.pressure}</span>
                  <span className="text-xs text-muted-foreground ethiopic">hPa ግፊት</span>
                </div>
              </div>
            </div>

            {/* Additional Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50 relative z-10">
              <div className="text-center">
                <Eye className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-lg font-bold">{currentWeather.visibility} km</p>
                <p className="text-xs text-muted-foreground ethiopic">ታይነት</p>
              </div>
              <div className="text-center">
                <Sun className="w-5 h-5 mx-auto text-accent mb-1" />
                <p className="text-lg font-bold">UV {currentWeather.uvIndex}</p>
                <p className="text-xs text-muted-foreground ethiopic">የፀሐይ ጨረር</p>
              </div>
              <div className="text-center">
                <Leaf className="w-5 h-5 mx-auto text-success mb-1" />
                <p className="text-lg font-bold">AQI {currentWeather.airQuality}</p>
                <p className="text-xs text-muted-foreground ethiopic">የአየር ጥራት</p>
              </div>
            </div>
          </Card>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2">
            {[
              { id: "daily", label: "የ7 ቀን" },
              { id: "hourly", label: "የሰዓት" },
              { id: "farming", label: "ለግብርና" }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id as any)}
                className="ethiopic"
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "daily" && (
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
              {forecast.map((day, idx) => (
                <Card key={idx} className={`p-4 text-center shadow-soft hover:shadow-medium transition-all hover:-translate-y-1 cursor-pointer ${idx === 0 ? 'ring-2 ring-primary' : ''}`}>
                  <div className="space-y-2">
                    <p className="font-bold ethiopic text-sm">{day.day}</p>
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                      <day.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-bold text-lg">{day.high}°</span>
                        <span className="text-xs text-muted-foreground">{day.low}°</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span>{day.rainChance}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "hourly" && (
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {hourlyForecast.map((hour, idx) => (
                <Card key={idx} className="p-4 min-w-[100px] text-center shadow-soft flex-shrink-0 hover:shadow-medium transition-all">
                  <p className="text-sm font-medium text-muted-foreground">{hour.time}</p>
                  <div className="w-10 h-10 mx-auto my-2 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                    <hour.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-bold text-lg">{hour.temp}°</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span>{hour.rain}%</span>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "farming" && (
            <div className="grid md:grid-cols-2 gap-4">
              {farmingAdvice.map((advice, idx) => (
                <Card key={idx} className="p-4 shadow-soft hover:shadow-medium transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${advice.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <advice.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold ethiopic">{advice.titleAm}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ethiopic ${
                          advice.priorityAm === "ከፍተኛ" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                        }`}>
                          {advice.priorityAm}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground ethiopic">{advice.descAm}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Seasonal Calendar */}
          <Card className="p-6 shadow-medium bg-gradient-to-br from-success/5 to-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-xl font-bold ethiopic">የወቅት የግብርና ቀን መቁጠሪያ</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {seasonalCalendar.map((month, idx) => (
                <div key={idx} className={`p-4 rounded-xl transition-all ${month.status === 'active' ? 'bg-success/20 border-2 border-success' : 'bg-muted/50 hover:bg-muted'}`}>
                  {month.status === 'active' && (
                    <span className="text-xs bg-success text-success-foreground px-2 py-0.5 rounded-full ethiopic mb-2 inline-block">አሁን</span>
                  )}
                  <h4 className="font-bold ethiopic text-primary">{month.monthAm}</h4>
                  <p className="text-sm ethiopic mt-1">{month.activity}</p>
                  <p className="text-xs text-muted-foreground ethiopic mt-1">{month.crops}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="p-6 bg-gradient-to-r from-accent/10 via-orange-500/10 to-red-500/10 border-accent/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 ethiopic">ፈጣን ምክሮች</h3>
                <ul className="space-y-2 text-muted-foreground ethiopic text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    ማዳበሪያ ከዝናብ በፊት ወይም በኋላ ይተግብሩ - ፀሐይ ላይ አይደረግም
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    ፀረ ተባይ ንፋስ በሌለበት ቀን በጠዋት ወይም በማታ ይረጩ
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    ከባድ ዝናብ ከመምጣቱ በፊት ሰብሎችን ይሰብስቡ
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    የአፈር እርጥበትን ለመጠበቅ ሸምበቆ (mulch) ይጠቀሙ
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Weather;
