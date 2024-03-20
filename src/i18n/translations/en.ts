const language = {
  language: 'Language',
  english: 'English',
  vietnamese: 'Vietnamese',
  korean: 'Korean',
};

const error = {
  'required-error-message': 'This field is required',
  'password-pattern-error-message':
    'Minimum 8 characters, including letters and numbers',
  'password-not-matching-error-message': 'Passwords do not match',
  passwordInvalid:
    'Password must be at least 8 characters and contain both letters and numbers',
  userNameInvalid:
    'Username should be 6 to 20 characters long, without spaces and special characters',
  emailInvalid: 'Invalid email',
  phoneNumberInvalid: 'Invalid phone number',
};

export const en = {
  userOrEmail: 'Username or Email',
  password: 'Password',
  signIn: 'Login',
  promptNoAccount: "You don't have an account",
  signUpNow: 'Sign Up Now',
  signUp: 'Register',
  fullName: 'Full Name',
  userName: 'Username',
  email: 'Email Address',
  phoneNumber: 'Phone Number',

  loading: 'Loading ...',

  ...language,
  ...error,
  key: 'Key',
};
