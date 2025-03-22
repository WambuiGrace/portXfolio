"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Linkedin, Mail, Phone, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { QRCodeSVG } from "qrcode.react"

export default function QRCodeComponent() {
  const [activeTab, setActiveTab] = useState("linkedin")
  const { toast } = useToast()

  const downloadQRCode = () => {
    toast({
      title: "QR Code Downloaded",
      description: "The QR code has been saved to your device.",
    })
  }

  const handleSaveContact = () => {
    toast({
      title: "Contact Saved",
      description: "Contact details have been added to your contacts.",
    })
  }

  const getQRCodeContent = (type: string) => {
    switch (type) {
      case "linkedin":
        return "https://www.linkedin.com/in/grace-mwangi-4201a4240/"
      case "email":
        return "mailto:wambuigm55@gmail.com"
      case "phone":
        return "tel:+254745272040"
      default:
        return ""
    }
  }

  return (
    <Card className="p-4">
      <Tabs defaultValue="linkedin" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="linkedin">
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="phone">
            <Phone className="h-4 w-4 mr-2" />
            Phone
          </TabsTrigger>
        </TabsList>

        {["linkedin", "email", "phone"].map((type) => (
          <TabsContent key={type} value={type} className="mt-4">
            <div className="flex justify-center">
              <QRCodeSVG value={getQRCodeContent(type)} size={128} />
            </div>
            <div className="text-center mt-4 text-sm text-muted-foreground">
              Scan to{" "}
              {type === "linkedin" ? "view my LinkedIn profile" : type === "email" ? "send me an email" : "call me"}
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              <Button size="sm" variant="outline" onClick={downloadQRCode}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {type !== "linkedin" && (
                <Button size="sm" onClick={handleSaveContact}>
                  Save Contact
                </Button>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}