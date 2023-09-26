import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

// TODO: still not worker, need to see back and implemented it
export function emailDomainValidator(
  control: AbstractControl
): ValidationErrors | null {
  const email = control.value as string;
  if (email) {
    const domain = email.substring(email.lastIndexOf('@') + 1); // Récupérer le domaine de l'email
    console.log('domain', domain);

    if (
      domain.toLowerCase() === 'gmail.com' ||
      domain.toLowerCase() === '.fr' ||
      domain.toLowerCase() === '.com' ||
      domain.toLowerCase() === '.org'
    ) {
      return { invalidDomain: true }; // Le domaine n'est pas valide
    } else {
      return null; // Le domaine est valide
    }
  }
  console.log('3');

  return null;
}
