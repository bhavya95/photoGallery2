import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addImages, fetchImages} from '../action';
import Button from './Button';
import ErrorView from './ErrorView';
import ListView from './ListView';
import LoadingView from './LoadingView';

export default function PhotoGallery() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const [isGridView, setView] = useState(false);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    dispatch(fetchImages());
  };

  const toggleView = () => setView((changed) => !changed);

  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (
          result['android.permission.CAMERA'] ===
            PermissionsAndroid.RESULTS.GRANTED ||
          result['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          addPhotos();
        } else {
          alert('Permission Denied');
        }
      } catch (err) {
        alert(err);
      }
    } else {
      addPhotos();
    }
  };

  const addPhotos = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        alert(response.error);
      } else {
        dispatch(
          addImages({
            url:
              Platform.OS === 'android'
                ? response.uri
                : '~' +
                  response.uri.substring(response.uri.indexOf('/Documents')),
            title: 'Image',
          }),
        );
      }
    });
  };

  return (
    <>
      <Text style={styles.headerText}>PhotoGallery</Text>

      {images.isLoading && <LoadingView />}

      {images.isError && (
        <ErrorView onPress={getImages} errorMsg={images.data.message} />
      )}
      {images.isSuccess && (
        <>
          <View style={styles.btnView}>
            <Button
              onPress={toggleView}
              text={`Change to ${isGridView ? 'Vertical' : 'Grid'} View`}
            />
            <Button onPress={checkPermission} text={'Add Photos'} />
          </View>

          {images.data.length ? (
            <ListView isGridView={isGridView} images={images.data} />
          ) : (
            <Text style={styles.text}>Add Photos to view here</Text>
          )}
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    color: '#ccc',
  },
  btnView: {flexDirection: 'row', justifyContent: 'space-around'},
});
