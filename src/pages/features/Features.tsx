import {
  Shield,
  Zap,
  Globe,
  DollarSign,
  Clock,
  Smartphone,
  CreditCard,
  Users,
  BarChart3,
  Bell,
  Lock,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Features = () => {
  const mainFeatures = [
    {
      icon: Zap,
      title: "Instant Transfers",
      description:
        "Send money in seconds, not days. Our advanced processing system ensures your transfers are completed almost instantly.",
      benefits: [
        "Real-time processing",
        "24/7 availability",
        "Instant notifications",
        "Emergency transfer support",
      ],
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your money and data are protected with military-grade encryption and multi-factor authentication.",
      benefits: [
        "256-bit SSL encryption",
        "Fraud detection",
        "Regulatory compliance",
        "Secure vault storage",
      ],
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description:
        "No hidden fees, no surprises. See exactly what you pay upfront with our competitive exchange rates.",
      benefits: [
        "Low transfer fees",
        "Real-time rates",
        "Fee calculator",
        "No markup on exchange",
      ],
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "Send money to 180+ countries with extensive banking network and local payment methods.",
      benefits: [
        "180+ countries",
        "Local bank transfers",
        "Mobile money",
        "Cash pickup locations",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Full-featured mobile app for iOS and Android",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Stay updated with instant SMS and email alerts",
    },
    {
      icon: BarChart3,
      title: "Transaction History",
      description: "Detailed records and analytics of all transfers",
    },
    {
      icon: Users,
      title: "Multi-user Support",
      description: "Add family members and manage permissions",
    },
    {
      icon: Lock,
      title: "Biometric Security",
      description: "Fingerprint and face ID authentication",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service assistance",
    },
  ];

  const comparisonData = [
    {
      feature: "Transfer Speed",
      remitswift: "< 1 minute",
      traditional: "1-5 days",
      competitor: "30 minutes",
    },
    {
      feature: "Transfer Fees",
      remitswift: "From $0.99",
      traditional: "$15-45",
      competitor: "$2.99",
    },
    {
      feature: "Exchange Rate Markup",
      remitswift: "0%",
      traditional: "3-5%",
      competitor: "1-2%",
    },
    {
      feature: "Coverage",
      remitswift: "180+ countries",
      traditional: "50-100",
      competitor: "160+",
    },
    {
      feature: "Security",
      remitswift: "Military-grade",
      traditional: "Standard",
      competitor: "Standard",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Powerful
            <span className="block bg-gradient-to-r from-accent-light to-warning bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover all the tools and features that make RemitSwift the
            smartest choice for international money transfers.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Core Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need for secure, fast, and affordable international
              transfers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover-lift bg-gradient-card border-0 shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-primary p-3 rounded-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-6">
                      {feature.description}
                    </CardDescription>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-sm text-muted-foreground">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              More Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Additional tools and capabilities to enhance your experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover-lift bg-gradient-card border-0 shadow-md"
                >
                  <CardHeader>
                    <div className="bg-gradient-secondary p-3 rounded-lg w-fit mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How We Compare
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how RemitSwift stacks up against traditional banks and
              competitors.
            </p>
          </div>

          <div className="bg-gradient-card rounded-2xl p-8 shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4">
                    <div className="font-bold text-primary">RemitSwift</div>
                  </th>
                  <th className="text-center py-4 px-4 text-muted-foreground">
                    Traditional Banks
                  </th>
                  <th className="text-center py-4 px-4 text-muted-foreground">
                    Competitors
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {row.remitswift}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      {row.traditional}
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      {row.competitor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join millions of users who trust RemitSwift for their international
            transfers. Get started today and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="link" size="lg">
              Start Free Transfer
              <CreditCard className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="link" size="lg">
              Download App
              <Smartphone className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
