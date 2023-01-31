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
import { tabPanelSavingStyles } from './styles'
import { NextLinkComposed } from '@/components/atoms/CustomRouterLink/CustomRouterLink'

const TabPanelSavings: FC = () => {
  return (
    <Card sx={tabPanelSavingStyles.container}>
      <CardHeader
        title={<Typography variant="h2">Saving Accounts</Typography>}
        sx={tabPanelSavingStyles.cardHeader}
      />
      <CardContent>
        <Stack>
          <Typography variant="body2">
            Open a saving account with us and get a lifetime free debit card.
          </Typography>
          <Typography variant="body2">
            Two different categories available for opening a saving account.
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                disableTypography
                primary="Regular"
                secondary={
                  <>
                    <Typography variant="body2">
                      Zero minimum balance
                    </Typography>
                    <Typography variant="body2">
                      Lifetime free debit card
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                disableTypography
                primary="Premium"
                secondary={
                  <>
                    <Typography variant="body2">
                      Minimum balance &#8377;10000
                    </Typography>
                    <Typography variant="body2">
                      Lifetime free debit card
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
      <CardActions sx={tabPanelSavingStyles.cardActions}>
        <Button
          variant="contained"
          to="/ps-bank/apply/new-saving"
          component={NextLinkComposed}
        >
          Open Now
        </Button>
      </CardActions>
    </Card>
  )
}

export default memo(TabPanelSavings)
