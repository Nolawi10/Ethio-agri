import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from "lucide-react";

const Weather = () => {
  // Mock weather data
  const currentWeather = {
    location: "አዲስ አበባ",
    locationEn: "Addis Ababa",
    temp: 22,
    condition: "ደመና ያለ",
    conditionEn: "Cloudy",
    humidity: 65,
    wind: 12,
    visibility: 10,
  };

  const forecast = [
    { day: "ሰኞ", dayEn: "Mon", high: 24, low: 14, icon: Sun, condition: "ፀሐያማ" },
    { day: "ማክሰኞ", dayEn: "Tue", high: 23, low: 15, icon: Cloud, condition: "ደመና ያለ" },
    { day: "ረቡዕ", dayEn: "Wed", high: 20, low: 13, icon: CloudRain, condition: "ዝናብ" },
    { day: "ሐሙስ", dayEn: "Thu", high: 21, low: 14, icon: CloudRain, condition: "ቀላል ዝናብ" },
    { day: "አርብ", dayEn: "Fri", high: 25, low: 16, icon: Sun, condition: "ፀሐያማ" },
  ];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold ethiopic">የአየር ሁኔታ ትንበያ</h1>
            <p className="text-muted-foreground ethiopic">
              ለግብርናዎ የሚያስፈልግ የአየር ሁኔታ መረጃ
            </p>
          </div>

          {/* Current Weather */}
          <Card className="p-8 shadow-medium bg-gradient-to-br from-primary/10 to-success/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold ethiopic mb-2">{currentWeather.location}</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold">{currentWeather.temp}°</span>
                  <span className="text-2xl text-muted-foreground">C</span>
                </div>
                <p className="text-lg ethiopic mt-2">{currentWeather.condition}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Droplets className="w-8 h-8 text-primary" />
                  <span className="text-2xl font-bold">{currentWeather.humidity}%</span>
                  <span className="text-sm text-muted-foreground ethiopic">እርጥበት</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Wind className="w-8 h-8 text-primary" />
                  <span className="text-2xl font-bold">{currentWeather.wind}</span>
                  <span className="text-sm text-muted-foreground ethiopic">km/h</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Eye className="w-8 h-8 text-primary" />
                  <span className="text-2xl font-bold">{currentWeather.visibility}</span>
                  <span className="text-sm text-muted-foreground ethiopic">km</span>
                </div>
              </div>
            </div>
          </Card>

          {/* 5-Day Forecast */}
          <div>
            <h2 className="text-2xl font-bold ethiopic mb-4">የ5 ቀን ትንበያ</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.map((day, idx) => (
                <Card key={idx} className="p-4 text-center shadow-soft hover:shadow-medium transition-all">
                  <div className="space-y-3">
                    <p className="font-bold ethiopic">{day.day}</p>
                    <day.icon className="w-10 h-10 mx-auto text-primary" />
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-bold">{day.high}°</span>
                        <span className="text-sm text-muted-foreground">{day.low}°</span>
                      </div>
                      <p className="text-xs text-muted-foreground ethiopic">{day.condition}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Farming Advice */}
          <Card className="p-6 bg-accent/10 border-accent/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <CloudRain className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 ethiopic">የግብርና ምክር</h3>
                <p className="text-muted-foreground ethiopic leading-relaxed">
                  በሚቀጥለው ሳምንት ዝናብ ይጠበቃል። ማዳበሪያ ከዝናቡ በፊት ለማድረግ ይሞክሩ።
                  የአፈር እርጥበት ጥሩ ነው፣ ይህም ለዘር መዝሪያ ምቹ ጊዜ ነው።
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Weather;
