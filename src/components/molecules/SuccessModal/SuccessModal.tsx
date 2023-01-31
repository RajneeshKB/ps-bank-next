import React, { FC } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { successModalStyles } from './styles'

interface ISuccessModalProps {
  title: React.ReactNode
  description: React.ReactNode
  primaryButtonTitle?: string
  showModal: boolean
  onCloseClick: () => void
}

const SuccessModal: FC<ISuccessModalProps> = ({
  title,
  description,
  showModal,
  primaryButtonTitle,
  onCloseClick,
}) => {
  return (
    <Modal
      open={showModal}
      disableEscapeKeyDown
      aria-labelledby="success-title"
      aria-describedby="success-detail"
    >
      <Card sx={successModalStyles.modalContent}>
        <CardHeader
          id="success-title"
          avatar={<CheckCircleIcon color="success" sx={{ fontSize: '4rem' }} />}
          title={title}
        />
        <CardContent id="success-detail">{description}</CardContent>
        <CardActions sx={successModalStyles.modalAction}>
          <Button variant="contained" onClick={onCloseClick}>
            {primaryButtonTitle}
          </Button>
        </CardActions>
      </Card>
    </Modal>
  )
}

SuccessModal.defaultProps = {
  primaryButtonTitle: 'Close',
}
export default SuccessModal
