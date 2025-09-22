  import {
  
    HelpCircle,
    Shield,
    Clock,
    DollarSign,
    
  } from "lucide-react";
  export const faqCategories = [
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