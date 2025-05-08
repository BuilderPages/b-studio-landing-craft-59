import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getContacts, Contact } from "@/services/database";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const AdminContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(getContacts());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    
    localStorage.setItem("b-studio-contacts", JSON.stringify(updatedContacts));
  };

  const filteredContacts = contacts.filter(contact => {
    const search = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search) ||
      (contact.subject && contact.subject.toLowerCase().includes(search)) ||
      contact.message.toLowerCase().includes(search)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ניהול פניות</h1>
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="חיפוש פניות..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 text-right"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">פניות שהתקבלו</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredContacts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">פעולות</TableHead>
                  <TableHead className="text-right">תאריך</TableHead>
                  <TableHead className="text-right">נושא</TableHead>
                  <TableHead className="text-right">אימייל</TableHead>
                  <TableHead className="text-right">שם</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedContact(contact);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          צפייה
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(contact.id)}
                        >
                          מחיקה
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {contact.date
                        ? format(new Date(contact.date), "dd/MM/yyyy HH:mm")
                        : "לא צוין"}
                    </TableCell>
                    <TableCell>{contact.subject || "פנייה כללית"}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">לא נמצאו פניות</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-right text-xl">פרטי הפנייה</DialogTitle>
            <DialogDescription className="text-right">
              פרטי פנייה מלאים
            </DialogDescription>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-4 text-right">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">תאריך הפנייה:</h4>
                  <p>
                    {selectedContact.date
                      ? format(new Date(selectedContact.date), "dd/MM/yyyy HH:mm")
                      : "לא צוין"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">שם מלא:</h4>
                  <p>{selectedContact.name}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">אימייל:</h4>
                  <p>{selectedContact.email}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">נושא:</h4>
                  <p>{selectedContact.subject || "פנייה כללית"}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">מכשיר:</h4>
                  <Badge variant="outline">{selectedContact.device || "לא צוין"}</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">הודעה:</h4>
                <div className="bg-gray-50 p-4 rounded-md border text-right">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setIsViewDialogOpen(false)}>סגור</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContacts;
