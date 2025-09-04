import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

const Socials = () => {
  return (
    <Card className="mt-10 shadow-md rounded-2xl">
      <CardContent className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Follow bKash Career on Social Media
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Visit bKash's social media pages to know more about career
          opportunities, our vibrant culture, inspiring leadership, and our
          efforts in knowledge development and CSR activities.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" className="rounded-full" asChild>
            <a href="https://www.facebook.com/bkashlimited" target="_blank">
              <Facebook className="mr-2" size={18} /> Facebook
            </a>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <a
              href="https://www.linkedin.com/company/bkash-limited"
              target="_blank"
            >
              <Linkedin className="mr-2" size={18} /> LinkedIn
            </a>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <a href="https://twitter.com/bkash_ltd" target="_blank">
              <Twitter className="mr-2" size={18} /> Twitter
            </a>
          </Button>
          <Button variant="outline" className="rounded-full" asChild>
            <a href="https://www.instagram.com/bkashltd" target="_blank">
              <Instagram className="mr-2" size={18} /> Instagram
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default Socials;
