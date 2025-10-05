import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, Plus } from "lucide-react";
import TopNavigation from "@/components/TopNavigation";
import WatchListModal from "@/components/WatchListModal";
import { Link } from "react-router-dom";

interface WatchList {
  id: string;
  name: string;
  type: "Privée" | "Publique";
  itemCount: number;
  isOwner: boolean;
}

const WatchLists = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<WatchList | null>(null);
  const [myListsFilter, setMyListsFilter] = useState("");
  const [sharedListsFilter, setSharedListsFilter] = useState("");

  // Mock data
  const myWatchLists: WatchList[] = [
    { id: "1", name: "Entreprises à Risque Élevé", type: "Publique", itemCount: 23, isOwner: true },
    { id: "2", name: "Surveillance TVA Q4", type: "Privée", itemCount: 8, isOwner: true },
    { id: "3", name: "Contrôles Prioritaires", type: "Publique", itemCount: 15, isOwner: true },
  ];

  const sharedWithMe: WatchList[] = [
    { id: "4", name: "Audit Casablanca", type: "Publique", itemCount: 12, isOwner: false },
    { id: "5", name: "Surveillance Exportateurs", type: "Publique", itemCount: 31, isOwner: false },
  ];

  const filteredMyLists = myWatchLists.filter(list => 
    list.name.toLowerCase().includes(myListsFilter.toLowerCase())
  );

  const filteredSharedLists = sharedWithMe.filter(list => 
    list.name.toLowerCase().includes(sharedListsFilter.toLowerCase())
  );

  const handleEdit = (list: WatchList) => {
    setEditingList(list);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingList(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation currentPage="watchlists" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Watch Lists */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Mes Watch Lists</h2>
            </div>
            
            <div className="mb-4">
              <Input
                placeholder="Filter by name..."
                value={myListsFilter}
                onChange={(e) => setMyListsFilter(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>#Items</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMyLists.map((list) => (
                  <TableRow key={list.id}>
                    <TableCell>
                      <Link 
                        to={`/watchlists/${list.id}`}
                        className="text-dgi-cyan-primary hover:text-dgi-cyan-dark font-medium"
                      >
                        {list.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={list.type === "Publique" ? "default" : "secondary"}
                        className={list.type === "Publique" ? "bg-dgi-cyan-primary text-white" : ""}
                      >
                        {list.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{list.itemCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/watchlists/${list.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleEdit(list)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Shared With Me */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Shared With Me</h2>
            </div>
            
            <div className="mb-4">
              <Input
                placeholder="Filter by name..."
                value={sharedListsFilter}
                onChange={(e) => setSharedListsFilter(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>#Items</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSharedLists.map((list) => (
                  <TableRow key={list.id}>
                    <TableCell>
                      <Link 
                        to={`/watchlists/${list.id}`}
                        className="text-dgi-cyan-primary hover:text-dgi-cyan-dark font-medium"
                      >
                        {list.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="default"
                        className="bg-dgi-cyan-primary text-white"
                      >
                        {list.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{list.itemCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" asChild>
                        <Link to={`/watchlists/${list.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Floating Action Button */}
        <Button
          onClick={handleCreateNew}
          className="fixed bottom-8 right-8 rounded-full w-14 h-14 bg-dgi-cyan-primary hover:bg-dgi-cyan-dark text-white shadow-lg"
          size="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <WatchListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingList={editingList}
      />
    </div>
  );
};

export default WatchLists;