import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Socials from "./social";

const Career = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="grid md:grid-cols-2 gap-6 p-0">
          {/* Left Side Image */}
          {/* <motion.img
            src="https://i.ibb.co/Xdkg3ry/man-climbing-stairs-heaven.jpg" 
            alt="Career at bKash"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          /> */}
          <motion.img
            src="https://i.ibb.co/Xdkg3ry/man-climbing-stairs-heaven.jpg"
            alt="Career at transactly"
            className="w-full h-auto max-h-[500px] object-cover md:rounded-l-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Right Side Content */}
          <motion.div
            className="p-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold mb-4">Career at bKash</h1>
            <p className="text-gray-700 mb-4 leading-relaxed">
              bKash, the No. 1 Employer of Choice in Bangladesh, employs and
              nurtures talents from all over the country. Explore exciting and
              accelerated career opportunities at one of the fastest-growing
              Mobile Financial Service companies in the world.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At bKash, we believe in innovation, integrity, and impact. Our
              culture fosters learning, collaboration, and empowerment — giving
              you the platform to grow your career while making a difference in
              millions of lives across Bangladesh.
            </p>
            <div className="flex gap-4">
              <Button className="rounded-2xl px-6">
                Explore Open Positions
              </Button>
              <Button variant="outline" className="rounded-2xl px-6">
                Learn More
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
      <Socials />
    </div>
  );
};
export default Career;
