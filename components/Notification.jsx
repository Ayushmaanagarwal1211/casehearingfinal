import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Notification() {
  return (
    <div><FontAwesomeIcon icon={icon({name: 'user-secret'})} />
    </div>
  )
}
