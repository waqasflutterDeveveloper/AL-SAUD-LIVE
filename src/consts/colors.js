import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';

export const COLORS = (isDark = false) => {
  return {
    white: isDark ? 'black' : '#fff',
    WhiteForDark: isDark ? 'white' : '#000715',
    darkPartial: isDark ? '#185894' : 'white',
    blueForDark: isDark ? '#4D98FF' : '#E9612F',
    greyForDark: isDark ? '#969494' : '#EEEEEE',
    cardForDark: isDark ? '#1F222A' : 'white',
    blueVsBlack: isDark ? '#4D98FF' : 'black',
    blakvsgrey: isDark ? '#1F222A' : 'rgba(250, 250, 250, 1)',
    dark: isDark ? '#000715' : '#fff',
    light: '#f6f6f6',
    New: isDark ? '#1F222A' : '#f6f6f6',
    grey: '#5F5F5F',
    blue: '#185894',
    red: '#E9612F',
    tranparent: 'rgba(0,0,0,0)',
    tranparentWhite: 'rgba(255, 255, 255, 0.4)',
    tranparentBlue: 'rgba(24, 88, 148, 0.05)',
    backgroundblue: '#EFF5FA',
    line: '#79A5CA',
    lightGrey: '#969494',
    black: '#161616',
    lightBorder: '#EEEEEE',
    primary: '#E9612F',
    lightWhite: 'rgba(250, 250, 250, 1)',
    bottomBorder: 'rgba(238, 238, 238, 1)',
    error: '#DA0000',
    backgroundLight: '#FAFAFA',
    stock: '#EEEEEE',
    bgInput: '#F9F9F9',
    inprogress: '#E0A304',
    green: '#3FC70F',
    gray: '#EEEEEE',
    gray1: '#6B6B6B',
  };
};
