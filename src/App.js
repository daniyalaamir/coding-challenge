import { useState } from 'react';
import { ArrowLeftShort, List, X, Check2Circle } from 'react-bootstrap-icons';
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentProfile = profiles[profiles.length - 1] || { name: '', username: '' };

  const handleSubmit = () => {
    if (!name || !username) return;
    setProfiles([...profiles, { name, username }]);
    setSubmitted(true);
    setShowForm(false);
    setToastMessage('Your Profile is set up.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
    setToastMessage('Profile changes saved.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="avatar">FL</div>
        <h1>PAR Excellence</h1>
        <button className="menu-button"><List size={27} /></button>
      </header>
      <main className="main">
        {!submitted ? (
          <div className="centered-content">
            <p>Please enter your name and username to get started.</p>
            <button className='get-started' onClick={() => setShowForm(true)}>Get Started</button>
          </div>
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
            <button onClick={() => setViewAll(false)} className="back-button">
              <ArrowLeftShort size={27} />
              Back to My Profile
            </button>
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
            {showToast && (
              <div className="toast success">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check2Circle color="#109E00" size={20} />
                  <span>{toastMessage}</span>
                </div>
                <X size={20} color="#000000" onClick={() => setShowToast(false)} />
              </div>
            )}
          </div>
        )}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3 className="modal-title">{editMode ? 'Edit Profile Info' : 'Get Started'}</h3>
                <button className="close-button" onClick={() => { setShowForm(false); setEditMode(false); }}><X size={20} /></button>
              </div>
              <div className="modal-body">
                <p className="modal-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <label>Name*</label>
                <div className="input-wrapper">
                  <div className="input-container">
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
                      className={nameError ? 'error' : ''}
                    />
                    {name && (
                      <button
                        className={`clear-input ${nameError ? 'error' : ''}`}
                        onClick={() => {
                          setName('');
                          setNameError('');
                        }}
                        aria-label="Clear name input"
                      >
                        <X size={25} />
                      </button>
                    )}
                  </div>
                  {nameError && (
                    <div className="input-error">{nameError}</div>
                  )}
                </div>
                <label>Username</label>
                <div className="input-wrapper">
                  <div className="input-container">
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
                        <X size={25} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false);
                    setEditMode(false);
                    setName('');
                    setUsername('');
                    setNameError('');
                  }}
                >
                  Cancel
                </button>
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
      </main>
    </div>
  );
}

export default App;
