import React from 'react';
import {StyleSheet, View} from 'react-native';

import styles from './progress.styles';

type ProgressPropTypes = {
    value: number;
}

function Progress({ value }: ProgressPropTypes) {
  return (
    <View style={styles.wrapper}>
      <View style={StyleSheet.compose(styles.progress, {
        width: `${value}%`,
      })}/>
    </View>
  );
}

export default Progress;