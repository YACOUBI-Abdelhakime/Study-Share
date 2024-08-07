// Function to validate the name
export function validateName(name: string): boolean {
  if (!name) {
    return false;
  }
  return name.length >= 3;
}

// Function to validate the date
export function validateDate(date: Date): boolean {
  if (new Date(date).toDateString() === new Date().toDateString()) {
    return false;
  }
  if (new Date(date).getFullYear() + 6 > new Date().getFullYear()) {
    return false;
  }
  return true;
}

// Function to validate the email
export function validateEmail(email: string): boolean {
  if (!email) {
    return false;
  }
  // Use a regular expression to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
}

// Function to validate the password
export function validatePassword(password: string): boolean {
  if (!password) {
    return false;
  }

  if (password.length < 8) {
    return false;
  }
  return true;
}

// Function to validate the password confirmation
export function validatePasswordConfirmation(
  password: string,
  confirmation: string
): boolean {
  if (!confirmation) {
    return false;
  }

  if (password === confirmation) {
    return true;
  }
  return false;
}
