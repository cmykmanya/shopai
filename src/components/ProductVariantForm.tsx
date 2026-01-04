"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Trash2 } from "lucide-react";

export function ProductVariantForm({ variants, setVariants }: { variants: any[]; setVariants: (variants: any[]) => void }) {
  const [newVariant, setNewVariant] = useState({
    name: "",
    options: [""],
  });

  const handleAddVariant = () => {
    if (!newVariant.name || newVariant.options.some((opt) => !opt)) return;
    setVariants([...variants, newVariant]);
    setNewVariant({ name: "", options: [""] });
  };

  const handleAddOption = () => {
    setNewVariant({
      ...newVariant,
      options: [...newVariant.options, ""],
    });
  };

  const handleRemoveVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleRemoveOption = (variantIndex: number, optionIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options.splice(optionIndex, 1);
    setVariants(newVariants);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Varyant Ekle</Label>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Varyant adı (örn: Renk)"
            value={newVariant.name}
            onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
          />
          <Button type="button" onClick={handleAddVariant}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {newVariant.options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder={`Seçenek ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...newVariant.options];
                newOptions[index] = e.target.value;
                setNewVariant({ ...newVariant, options: newOptions });
              }}
            />
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => {
                  const newOptions = [...newVariant.options];
                  newOptions.splice(index, 1);
                  setNewVariant({ ...newVariant, options: newOptions });
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={handleAddOption}>
          Seçenek Ekle
        </Button>
      </div>

      <div className="space-y-2">
        {variants.map((variant, variantIndex) => (
          <div key={variantIndex} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Label>{variant.name}</Label>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveVariant(variantIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {variant.options.map((option: string, optionIndex: number) => (
                <div key={optionIndex} className="flex items-center gap-2">
                  <Input value={option} readOnly />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveOption(variantIndex, optionIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}