import { Shield, Zap, Globe, DollarSign, Clock, Users, Smartphone, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant transfers in seconds, not days. Real-time processing for urgent payments.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit encryption, fraud protection, and regulatory compliance for peace of mind.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: DollarSign,
      title: "Low Fees",
      description: "Transparent pricing with no hidden costs. Save up to 90% compared to traditional banks.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Send money to 180+ countries with competitive exchange rates and local banking.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock support and instant processing. Your money moves when you need it.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Intuitive mobile app with biometric security and offline transaction history.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const stats = [
    { label: "Countries Supported", value: "180+", icon: Globe },
    { label: "Active Users", value: "5M+", icon: Users },
    { label: "Avg Transfer Time", value: "< 1min", icon: Clock },
    { label: "Total Transferred", value: "$2.5B+", icon: DollarSign },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              RemitSwift?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the future of international money transfers with our secure, 
            fast, and affordable platform trusted by millions worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover-lift bg-gradient-card border-0 shadow-md">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Sending Money?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Join millions of users who trust RemitSwift for their international transfers. 
                Sign up today and get your first transfer fee-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  Create Free Account
                  <CreditCard className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;