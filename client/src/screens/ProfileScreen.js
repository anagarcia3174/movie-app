import React from 'react'
import { Button } from 'react-bootstrap'
import { auth } from '../services/firebase'

const ProfileScreen = () => {
  return (
<>
<h1>Profile Screen</h1>
<Button onClick={() => auth.signOut()}>Sign Out</Button>
</>
  )
}

export default ProfileScreen