import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { useMutation, useQuery } from '@apollo/client'
import { Typography } from '@mui/material'
import {
  CREDIT_CARD_APPLY_CONTROL_VALUES,
  CREDIT_CARD_APPLY_FORM,
  CREDIT_CARD_APPLY_FORM_DEFAULT_VALUES,
} from '../../../utils'
import { MultiLevelFormBuilder } from '../MultiLevelFormBuilder'
import { useBankContext } from '../../../context'
import {
  GET_CUSTOMER_DETAILS,
  APPLY_FOR_NEW_CREDIT_CARD,
  GET_CREDIT_CARDS,
} from '../../../graphql/queries'
import { ViewLoader } from '../../atoms/ViewLoader'

interface ICreditCardApplicationProps {
  onApplicationCompletion: (arg: string) => void
}
const CreditCardApplication: FC<ICreditCardApplicationProps> = ({
  onApplicationCompletion,
}) => {
  const { control, handleSubmit, reset }: any = useForm({
    defaultValues: CREDIT_CARD_APPLY_FORM_DEFAULT_VALUES,
    mode: 'onBlur',
  })
  const {
    state: {
      loginData: { customerId },
    },
  } = useBankContext()

  const { loading, error } = useQuery(GET_CUSTOMER_DETAILS, {
    variables: { customerId },
    onCompleted: (response) => {
      reset({
        ...CREDIT_CARD_APPLY_FORM_DEFAULT_VALUES,
        ...response?.getCustomerDetails,
        dateOfBirth: dayjs(+response.getCustomerDetails.dateOfBirth),
      })
    },
  })
  const [applyForNewCreditCard, { loading: openingAccount }] = useMutation(
    APPLY_FOR_NEW_CREDIT_CARD,
    {
      refetchQueries: [{ query: GET_CREDIT_CARDS, variables: { customerId } }],
    }
  )

  const applyForCreditCard = (stepData: any) => {
    applyForNewCreditCard({
      variables: {
        input: {
          customerId: stepData.customerId,
          creditCardType: stepData.creditCardType,
        },
      },
      onCompleted: () => {
        onApplicationCompletion('SUCCESS')
      },
      onError: () => {
        onApplicationCompletion('ERROR')
      },
    })
  }

  if (loading) {
    return <ViewLoader label="Preparing form with customer details" />
  }
  if (openingAccount) {
    return (
      <ViewLoader label="Credit card application in progress, please wait!" />
    )
  }
  if (error) {
    return <Typography variant="h4">Error occured</Typography>
  }

  return (
    <MultiLevelFormBuilder
      formControls={CREDIT_CARD_APPLY_FORM}
      controlHook={control}
      controlValues={CREDIT_CARD_APPLY_CONTROL_VALUES}
      submitHandler={handleSubmit(applyForCreditCard)}
    />
  )
}

export default CreditCardApplication
