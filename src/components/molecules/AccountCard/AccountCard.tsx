import React, { FC, memo } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { accountCardStyles } from './styles'
import { formatDisplayWithStar, IS_BROWSER } from '../../../utils'
import { AtmCard } from '../AtmCard'
import { useRouter } from 'next/router'

interface IAccountCardProps {
  customerName: string
  accountNumber: string
  accountType: string
  availableBalance: string
  activeDebitCard: string
  cvvNumber: string
  validFrom: string
  validTo: string
  showBalance: boolean
  notifications: any[]
}
const AccountCard: FC<IAccountCardProps> = ({
  customerName,
  accountNumber,
  accountType,
  availableBalance,
  activeDebitCard,
  cvvNumber,
  validFrom,
  validTo,
  showBalance,
  notifications,
}) => {
  const router = useRouter()
  return (
    <Card sx={accountCardStyles.cardContainer} raised>
      <CardContent sx={accountCardStyles.cardContent}>
        <Stack
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap"
          rowGap="1rem"
        >
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h3" component="p">
                {`${accountType.toUpperCase()} Account`}
              </Typography>
              <Typography
                variant="h3"
                fontSize="2rem"
                fontWeight="700"
                letterSpacing="2px"
              >
                {accountNumber}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography variant="body2">Available Balance</Typography>
              <Typography variant="h3">
                &#8377;
                {showBalance
                  ? availableBalance
                  : availableBalance.replaceAll(/\d/g, '*')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography variant="body2">Debit card</Typography>
              <Typography variant="body1">
                {formatDisplayWithStar(activeDebitCard)}
              </Typography>
            </Stack>
          </Stack>
          <Box sx={{ maxWidth: '30rem', width: '30rem' }}>
            <AtmCard
              customerName={customerName}
              cardNumber={activeDebitCard}
              showDetails={showBalance}
              cvvNumber={cvvNumber}
              validFrom={validFrom}
              validTo={validTo}
            />
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={accountCardStyles.cardAction}>
        <Button
          variant="text"
          sx={{ color: 'primary.contrastText' }}
          onClick={() => {
            if (IS_BROWSER) {
              sessionStorage.setItem('selectedAccount', accountNumber)
              router.push('/ps-bank/account-dashboard/account-statement')
            }
          }}
        >
          View Statement
          <ChevronRightIcon />
        </Button>
      </CardActions>
      {notifications.map(({ code, message }) => (
        <Alert
          key={code}
          severity="error"
          sx={{
            width: '100%',
            borderTopRightRadius: '0',
            borderTopLeftRadius: '0',
          }}
        >
          {message}
        </Alert>
      ))}
    </Card>
  )
}

export default memo(AccountCard)
