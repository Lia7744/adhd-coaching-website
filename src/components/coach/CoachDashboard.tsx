"use client";

import { useState } from "react";
import { Users, Plus, Trash2, Eye, LogOut, X, Pencil, Check } from "lucide-react";
import { logoutCoach, addClientAction, deleteClientAction, updateClientAction } from "@/app/coachlg/actions";
import TrackerContainer from "@/components/tracker/TrackerContainer";

type Client = {
  id: string;
  slug: string;
  client_name: string;
  email: string;
  start_date: string;
  created_at: string;
};

export default function CoachDashboard({ initialClients }: { initialClients: Client[] }) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [addingClient, setAddingClient] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [viewingSlug, setViewingSlug] = useState<string | null>(null);
  const [viewingName, setViewingName] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editError, setEditError] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    setErrorMsg("");

    const result = await addClientAction(newName, newEmail);
    if (result.success) {
      setNewName("");
      setNewEmail("");
      setAddingClient(false);
      // Reload to get fresh client list with IDs
      window.location.reload();
    } else {
      setErrorMsg(result.error || "Failed to add client.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete ${name} and all their data? This cannot be undone.`)) return;
    const result = await deleteClientAction(id);
    if (result.success) {
      setClients((prev) => prev.filter((c) => c.id !== id));
      if (viewingSlug) setViewingSlug(null);
    }
  };

  const startEdit = (client: Client) => {
    setEditingId(client.id);
    setEditName(client.client_name);
    setEditEmail(client.email || "");
    setEditError("");
  };

  const handleSaveEdit = async (id: string) => {
    setEditSaving(true);
    setEditError("");
    const result = await updateClientAction(id, editName, editEmail);
    setEditSaving(false);
    if (result.success) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, client_name: editName, email: editEmail } : c
        )
      );
      setEditingId(null);
    } else {
      setEditError(result.error || "Failed to save.");
    }
  };

  const handleLogout = async () => {
    await logoutCoach();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Header */}
      <div className="bg-brand-charcoal text-white px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-black text-brand-gold">Coach Dashboard</h1>
          <p className="text-white/60 text-sm mt-0.5">{clients.length} active client{clients.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Inline Tracker View */}
        {viewingSlug && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-brand-charcoal">
                Viewing: <span className="text-brand-sage">{viewingName}</span>
              </h2>
              <button
                onClick={() => setViewingSlug(null)}
                className="flex items-center gap-1 text-sm text-brand-warm-gray hover:text-brand-charcoal border border-brand-border rounded-xl px-3 py-1.5 bg-white"
              >
                <X className="w-4 h-4" /> Close
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-brand-border">
              <TrackerContainer slug={viewingSlug} />
            </div>
          </div>
        )}

        {/* Add Client */}
        <div className="bg-white rounded-2xl border-2 border-brand-border p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-brand-charcoal flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-gold" /> Add New Client
            </h2>
            <button
              onClick={() => setAddingClient(!addingClient)}
              className="flex items-center gap-2 text-sm font-bold text-brand-sage bg-brand-sage/10 hover:bg-brand-sage/20 px-4 py-2 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> New Client
            </button>
          </div>

          {addingClient && (
            <form onSubmit={handleAddClient} className="flex flex-col sm:flex-row gap-3">
              <input
                placeholder="Client full name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1 bg-brand-cream border-2 border-brand-border rounded-xl px-4 py-2.5 outline-none focus:border-brand-sage transition-colors text-sm font-medium"
                required
              />
              <input
                type="email"
                placeholder="Client email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-1 bg-brand-cream border-2 border-brand-border rounded-xl px-4 py-2.5 outline-none focus:border-brand-sage transition-colors text-sm font-medium"
                required
              />
              <button
                type="submit"
                className="bg-brand-sage text-white font-bold rounded-xl px-6 py-2.5 hover:brightness-90 transition-all text-sm whitespace-nowrap"
              >
                Add Client
              </button>
            </form>
          )}
          {errorMsg && <p className="text-[#D25D48] text-sm font-bold mt-3">{errorMsg}</p>}
        </div>

        {/* Client List */}
        <div className="flex flex-col gap-3">
          {clients.length === 0 ? (
            <div className="text-center py-16 text-brand-warm-gray bg-white rounded-2xl border-2 border-dashed border-brand-border">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No clients yet.</p>
              <p className="text-sm">Click "New Client" above to add your first client.</p>
            </div>
          ) : (
            clients.map((client) => (
              <div
                key={client.id}
                className={`bg-white rounded-2xl border-2 px-6 py-4 shadow-sm transition-all ${
                  viewingSlug === client.slug ? "border-brand-sage" : "border-brand-border"
                }`}
              >
                {editingId === client.id ? (
                  // ── Edit Mode ──
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Client name"
                        className="flex-1 bg-brand-cream border-2 border-brand-border rounded-xl px-4 py-2 outline-none focus:border-brand-gold text-sm font-medium"
                      />
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="Email address"
                        className="flex-1 bg-brand-cream border-2 border-brand-border rounded-xl px-4 py-2 outline-none focus:border-brand-gold text-sm font-medium"
                      />
                    </div>
                    {editError && <p className="text-[#D25D48] text-xs font-bold">{editError}</p>}
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-sm text-brand-warm-gray border border-brand-border rounded-xl px-4 py-2 hover:bg-brand-cream"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(client.id)}
                        disabled={editSaving}
                        className="flex items-center gap-1.5 text-sm font-bold bg-brand-gold text-white rounded-xl px-4 py-2 hover:brightness-90 disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" /> {editSaving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  // ── Normal View ──
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center font-bold text-brand-gold text-lg flex-shrink-0">
                        {client.client_name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-brand-charcoal truncate">{client.client_name}</p>
                        <p className="text-sm text-brand-warm-gray truncate">{client.email || "No email set"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => startEdit(client)}
                        className="flex items-center gap-1.5 text-sm font-bold px-3 py-2 rounded-xl text-brand-warm-gray hover:bg-brand-cream transition-all border border-transparent hover:border-brand-border"
                        title="Edit client"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (viewingSlug === client.slug) {
                            setViewingSlug(null);
                          } else {
                            setViewingSlug(client.slug);
                            setViewingName(client.client_name);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                          viewingSlug === client.slug
                            ? "bg-brand-sage text-white"
                            : "bg-brand-sage/10 text-brand-sage hover:bg-brand-sage/20"
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        {viewingSlug === client.slug ? "Viewing" : "View"}
                      </button>
                      <button
                        onClick={() => handleDelete(client.id, client.client_name)}
                        className="flex items-center gap-1.5 text-sm font-bold px-3 py-2 rounded-xl text-[#D25D48] hover:bg-[#D25D48]/10 transition-all border border-transparent hover:border-[#D25D48]/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
