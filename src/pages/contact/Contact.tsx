import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Clock, Headphones } from "lucide-react";
import { useState } from "react";
import { contactInfo } from "./contactData";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast(
      "Message Sent!, Thank you for contacting us. We'll get back to you within 24 hours."
    );

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-8 pb-8 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-blue-700 md:text-5xl lg:text-6xl font-bold mb-6">
            Contact
            <span className="pl-4 text-blue-400 ">Support</span>
          </h1>
          <p className="text-xl  max-w-3xl mx-auto">
            Have questions? Need help with a transfer? Our support team is here
            to assist you 24/7.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-blue-700 md:text-4xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-lg  max-w-3xl mx-auto">
              Choose the contact method that works best for you. We're committed
              to providing quick and helpful responses to all inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover-lift bg-gradient-card border-0 shadow-md"
                >
                  <CardHeader>
                    <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-900" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                    <CardDescription>{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-primary font-semibold mb-2">
                      {info.contact}
                    </div>
                    <div className="text-sm text-blue-600 flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-1 text-amber-300" />
                      {info.available}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onValueChange={(value: any) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="transfer">
                            Transfer Issue
                          </SelectItem>
                          <SelectItem value="account">
                            Account Support
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Problem
                          </SelectItem>
                          <SelectItem value="business">
                            Business Partnership
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        placeholder="Brief description of your inquiry"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Provide details about your inquiry..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" variant="link" className="w-full">
                      Send Message
                      <Mail className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Quick Help */}
            <div>
              <Card className="bg-blue-100 border-0 shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Headphones className="w-8 h-8 mr-3 text-primary" />
                    Quick Help
                  </CardTitle>
                  <CardDescription>
                    Need immediate assistance? Try these quick solutions first.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">
                        Transfer Status
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Check your transfer status by logging into your account
                        or using the tracking number sent to your email.
                      </p>
                    </div>
                    <div className="p-4 bg-secondary/5 rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">
                        Account Issues
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        For account-related problems, try resetting your
                        password or clearing your browser cache first.
                      </p>
                    </div>
                    <div className="p-4 bg-accent/5 rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2">
                        Payment Problems
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Verify your payment method details and ensure sufficient
                        funds are available before contacting support.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-100 border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Emergency Support</CardTitle>
                  <CardDescription>
                    For urgent transfer issues or security concerns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button
                      variant="ghost"
                      className="w-full bg-white/10 hover:bg-white/20  border-white/20"
                    >
                      Call Emergency Line
                      <Phone className="w-8 h-8 ml-2" />
                    </Button>
                    <p className="text-sm text-center">
                      Available 24/7 for critical issues
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
