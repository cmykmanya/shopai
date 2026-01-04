"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2 } from "lucide-react";

export default function BannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [newBanner, setNewBanner] = useState({
    title: "",
    description: "",
    image: "",
    cta: "",
    link: "",
    isActive: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch("/api/banners");
      const data = await response.json();
      setBanners(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bannerlar yüklenemedi.",
        variant: "destructive",
      });
    }
  };

  const handleAddBanner = async () => {
    try {
      const response = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBanner),
      });

      if (!response.ok) throw new Error("Banner eklenemedi");

      toast({
        title: "Başarılı",
        description: "Banner başarıyla eklendi.",
      });
      fetchBanners();
      setNewBanner({
        title: "",
        description: "",
        image: "",
        cta: "",
        link: "",
        isActive: true,
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Banner eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBanner = async (id: string) => {
    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Banner silinemedi");

      toast({
        title: "Başarılı",
        description: "Banner başarıyla silindi.",
      });
      fetchBanners();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Banner silinirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Banner Yönetimi</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Yeni Banner Ekle</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              value={newBanner.title}
              onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Input
              id="description"
              value={newBanner.description}
              onChange={(e) => setNewBanner({ ...newBanner, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Görsel URL</Label>
            <Input
              id="image"
              value={newBanner.image}
              onChange={(e) => setNewBanner({ ...newBanner, image: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta">Buton Metni</Label>
            <Input
              id="cta"
              value={newBanner.cta}
              onChange={(e) => setNewBanner({ ...newBanner, cta: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              value={newBanner.link}
              onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={newBanner.isActive}
              onCheckedChange={(checked) => setNewBanner({ ...newBanner, isActive: checked })}
            />
            <Label htmlFor="isActive">Aktif</Label>
          </div>
        </div>
        <Button onClick={handleAddBanner}>
          <Plus className="mr-2 h-4 w-4" /> Banner Ekle
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Mevcut Bannerlar</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>Görsel</TableHead>
              <TableHead>Buton Metni</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Aktif</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>{banner.title}</TableCell>
                <TableCell>{banner.description}</TableCell>
                <TableCell>
                  <img src={banner.image} alt={banner.title} className="w-16 h-16 object-cover" />
                </TableCell>
                <TableCell>{banner.cta}</TableCell>
                <TableCell>{banner.link}</TableCell>
                <TableCell>{banner.isActive ? "Evet" : "Hayır"}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteBanner(banner.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}