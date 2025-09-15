import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { helpItems, type HelpItem } from "./helpData";

const Help = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<HelpItem | null>(null);

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
