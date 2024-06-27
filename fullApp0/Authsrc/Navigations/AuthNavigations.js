import React from 'react'
import AuthStackScreens from './AuthStackScreens'
import { NavigationContainer } from '@react-navigation/native'

const AuthNavigations = () => {
  return (
    <NavigationContainer>
    <AuthStackScreens/>

    </NavigationContainer>
  )
}

export default AuthNavigations