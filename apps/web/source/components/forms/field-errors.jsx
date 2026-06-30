const createFieldError = (error) => <li key={crypto.randomUUID()}>{error}</li>;

export const FieldErrors = ({ errors }) => <ul>{errors.map(createFieldError)}</ul>;

const getFieldError = ({ errors: [error] }) => error;

export const getFieldErrors = ({ properties = {} }) => Object.values(properties).map(getFieldError);
