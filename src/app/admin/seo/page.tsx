"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function SEOSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    keywords: "",
    ogImage: "",
    twitterCard: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSEOSettings();
  }, []);

  const fetchSEOSettings = async () => {
    try {
      const response = await fetch("/api/seo");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "SEO ayarları yüklenemedi.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error("SEO ayarları kaydedilemedi");

      toast({
        title: "Başarılı",
        description: "SEO ayarları başarıyla kaydedildi.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "SEO ayarları kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">SEO Ayarları</h1>

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
          <Label htmlFor="siteDescription">Site Açıklaması</Label>
          <Textarea
            id="siteDescription"
            value={settings.siteDescription}
            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Anahtar Kelimeler (Virgülle Ayırın)</Label>
          <Input
            id="keywords"
            value={settings.keywords}
            onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ogImage">Open Graph Görsel URL</Label>
          <Input
            id="ogImage"
            value={settings.ogImage}
            onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitterCard">Twitter Card Görsel URL</Label>
          <Input
            id="twitterCard"
            value={settings.twitterCard}
            onChange={(e) => setSettings({ ...settings, twitterCard: e.target.value })}
          />
        </div>

        <Button onClick={handleSave}>Kaydet</Button>
      </div>
    </div>
  );
}