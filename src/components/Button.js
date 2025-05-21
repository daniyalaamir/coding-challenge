const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  className = '', 
  type = 'button',
  ariaLabel 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variant} ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
