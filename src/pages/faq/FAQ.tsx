import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  HelpCircle,
  Shield,
  Clock,
  DollarSign,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      color: "text-primary",
      bgColor: "bg-primary/10",
      faqs: [
        {
          question: "How do I create a RemitSwift account?",
          answer:
            "Creating an account is simple! Click 'Get Started' on our homepage, provide your email and basic information, verify your identity with a government-issued ID, and you're ready to send money worldwide.",
        },
        {
          question: "What documents do I need to verify my account?",
          answer:
            "You'll need a government-issued photo ID (passport, driver's license, or national ID) and proof of address (utility bill or bank statement) dated within the last 3 months. Verification usually takes 5-10 minutes.",
        },
        {
          question: "Is there a minimum transfer amount?",
          answer:
            "Yes, the minimum transfer amount varies by destination country but typically ranges from $1 to $10. Check our app or website for specific limits for your destination.",
        },
      ],
    },
    {
      title: "Security & Safety",
      icon: Shield,
      color: "text-success",
      bgColor: "bg-success/10",
      faqs: [
        {
          question: "How secure are my transactions?",
          answer:
            "RemitSwift uses bank-level 256-bit SSL encryption, multi-factor authentication, and real-time fraud monitoring. We're regulated by financial authorities and your money is protected at every step.",
        },
        {
          question: "What if my transfer doesn't arrive?",
          answer:
            "While 99.9% of transfers arrive successfully, if there's an issue, we offer a 100% money-back guarantee. Contact our 24/7 support team and we'll investigate and resolve the issue immediately.",
        },
        {
          question: "Can I cancel a transfer after sending it?",
          answer:
            "You can cancel a transfer within 30 minutes of sending if it hasn't been picked up or delivered. After that, cancellation depends on the delivery method and destination country policies.",
        },
      ],
    },
    {
      title: "Transfer Speed & Delivery",
      icon: Clock,
      color: "text-accent",
      bgColor: "bg-accent/10",
      faqs: [
        {
          question: "How fast are transfers with RemitSwift?",
          answer:
            "Most transfers arrive within seconds to minutes. Bank transfers typically take 1-2 business days, while mobile money and cash pickup are usually instant. Exact timing depends on the destination and delivery method.",
        },
        {
          question: "What delivery options are available?",
          answer:
            "We offer bank deposits, mobile money, cash pickup at agent locations, and home delivery in select countries. Available options vary by destination country.",
        },
        {
          question: "Can I track my transfer?",
          answer:
            "Yes! Every transfer gets a unique tracking number. You'll receive SMS and email updates at each step, and can check the status anytime in our app or website.",
        },
      ],
    },
    {
      title: "Fees & Exchange Rates",
      icon: DollarSign,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      faqs: [
        {
          question: "How much do transfers cost?",
          answer:
            "Transfer fees start from $0.99 and vary based on the amount, destination, and delivery method. We show all fees upfront before you confirm your transfer - no hidden charges ever.",
        },
        {
          question: "What exchange rate do you offer?",
          answer:
            "We offer competitive exchange rates updated in real-time. Our rates are typically better than traditional banks and we don't add hidden markups. Check our rate calculator for current rates.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "Absolutely not. We believe in complete transparency. All fees are shown upfront in the app before you confirm your transfer. What you see is what you pay.",
        },
      ],
    },
  ];

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Frequently Asked
            <span className="block bg-gradient-to-r from-accent-light to-warning bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Find quick answers to common questions about RemitSwift's services,
            security, and transfer process.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex} className="mb-12">
                <Card className="bg-gradient-card border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${category.bgColor}`}>
                        <Icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <CardTitle className="text-2xl">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem
                          key={faqIndex}
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border border-border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            );
          })}

          {filteredFAQs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or browse all categories above.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Need Help?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Can't find what you're looking for? Our support team is available
              24/7 to help with any questions or concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover-lift bg-gradient-card border-0 shadow-md">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get personalized help from our expert team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="w-full">
                  Contact Us
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-card border-0 shadow-md">
              <CardHeader>
                <div className="bg-gradient-secondary p-3 rounded-lg w-fit mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Download App</CardTitle>
                <CardDescription>
                  Get the mobile app for easy access to help
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full">
                  Get App
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift bg-gradient-card border-0 shadow-md">
              <CardHeader>
                <div className="bg-gradient-accent p-3 rounded-lg w-fit mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Security Center</CardTitle>
                <CardDescription>
                  Learn about our security measures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="default" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
