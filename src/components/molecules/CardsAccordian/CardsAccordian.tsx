import React, { FC } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AtmCard } from '../AtmCard'

interface ICardsAccordianProps {
  isCreditCard?: boolean
  showDetails?: boolean
  cardData: any[]
  customerName: string
}
const CardsAccordian: FC<ICardsAccordianProps> = ({
  isCreditCard,
  showDetails,
  cardData,
  customerName,
}) => {
  const ariaHeder = isCreditCard ? 'CreditCards-header' : 'DebitCards-header'
  const ariContent = isCreditCard ? 'CreditCards-content' : 'DebitCards-content'
  return (
    <Accordion
      sx={{
        maxWidth: '30rem',
        width: '30rem',
        bgcolor: 'backgroundColor.main',
      }}
      defaultExpanded
      square
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={`${ariaHeder}`}
        aria-controls={`${ariContent}`}
      >
        <Typography>{isCreditCard ? 'Credit Card' : 'Debit Card'}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{ display: 'flex', flexDirection: 'column', rowGap: '1.5rem' }}
      >
        {cardData.map((card) => {
          const key = isCreditCard
            ? `credit_${card.creditCardNumber}`
            : `debit_${card.activeDebitCard}`
          return (
            <AtmCard
              key={key}
              customerName={customerName}
              cardNumber={
                isCreditCard ? card.creditCardNumber : card.activeDebitCard
              }
              showDetails={showDetails}
              isCreditCard={isCreditCard}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...card}
            />
          )
        })}
      </AccordionDetails>
    </Accordion>
  )
}

CardsAccordian.defaultProps = {
  isCreditCard: false,
  showDetails: false,
}
export default CardsAccordian
