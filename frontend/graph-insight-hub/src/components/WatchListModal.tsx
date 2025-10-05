import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WatchList {
  id: string;
  name: string;
  type: "Privée" | "Publique";
  itemCount: number;
  isOwner: boolean;
}

interface WatchListModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingList?: WatchList | null;
}

const WatchListModal = ({ isOpen, onClose, editingList }: WatchListModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Publique" as "Privée" | "Publique",
    description: "",
    activateRule: false,
    ruleQuery: "",
    status: true,
    shareWith: [] as string[],
    rights: "Lecture" as "Lecture" | "Ajout" | "Ajout + Suppression"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingList) {
      setFormData({
        name: editingList.name,
        type: editingList.type,
        description: "",
        activateRule: false,
        ruleQuery: "",
        status: true,
        shareWith: [],
        rights: "Lecture"
      });
    } else {
      setFormData({
        name: "",
        type: "Publique",
        description: "",
        activateRule: false,
        ruleQuery: "",
        status: true,
        shareWith: [],
        rights: "Lecture"
      });
    }
    setErrors({});
  }, [editingList, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    
    if (formData.activateRule && !formData.ruleQuery.trim()) {
      newErrors.ruleQuery = "La requête est requise quand la règle est activée";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Handle form submission
      console.log("Form submitted:", formData);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingList ? "Modifier Watch List" : "Nouvelle Watch List"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Type */}
          <div className="space-y-3">
            <Label>Type</Label>
            <RadioGroup 
              value={formData.type} 
              onValueChange={(value) => setFormData({ ...formData, type: value as "Privée" | "Publique" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Publique" id="publique" />
                <Label htmlFor="publique">Publique</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Privée" id="privee" />
                <Label htmlFor="privee">Privée</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Share With */}
          {formData.type === "Publique" && (
            <div className="space-y-2">
              <Label>Partager avec</Label>
              <div className="flex space-x-2">
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Sélectionner des utilisateurs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">M. Lahlou</SelectItem>
                    <SelectItem value="user2">Mme Bennani</SelectItem>
                    <SelectItem value="user3">M. Chakir</SelectItem>
                  </SelectContent>
                </Select>
                <Select 
                  value={formData.rights} 
                  onValueChange={(value) => setFormData({ ...formData, rights: value as any })}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lecture">Lecture</SelectItem>
                    <SelectItem value="Ajout">Ajout</SelectItem>
                    <SelectItem value="Ajout + Suppression">Ajout + Suppression</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description optionnelle..."
              rows={3}
            />
          </div>

          {/* Activate Rule */}
          <div className="flex items-center space-x-2">
            <Switch
              id="activate-rule"
              checked={formData.activateRule}
              onCheckedChange={(checked) => setFormData({ ...formData, activateRule: checked })}
            />
            <Label htmlFor="activate-rule">Activer la règle?</Label>
          </div>

          {/* Rule Query */}
          {formData.activateRule && (
            <div className="space-y-2">
              <Label htmlFor="rule-query">Requête de règle</Label>
              <Textarea
                id="rule-query"
                value={formData.ruleQuery}
                onChange={(e) => setFormData({ ...formData, ruleQuery: e.target.value })}
                placeholder="SQL / Cypher..."
                className={`font-mono ${errors.ruleQuery ? "border-destructive" : ""}`}
                rows={4}
              />
              {errors.ruleQuery && (
                <p className="text-sm text-destructive">{errors.ruleQuery}</p>
              )}
            </div>
          )}

          {/* Status */}
          {formData.type === "Publique" && (
            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
              />
              <Label htmlFor="status">Actif</Label>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-dgi-cyan-primary hover:bg-dgi-cyan-dark text-white"
            >
              Confirmer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WatchListModal;