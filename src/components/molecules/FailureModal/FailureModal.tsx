import React, { FC } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import { failureModalStyles } from './styles'

interface IRegistrationFailureProps {
  title: React.ReactNode
  description: React.ReactNode
  primaryButtonTitle?: string
  showModal: boolean
  onCloseClick: () => void
}

const FailureModal: FC<IRegistrationFailureProps> = ({
  title,
  description,
  primaryButtonTitle,
  showModal,
  onCloseClick,
}) => (
  <Modal
    open={showModal}
    disableEscapeKeyDown
    aria-labelledby="failure-title"
    aria-describedby="failure-detail"
  >
    <Card sx={failureModalStyles.modalContent}>
      <CardHeader
        id="failure-title"
        avatar={<CancelIcon color="error" sx={{ fontSize: '4rem' }} />}
        title={title}
      />
      <CardContent id="failure-detail">{description}</CardContent>
      <CardActions sx={failureModalStyles.modalAction}>
        <Button variant="contained" onClick={onCloseClick}>
          {primaryButtonTitle}
        </Button>
      </CardActions>
    </Card>
  </Modal>
)

FailureModal.defaultProps = {
  primaryButtonTitle: 'Close',
}

export default FailureModal
