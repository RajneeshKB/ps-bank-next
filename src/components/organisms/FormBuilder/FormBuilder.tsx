import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import {
  Button,
  CardActions,
  FormControl,
  FormHelperText,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import type { FormMetaData } from '../../../utils'
import { FormControlSelector } from '../../molecules/FormControlSelector'

interface IFormControlRenderer {
  formControls: FormMetaData[]
  controlValues?: any
  controlHook: any
  watchHook?: any
  submitButtonLabel?: string
  showFormActions?: boolean
}
interface IFormBuilderProps extends IFormControlRenderer {
  submitHandler: () => {}
}

export const FormControlRenderer: FC<IFormControlRenderer> = ({
  formControls,
  controlHook,
  watchHook,
  controlValues,
  submitButtonLabel,
  showFormActions,
}) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Stack
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      rowGap="1.5rem"
      justifyContent="space-between"
    >
      {formControls.map((cardControl: any) => (
        <Controller
          key={cardControl.id}
          control={controlHook}
          name={cardControl.name}
          rules={cardControl.validation}
          render={({ field, fieldState }) => {
            const { error } = fieldState
            return (
              <FormControl
                variant="standard"
                sx={{
                  // eslint-disable-next-line no-nested-ternary
                  width: isDesktop
                    ? !cardControl.halfWidth
                      ? '100%'
                      : '47%'
                    : '100%',
                }}
              >
                <FormControlSelector
                  controlData={cardControl}
                  controlHandler={field}
                  controlState={fieldState}
                  watchHook={watchHook}
                  controlValues={controlValues[cardControl.id]}
                />
                {error?.message && (
                  <FormHelperText error>{error.message}</FormHelperText>
                )}
              </FormControl>
            )
          }}
        />
      ))}
      {showFormActions && (
        <CardActions sx={{ padding: '0', width: '100%' }}>
          <Button
            type="submit"
            variant="contained"
            disableElevation
            fullWidth
            size="large"
            sx={{ padding: '1rem 0' }}
          >
            {submitButtonLabel}
          </Button>
        </CardActions>
      )}
    </Stack>
  )
}
const FormBuilder: FC<IFormBuilderProps> = ({
  formControls,
  controlValues,
  controlHook,
  watchHook,
  submitHandler,
  submitButtonLabel,
  showFormActions,
}) => {
  return (
    <form onSubmit={submitHandler} noValidate>
      <FormControlRenderer
        formControls={formControls}
        controlValues={controlValues}
        controlHook={controlHook}
        watchHook={watchHook}
        submitButtonLabel={submitButtonLabel}
        showFormActions={showFormActions}
      />
    </form>
  )
}

FormBuilder.defaultProps = {
  controlValues: {},
  watchHook: () => {},
  submitButtonLabel: 'Submit',
  showFormActions: true,
}

FormControlRenderer.defaultProps = {
  controlValues: {},
  watchHook: () => {},
  submitButtonLabel: 'Submit',
  showFormActions: true,
}

export default FormBuilder
