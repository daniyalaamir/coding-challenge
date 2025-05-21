import { useState } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import Profile from './components/Profile';
import Form from './components/Form';
import Button from './components/Button';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [nameError, setNameError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [profiles, setProfiles] = useState([
    { name: 'Tatiana Dokidis', username: 'rsmith' },
    { name: 'Paityn Siphron', username: 'ericpatter' },
    { name: 'Gustavo Geidt', username: 'qhayden' },
    { name: 'Emerson Lubin', username: 'daniel99' },
    { name: 'Leo Ekstrom Bothman', username: 'duartenath' },
    { name: 'Marley Septimus', username: 'wendysaund' },
    { name: 'Carter Torff', username: 'wayne21' },
  ]);

  const currentProfile = profiles[profiles.length - 1] || { name: '', username: '' };

  const handleSubmit = () => {
    if (!name || !username) return;
    setProfiles([...profiles, { name, username }]);
    setSubmitted(true);
    setShowForm(false);
    showNotification('Your Profile is set up.');
  };

  const handleEdit = () => {
    setName(currentProfile.name);
    setUsername(currentProfile.username);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSave = () => {
    const updated = profiles.map((p, i) =>
      i === profiles.length - 1 ? { name, username } : p
    );
    setProfiles(updated);
    setEditMode(false);
    setShowForm(false);
    showNotification('Profile changes saved.');
  };

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="app">
      <Header />
      <main id="main" className="main">
        {!submitted ? (
          <div className="centered-content">
            <p>Please enter your name and username to get started.</p>
            <Button 
              className="get-started" 
              onClick={() => setShowForm(true)}
            >
              Get Started
            </Button>
          </div>
        ) : viewAll ? (
          <Table profiles={profiles} currentProfile={currentProfile} onBack={() => setViewAll(false)} />
        ) : (
          <Profile
            profile={currentProfile}
            editMode={editMode}
            onEdit={handleEdit}
            onViewAll={() => setViewAll(true)}
            notification={showToast}
            message={toastMessage}
            onClickToast={() => setShowToast(false)}
          />
        )}
        {showForm && (
          <Form
            title={editMode ? 'Edit Profile Info' : 'Get Started'}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            fields={[
              { name: 'name', label: 'Name', required: true },
              { name: 'username', label: 'Username', required: true }
            ]}
            values={{ name, username }}
            submitLabel={editMode ? 'Save Changes' : 'Submit'}
            cancelLabel="Cancel"
            onChange={(field, value) => {
              if (field === 'name') {
                setName(value);
                setNameError(/\d/.test(value) ? 'Name must not contain numbers.' : '');
              } else if (field === 'username') {
                setUsername(value);
              }
            }}
            onClear={(field) => {
              if (field === 'name') {
                setName('');
                setNameError('');
              } else if (field === 'username') {
                setUsername('');
              }
            }}
            onCancel={() => {
              setShowForm(false)
              setEditMode(false);
              setName('');
              setUsername('');
              setNameError('');
            }}
            onSubmit={editMode ? handleSave : handleSubmit}
            disabled={!name || !username || !!nameError}
            errors={{ name: nameError }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
