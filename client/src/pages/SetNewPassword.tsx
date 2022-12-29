import React from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import SetNewPasswordComponent from '../components/resetPassword/SetNewPasswordComponent'

const SetNewPassword = () => {
  return (
    <>
        <Navbar />
        <SetNewPasswordComponent />
        <Footer />
    </>
  )
}

export default SetNewPassword