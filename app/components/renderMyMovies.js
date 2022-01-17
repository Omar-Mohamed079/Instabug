import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
function renderMyMovies({item}) {
  const renderViewMore = onPress => {
    return (
      <Text onPress={onPress} style={{color: 'grey', marginLeft: 15}}>
        View more
      </Text>
    );
  };
  const renderViewLess = onPress => {
    return (
      <Text onPress={onPress} style={{color: 'grey', marginLeft: 15}}>
        View less
      </Text>
    );
  };
  const time = item.date;
  return (
    <View style={styles.itemMovies}>
      <Image
        source={{
          uri: item.imagePath,
        }}
        style={styles.itemImage}
      />
      <Text style={styles.itemText}> {item.title}</Text>
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
        textStyle={styles.overView}>
        <Text>{item.Overview}</Text>
      </ViewMoreText>
      <Text style={styles.overView}> {time.getFullYear()}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  itemRow: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemText: {
    fontSize: 18,
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  overView: {
    fontSize: 16,
    padding: 5,
    color: 'black',
    marginLeft: 5,
  },
  itemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
  },
  itemMovies: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
  },
});
export default renderMyMovies;
