import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

// TODO: still not working, need to see back and implemented it
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
      return { invalidDomain: true }; // wrong domain
    } else {
      return null; // valid domain
    }
  }
  console.log('3');

  return null;
}

export function checkMajorityValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control) return { notMajor: true };
  else {
    const birthday = control.value;
    const majority = 18 * 365 * 24 * 60 * 60 * 1000; // 18 years old in milliseconds
    const birthdayInMilliseconds = new Date(birthday).getTime();
    const result = Date.now() - birthdayInMilliseconds;
    return result >= majority ? null : { notMajor: true };
  }
}
