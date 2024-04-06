import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const PatientStories = () => {
  return (
    <View style={styles.container}>
      <Text>PatientStories</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    margin: 30,
    borderRadius:20,
    padding:20,
    alignItems:"center",
    justifyContent:"center"
  }
})
export default PatientStories