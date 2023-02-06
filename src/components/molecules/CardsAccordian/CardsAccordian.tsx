import React, { FC } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
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
        <List>
          {cardData.map((card) => {
            const key = isCreditCard
              ? `credit_${card.creditCardNumber}`
              : `debit_${card.activeDebitCard}`
            return (
              <ListItem key={key} sx={{ px: '0' }}>
                <AtmCard
                  customerName={customerName}
                  cardNumber={
                    isCreditCard ? card.creditCardNumber : card.activeDebitCard
                  }
                  showDetails={showDetails}
                  isCreditCard={isCreditCard}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...card}
                />
              </ListItem>
            )
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

CardsAccordian.defaultProps = {
  isCreditCard: false,
  showDetails: false,
}
export default CardsAccordian
