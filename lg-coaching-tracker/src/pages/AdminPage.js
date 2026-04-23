import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminPage() {
  const [clients, setClients] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');

  useEffect(() => {
    if (isAuthenticated) loadClients();
  }, [isAuthenticated]);

  const loadClients = async () => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });
    setClients(data || []);
  };

  const createClient = async () => {
    if (!newName || !newEmail) return;
    
    // Automatically generate a hidden slug if needed, but the primary tie is now the email!
    const slug = newName.toLowerCase().replace(/[^a-z0-9-]/g, '-') + '-' + Math.floor(Math.random() * 1000);
    const initial = newName.charAt(0).toUpperCase();

    await supabase.from('clients').insert({
      slug,
      email: newEmail.toLowerCase().trim(),
      client_name: newName,
      client_initial: initial,
    });
    setNewName('');
    setNewEmail('');
    loadClients();
  };

  const deleteClient = async (id) => {
    if (!window.confirm('Delete this client and all their data? This cannot be undone.')) return;
    await supabase.from('clients').delete().eq('id', id);
    loadClients();
  };

  const baseUrl = window.location.origin;

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh', background: '#F5F1EB', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{ background: 'white', padding: 40, borderRadius: 16, border: '1px solid #E8E4DF', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", margin: '0 0 20px', color: '#3D3529' }}>Admin Access</h2>
          <input 
            type="password" 
            placeholder="Admin Password"
            value={passcode}
            onChange={e => setPasscode(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #E8E4DF', marginBottom: 16, width: '100%', boxSizing: 'border-box' }}
          />
          <button 
            onClick={() => { if (passcode === 'LianaCoach2026') setIsAuthenticated(true); else alert('Incorrect Password'); }}
            style={{ padding: '10px 24px', borderRadius: 8, background: '#4A7C6F', color: 'white', border: 'none', cursor: 'pointer', width: '100%' }}
          >
            Log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#F5F1EB',
      fontFamily: "'DM Sans', sans-serif", padding: 40,
      maxWidth: 700, margin: '0 auto',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#3D3529', marginBottom: 30 }}>
        Client Dashboard
      </h1>

      <div style={{
        background: 'white', borderRadius: 16, padding: 24,
        marginBottom: 30, border: '1px solid #E8E4DF',
      }}>
        <h3 style={{ margin: '0 0 16px', color: '#3D3529' }}>Add New Client</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <input
            placeholder="Client name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              flex: 1, minWidth: 180, padding: '10px 14px', borderRadius: 10,
              border: '1px solid #E8E4DF', fontSize: 14, fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <input
            placeholder="Client Email Address"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            style={{
              flex: 1, minWidth: 200, padding: '10px 14px', borderRadius: 10,
              border: '1px solid #E8E4DF', fontSize: 14, fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button
            onClick={createClient}
            style={{
              padding: '10px 24px', borderRadius: 10, border: 'none',
              background: '#4A7C6F', color: 'white', fontWeight: 600,
              cursor: 'pointer', fontSize: 14, fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Create
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {clients.map(client => (
          <div key={client.id} style={{
            background: 'white', borderRadius: 12, padding: '16px 20px',
            border: '1px solid #E8E4DF', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between', gap: 12,
          }}>
            <div>
              <div style={{ fontWeight: 700, color: '#3D3529', marginBottom: 4 }}>
                {client.client_name || 'Unnamed'}
              </div>
              <div style={{ fontSize: 12, color: '#8A8070' }}>
                {baseUrl}/client/{client.slug}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => navigator.clipboard.writeText(`${baseUrl}/client/${client.slug}`)}
                style={{
                  padding: '6px 14px', borderRadius: 8, border: '1px solid #E8E4DF',
                  background: 'white', fontSize: 12, cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Copy Link
              </button>
              <button
                onClick={() => window.open(`/client/${client.slug}`, '_blank')}
                style={{
                  padding: '6px 14px', borderRadius: 8, border: 'none',
                  background: '#4A7C6F', color: 'white', fontSize: 12,
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Open
              </button>
              <button
                onClick={() => deleteClient(client.id)}
                style={{
                  padding: '6px 14px', borderRadius: 8, border: '1px solid #E8E4DF',
                  background: 'white', color: '#C4887A', fontSize: 12,
                  cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
