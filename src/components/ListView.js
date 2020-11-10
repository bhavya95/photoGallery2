import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ImageCard from './ImageCard';

export default function ListView({isGridView, images}) {
  const gridKeyExtractor = (item, i) => `${i}`;
  const renderListItem = ({item}) => (
    <ImageCard isGridView={isGridView} url={item.url} title={item.title} />
  );
  const verticalKeyExtractor = (item, i) => item.url + i;
  return (
    <>
      {isGridView ? (
        <FlatList
          contentInset={{bottom: 100}}
          contentContainerStyle={styles.listContainer}
          data={images}
          numColumns={2}
          renderItem={renderListItem}
          keyExtractor={gridKeyExtractor}
          key="-"
          initialNumToRender={10}
        />
      ) : (
        <FlatList
          contentContainerStyle={styles.listContainer}
          contentInset={{bottom: 100}}
          key="#"
          data={images}
          numColumns={1}
          renderItem={renderListItem}
          keyExtractor={verticalKeyExtractor}
          initialNumToRender={10}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 150,
  },
});
