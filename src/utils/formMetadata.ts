import { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import {
  BANK_ACCOUNT,
  BANK_TRANSACTION_LIST,
  CREDIT_CARD_TYPE,
  GENDER_TYPE,
  ID_COUNTRY,
  ID_INCOME,
  ID_OCCUPATION,
  JOINT_APPLICANT,
  NOMINEE,
  PAYMENT,
  PAYMENT_METHOD,
  PRIMARY_APPLICANT,
  RELATIONSHIP,
  SAVING_ACCOUNT_TYPE,
} from './constants'

export type FormMetaData = {
  id: string
  name: any
  label: string
  type: string
  subCategory?: string
  placeholder?: string
  minDateRange?: string
  maxDateRange?: string
  required: boolean
  disabled?: boolean
  halfWidth?: boolean
  rowOrientation?: boolean
  watchField?: string
  watchValue?: any
  validation: {}
}
type AddressType = {
  addressLine1: string
  addressLine2?: string
  city: string
  pincode: string
  state: string
  country: string
}
export interface IRegistrationInputs extends AddressType {
  customerName: string
  dateOfBirth: string
  [GENDER_TYPE]: string
  fathersName: string
  mothersName: string
  occupation: string
  income: string
  panNumber: string
  aadharNumber: string
}

export type RegistrationBasicInputs = {
  customerEmail: string
  customerMob: string
  customerName: string
}
const USER_ADDRESS: FormMetaData[] = [
  {
    id: 'addressLine1',
    name: 'addressLine1',
    label: 'Address line 1',
    placeholder: 'Address line 1',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'address line 1 is required' },
      pattern: /^[a-zA-Z]{1}[a-zA-Z0-9 ]*$/,
      maxLength: { value: 25, message: 'maximum 25 characters allowed' },
      minLength: { value: 5, message: 'minimum 5 characters allowed' },
    },
  },
  {
    id: 'addressLine2',
    name: 'addressLine2',
    label: 'Address line 2',
    placeholder: 'Address line 2',
    required: false,
    type: 'text',
    subCategory: '',
    validation: {
      pattern: /^[a-zA-Z]{1}[a-zA-Z0-9 ]*$/,
      maxLength: { value: 25, message: 'maximum 25 characters allowed' },
    },
  },
  {
    id: 'city',
    name: 'city',
    label: 'City',
    placeholder: 'City',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'city is required' },
      pattern: /^[a-zA-Z]{1}[a-zA-Z ]*$/,
      maxLength: { value: 20, message: 'maximum 25 characters allowed' },
      minLength: { value: 2, message: 'minimum 2 characters allowed' },
    },
  },
  {
    id: 'pincode',
    name: 'pincode',
    label: 'Pincode',
    placeholder: 'Pincode',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'pincode is required' },
      pattern: { value: /^\d{6}$/, message: 'invalid pincode' },
      maxLength: { value: 6, message: 'maximum 6 characters allowed' },
      minLength: { value: 6, message: 'minimum 6 characters allowed' },
    },
  },
  {
    id: 'state',
    name: 'state',
    label: 'State',
    placeholder: 'State',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'state is required' },
      pattern: /^[a-zA-Z]{1}[a-zA-Z ]*$/,
      maxLength: { value: 20, message: 'maximum 25 characters allowed' },
      minLength: { value: 2, message: 'minimum 2 characters allowed' },
    },
  },
  {
    id: ID_COUNTRY,
    name: ID_COUNTRY,
    label: 'Country',
    placeholder: '',
    required: true,
    type: 'select',
    subCategory: '',
    validation: {
      required: { value: true, message: 'country is required' },
    },
    disabled: true,
  },
]
const USER_INCOME_DETAILS: FormMetaData[] = [
  {
    id: ID_OCCUPATION,
    name: ID_OCCUPATION,
    label: 'Occupation',
    placeholder: '',
    required: true,
    type: 'select',
    subCategory: '',
    validation: {
      required: { value: true, message: 'occupation is required' },
    },
  },
  {
    id: ID_INCOME,
    name: ID_INCOME,
    label: 'Income',
    placeholder: '',
    required: true,
    type: 'radioGroup',
    subCategory: '',
    validation: {
      required: { value: true, message: 'income is required' },
    },
  },
]
const USER_KYC_DETAILS: FormMetaData[] = [
  {
    id: 'panNumber',
    name: 'panNumber',
    label: 'PAN number',
    placeholder: 'PAN number',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'pan number is required' },
      pattern: {
        value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
        message: 'invalid pan number',
      },
    },
  },
  {
    id: 'aadharNumber',
    name: 'aadharNumber',
    label: 'Aadhar number',
    placeholder: 'Aadhar number',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'aadhar number is required' },
      pattern: { value: /^\d{16}$/, message: 'aadhar number not valid' },
      minLength: { value: 16, message: 'aadhar number not valid' },
      maxLength: { value: 16, message: 'aadhar number not valid' },
    },
  },
]
const SAVING_ACCOUNT_TYPE_CONTROL: FormMetaData[] = [
  {
    id: SAVING_ACCOUNT_TYPE,
    name: SAVING_ACCOUNT_TYPE,
    label: 'Account type',
    required: true,
    type: 'radioGroup',
    rowOrientation: true,
    halfWidth: true,
    validation: {
      required: { value: true, message: 'account type is required' },
    },
  },
  {
    id: 'isJointAccount',
    name: 'isJointAccount',
    label: 'Joint Account',
    required: false,
    type: 'checkbox',
    halfWidth: true,
    validation: {},
  },
]
const CREDIT_CARD_TYPE_CONTROL: FormMetaData[] = [
  {
    id: CREDIT_CARD_TYPE,
    name: CREDIT_CARD_TYPE,
    label: 'Credit Card type',
    required: true,
    type: 'radioGroup',
    rowOrientation: true,
    halfWidth: true,
    validation: {
      required: { value: true, message: 'credit card type is required' },
    },
  },
]
const USER_BIOLOGICAL_DETAILS: FormMetaData[] = [
  {
    id: 'customerName',
    name: 'customerName',
    label: 'Your Full Name',
    placeholder: 'Your Full Name',
    required: true,
    type: 'text',
    validation: {
      required: { value: true, message: 'name is required' },
      maxLength: { value: 25, message: 'maximum 25 characters allowed' },
      minLength: { value: 4, message: 'minimum 4 characters is required' },
    },
  },
  {
    id: 'dateOfBirth',
    name: 'dateOfBirth',
    label: 'Date of birth',
    required: true,
    type: 'date',
    minDateRange: dayjs().subtract(80, 'year').toISOString(),
    maxDateRange: dayjs().subtract(18, 'year').toISOString(),
    validation: {
      required: { value: true, message: 'date of birth is required' },
    },
  },
  {
    id: 'fathersName',
    name: 'fathersName',
    label: "Father's Name",
    placeholder: "Father's Name",
    required: true,
    type: 'text',
    validation: {
      required: { value: true, message: 'name is required' },
      maxLength: { value: 25, message: 'maximum 25 characters allowed' },
      minLength: { value: 4, message: 'minimum 4 characters is required' },
    },
  },
  {
    id: 'mothersName',
    name: 'mothersName',
    label: "Mother's maiden Name",
    placeholder: "Mother's maiden Name",
    required: true,
    type: 'text',
    validation: {
      required: { value: true, message: 'name is required' },
      maxLength: { value: 25, message: 'maximum 25 characters allowed' },
      minLength: { value: 4, message: 'minimum 4 characters is required' },
    },
  },
  {
    id: 'customerMob',
    name: 'customerMob',
    label: 'Mobile number',
    placeholder: 'Mobile number',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'mobile number is required' },
      pattern: {
        value: /^[7-9]{1}[0-9]{9}$/,
        message: 'invalid mobile number',
      },
    },
  },
  {
    id: 'customerEmail',
    name: 'customerEmail',
    label: 'Email',
    placeholder: 'Email',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'email is required' },
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        message: 'invalid email',
      },
    },
  },
  {
    id: GENDER_TYPE,
    name: GENDER_TYPE,
    label: 'Gender',
    required: true,
    type: 'radioGroup',
    rowOrientation: true,
    validation: {
      required: { value: true, message: 'gender is required' },
    },
  },
]
const USER_RELATIONSHIP_CONTROL: FormMetaData[] = [
  {
    id: RELATIONSHIP,
    name: RELATIONSHIP,
    label: 'Relationship with Primary Applicant',
    placeholder: '',
    required: true,
    type: 'select',
    subCategory: '',
    validation: {
      required: { value: true, message: 'relationship is required' },
    },
  },
]
export const USER_REGISTRATION_BASIC: FormMetaData[] = [
  {
    id: 'customerName',
    name: 'customerName',
    label: 'Your Full Name',
    placeholder: 'Your Full Name',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'name is required' },
      maxLength: { value: 25, message: 'maximum 25 characters allowed' },
      minLength: { value: 4, message: 'minimum 4 characters is required' },
    },
  },
  {
    id: 'customerMob',
    name: 'customerMob',
    label: 'Mobile number',
    placeholder: 'Mobile number',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'mobile number is required' },
      pattern: {
        value: /^[7-9]{1}[0-9]{9}$/,
        message: 'invalid mobile number',
      },
    },
  },
  {
    id: 'customerEmail',
    name: 'customerEmail',
    label: 'Email',
    placeholder: 'Email',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'email is required' },
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
        message: 'invalid email',
      },
    },
  },
]

export const USER_REGISTRATION_DETAILS: FormMetaData[] = [
  ...USER_BIOLOGICAL_DETAILS,
  ...USER_INCOME_DETAILS,
  ...USER_KYC_DETAILS,
  ...USER_ADDRESS,
]

export const LOGIN_FORM: FormMetaData[] = [
  {
    id: 'customerId',
    name: 'customerId',
    label: 'Customer Id',
    placeholder: 'Customer Id',
    required: true,
    type: 'text',
    subCategory: '',
    validation: {
      required: { value: true, message: 'customer Id is required' },
    },
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    required: true,
    type: 'text',
    subCategory: 'password',
    validation: {
      required: { value: true, message: 'password is required' },
    },
  },
]

export const PASSWORD_RESET_FORM: FormMetaData[] = [
  {
    id: 'customerId',
    name: 'customerId',
    label: 'Customer Id',
    placeholder: 'Customer Id',
    required: true,
    type: 'text',
    subCategory: '',
    disabled: true,
    validation: {
      required: { value: true, message: 'customer Id is required' },
    },
  },
  {
    id: 'oldPassword',
    name: 'oldPassword',
    label: 'Old Password',
    placeholder: 'Old Password',
    required: true,
    type: 'text',
    subCategory: 'password',
    validation: {
      required: { value: true, message: 'Old password is required' },
    },
  },
  {
    id: 'newPassword',
    name: 'newPassword',
    label: 'New Password',
    placeholder: 'New Password',
    required: true,
    type: 'text',
    subCategory: 'password',
    validation: {
      required: { value: true, message: 'New password is required' },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
        message:
          'password length should be 8-10 characters and must include one numeric, one lowercase, one uppercase and one special character',
      },
    },
  },
]

export const SAVING_ACCOUNT_OPENING_FORM: {
  [key: string]: { [key: string]: FormMetaData[] }
} = {
  [PRIMARY_APPLICANT]: {
    SAVING_ACCOUNT_TYPE: SAVING_ACCOUNT_TYPE_CONTROL,
    PRIMARY_APPLICANT_DETAILS: USER_BIOLOGICAL_DETAILS.map((addSection) => ({
      ...addSection,
      disabled: true,
      halfWidth: true,
    })),
    PRIMARY_APPLICANT_COMMUNICATION: USER_ADDRESS.map((addSection) => ({
      ...addSection,
      disabled: true,
      halfWidth: true,
    })),
    PRIMARY_APPLICANT_INCOME: USER_INCOME_DETAILS.map((addSection) => ({
      ...addSection,
      disabled: true,
      halfWidth: true,
    })),
    PRIMARY_APPLICANT_KYC: USER_KYC_DETAILS.map((addSection) => ({
      ...addSection,
      disabled: true,
      halfWidth: true,
    })),
  },
  [JOINT_APPLICANT]: {
    JOINT_APPLICANT_DETAILS: USER_BIOLOGICAL_DETAILS.map((addSection) => ({
      ...addSection,
      id: `joint_${addSection.id}`,
      name: `joint_${addSection.name}`,
      halfWidth: true,
    })),
    JOINT_APPLICANT_RELATIONSHIP: USER_RELATIONSHIP_CONTROL.map(
      (addSection) => ({
        ...addSection,
        id: `joint_${addSection.id}`,
        name: `joint_${addSection.name}`,
      })
    ),
    JOINT_APPLICANT_COMMUNICATION: USER_ADDRESS.map((addSection) => ({
      ...addSection,
      id: `joint_${addSection.id}`,
      name: `joint_${addSection.name}`,
      halfWidth: true,
    })),
    JOINT_APPLICANT_INCOME: USER_INCOME_DETAILS.map((addSection) => ({
      ...addSection,
      id: `joint_${addSection.id}`,
      name: `joint_${addSection.name}`,
      halfWidth: true,
    })),
    JOINT_APPLICANT_KYC: USER_KYC_DETAILS.map((addSection) => ({
      ...addSection,
      id: `joint_${addSection.id}`,
      name: `joint_${addSection.name}`,
      halfWidth: true,
    })),
  },
  [NOMINEE]: {
    NOMINEE_APPLICANT_DETAILS: USER_BIOLOGICAL_DETAILS.filter((addSection) => {
      if (
        addSection.id === 'customerEmail' ||
        addSection.id === 'customerMob'
      ) {
        return false
      }
      return true
    }).map((sec) => {
      if (sec.id === 'dateOfBirth') {
        return {
          ...sec,
          maxDateRange: dayjs().toISOString(),
          id: `nominee_${sec.id}`,
          name: `nominee_${sec.name}`,
          halfWidth: true,
        }
      }
      return {
        ...sec,
        id: `nominee_${sec.id}`,
        name: `nominee_${sec.name}`,
        halfWidth: true,
      }
    }),
    NOMINEE_APPLICANT_RELATIONSHIP: USER_RELATIONSHIP_CONTROL.map(
      (addSection) => ({
        ...addSection,
        id: `nominee_${addSection.id}`,
        name: `nominee_${addSection.name}`,
      })
    ),
    NOMINEE_APPLICANT_KYC: [
      {
        id: 'nominee_aadharNumber',
        name: 'nominee_aadharNumber',
        label: 'Aadhar number',
        placeholder: 'Aadhar number',
        required: false,
        type: 'text',
        validation: {
          pattern: { value: /^\d{16}$/, message: 'aadhar number not valid' },
        },
      },
    ],
  },
  [PAYMENT]: {
    PAYMENT_DETAILS: [
      {
        id: 'initialDeposit',
        name: 'initialDeposit',
        label: 'Inital Deposit Amount',
        placeholder: 'Inital Deposit Amount',
        required: true,
        type: 'text',
        subCategory: 'number',
        validation: {
          required: { value: true, message: 'initial deposit is required' },
          min: { value: 0, message: 'invalid amount' },
        },
      },
      {
        id: PAYMENT_METHOD,
        name: PAYMENT_METHOD,
        label: 'Payment Method',
        placeholder: '',
        required: true,
        type: 'select',
        subCategory: '',
        validation: {
          required: { value: true, message: 'payment method is required' },
        },
      },
    ],
  },
}

export const CREDIT_CARD_APPLY_FORM: {
  [key: string]: FormMetaData[]
} = {
  CREDIT_CARD_TYPE: CREDIT_CARD_TYPE_CONTROL,
  PRIMARY_APPLICANT_DETAILS: USER_BIOLOGICAL_DETAILS.map((addSection) => ({
    ...addSection,
    disabled: true,
    halfWidth: true,
  })),
  PRIMARY_APPLICANT_COMMUNICATION: USER_ADDRESS.map((addSection) => ({
    ...addSection,
    disabled: true,
    halfWidth: true,
  })),
  PRIMARY_APPLICANT_INCOME: USER_INCOME_DETAILS.map((addSection) => ({
    ...addSection,
    disabled: true,
    halfWidth: true,
  })),
  PRIMARY_APPLICANT_KYC: USER_KYC_DETAILS.map((addSection) => ({
    ...addSection,
    disabled: true,
    halfWidth: true,
  })),
}

export interface ITransactionFilterForm {
  [BANK_ACCOUNT]: string
  [BANK_TRANSACTION_LIST]: string
  fromDate: string
  toDate: string
}
export const TRANSACTION_FILTER_FORM: FormMetaData[] = [
  {
    id: BANK_ACCOUNT,
    name: BANK_ACCOUNT,
    label: 'Select Account',
    placeholder: '',
    required: true,
    type: 'select',
    subCategory: '',
    halfWidth: true,
    validation: {
      required: { value: true, message: 'account is required' },
    },
  },
  {
    id: BANK_TRANSACTION_LIST,
    name: BANK_TRANSACTION_LIST,
    label: 'Transaction range',
    placeholder: '',
    required: true,
    type: 'radioGroup',
    subCategory: '',
    rowOrientation: true,
    halfWidth: true,
    validation: {
      required: { value: true, message: 'filter option is required' },
    },
  },
  {
    id: 'fromDate',
    name: 'fromDate',
    label: 'Date from',
    required: false,
    type: 'date',
    minDateRange: dayjs().subtract(6, 'month').toISOString(),
    maxDateRange: dayjs().toISOString(),
    halfWidth: true,
    watchField: BANK_TRANSACTION_LIST,
    watchValue: 'dateRange',
    validation: {},
  },
  {
    id: 'toDate',
    name: 'toDate',
    label: 'Date to',
    required: false,
    type: 'date',
    minDateRange: dayjs().subtract(6, 'month').toISOString(),
    maxDateRange: dayjs().toISOString(),
    halfWidth: true,
    watchField: BANK_TRANSACTION_LIST,
    watchValue: 'dateRange',
    validation: {},
  },
]

export const ACCOUNT_TRANSACTION_COLUMNS: GridColDef[] = [
  {
    field: 'id',
    headerName: 'S. No.',
    maxWidth: 70,
  },
  { field: 'trDate', headerName: 'Transaction Date', minWidth: 170 },
  {
    field: 'trRemark',
    headerName: 'Transaction Remarks',
    minWidth: 200,
    flex: 0.7,
  },
  {
    field: 'drAmount',
    headerName: 'Amount Debited',
    minWidth: 130,
    type: 'number',
  },
  {
    field: 'crAmount',
    headerName: 'Amount Credited',
    minWidth: 130,
    type: 'number',
  },
  {
    field: 'balance',
    headerName: 'Account Balance',
    minWidth: 130,
    type: 'number',
    flex: 0.3,
  },
]
