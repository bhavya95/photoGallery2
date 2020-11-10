import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
const {width: DEVICE_WIDTH} = Dimensions.get('window');
export default function ImageCard({isGridView, url, title}) {
  return (
    <View style={styles.imageCard}>
      <FastImage
        style={isGridView ? styles.gridImage : styles.verticalImage}
        source={{uri: url}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.imageTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageCard: {
    flex: 1,
    alignItems: 'center',
  },
  imageTitle: {
    width: '70%',
    textAlign: 'center',
    fontSize: 16,
  },
  gridImage: {
    width: DEVICE_WIDTH / 2.5,
    height: DEVICE_WIDTH / 2.5,
  },
  verticalImage: {
    width: DEVICE_WIDTH * 0.7,
    height: DEVICE_WIDTH * 0.7,
  },
});
