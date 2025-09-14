import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { values } from "./values";
import { timeline } from "./timelines";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  mb-6">
            About
            <span className="block bg-gradient-to-r from-accent-light to-warning bg-clip-text text-transparent">
              Transactly
            </span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're on a mission to make international money transfers simple,
            secure, and affordable for everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Transactly, we believe that sending money to loved ones
                should be as simple as sending a message. Traditional money
                transfer services are often slow, expensive, and complicated.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                That's why we built a platform that puts you first - with
                transparent pricing, lightning-fast transfers, and world-class
                security. We're not just moving money; we're connecting
                families, empowering businesses, and building bridges across the
                globe.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    180+
                  </div>
                  <div className="text-muted-foreground">Countries Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    5M+
                  </div>
                  <div className="text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-card rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground mb-6">
                To become the world's most trusted and accessible financial
                platform, enabling seamless global commerce and personal
                connections.
              </p>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Transparency in all our operations</li>
                <li>• Security as our top priority</li>
                <li>• Innovation that serves our customers</li>
                <li>• Accessibility for everyone, everywhere</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className=" bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our core values guide everything we do, from product development
              to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover-lift border-0 shadow-md"
                >
                  <CardHeader>
                    <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From a simple idea to serving millions worldwide - here's how
              Transactly has evolved over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/40 h-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-gradient-card rounded-lg p-6 shadow-md hover-lift">
                      <div className="text-2xl font-bold text-destructive mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg"></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
