import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Thermometer, Sunrise, Sunset, CloudSun, CloudDrizzle, Snowflake, AlertTriangle, Leaf, Calendar, MapPin } from "lucide-react";

const Weather = () => {
  const [selectedRegion, setSelectedRegion] = useState("addis-ababa");

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
        visibility: 10,
        uvIndex: 6,
        sunrise: "6:15",
        sunset: "18:30",
        rainChance: 40
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
        visibility: 15,
        uvIndex: 8,
        sunrise: "6:10",
        sunset: "18:25",
        rainChance: 20
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

  // Default to Addis Ababa data
  const regionData = weatherData[selectedRegion] || weatherData["addis-ababa"];
  const currentWeather = regionData.current;
  const forecast = regionData.forecast;
  const alerts = regionData.alerts;

  const farmingAdvice = [
    {
      icon: CloudRain,
      titleAm: "የዝናብ ትንበያ",
      descAm: "ረቡዕ ላይ ከባድ ዝናብ ይጠበቃል። ማዳበሪያ ከዝናቡ በኋላ ለማድረግ ይሞክሩ። ዝናቡ ማዳበሪያውን ወደ አፈር ለማስገባት ይረዳል።",
      priorityAm: "ከፍተኛ ቅድሚያ"
    },
    {
      icon: Thermometer,
      titleAm: "የሙቀት ሁኔታ",
      descAm: "የአየር ሙቀት ለግብርና ስራ ተስማሚ ነው። በ15-25°C መካከል ያለው ሙቀት ለብዙ ሰብሎች ጥሩ ነው።",
      priorityAm: "መካከለኛ"
    },
    {
      icon: Droplets,
      titleAm: "የእርጥበት ሁኔታ",
      descAm: "የአፈር እርጥበት ጥሩ ነው። ይህ ለዘር መዝሪያ ምቹ ጊዜ ነው። ከመዝራትዎ በፊት አፈሩ እርጥብ መሆኑን ያረጋግጡ።",
      priorityAm: "ከፍተኛ ቅድሚያ"
    },
    {
      icon: Wind,
      titleAm: "የንፋስ ሁኔታ",
      descAm: "ንፋሱ ቀላል ነው። ለማዳበሪያ መርጨት እና ለፀረ ተባይ መተግበር ተስማሚ ነው። ኃይለኛ ንፋስ ባለበት ቀን አይረጩ።",
      priorityAm: "መካከለኛ"
    }
  ];

  const seasonalCalendar = [
    { monthAm: "መስከረም", activity: "የበልግ ሰብሎች መዝራት", crops: "ጤፍ, ስንዴ" },
    { monthAm: "ጥቅምት", activity: "የዋና ሰብል እንክብካቤ", crops: "ማዳበሪያ ማድረግ" },
    { monthAm: "ህዳር", activity: "የአትክልት መዝራት", crops: "ጎመን, ካሮት" },
    { monthAm: "ታህሳስ", activity: "ማጨድ", crops: "ጤፍ, በቆሎ" },
    { monthAm: "ጥር", activity: "የድርቅ ወቅት ዝግጅት", crops: "መስኖ ዝግጅት" },
    { monthAm: "የካቲት", activity: "የበልግ ዝግጅት", crops: "መሬት ማዘጋጀት" }
  ];

  const hourlyForecast = [
    { time: "06:00", temp: 14, icon: Sunrise, condition: "ብሩህ" },
    { time: "09:00", temp: 18, icon: Sun, condition: "ፀሐያማ" },
    { time: "12:00", temp: 22, icon: CloudSun, condition: "ከፊል ደመና" },
    { time: "15:00", temp: 23, icon: Cloud, condition: "ደመና" },
    { time: "18:00", temp: 20, icon: Sunset, condition: "ምሽት" },
    { time: "21:00", temp: 16, icon: Cloud, condition: "ደመና" }
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold ethiopic">የአየር ሁኔታ ትንበያ</h1>
            <p className="text-muted-foreground ethiopic">
              ለግብርናዎ የሚያስፈልግ የአየር ሁኔታ መረጃ
            </p>
          </div>

          {/* Region Selector */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3 bg-muted p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48 ethiopic border-0 bg-transparent">
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
                <Card key={idx} className={`p-4 ${alert.severity === 'warning' ? 'bg-accent/20 border-accent' : 'bg-primary/10 border-primary/30'}`}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-5 h-5 ${alert.severity === 'warning' ? 'text-accent' : 'text-primary'}`} />
                    <p className="ethiopic text-sm font-medium">{alert.messageAm}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Current Weather */}
          <Card className="p-6 md:p-8 shadow-medium bg-gradient-to-br from-primary/10 to-success/10">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Main Weather */}
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold ethiopic mb-2">{currentWeather.location}</h2>
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="text-6xl font-bold">{currentWeather.temp}°</span>
                  <span className="text-2xl text-muted-foreground">C</span>
                </div>
                <p className="text-lg ethiopic mt-2">{currentWeather.condition}</p>
                <p className="text-sm text-muted-foreground ethiopic">
                  ይሰማል: {currentWeather.feelsLike}°C
                </p>
                
                {/* Sunrise/Sunset */}
                <div className="flex justify-center md:justify-start gap-6 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Sunrise className="w-4 h-4 text-accent" />
                    <span>{currentWeather.sunrise}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Sunset className="w-4 h-4 text-accent" />
                    <span>{currentWeather.sunset}</span>
                  </div>
                </div>
              </div>
              
              {/* Weather Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-2 p-3 bg-background/50 rounded-lg">
                  <Droplets className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold">{currentWeather.humidity}%</span>
                  <span className="text-xs text-muted-foreground ethiopic">እርጥበት</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-background/50 rounded-lg">
                  <Wind className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold">{currentWeather.wind}</span>
                  <span className="text-xs text-muted-foreground ethiopic">km/h ንፋስ</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-background/50 rounded-lg">
                  <Eye className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold">{currentWeather.visibility}</span>
                  <span className="text-xs text-muted-foreground ethiopic">km ታይነት</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-background/50 rounded-lg">
                  <CloudRain className="w-6 h-6 text-primary" />
                  <span className="text-xl font-bold">{currentWeather.rainChance}%</span>
                  <span className="text-xs text-muted-foreground ethiopic">የዝናብ እድል</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Hourly Forecast */}
          <div>
            <h2 className="text-xl font-bold ethiopic mb-4">የሰዓት ትንበያ</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {hourlyForecast.map((hour, idx) => (
                <Card key={idx} className="p-3 min-w-[80px] text-center shadow-soft flex-shrink-0">
                  <p className="text-sm text-muted-foreground">{hour.time}</p>
                  <hour.icon className="w-6 h-6 mx-auto my-2 text-primary" />
                  <p className="font-bold">{hour.temp}°</p>
                </Card>
              ))}
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div>
            <h2 className="text-2xl font-bold ethiopic mb-4">የ7 ቀን ትንበያ</h2>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
              {forecast.map((day, idx) => (
                <Card key={idx} className="p-4 text-center shadow-soft hover:shadow-medium transition-all">
                  <div className="space-y-2">
                    <p className="font-bold ethiopic text-sm">{day.day}</p>
                    <day.icon className="w-8 h-8 mx-auto text-primary" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-bold">{day.high}°</span>
                        <span className="text-xs text-muted-foreground">{day.low}°</span>
                      </div>
                      <p className="text-xs text-muted-foreground ethiopic">{day.condition}</p>
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <Droplets className="w-3 h-3 text-primary" />
                        <span>{day.rainChance}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Farming Advice */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-2xl font-bold ethiopic">የግብርና ምክሮች</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {farmingAdvice.map((advice, idx) => (
                <Card key={idx} className="p-4 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <advice.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold ethiopic">{advice.titleAm}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ethiopic ${
                          advice.priorityAm === "ከፍተኛ ቅድሚያ" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
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
          </div>

          {/* Seasonal Calendar */}
          <Card className="p-6 shadow-medium">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold ethiopic">የወቅት ምክር</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {seasonalCalendar.map((month, idx) => (
                <div key={idx} className="p-3 bg-muted rounded-lg">
                  <h4 className="font-bold ethiopic text-primary">{month.monthAm}</h4>
                  <p className="text-sm ethiopic mt-1">{month.activity}</p>
                  <p className="text-xs text-muted-foreground ethiopic mt-1">{month.crops}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="p-6 bg-accent/10 border-accent/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 ethiopic">ፈጣን ምክሮች</h3>
                <ul className="space-y-2 text-muted-foreground ethiopic text-sm">
                  <li>• ማዳበሪያ ከዝናብ በፊት ወይም በኋላ ይተግብሩ - ፀሐይ ላይ አይደረግም</li>
                  <li>• ፀረ ተባይ ንፋስ በሌለበት ቀን በጠዋት ወይም በማታ ይረጩ</li>
                  <li>• ከባድ ዝናብ ከመምጣቱ በፊት ሰብሎችን ይሰብስቡ</li>
                  <li>• የአፈር እርጥበትን ለመጠበቅ ሸምበቆ (mulch) ይጠቀሙ</li>
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