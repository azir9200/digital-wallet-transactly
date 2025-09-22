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
import { Search, HelpCircle, Shield, Smartphone } from "lucide-react";
import { useState } from "react";
import { faqCategories } from "./faq.data";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
      <section className="pt-8 pb-8 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Frequently Asked
            <span className="block bg-gradient-to-r from-accent-light to-warning bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-xl  max-w-3xl mx-auto mb-8">
            Find quick answers to common questions about RemitSwift's services,
            security, and transfer process.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700 w-5 h-5" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10  border-blue-700 placeholder:text-blue-700"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="">
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
                          <AccordionContent className="leading-relaxed">
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
              <HelpCircle className="w-16 h-16  mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="">
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
            <p className="text-lg max-w-3xl mx-auto">
              Can't find what you're looking for? Our support team is available
              24/7 to help with any questions or concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover-lift bg-gradient-card border-0 shadow-md">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-blue-700" />
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
                  <Smartphone className="w-8 h-8 text-blue-700" />
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
                  <Shield className="w-8 h-8 text-blue-700" />
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
