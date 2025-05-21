import Button from "./Button";
import Notification from "./Notification";

const Profile = ({ profile, editMode, onEdit, onViewAll, notification, message, onClickToast }) => (
  <div className="profile">
    <h2>{!editMode ? 'My Profile' : 'Name Entry'}</h2>
    <p><span>Name</span><br />{profile.name}</p>
    <p><span>Username</span><br />{profile.username}</p>
    <div className="profile-buttons">
      <Button variant="primary" onClick={onEdit}>Edit Profile Info</Button>
      <Button variant="secondary" onClick={onViewAll}>View All Profiles</Button>
    </div>
    {notification && <Notification message={message} onClose={onClickToast} />}
  </div>
);

export default Profile;
