import { gql } from '@apollo/client'

export const REGISTER_CUSTOMER = gql`
  mutation CreateCustomer($input: CustomerRegistrationData) {
    createCustomer(customerData: $input) {
      customerName
      customerId
    }
  }
`

export const LOGIN_CUSTOMER = gql`
  query LoginCustomerToBank($input: CustomerLoginData) {
    loginCustomer(customerData: $input) {
      customerId
      customerName
      AccessToken
      isNewUser
    }
  }
`

export const RESET_PASSWORD = gql`
  query ResetPassword($input: PasswordResetData) {
    resetPassword(customerData: $input) {
      message
    }
  }
`

export const GET_CUSTOMER_DETAILS = gql`
  query GetCustomerDetails($customerId: String) {
    getCustomerDetails(customerId: $customerId) {
      customerId
      customerEmail
      customerMob
      customerName
      dateOfBirth
      genderType
      fathersName
      mothersName
      occupation
      income
      panNumber
      aadharNumber
      addressLine1
      addressLine2
      city
      pincode
      state
      country
    }
  }
`

export const GET_ACCOUNTS = gql`
  query GetAccounts($customerId: String) {
    getCustomerDetails(customerId: $customerId) {
      customerName
    }
    getAccounts(customerId: $customerId) {
      accountNumber
      accountType
      availableBalance
      activeDebitCard
      validFrom
      validTo
      cvvNumber
      notifications {
        code
        message
      }
    }
  }
`

export const GET_ALL_ACCOUNTS_AND_BENEFICIARIES = gql`
  query GetAccounts($customerId: String) {
    getAccounts(customerId: $customerId) {
      accountNumber
      availableBalance
    }
    getAllBeneficiaries(customerId: $customerId) {
      beneficiaryName
      accountNumber
    }
  }
`

export const OPEN_NEW_SAVING_ACCOUNT = gql`
  mutation OpenNewAccount($input: AccountOpeningData) {
    openNewAccount(accountData: $input) {
      accountNumber
    }
  }
`

export const GET_CREDIT_CARDS = gql`
  query GetCards($customerId: String) {
    getCustomerDetails(customerId: $customerId) {
      customerName
    }
    getCreditCards(customerId: $customerId) {
      creditCardType
      cardholderId
      creditCardNumber
      validFrom
      validTo
      cvvNumber
      availableLimit
      outstandingAmount
      dueDate
      notifications {
        code
        message
      }
    }
    getAccounts(customerId: $customerId) {
      activeDebitCard
      validFrom
      validTo
      cvvNumber
    }
  }
`

export const APPLY_FOR_NEW_CREDIT_CARD = gql`
  mutation IssueNewCreditCard($input: CreditCardApplicationData) {
    issueNewCreditCard(creditCardData: $input) {
      creditCardNumber
    }
  }
`

export const TRANSFER_MONEY = gql`
  mutation TransferMoney($input: TransactionDetail) {
    transferMoney(transactionDetails: $input)
  }
`

export const FETCH_TRANSACTIONS = gql`
  query GetTransactions($input: FetchTransactionData) {
    getTransactions(filterData: $input) {
      totalRowCount
      transactions {
        transactionDate
        transactionRemark
        transactionAmount
        transactionType
        closingBalance
      }
    }
  }
`

export const ADD_PAYEE = gql`
  mutation AddBeneficiary($input: BeneficiaryDetails) {
    addBeneficiary(beneficiaryDetails: $input)
  }
`
