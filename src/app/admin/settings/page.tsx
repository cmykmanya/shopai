"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "",
    logo: "",
    favicon: "",
    contactEmail: "",
    contactPhone: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();
      setSettings({
        siteName: data.find((s: any) => s.key === "siteName")?.value || "",
        logo: data.find((s: any) => s.key === "logo")?.value || "",
        favicon: data.find((s: any) => s.key === "favicon")?.value || "",
        contactEmail: data.find((s: any) => s.key === "contactEmail")?.value || "",
        contactPhone: data.find((s: any) => s.key === "contactPhone")?.value || "",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Site ayarları yüklenemedi.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          { key: "siteName", value: settings.siteName },
          { key: "logo", value: settings.logo },
          { key: "favicon", value: settings.favicon },
          { key: "contactEmail", value: settings.contactEmail },
          { key: "contactPhone", value: settings.contactPhone },
        ]),
      });

      if (!response.ok) throw new Error("Ayarlar kaydedilemedi");

      toast({
        title: "Başarılı",
        description: "Site ayarları başarıyla kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Site ayarları kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Site Ayarları</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="siteName">Site Adı</Label>
          <Input
            id="siteName"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            value={settings.logo}
            onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="favicon">Favicon URL</Label>
          <Input
            id="favicon"
            value={settings.favicon}
            onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">İletişim E-postası</Label>
          <Input
            id="contactEmail"
            value={settings.contactEmail}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">İletişim Telefonu</Label>
          <Input
            id="contactPhone"
            value={settings.contactPhone}
            onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
          />
        </div>

        <Button onClick={handleSave}>Kaydet</Button>
      </div>
    </div>
  );
}