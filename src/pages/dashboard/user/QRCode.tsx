import { useState } from "react";
import { QrCode, Download, Share2, Copy, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const QRCodePage = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  const userAccountId = "USER123456789";
  const baseQRData = `pay:${userAccountId}`;
  const dynamicQRData = amount ? `${baseQRData}:${amount}:${note}` : baseQRData;

  const generateQR = () => {
    setQrGenerated(true);
    toast("QR Code Generated, Your payment QR code is ready to share");
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied!, QR code data copied to clipboard");
  };

  const downloadQR = () => {
    // Simulate QR code download
    toast("Downloaded, QR code image saved to your device.");
  };

  const shareQR = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Payment QR Code",
        text: "Scan this QR code to send me money",
        url: window.location.href,
      });
    } else {
      copyToClipboard(dynamicQRData);
    }
  };

  // Simple QR code placeholder (in real app, use a QR code library)
  const QRCodeDisplay = ({ data }: { data: string }) => (
    <div className="w-64 h-64 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center bg-white">
      <div className="text-center">
        <QrCode className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">QR Code</p>
        <p className="text-xs text-muted-foreground mt-1 break-all px-2">
          {data.slice(0, 20)}...
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          QR Code Payment
        </h1>
        <p className="text-muted-foreground">
          Generate QR codes to receive payments instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Generator */}
        <div className="space-y-6">
          <Tabs defaultValue="dynamic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dynamic">Dynamic QR</TabsTrigger>
              <TabsTrigger value="static">Static QR</TabsTrigger>
            </TabsList>

            <TabsContent value="dynamic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dynamic QR Code</CardTitle>
                  <CardDescription>
                    Generate a QR code with specific amount and note
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Amount (Optional)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="note">Note (Optional)</Label>
                    <Input
                      id="note"
                      placeholder="Payment for..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  <Button onClick={generateQR} className="w-full">
                    Generate QR Code
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="static" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Static QR Code</CardTitle>
                  <CardDescription>
                    A permanent QR code for your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Account ID</h4>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-background px-2 py-1 rounded flex-1">
                          {userAccountId}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(userAccountId)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      This QR code allows anyone to send you money. They can
                      specify the amount when paying.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* QR Code Display & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <QRCodeDisplay data={dynamicQRData} />

                {amount && (
                  <div className="text-center">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      ${amount}
                    </Badge>
                    {note && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {note}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-2 w-full">
                  <Button
                    onClick={downloadQR}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={shareQR}
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    onClick={() => copyToClipboard(dynamicQRData)}
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full p-2 shrink-0">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Show QR Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Display your QR code to the person who wants to pay you
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full p-2 shrink-0">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium">They Scan</h4>
                  <p className="text-sm text-muted-foreground">
                    They scan your QR code with their payment app
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 rounded-full p-2 shrink-0">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Instant Payment</h4>
                  <p className="text-sm text-muted-foreground">
                    You receive the money instantly in your wallet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
