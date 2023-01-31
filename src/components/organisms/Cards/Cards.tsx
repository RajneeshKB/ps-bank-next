import React, { FC } from 'react'
import { Box, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { cardsStyles } from './styles'
import { useRouter } from 'next/router'
import { IS_BROWSER } from '@/utils'
import { CardAccordian } from '@/components/molecules/CardsAccordian'

type DebitCard = {
  activeDebitCard: string
  cvvNumber: string
  validFrom: string
  validTo: string
}
type CreditCard = {
  availableLimit: string
  cardholderId: string
  creditCardNumber: string
  creditCardType: string
  cvvNumber: string
  outstandingAmount: string
  validFrom: string
  validTo: string
}
type CardsList = {
  getCustomerDetails: { customerName: string }
  getAccounts: DebitCard[]
  getCreditCards: CreditCard[]
}
interface IAccountsProps {
  cardsList: CardsList
}
const Accounts: FC<IAccountsProps> = ({ cardsList }) => {
  const [showDetails, updateShowDetails] = React.useState(false)
  const router = useRouter()
  const {
    getCustomerDetails: { customerName },
    getAccounts: debitCards,
    getCreditCards: creditCards,
  } = cardsList
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateShowDetails(event.target.checked)
  }

  if (!customerName || (!debitCards?.length && !creditCards.length)) {
    if (IS_BROWSER) router.push('/ps-bank/apply')
    return null
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2" mb="0.5rem">
          Cards
        </Typography>
        <FormControlLabel
          control={<Switch checked={showDetails} onChange={handleChange} />}
          label="Show Card Details"
          labelPlacement="end"
        />
      </Stack>
      <Box sx={cardsStyles.cardContainer}>
        <CardAccordian
          isCreditCard
          cardData={creditCards}
          customerName={customerName}
          showDetails={showDetails}
        />
        <CardAccordian
          cardData={debitCards}
          customerName={customerName}
          showDetails={showDetails}
        />
      </Box>
    </Box>
  )
}

export default Accounts
