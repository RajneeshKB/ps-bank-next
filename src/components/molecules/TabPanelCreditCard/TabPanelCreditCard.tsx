import React, { FC, memo } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { tabPanelCreditCardStyles } from './styles'
import { NextLinkComposed } from '@/components/atoms/CustomRouterLink/CustomRouterLink'

const TabPanelSavings: FC = () => {
  return (
    <Card sx={tabPanelCreditCardStyles.container}>
      <CardHeader
        title={<Typography variant="h2">Credit Cards</Typography>}
        sx={tabPanelCreditCardStyles.cardHeader}
      />
      <CardContent>
        <Stack>
          <Typography variant="body2">
            Apply for a new credit card and earn benefits and reward points.
          </Typography>
          <Typography variant="body2">
            Two different categories available for credit cards.
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                disableTypography
                primary="Gold"
                secondary={
                  <>
                    <Typography variant="body2">
                      &#8377;200,000 &gt; Annual income &lt; &#8377;500,000
                    </Typography>
                    <Typography variant="body2">
                      Credit limit &#8377;50,000
                    </Typography>
                    <Typography variant="body2">
                      Annual charges &#8377;1000
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                disableTypography
                primary="Platinum"
                secondary={
                  <>
                    <Typography variant="body2">
                      Annual income &gt; &#8377;500,000
                    </Typography>
                    <Typography variant="body2">
                      Credit limit &#8377;1,50,000
                    </Typography>
                    <Typography variant="body2">
                      Annual charges &#8377;2500
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
      <CardActions sx={tabPanelCreditCardStyles.cardActions}>
        <Button
          variant="contained"
          to="/ps-bank/apply/new-card"
          component={NextLinkComposed}
        >
          Apply Now
        </Button>
      </CardActions>
    </Card>
  )
}

export default memo(TabPanelSavings)
