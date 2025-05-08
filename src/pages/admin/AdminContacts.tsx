
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getContacts, deleteContact } from "@/services/database";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ContactFormData } from "@/components/ContactForm";

const AdminContacts = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState(getContacts());
  const [selectedContact, setSelectedContact] = useState<ContactFormData | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleRefresh = () => {
    setContacts(getContacts());
    toast({
      title: "נתונים עודכנו",
      description: "רשימת הפניות עודכנה בהצלחה.",
    });
  };

  const handleDelete = (id: string | undefined) => {
    if (id) {
      deleteContact(id);
      setContacts(getContacts());
      setShowDeleteDialog(false);
      toast({
        title: "פנייה נמחקה",
        description: "הפנייה נמחקה בהצלחה.",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">ניהול פניות</h1>
          <Button onClick={handleRefresh}>רענן</Button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    שם
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    אימייל
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    טלפון
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    נושא
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    תאריך
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    פעולות
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
                      אין פניות חדשות
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-500">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-500">{contact.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {contact.date ? new Date(contact.date).toLocaleDateString() : "לא זמין"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          className="text-bstudio-primary hover:text-bstudio-primary/80 px-2"
                          onClick={() => setSelectedContact(contact)}
                        >
                          הצג
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-red-600 hover:text-red-800 px-2"
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowDeleteDialog(true);
                          }}
                        >
                          מחק
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View contact details */}
      <Dialog open={!!selectedContact && !showDeleteDialog} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>פרטי הפנייה</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">שם:</div>
                <div className="col-span-2">{selectedContact.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">אימייל:</div>
                <div className="col-span-2">{selectedContact.email}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">טלפון:</div>
                <div className="col-span-2">{selectedContact.phone}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">נושא:</div>
                <div className="col-span-2">{selectedContact.subject}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">תאריך:</div>
                <div className="col-span-2">
                  {selectedContact.date ? new Date(selectedContact.date).toLocaleDateString() : "לא זמין"}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">מכשיר:</div>
                <div className="col-span-2">{selectedContact.device || "לא זמין"}</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium">תוכן ההודעה:</div>
                <div className="border p-2 rounded bg-gray-50">{selectedContact.message}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>מחיקת פנייה</DialogTitle>
            <DialogDescription>
              האם אתה בטוח שברצונך למחוק את הפנייה? לא ניתן לשחזר פנייה לאחר מחיקתה.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              ביטול
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(selectedContact?.id)}
            >
              מחק
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminContacts;
