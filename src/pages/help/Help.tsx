import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const helpItems = [
  {
    title: "Customer Care Points",
    content:
      "Find nearby customer care points where you can get assistance with bKash services.",
  },
  {
    title: "Avoid Fraud",
    content:
      "Learn safety measures to protect yourself from fraudulent activities and scams.",
  },
  {
    title: "Charge Calculator",
    content:
      "Use the charge calculator to estimate service charges before making transactions.",
  },
  {
    title: "Frequently Asked Questions",
    content: "Browse answers to the most common questions asked by users.",
  },
  {
    title: "Charge and Limits",
    content: "Check the current transaction charges and account limits.",
  },
  {
    title: "Interest on Savings",
    content: "Understand how you can earn interest on your savings account.",
  },
  {
    title: "Reset Pin",
    content: "Follow the steps to securely reset your bKash PIN.",
  },
  {
    title: "Info Update",
    content: "Learn how to update your personal information on your account.",
  },
  {
    title: "Contact Us",
    content:
      "Reach out to our support team through different contact channels.",
  },
  {
    title: "Rewards",
    content: "Discover how to earn and redeem rewards with bKash.",
  },
  {
    title: "Security Tips",
    content: "Essential tips to keep your bKash account secure.",
  },
  {
    title: "Complaint Cell",
    content: "File complaints and track their resolution status.",
  },
  {
    title: "Discontinued Agents",
    content: "View the list of discontinued agents.",
  },
  {
    title: "Discontinued Distributors",
    content: "View the list of discontinued distributors.",
  },
  {
    title: "Manage Account",
    content: "Tools and options to manage your bKash account effectively.",
  },
  {
    title: "Live Chat",
    content: "Connect instantly with a customer service representative.",
  },
  {
    title: "Help Line 16247",
    content: "Call 16247 for immediate assistance from our support team.",
  },
  {
    title: "e-Appointment",
    content: "Book an appointment with a customer care officer.",
  },
  {
    title: "bKash Map",
    content: "Locate bKash points and services near you using our map.",
  },
];

const Help = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Help Button */}
      <Button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-lg p-4 rounded-2xl shadow-md"
      >
        Help {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </Button>

      {/* Dropdown Links */}
      {open && (
        <div className="mt-4 grid gap-2">
          {helpItems.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start text-left"
              onClick={() => setActiveItem(item)}
            >
              {item.title}
            </Button>
          ))}
        </div>
      )}

      {/* Content Section */}
      {activeItem && (
        <Card className="mt-6 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">{activeItem.title}</h2>
            <p className="text-gray-600 leading-relaxed">
              {activeItem.content}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default Help;
