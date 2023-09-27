import { AbstractControl, ValidationErrors } from '@angular/forms';

// Check validation and domain of the email adress
export function customEmailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const email: string = control.value;
  if (!email.includes('@')) return { invalidAdress: true };
  const domain = email.substring(email.lastIndexOf('@') + 1); // take domain
  if (domain.length) {
    if (
      domain.toLowerCase() === 'gmail.com' ||
      domain.toLowerCase() === '.fr' ||
      domain.toLowerCase() === '.com' ||
      domain.toLowerCase() === '.org'
    ) {
      return null;
    } else {
      return { invalidDomain: true };
    }
  }
  return { invalidAdress: true };
}

export function majorityCheckValidator(
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

export function passwordMatchingCheckValidator(
  control1: AbstractControl,
  control2: AbstractControl
): ValidationErrors | null {
  if (!control1 && !control2) return null;
  else {
    const password = control1.value;
    const passwordConfirmation = control2.value;
    password !== passwordConfirmation ? { notMatchingPasswords: true } : null;
  }
  return null;
}
