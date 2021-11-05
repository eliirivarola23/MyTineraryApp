import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Footer = () => {
    return (
            <View
              style={styles.containerFooter}
            >
              <View
                style={styles.footer}
              >
                <Text style={styles.pFooter}>
                  MyTinerary Project 2021 © All Rights Reserved
                </Text>
              </View>
            </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    containerFooter: {
        width: 460,
        alignItems: "center",
        marginBottom: 100,
        borderWidth: 1,
    },
    footer: {
      flex: 1,
      flexDirection: "row",
      borderWidth: 1,
      height: 150,
      width: 440,
      margin: 10,
      padding: 10,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#1d1d1d65",
    },
    pFooter: {
        color: "white",
        fontSize: 20,
      },
})
