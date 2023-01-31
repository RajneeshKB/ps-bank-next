import React, { FC, useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import TransferMoeny from '@/components/organisms/TransferMoney/TransferMoney'
import { PayCards } from '@/components/organisms/PayCards'
import { TabPanel } from '@/components/atoms/TabPanel'
import { ProtectedLayout } from '@/components/organisms/ProtectedLayout'

const Payments: FC = () => {
  const [selectedTab, updatedSelectedTab] = useState(0)
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    updatedSelectedTab(newValue)
  }
  return (
    <ProtectedLayout>
      <Box>
        <Typography variant="h2" mb="1rem">
          Payments
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="do payments"
          textColor="primary"
          indicatorColor="primary"
          sx={{ borderBottom: 1, borderColor: 'primary' }}
        >
          <Tab
            label="Transfer money"
            id="transfer-money"
            aria-controls="transfer-money-panel"
          />
          <Tab
            label="Pay Credit Cards"
            id="pay-cards"
            aria-controls="pay-cards-panel"
          />
        </Tabs>
        <TabPanel
          value={selectedTab}
          index={0}
          id="transfer-money-panel"
          ariaLabel="transfer-money-panel"
        >
          <TransferMoeny />
        </TabPanel>
        <TabPanel
          value={selectedTab}
          index={1}
          id="pay-cards-panel"
          ariaLabel="pay-cards-panel"
        >
          <PayCards />
        </TabPanel>
      </Box>
    </ProtectedLayout>
  )
}

export default Payments
