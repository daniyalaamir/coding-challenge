import {
  List,
  X,
  Check2Circle,
  ArrowLeftShort
} from 'react-bootstrap-icons';

const icons = {
  List,
  X,
  Check2Circle,
  ArrowLeftShort,
};

const Icon = ({ name, size = 20, color = 'currentColor', ...props }) => {
  const Component = icons[name];
  return Component ? <Component size={size} color={color} {...props} /> : null;
};

export default Icon;
