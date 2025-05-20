import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profiles, setProfiles] = useState([
    { name: 'Tatiana Dokidis', username: 'rsmith' },
    { name: 'Paityn Siphron', username: 'ericpatter' },
    { name: 'Gustavo Geidt', username: 'qhayden' },
    { name: 'Emerson Lubin', username: 'daniel99' },
    { name: 'Leo Ekstrom Bothman', username: 'duartenath' },
    { name: 'Marley Septimus', username: 'wendysaund' },
    { name: 'Carter Torff', username: 'wayne21' },
  ]);
  const [viewAll, setViewAll] = useState(false);
  const [nameError, setNameError] = useState('');

  const currentProfile = profiles[profiles.length - 1] || { name: '', username: '' };

  const handleSubmit = () => {
    if (!name || !username) return;
    setProfiles([...profiles, { name, username }]);
    setSubmitted(true);
    setShowForm(false);
  };

  const handleEdit = () => {
    setName(currentProfile.name);
    setUsername(currentProfile.username);
    setEditMode(true);
    setShowForm(true);
  };

  const saveChanges = () => {
    const updatedProfiles = profiles.map((p, i) =>
      i === profiles.length - 1 ? { name, username } : p
    );
    setProfiles(updatedProfiles);
    setEditMode(false);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="avatar">FL</div>
        <h1>PAR Excellence</h1>
        <button className="menu-button">≡</button>
      </header>
      <main className="main">
        {!submitted ? (
          <>
            <p>Please enter your name and username to get started.</p>
            <button className='get-started' onClick={() => setShowForm(true)}>Get Started</button>
          </>
        ) : viewAll ? (
          <div className="profile-table">
            <h2>All Profiles</h2>
            <table>
              <thead>
                <tr><th>Name</th><th>Username</th></tr>
              </thead>
              <tbody>
                {[currentProfile, ...profiles.filter(
                  p => p.name !== currentProfile.name || p.username !== currentProfile.username
                )].map((p, i) => (
                  <tr key={i}><td>{p.name}</td><td>{p.username}</td></tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setViewAll(false)}>← Back to My Profile</button>
          </div>
        ) : (
          <div className="profile">
            <h2>{!editMode ? 'My Profile' : 'Name Entry'}</h2>
            <p><span>Name</span><br />{currentProfile.name}</p>
            <p><span>Username</span><br />{currentProfile.username}</p>
            <div className="profile-buttons">
              <button className="primary" onClick={handleEdit}>Edit Profile Info</button>
              <button className="secondary" onClick={() => setViewAll(true)}>View All Profiles</button>
            </div>
          </div>
        )}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3 className="modal-title">{editMode ? 'Edit Profile Info' : 'Get Started'}</h3>
                <button className="close-button" onClick={() => { setShowForm(false); setEditMode(false); }}>×</button>
              </div>
              <div className="modal-body">
                <p className="modal-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <label>Name*</label>
                <div className="input-wrapper">
                  <input
                    value={name}
                    onChange={e => {
                      const value = e.target.value;
                      setName(value);
                      if (/\d/.test(value)) {
                        setNameError('Name must not contain numbers.');
                      } else {
                        setNameError('');
                      }
                    }}
                    placeholder="Enter your name"
                  />
                  {nameError && (
                    <div style={{ color: 'red', fontSize: '14px', marginTop: '5px', width: '591px', height: '14px' }}>
                      {nameError}
                    </div>
                  )}
                  {name && (
                    <button
                      className="clear-input"
                      onClick={() => setName('')}
                      aria-label="Clear name input"
                    >
                      ×
                    </button>
                  )}
                </div>
                <label>Username</label>
                <div className="input-wrapper">
                  <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter a username"
                  />
                  {username && (
                    <button
                      className="clear-input"
                      onClick={() => setUsername('')}
                      aria-label="Clear username input"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-button" onClick={() => { setShowForm(false); setEditMode(false); }}>Cancel</button>
                <button
                  className="submit-button"
                  onClick={editMode ? saveChanges : handleSubmit}
                  disabled={!name || !username || !!nameError}
                >
                  {editMode ? 'Save Changes' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* {submitted && !editMode && (
          <div className="toast success">✓ Your Profile is set up.</div>
        )}
        {!showForm && editMode && (
          <div className="toast success">✓ Profile changes saved.</div>
        )} */}
      </main>
    </div>
  );
}

export default App;
