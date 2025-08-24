import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Zap, Globe, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-wallet.jpg";

const HeroSection = () => {
  const trustFeatures = [
    "Bank-level security",
    "Licensed & regulated",
    "24/7 customer support",
    "Instant transfers"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse-slow" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-bounce-subtle" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full animate-pulse-slow" />
        <div className="absolute bottom-32 right-10 w-12 h-12 bg-white rounded-full animate-bounce-subtle" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Shield className="w-4 h-4 text-white mr-2" />
              <span className="text-white text-sm font-medium">Trusted by 5M+ users worldwide</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Send Money
              <span className="block bg-gradient-to-r from-accent-light to-warning bg-clip-text text-transparent">
                Worldwide
              </span>
              <span className="block">Instantly</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
              The fastest, most secure way to send money internationally. 
              Low fees, great exchange rates, and instant transfers to 180+ countries.
            </p>

            {/* Trust Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success-light" />
                  <span className="text-white/90 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/register">
                <Button variant="cta" size="xl" className="w-full sm:w-auto">
                  Start Sending Money
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">180+</div>
                <div className="text-white/70 text-sm">Countries</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">$2.5B+</div>
                <div className="text-white/70 text-sm">Transferred</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-white">5M+</div>
                <div className="text-white/70 text-sm">Happy Users</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-lift">
              <img 
                src={heroImage} 
                alt="Digital wallet money transfer" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-success text-success-foreground p-4 rounded-xl shadow-success animate-bounce-subtle">
              <Zap className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-lg animate-pulse-slow">
              <Globe className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-16 fill-background">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;