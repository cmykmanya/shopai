"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Check, X } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Yorumlar yüklenemedi.",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isApproved: true }),
      });

      if (!response.ok) throw new Error("Yorum onaylanamadı");

      toast({
        title: "Başarılı",
        description: "Yorum başarıyla onaylandı.",
      });
      fetchReviews();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Yorum onaylanırken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Yorum silinemedi");

      toast({
        title: "Başarılı",
        description: "Yorum başarıyla silindi.",
      });
      fetchReviews();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Yorum silinirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Müşteri Yorumları</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kullanıcı</TableHead>
            <TableHead>Ürün</TableHead>
            <TableHead>Puan</TableHead>
            <TableHead>Yorum</TableHead>
            <TableHead>Görseller</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.user.name}</TableCell>
              <TableCell>{review.product.title}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>
                {review.images.map((image: string, index: number) => (
                  <img key={index} src={image} alt="Review" className="w-12 h-12 object-cover mr-2" />
                ))}
              </TableCell>
              <TableCell>{review.isApproved ? "Onaylı" : "Bekliyor"}</TableCell>
              <TableCell className="space-x-2">
                {!review.isApproved && (
                  <>
                    <Button size="sm" onClick={() => handleApprove(review.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleReject(review.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}