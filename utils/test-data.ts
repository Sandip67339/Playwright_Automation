export const USERS = {
  standard: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  lockedOut: {
    username: process.env.LOCKED_USER || 'locked_out_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  problem: {
    username: process.env.PROBLEM_USER || 'problem_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  performance: {
    username: process.env.PERFORMANCE_USER || 'performance_glitch_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
} as const;

export const CHECKOUT_DATA = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  empty: {
    firstName: '',
    lastName: '',
    postalCode: '',
  },
  partial: {
    firstName: 'Jane',
    lastName: '',
    postalCode: '',
  },
} as const;

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  allTheThings: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const SORT_OPTIONS = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
} as const;

export const ERROR_MESSAGES = {
  lockedOut: 'Sorry, this user has been locked out.',
  invalidCredentials: 'Username and password do not match any user in this service',
  usernameRequired: 'Username is required',
  passwordRequired: 'Password is required',
  firstNameRequired: 'First Name is required',
  lastNameRequired: 'Last Name is required',
  postalCodeRequired: 'Postal Code is required',
} as const;

export const API_DATA = {
  baseUrl: process.env.API_BASE_URL || 'https://reqres.in/api',
  validLoginEmail: 'eve.holt@reqres.in',
  validLoginPassword: 'cityslicka',
  validRegisterPassword: 'pistol',
  invalidEmail: 'peter@klaven',
  newUser: {
    name: 'John Doe',
    job: 'QA Engineer',
  },
  updatedUser: {
    name: 'Jane Doe',
    job: 'Senior QA Engineer',
  },
} as const;
