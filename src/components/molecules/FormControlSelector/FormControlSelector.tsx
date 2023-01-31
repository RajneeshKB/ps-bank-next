import React, { FC } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import { FormMetaData, ControlValues } from '../../../utils'

interface IFormControlSelectorProps {
  controlData: FormMetaData
  controlHandler: any
  controlState: any
  watchHook?: any
  controlValues?: any
}

const FormControlSelector: FC<IFormControlSelectorProps> = ({
  controlData,
  controlHandler,
  controlState,
  watchHook,
  controlValues,
}) => {
  const {
    id,
    name,
    label,
    type,
    subCategory,
    required,
    disabled,
    watchField,
    watchValue,
    rowOrientation,
    minDateRange,
    maxDateRange,
  } = controlData
  const { onChange, value } = controlHandler
  const { error } = controlState
  const calculateWatchCondition = () => {
    if (!watchHook || !watchField || !watchValue) return true
    const result = watchHook(watchField)
    return result === watchValue
  }

  switch (controlData.type) {
    case 'text':
      return (
        <TextField
          id={id}
          label={label}
          required={required}
          onChange={onChange}
          value={value}
          error={!!error?.message}
          type={subCategory || type}
          variant="standard"
          disabled={disabled}
        />
      )

    case 'date':
      return (
        <DatePicker
          label={label}
          onChange={(newValue) => {
            onChange(dayjs(newValue).toISOString())
          }}
          value={value || null}
          disabled={disabled || !calculateWatchCondition()}
          disableFuture
          minDate={minDateRange}
          maxDate={maxDateRange}
          views={['year', 'month', 'day']}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              id={id}
              required={required || calculateWatchCondition()}
              error={!!error?.message}
              variant="standard"
              disabled={disabled || !calculateWatchCondition()}
              helperText="mm/dd/yyyy"
            />
          )}
        />
      )

    case 'select':
      return (
        <>
          <InputLabel
            id={`${id}_label`}
            required={required}
            error={!!error?.message}
          >
            {label}
          </InputLabel>
          <Select
            labelId={`${id}_label`}
            id={id}
            value={value}
            label={label}
            onChange={onChange}
            error={!!error?.message}
            disabled={disabled}
          >
            {controlValues.map(
              ({ id: _id, label: _label, value: _value }: ControlValues) => (
                <MenuItem key={_id} value={_value}>
                  {_label}
                </MenuItem>
              )
            )}
          </Select>
        </>
      )

    case 'radioGroup':
      return (
        <>
          <FormLabel
            id={`${id}_label`}
            required={required}
            error={!!error?.message}
          >
            {label}
          </FormLabel>
          <RadioGroup
            id={id}
            aria-labelledby={`${id}_label`}
            row={rowOrientation}
            value={value}
            onChange={onChange}
            name={name}
          >
            {controlValues.map(
              ({ id: _id, label: _label, value: _value }: ControlValues) => (
                <FormControlLabel
                  key={_id}
                  value={_value}
                  control={<Radio />}
                  label={_label}
                  disabled={disabled}
                />
              )
            )}
          </RadioGroup>
        </>
      )

    case 'checkbox':
      return (
        <FormControlLabel
          id={id}
          value={value}
          checked={value}
          control={<Checkbox onChange={onChange} />}
          label={label}
          labelPlacement="top"
          disabled={disabled}
          sx={{ alignItems: 'flex-start', margin: '0' }}
        />
      )

    default:
      return null
  }
}

FormControlSelector.defaultProps = {
  controlValues: [],
  watchHook: null,
}

export default FormControlSelector
