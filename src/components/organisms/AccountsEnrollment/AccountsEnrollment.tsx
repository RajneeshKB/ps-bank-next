import React, { FC, memo, useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useBankContext } from '../../../context'
import { accountsEnrollmentStyles } from './styles'
import { TabPanel } from '../../atoms/TabPanel'
import { CreditCardPanel } from '@/components/molecules/TabPanelCreditCard'
import { SavingsPanel } from '@/components/molecules/TabPanelSavings'

const AccountsEnrollment: FC = () => {
  const [selectedTab, updatedSelectedTab] = useState(0)
  const {
    state: {
      loginData: { customerName },
    },
  } = useBankContext()

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    updatedSelectedTab(newValue)
  }

  return (
    <Box sx={accountsEnrollmentStyles.titleContainer}>
      <Typography variant="h2">{`Welcome ${customerName}`}</Typography>
      <Typography variant="body2">
        Thank you for chhosing us as your banking parnter.
      </Typography>
      <Typography variant="body2" mt="1.5rem">
        Get started by opening a Saving bank account with us. You can also apply
        for a new credit card fro our various available options.
      </Typography>

      <Box sx={accountsEnrollmentStyles.tabsContainer}>
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Open new account"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab
            label="Saving account"
            id="saving-account"
            aria-controls="saving-account-panel"
          />
          <Tab
            label="Credit card"
            id="credit-card"
            aria-controls="credit-card-panel"
          />
        </Tabs>
        <TabPanel
          value={selectedTab}
          index={0}
          id="saving-account-panel"
          ariaLabel="saving-account-panel"
        >
          <SavingsPanel />
        </TabPanel>
        <TabPanel
          value={selectedTab}
          index={1}
          id="credit-card-panel"
          ariaLabel="credit-card-panel"
        >
          <CreditCardPanel />
        </TabPanel>
      </Box>
    </Box>
  )
}

export default memo(AccountsEnrollment)
