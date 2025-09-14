import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { features, stats } from "./FeaturesData";
import { CreditCard } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-4 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Transactly?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the future of international money transfers with our
            secure, fast, and affordable platform trusted by millions worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="hover-lift bg-gradient-card border-0 shadow-md"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}
                  >
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
                Join millions of users who trust RemitSwift for their
                international transfers. Sign up today and get your first
                transfer fee-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/login">
                    Create Free Account
                    <CreditCard className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                {/* <Button variant="outline" size="lg">
                  View Pricing
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
