import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StyleConfig from '../StyleConfig'
import AppImages from '../../assets/images/AppImages'

const styles = StyleSheet.create({
  defaultButton: {
    height: 55,
    backgroundColor: StyleConfig.green,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  defaultText: {
    fontFamily: StyleConfig.nobelBold,
    fontSize: 14,
    letterSpacing: 1,
    color: StyleConfig.white,
    textAlign: 'center'
  },
  disabled: {
    backgroundColor: StyleConfig.grey7
  },
})

export default class Button extends Component {
  render() {
    const { style, onPress, text, textStyle, disabled } = this.props
    return (
      <TouchableOpacity
        style={[styles.defaultButton, style, disabled && styles.disabled]}
        onPress={onPress}
        disabled={disabled}
        >
        <Text allowFontScaling={false} style={[styles.defaultText, textStyle]}>{text}</Text>
      </TouchableOpacity>
    )
  }
}
