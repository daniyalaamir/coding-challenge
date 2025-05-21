import Icon from './Icon';

const Notification = ({ message, onClose }) => (
  <div className="toast success" role="alert">
    <div>
      <Icon 
        name="Check2Circle" 
        color="#109E00" 
        size={20} 
      />
      <span>{message}</span>
    </div>
    <Icon 
      name="X" 
      size={20} 
      color="#000000" 
      onClick={onClose} 
    />
  </div>
);

export default Notification;