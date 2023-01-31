import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLazyQuery, useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import { Typography } from '@mui/material'
import {
  GENDER_TYPE,
  getItemFromSession,
  ID_COUNTRY,
  ID_INCOME,
  ID_OCCUPATION,
  IS_BROWSER,
  NEW_SAVING_ACCOUNT_OPEN_STEP,
  RELATIONSHIP,
  SAVING_ACCOUNT_OPENING_AND_STEPPER_MAP,
  SAVING_ACCOUNT_OPENING_CONTROL_VALUES,
  SAVING_ACCOUNT_OPENING_FORM,
  SAVING_ACCOUNT_OPENING_FORM_DEFAULT_VALUES,
} from '../../../utils'
import { MultiLevelFormBuilder } from '../MultiLevelFormBuilder'
import { useBankContext } from '../../../context'
import {
  GET_ACCOUNTS,
  GET_CUSTOMER_DETAILS,
  OPEN_NEW_SAVING_ACCOUNT,
} from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'

interface ISavingAccountOpenFormProps {
  activeStep: number
  stepNavigationHandler: (_arg: string, _arg2?: any) => void
}

const SavingAccountOpenForm: FC<ISavingAccountOpenFormProps> = ({
  activeStep,
  stepNavigationHandler,
}) => {
  const accountOpeningFormDataInSession =
    getItemFromSession('accountOpeningFormData') || {}
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()
  const [getCustomerDetails, { loading, error }] =
    useLazyQuery(GET_CUSTOMER_DETAILS)
  const [openNewSavingAccount, { loading: openingAccount }] = useMutation(
    OPEN_NEW_SAVING_ACCOUNT,
    {
      refetchQueries: [{ query: GET_ACCOUNTS, variables: { customerId } }],
    }
  )

  const { control, handleSubmit, reset }: any = useForm({
    defaultValues: SAVING_ACCOUNT_OPENING_FORM_DEFAULT_VALUES,
    mode: 'onBlur',
  })

  useEffect(() => {
    if (!accountOpeningFormDataInSession?.customerName && activeStep === 0) {
      getCustomerDetails({
        variables: { customerId },
        onCompleted: (response) => {
          reset({
            ...SAVING_ACCOUNT_OPENING_FORM_DEFAULT_VALUES,
            ...response?.getCustomerDetails,
            dateOfBirth: dayjs(+response.getCustomerDetails.dateOfBirth),
          })
        },
      })
    } else {
      reset({ ...accountOpeningFormDataInSession })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  const updateSavingFormDataAndStep = (stepData: any) => {
    const updatedData = {
      ...accountOpeningFormDataInSession,
      ...stepData,
    }
    // eslint-disable-next-line no-underscore-dangle
    delete updatedData.__typename

    if (IS_BROWSER) {
      sessionStorage.setItem(
        'accountOpeningFormData',
        JSON.stringify(updatedData)
      )
    }
    if (SAVING_ACCOUNT_OPENING_AND_STEPPER_MAP.length - 1 === activeStep) {
      const finalFormData = getItemFromSession('accountOpeningFormData') || {}
      if (finalFormData?.initialDeposit) {
        finalFormData.initialDeposit = `${finalFormData.initialDeposit}`
      }
      openNewSavingAccount({
        variables: {
          input: finalFormData,
        },
        onCompleted: () => {
          if (IS_BROWSER) {
            sessionStorage.removeItem('accountOpeningFormData')
            sessionStorage.removeItem('activeStep')
            stepNavigationHandler('SUCCESS')
          }
        },
        onError: () => {
          stepNavigationHandler('ERROR')
        },
      })
    } else {
      let nextStep = 'NEXT'
      if (activeStep === 0 && !stepData.isJointAccount) {
        if (accountOpeningFormDataInSession.joint_customerName) {
          const newFormData = {
            ...accountOpeningFormDataInSession,
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
            [`joint_${ID_COUNTRY}`]: '',
            [`joint_${ID_OCCUPATION}`]: '',
            [`joint_${ID_INCOME}`]: '',
            joint_panNumber: '',
            joint_aadharNumber: '',
            [`joint_${RELATIONSHIP}`]: '',
          }
          if (IS_BROWSER) {
            sessionStorage.setItem(
              'accountOpeningFormData',
              JSON.stringify(newFormData)
            )
          }
        }
        nextStep = 'SKIP_NEXT'
      }

      stepNavigationHandler(nextStep)
    }
  }

  const secondaryButtonClickHandler = () => {
    stepNavigationHandler(
      activeStep === 2 && !accountOpeningFormDataInSession.isJointAccount
        ? 'SKIP_PREV'
        : 'PREV'
    )
  }

  if (loading) {
    return <ViewLoader label="Preparing form with customer details" />
  }
  if (openingAccount) {
    return <ViewLoader label="Opening you new account, please wait!" />
  }
  if (error) {
    return <Typography variant="h4">Error occured</Typography>
  }

  const formControls =
    SAVING_ACCOUNT_OPENING_FORM[
      SAVING_ACCOUNT_OPENING_AND_STEPPER_MAP[activeStep]
    ]
  if (
    activeStep === 3 &&
    accountOpeningFormDataInSession?.savingAccountType === 'premium'
  ) {
    formControls.PAYMENT_DETAILS[0].validation = {
      ...formControls.PAYMENT_DETAILS[0].validation,
      min: { value: 10000, message: 'invalid amount' },
    }
  }
  return (
    <MultiLevelFormBuilder
      formControls={formControls}
      activeStep={activeStep}
      totalStepsCount={NEW_SAVING_ACCOUNT_OPEN_STEP.length}
      controlHook={control}
      controlValues={SAVING_ACCOUNT_OPENING_CONTROL_VALUES}
      submitHandler={handleSubmit(updateSavingFormDataAndStep)}
      secondaryButtonHandler={secondaryButtonClickHandler}
    />
  )
}

export default SavingAccountOpenForm
