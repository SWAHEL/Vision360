import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, FileText, Plus, X } from "lucide-react";

interface TaxpayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  taxpayer: {
    id: string;
    name: string;
    identifiantFiscal: string;
    ice: string;

    avatar?: string;
  } | null;
}


interface WatchList {
  id: string;
  name: string;
  type: "Privée" | "Publique";
  canAdd: boolean;
  isIncluded: boolean;
}

const TaxpayerProfileModal = ({ isOpen, onClose, taxpayer }: TaxpayerProfileModalProps) => {
  const [reason, setReason] = useState("");
  const [selectedWatchLists, setSelectedWatchLists] = useState<string[]>([]);

  // Mock watchlists
  const availableWatchLists: WatchList[] = [
    { id: "1", name: "Entreprises à Risque Élevé", type: "Publique", canAdd: true, isIncluded: false },
    { id: "2", name: "Surveillance TVA Q4", type: "Privée", canAdd: true, isIncluded: true },
    { id: "3", name: "Contrôles Prioritaires", type: "Publique", canAdd: false, isIncluded: false },
    { id: "4", name: "Audit Casablanca", type: "Publique", canAdd: true, isIncluded: false },
  ];

  const handleWatchListToggle = (watchListId: string, checked: boolean) => {
    if (checked) {
      setSelectedWatchLists(prev => [...prev, watchListId]);
    } else {
      setSelectedWatchLists(prev => prev.filter(id => id !== watchListId));
    }
  };

  const handleExport = (format: 'pdf' | 'word') => {
    // Handle export functionality
    console.log(`Exporting ${taxpayer?.name} profile as ${format.toUpperCase()}`);
  };

  const handleAddToWatchLists = () => {
    if (selectedWatchLists.length > 0 && reason.trim()) {
      console.log("Adding to watchlists:", selectedWatchLists, "Reason:", reason);
      // Reset form
      setSelectedWatchLists([]);
      setReason("");
      onClose();
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  if (!taxpayer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={taxpayer.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(taxpayer.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg">{taxpayer.name}</div>
                <div className="text-sm text-muted-foreground font-mono">
                  IF: {taxpayer.identifiantFiscal} | ICE: {taxpayer.ice}
                </div>
              </div>
            </DialogTitle>
            
            {/* Export Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('pdf')}
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('word')}
                className="flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Word</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Summary */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-medium mb-3">Résumé du Profil</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <div className="font-medium">PME</div>
              </div>
              <div>
                <span className="text-muted-foreground">Secteur:</span>
                <div className="font-medium">Commerce</div>
              </div>
              <div>
                <span className="text-muted-foreground">Ville:</span>
                <div className="font-medium">Salé</div>
              </div>
              <div>
                <span className="text-muted-foreground">Statut:</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Actif
                </Badge>
              </div>
            </div>
          </div>

          {/* Watch List Management */}
          <div className="space-y-4">
            <h3 className="font-medium">Gestion des Watch Lists</h3>
            
            {/* Reason Field */}
            <div className="space-y-2">
              <Label htmlFor="reason">Motif *</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Indiquez la raison de l'ajout/suppression..."
                rows={3}
              />
            </div>

            {/* Watch Lists Selection */}
            <div className="space-y-3">
              <Label>Sélectionner les Watch Lists</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                {availableWatchLists.map((watchList) => (
                  <div
                    key={watchList.id}
                    className={`flex items-center justify-between p-2 rounded ${
                      !watchList.canAdd ? 'opacity-50' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedWatchLists.includes(watchList.id) || watchList.isIncluded}
                        onCheckedChange={(checked) => 
                          watchList.canAdd && handleWatchListToggle(watchList.id, checked as boolean)
                        }
                        disabled={!watchList.canAdd}
                      />
                      <div>
                        <div className="font-medium text-sm">{watchList.name}</div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={watchList.type === "Publique" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {watchList.type}
                          </Badge>
                          {watchList.isIncluded && (
                            <Badge variant="outline" className="text-xs bg-success/10 text-success">
                              Déjà inclus
                            </Badge>
                          )}
                          {!watchList.canAdd && (
                            <Badge variant="outline" className="text-xs">
                              Lecture seule
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Watch Lists */}
            <div className="space-y-2">
              <Label>Actuellement dans les Watch Lists</Label>
              <div className="flex flex-wrap gap-2">
                {availableWatchLists
                  .filter(wl => wl.isIncluded)
                  .map((watchList) => (
                    <Badge
                      key={watchList.id}
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {watchList.name}
                      {watchList.canAdd && (
                        <button className="ml-2 hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button
              onClick={handleAddToWatchLists}
              disabled={selectedWatchLists.length === 0 || !reason.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Mettre à jour
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaxpayerProfileModal;