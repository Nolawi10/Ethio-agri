import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { loginEmail, loginPassword });
    // TODO: Implement login logic
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", { signupName, signupEmail, signupPhone, signupPassword });
    // TODO: Implement signup logic
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-24 md:pb-8 bg-gradient-to-br from-primary/5 to-success/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-8">
          {/* Logo and Title */}
          <div className="text-center space-y-4">
            <img src={logo} alt="Ethio Agri Logo" className="w-24 h-24 mx-auto" />
            <h1 className="text-3xl font-bold ethiopic">እንኳን ደህና መጡ</h1>
            <p className="text-muted-foreground ethiopic">
              ወደ Ethio Agri - የእርሻ ጤና አማካሪዎ
            </p>
          </div>

          {/* Auth Tabs */}
          <Card className="p-6 shadow-medium">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="ethiopic">ግባ</TabsTrigger>
                <TabsTrigger value="signup" className="ethiopic">ተመዝገብ</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="ethiopic">ኢሜል</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="ethiopic">የይለፍ ቃል</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <Button type="submit" className="w-full ethiopic" size="lg">
                    ግባ
                  </Button>
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline w-full text-center ethiopic"
                  >
                    የይለፍ ቃልዎን ረስተዋል?
                  </button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="ethiopic">ሙሉ ስም</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="ሙሉ ስም"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone" className="ethiopic">ስልክ ቁጥር</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="+251 9xx xxx xxx"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="ethiopic">ኢሜል</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="example@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="ethiopic">የይለፍ ቃል</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <Button type="submit" className="w-full ethiopic" size="lg">
                    ተመዝገብ
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Guest Mode */}
          <Card className="p-4 bg-accent/10 border-accent/20">
            <div className="text-center space-y-2">
              <p className="text-sm ethiopic">መለያ ሳይኖርዎት መቀጠል ይፈልጋሉ?</p>
              <Button variant="outline" className="ethiopic">
                እንደ እንግዳ ይቀጥሉ
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
