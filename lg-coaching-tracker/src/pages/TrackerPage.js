import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useClientData } from '../hooks/useClientData';
import CoachingTracker from '../components/CoachingTracker';

export default function TrackerPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [accessCode, setAccessCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    try {
      if (token && window.atob(token) === slug) {
        setIsUnlocked(true);
      }
    } catch (e) {
      // invalid base64 token
    }
  }, [token, slug]);

  const { data, loading, error, updateData } = useClientData(isUnlocked ? slug : null);

  if (!isUnlocked) {
    return (
      <div style={{
        minHeight: '100vh', background: '#F5F1EB', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{ background: 'white', padding: 40, borderRadius: 16, border: '1px solid #E8E4DF', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", margin: '0 0 20px', color: '#3D3529' }}>Client Portal</h2>
          <p style={{ color: '#8A8070', fontSize: 14, marginBottom: 24, maxWidth: 280 }}>
            Enter your secure access code to view your private coaching dashboard.
          </p>
          <input 
            type="password" 
            placeholder="Access Code"
            value={accessCode}
            onChange={e => setAccessCode(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #E8E4DF', marginBottom: 16, width: '100%', boxSizing: 'border-box' }}
          />
          <button 
            onClick={() => { if (accessCode.trim().toLowerCase() === slug) setIsUnlocked(true); else alert('Incorrect Access Code'); }}
            style={{ padding: '10px 24px', borderRadius: 8, background: '#D4A853', color: 'white', border: 'none', cursor: 'pointer', width: '100%', fontWeight: 600 }}
          >
            Access Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh', background: '#F5F1EB', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", color: '#8A8070',
    }}>
      Loading your tracker...
    </div>
  );

  if (error) return (
    <div style={{
      minHeight: '100vh', background: '#F5F1EB', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", color: '#C4887A',
    }}>
      Tracker not found. Check your link and try again.
    </div>
  );

  return <CoachingTracker data={data} onUpdate={updateData} />;
}
