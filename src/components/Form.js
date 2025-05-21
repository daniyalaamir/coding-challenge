import Button from './Button';
import Icon from './Icon';

const Form = ({
  title = 'Form',
  description = '',
  fields = [],
  values = {},
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  disabled = false,
  errors = {},
  onChange = () => {},
  onClear = () => {},
  onSubmit = () => {},
  onCancel = () => {}
}) => (
  <div className="modal-overlay">
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-header">
        <h3 className="modal-title" id="modal-title">{title}</h3>
        <Button className="close-button" aria-label="Close modal" onClick={onCancel}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      <div className="modal-body">
        {description && <p className="modal-description">{description}</p>}
        {fields.map(({ name, label, required = false, type = 'text' }) => (
          <div key={name} className="input-wrapper">
            <label htmlFor={`${name}-input`}>{label}{required && '*'}</label>
            <div className="input-container">
              <input
                id={`${name}-input`}
                name={name}
                type={type}
                value={values[name] || ''}
                onChange={(e) => onChange(name, e.target.value)}
                className={errors[name] ? 'error' : ''}
                aria-describedby={`${name}-error`}
                aria-invalid={!!errors[name]}
                placeholder={`Enter your ${label.toLowerCase()}`}
              />
              {values[name] && (
                <Button
                  className={`clear-input ${errors[name] ? 'error' : ''}`}
                  aria-label={`Clear ${name} input`}
                  onClick={() => onClear(name)}
                >
                  <Icon name="X" size={25} />
                </Button>
              )}
            </div>
            {errors[name] && (
              <div id={`${name}-error`} className="input-error">
                {errors[name]}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <Button variant="default" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={disabled}>
          {submitLabel}
        </Button>
      </div>
    </div>
  </div>
);

export default Form;
