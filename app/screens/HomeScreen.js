import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {getMovies} from '../api/getMovies';
import ViewMoreText from 'react-native-view-more-text';
import {Appbar, Headline} from 'react-native-paper';
import ModalTemplate from '../components/Modal';
import ModalForm from '../components/Modal';
import {useDispatch, useSelector} from 'react-redux';

function HomeScreen(props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const info = useSelector(state => state.movies.moviesItem);
  console.log('info', info);
  const _handleMore = () => setVisible(true);
  useEffect(() => {
    setLoading(true);
    getMovies(page).then(data => {
      setData(prev => [...prev, ...data]);
      console.log('data', data);
      setLoading(false);
    });
  }, [page]);
  const handleLoadMore = () => {
    setPage(page + 1);
    setLoading(true);
  };
  const renderViewMore = onPress => {
    return (
      <Text onPress={onPress} style={{color: 'grey', marginLeft: 5}}>
        View more
      </Text>
    );
  };
  const renderViewLess = onPress => {
    return (
      <Text onPress={onPress} style={{color: 'grey', marginLeft: 5}}>
        View less
      </Text>
    );
  };
  const renderFooter = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  const renderRow = ({item}) => {
    return (
      <View style={styles.itemRow}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.itemImage}
        />
        <Text style={styles.itemText}> {item.title}</Text>
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={styles.overView}>
          <Text>{item.overview}</Text>
        </ViewMoreText>
      </View>
    );
  };
  const renderMyMovies = ({item}) => {
    console.log(item, 'item in render movies');
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
      </View>
    );
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Movies App" />
        <Appbar.Action
          icon={require('../assets/plus.png')}
          onPress={_handleMore}
        />
      </Appbar.Header>
      {info[0] && (
        <Headline
          style={{
            backgroundColor: 'white',
            height: 45,
            borderRadius: 5,
            width: '100%',
            textAlign: 'center',
          }}>
          My Movies
        </Headline>
      )}
      {info[0] && (
        <FlatList
          data={info}
          style={styles.container}
          renderItem={renderMyMovies}
          keyExtractor={item => item.id}
        />
      )}
      <Headline
        style={{
          backgroundColor: 'white',
          height: 45,
          borderRadius: 5,
          width: '100%',
          textAlign: 'center',
        }}>
        All Movies
      </Headline>
      <FlatList
        data={data}
        style={styles.container}
        renderItem={renderRow}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
      />
      <ModalForm visible={visible} setVisible={setVisible} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fcff',
  },
  itemRow: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    // paddingHorizontal:20
  },
  itemMovies: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    height: 200,
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
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
export default HomeScreen;
