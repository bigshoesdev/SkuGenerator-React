export function errorHandler(errors) {
    if (errors) {
      errors = Object.values(errors);
    } else {
      errors = ['There is a network connection error.'];
    }
  
    return errors = errors.join('<br/> ');
}