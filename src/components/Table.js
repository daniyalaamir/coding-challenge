import Button from './Button';
import Icon from './Icon';

const Table = ({ profiles, currentProfile, onBack }) => (
  <div className="profile-table">
    <h2>All Profiles</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Username</th>
        </tr>
      </thead>
      <tbody>
        {[currentProfile, ...profiles.filter(
          p => p.name !== currentProfile.name || p.username !== currentProfile.username
        )].map((p, i) => (
          <tr key={i}><td>{p.name}</td><td>{p.username}</td></tr>
        ))}
      </tbody>
    </table>
    <Button className="back-button" onClick={onBack}>
      <Icon name="ArrowLeftShort" size={27} /> Back to My Profile
    </Button>
  </div>
);

export default Table;