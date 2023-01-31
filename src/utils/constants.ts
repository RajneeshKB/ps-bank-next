export const PAGES = [
  { label: 'Accounts', href: '/ps-bank/account-dashboard' },
  { label: 'Cards', href: '/ps-bank/card-dashboard' },
  { label: 'Payments', href: '/ps-bank/payments' },
  { label: 'Apply', href: '/ps-bank/apply' },
]
export const TRANSFER_MONEY_ROUTE = 'transfer-money'
export const PAY_CARD_ROUTE = 'pay-card'
export const ID_OCCUPATION = 'occupation'
export const ID_INCOME = 'income'
export const ID_COUNTRY = 'country'
export const SAVING_ACCOUNT_TYPE = 'savingAccountType'
export const CREDIT_CARD_TYPE = 'creditCardType'
export const GENDER_TYPE = 'genderType'
export const RELATIONSHIP = 'relationship'
export const PAYMENT_METHOD = 'paymentMethod'
export const PRIMARY_APPLICANT = 'saving/primary_applicant'
export const JOINT_APPLICANT = 'saving/joint_applicant'
export const NOMINEE = 'saving/nominee'
export const PAYMENT = 'saving/payment'
export const BANK_ACCOUNT = 'selectedAccount'
export const BANK_TRANSACTION_LIST = 'transactionListFilterOption'
export const TRANSACTION_PAGE_SIZE = 10

export type ControlValues = {
  id: string
  label: string
  value: string
}
const GENDER_TYPE_VALUE: ControlValues[] = [
  { id: '1', label: 'Male', value: 'male' },
  { id: '2', label: 'Female', value: 'female' },
]
const RELATIONSHIP_VALUES: ControlValues[] = [
  { id: '1', label: 'Father', value: 'father' },
  { id: '2', label: 'Mother', value: 'mother' },
  { id: '3', label: 'Spouse', value: 'spouse' },
  { id: '4', label: 'Brother', value: 'brother' },
  { id: '5', label: 'Sister', value: 'sister' },
  { id: '7', label: 'Son', value: 'son' },
  { id: '8', label: 'Daughter', value: 'daughter' },
  { id: '6', label: 'Gaurdian', value: 'gaurdian' },
]

export const USER_REGISTRATION_CONTROL_VALUES: {
  [key: string]: ControlValues[]
} = {
  [GENDER_TYPE]: GENDER_TYPE_VALUE,
  [ID_OCCUPATION]: [
    {
      id: '1',
      label: 'Student',
      value: 'student',
    },
    { id: '2', label: 'Housewife', value: 'housewife' },
    { id: '3', label: 'Salaried', value: 'salaried' },
    { id: '4', label: 'Business', value: 'business' },
    { id: '5', label: 'Retired/Senior citizen', value: 'retired' },
  ],
  [ID_INCOME]: [
    { id: '1', label: '0-5,00,000', value: 'upto_5' },
    { id: '2', label: '5,00,000-10,00,000', value: '5_to_10' },
    { id: '3', label: '10,00,000-20,00,000', value: '10_to_20' },
    { id: '4', label: '> 20,00,000', value: 'more_than_20' },
  ],
  [ID_COUNTRY]: [{ id: '1', label: 'India', value: 'india' }],
}
export const SAVING_ACCOUNT_OPENING_CONTROL_VALUES: {
  [key: string]: ControlValues[]
} = {
  [SAVING_ACCOUNT_TYPE]: [
    { id: '1', label: 'Regular', value: 'regular' },
    { id: '2', label: 'Premium', value: 'premium' },
  ],
  [GENDER_TYPE]: GENDER_TYPE_VALUE,
  ...USER_REGISTRATION_CONTROL_VALUES,
  [`joint_${RELATIONSHIP}`]: RELATIONSHIP_VALUES,
  [`joint_${GENDER_TYPE}`]: GENDER_TYPE_VALUE,
  [`joint_${ID_OCCUPATION}`]: USER_REGISTRATION_CONTROL_VALUES[ID_OCCUPATION],
  [`joint_${ID_INCOME}`]: USER_REGISTRATION_CONTROL_VALUES[ID_INCOME],
  [`joint_${ID_COUNTRY}`]: USER_REGISTRATION_CONTROL_VALUES[ID_COUNTRY],
  [`nominee_${RELATIONSHIP}`]: RELATIONSHIP_VALUES,
  [`nominee_${GENDER_TYPE}`]: GENDER_TYPE_VALUE,
  [PAYMENT_METHOD]: [
    { id: '1', label: 'Cheque', value: 'cheque' },
    { id: '2', label: 'Debit / Credit Card', value: 'card' },
    { id: '3', label: 'Net Banking', value: 'netbanking' },
    { id: '4', label: 'UPI', value: 'upi' },
  ],
}
export const CREDIT_CARD_APPLY_CONTROL_VALUES: {
  [key: string]: ControlValues[]
} = {
  [CREDIT_CARD_TYPE]: [
    { id: '1', label: 'Gold', value: 'gold' },
    { id: '2', label: 'Platinum', value: 'platinum' },
  ],
  [GENDER_TYPE]: GENDER_TYPE_VALUE,
  ...USER_REGISTRATION_CONTROL_VALUES,
}
export const REGISTRATION_DETAILS_DEFAULT_VALUES = {
  customerName: '',
  dateOfBirth: '',
  [GENDER_TYPE]: '',
  fathersName: '',
  mothersName: '',
  occupation: '',
  income: '',
  panNumber: '',
  aadharNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  pincode: '',
  state: '',
  country: 'india',
}
export const REGISTRATION_BASIC_DEFAULT_VALUES = {
  customerEmail: '',
  customerMob: '',
  customerName: '',
}

export const NEW_SAVING_ACCOUNT_OPEN_STEP = [
  'Primary Applicant Details',
  'Joint Applicant Details',
  'Nominee Details',
  'Payment Details',
]

export const SAVING_ACCOUNT_OPENING_AND_STEPPER_MAP = [
  PRIMARY_APPLICANT,
  JOINT_APPLICANT,
  NOMINEE,
  PAYMENT,
]

export const SAVING_ACCOUNT_OPENING_FORM_DEFAULT_VALUES = {
  [SAVING_ACCOUNT_TYPE]: '',
  customerName: '',
  dateOfBirth: '',
  [GENDER_TYPE]: '',
  customerEmail: '',
  customerMob: '',
  fathersName: '',
  mothersName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  pincode: '',
  state: '',
  [ID_COUNTRY]: 'india',
  [ID_OCCUPATION]: '',
  [ID_INCOME]: '',
  panNumber: '',
  aadharNumber: '',
  isJointAccount: false,
  joint_customerName: '',
  joint_dateOfBirth: '',
  [`joint_${GENDER_TYPE}`]: '',
  joint_fathersName: '',
  joint_mothersName: '',
  joint_customerEmail: '',
  joint_customerMob: '',
  joint_addressLine1: '',
  joint_addressLine2: '',
  joint_city: '',
  joint_pincode: '',
  joint_state: '',
  [`joint_${ID_COUNTRY}`]: 'india',
  [`joint_${ID_OCCUPATION}`]: '',
  [`joint_${ID_INCOME}`]: '',
  joint_panNumber: '',
  joint_aadharNumber: '',
  [`joint_${RELATIONSHIP}`]: '',
  [`nominee_${RELATIONSHIP}`]: '',
  nominee_customerName: '',
  nominee_dateOfBirth: '',
  [`nominee_${GENDER_TYPE}`]: '',
  nominee_fathersName: '',
  nominee_mothersName: '',
  initialDeposit: '',
  [PAYMENT_METHOD]: '',
}

export const CREDIT_CARD_APPLY_FORM_DEFAULT_VALUES = {
  [CREDIT_CARD_TYPE]: '',
  customerName: '',
  dateOfBirth: '',
  [GENDER_TYPE]: '',
  customerEmail: '',
  customerMob: '',
  fathersName: '',
  mothersName: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  pincode: '',
  state: '',
  [ID_COUNTRY]: 'india',
  [ID_OCCUPATION]: '',
  [ID_INCOME]: '',
  panNumber: '',
  aadharNumber: '',
}

export const getTransactionFilterFormControlValues = (accountInputs: any[]) => {
  return {
    [BANK_ACCOUNT]: accountInputs.map(({ accountNumber }, index) => ({
      id: `${index + 1}`,
      label: accountNumber,
      value: accountNumber,
    })),
    [BANK_TRANSACTION_LIST]: [
      { id: '1', label: 'View last 10 transactions', value: 'last10' },
      { id: '2', label: 'View by date range', value: 'dateRange' },
    ],
  }
}

export const TRANSACTION_FILTER_FORM_DEFAULT_VALUES = {
  [BANK_ACCOUNT]: '',
  [BANK_TRANSACTION_LIST]: '',
  fromDate: '',
  toDate: '',
}
