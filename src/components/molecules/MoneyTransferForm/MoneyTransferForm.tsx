import { AddCircleOutlineRounded } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { FC } from 'react'

interface IMoneyTransferForm {
  showPayeeLoader: boolean
  onAddPayeeClick: () => void
  accountsList: any[]
  payeeList: any[]
  showError: boolean
  transferData: {
    transferType: string
    fromAccount: string
    toAccount: string
    transferAmount: string
    transferRemarks?: string
  }
  handleTransferFormChange: (_arg1: string, _arg2: string) => void
}
const MoneyTransferForm: FC<IMoneyTransferForm> = ({
  showPayeeLoader,
  onAddPayeeClick,
  accountsList,
  payeeList,
  showError,
  transferData,
  handleTransferFormChange,
}) => {
  return (
    <Stack spacing={4}>
      <FormControl fullWidth variant="standard">
        <FormLabel
          id="transferType_label"
          required
          error={showError && !transferData.transferType}
        >
          Transfer Type
        </FormLabel>
        <RadioGroup
          id="transferType"
          aria-labelledby="transferType_label"
          row
          value={transferData.transferType}
          onChange={(e) => {
            handleTransferFormChange(e.target.value, 'transferType')
          }}
          name="transferType"
        >
          <FormControlLabel
            value="within"
            control={<Radio />}
            label="Transfer within"
          />
          <FormControlLabel
            value="outside"
            control={<Radio />}
            label="Transfer outside"
          />
        </RadioGroup>
        {showError && !transferData.transferType && (
          <FormHelperText error>Required</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth variant="standard">
        <InputLabel
          id="from-account"
          variant="standard"
          error={showError && !transferData.fromAccount}
        >
          Transfer From
        </InputLabel>
        <Select
          labelId="from-account"
          id="fromAccount"
          name="fromAccount"
          value={transferData.fromAccount}
          label="Transfer From"
          required
          error={showError && !transferData.fromAccount}
          onChange={(e) => {
            handleTransferFormChange(e.target.value, 'fromAccount')
          }}
        >
          {accountsList.map(
            (account: { accountNumber: string; availableBalance: string }) => {
              const { accountNumber, availableBalance } = account
              return (
                <MenuItem value={accountNumber} key={`from_${accountNumber}`}>
                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Stack>
                      <Typography variant="body2">Account Number:</Typography>
                      <Typography variant="body1">{accountNumber}</Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body2">
                        Available Balance:
                      </Typography>
                      <Typography variant="body1">
                        {availableBalance}
                      </Typography>
                    </Stack>
                  </Stack>
                </MenuItem>
              )
            }
          )}
        </Select>
        {showError && !transferData.fromAccount && (
          <FormHelperText error>Required</FormHelperText>
        )}
      </FormControl>
      <Stack direction="row" spacing={2} alignItems="flex-end">
        <FormControl fullWidth variant="standard">
          <InputLabel
            id="to-account"
            variant="standard"
            error={showError && !transferData.toAccount}
          >
            Transfer To
          </InputLabel>
          <Select
            labelId="to-account"
            id="toAccount"
            name="toAccount"
            value={transferData.toAccount}
            label="Transfer To"
            required
            error={showError && !transferData.toAccount}
            onChange={(e) => {
              handleTransferFormChange(e.target.value, 'toAccount')
            }}
          >
            {payeeList.map((payee: any) => {
              const { accountNumber, beneficiaryName } = payee
              return (
                <MenuItem value={accountNumber} key={`to_${accountNumber}`}>
                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                  >
                    {transferData.transferType !== 'within' && (
                      <Stack>
                        <Typography variant="body2">Payee Name:</Typography>
                        <Typography variant="body1">
                          {beneficiaryName}
                        </Typography>
                      </Stack>
                    )}
                    <Stack>
                      <Typography variant="body2">Account Number:</Typography>
                      <Typography variant="body1">{accountNumber}</Typography>
                    </Stack>
                  </Stack>
                </MenuItem>
              )
            })}
          </Select>
          {showError && !transferData.toAccount && (
            <FormHelperText error>Required</FormHelperText>
          )}
          {showPayeeLoader && <LinearProgress />}
        </FormControl>
        {transferData.transferType !== 'within' &&
          (!showPayeeLoader ? (
            <Tooltip title="Add Beneficiary">
              <IconButton
                aria-label="add beneficiary"
                color="primary"
                data-testid="add-payee-btn"
                onClick={onAddPayeeClick}
              >
                <AddCircleOutlineRounded />
              </IconButton>
            </Tooltip>
          ) : (
            <CircularProgress />
          ))}
      </Stack>
      <FormControl fullWidth>
        <TextField
          id="transferAmount"
          name="transferAmount"
          label="Amount"
          required
          onChange={(e) => {
            handleTransferFormChange(e.target.value, 'transferAmount')
          }}
          variant="standard"
          value={transferData.transferAmount}
          type="text"
          error={showError && !transferData.transferAmount}
        />
        {showError && !transferData.transferAmount && (
          <FormHelperText error>Required</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id="transferRemarks"
          name="transferRemarks"
          label="Remarks"
          variant="standard"
          onChange={(e) => {
            handleTransferFormChange(e.target.value, 'transferRemarks')
          }}
          value={transferData.transferRemarks}
          type="text"
        />
      </FormControl>
      <Button
        variant="contained"
        size="large"
        sx={{ padding: '1rem 0' }}
        type="submit"
      >
        Proceed
      </Button>
    </Stack>
  )
}

export default MoneyTransferForm
