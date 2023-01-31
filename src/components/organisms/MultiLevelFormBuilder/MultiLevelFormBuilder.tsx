import React, { FC, useEffect } from 'react'
import { Button, CardActions, Divider, Stack } from '@mui/material'
import type { FormMetaData } from '../../../utils'
import { multiLevelFormBuilderStyles } from './styles'
import { FormControlRenderer } from '../FormBuilder/FormBuilder'

interface IMultiLevelFormBuilderProps {
  formControls: { [key: string]: FormMetaData[] }
  controlValues?: any
  controlHook: any
  watchHook?: any
  activeStep?: number
  totalStepsCount?: number
  submitHandler: () => {}
  secondaryButtonHandler?: () => void
}

const MultiLevelFormBuilder: FC<IMultiLevelFormBuilderProps> = ({
  formControls,
  controlValues,
  controlHook,
  activeStep,
  totalStepsCount,
  watchHook,
  submitHandler,
  secondaryButtonHandler,
}) => {
  useEffect(() => {
    sessionStorage.activeStep = activeStep
  }, [activeStep])
  return (
    <form onSubmit={submitHandler} noValidate>
      <Stack spacing={4}>
        {Object.values(formControls)?.map((section) => {
          return (
            <React.Fragment key={`group_${section[0].id}`}>
              <FormControlRenderer
                formControls={section}
                controlValues={controlValues}
                controlHook={controlHook}
                watchHook={watchHook}
                showFormActions={false}
              />

              <Divider
                variant="fullWidth"
                sx={multiLevelFormBuilderStyles.stepDivider}
              />
            </React.Fragment>
          )
        })}
        <CardActions
          sx={{
            padding: '0',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {activeStep !== 0 && (
            <Button
              type="button"
              variant="outlined"
              disableElevation
              onClick={secondaryButtonHandler}
            >
              Back
            </Button>
          )}
          <Button type="submit" variant="contained" disableElevation>
            {totalStepsCount && totalStepsCount - 1 === activeStep
              ? 'Finish'
              : 'Continue'}
          </Button>
        </CardActions>
      </Stack>
    </form>
  )
}

MultiLevelFormBuilder.defaultProps = {
  controlValues: {},
  activeStep: 0,
  totalStepsCount: 1,
  watchHook: () => {},
  secondaryButtonHandler: () => {},
}

export default MultiLevelFormBuilder
