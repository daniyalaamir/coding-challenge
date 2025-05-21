import Button from './Button';
import Icon from './Icon';

function Header() {
  return (
    <header className="header">
      <div className="avatar">FL</div>
      <h1>PAR Excellence</h1>
      <Button className="menu-button" aria-label="Open menu">
        <Icon name="List" size={27} />
      </Button>
    </header>
  );
}

export default Header;
