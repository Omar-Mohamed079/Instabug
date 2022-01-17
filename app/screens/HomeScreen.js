import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {getMovies} from '../api/getMovies';
import ModalForm from '../components/Modal';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import renderAllMovies from '../components/renderAllMovies';
import renderMyMovies from '../components/renderMyMovies';

function HomeScreen(props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(1);
  const moviesCategory = [
    {category: 'My Movies'},
    {
      category: 'All Movies',
    },
  ];

  const info = useSelector(state => state.movies.moviesItem);
  const handleLoadMore = () => {
    setPage(page + 1);
    setLoading(true);
  };
  const addmovieModal = () => setVisible(true);
  useEffect(() => {
    setLoading(true);
    getMovies(page).then(data => {
      setData(prev => [...prev, ...data]);
      setLoading(false);
    });
  }, [page]);

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  return (
    <View style={styles.bigContainer}>
      <Header onPress={addmovieModal} />
      <View style={styles.container}>
        {moviesCategory.map(({category}, index) => {
          return (
            <View style={styles.cardContainer}>
              <View style={[styles.card, {backgroundColor: 'white'}]}>
                <TouchableOpacity
                  onPress={() => {
                    setcurrentIndex(index);
                  }}>
                  <Text style={[styles.Heading]}>{category}</Text>
                </TouchableOpacity>
                {index === currentIndex && (
                  <View>
                    {index === 0 ? (
                      info[0] ? (
                        <FlatList
                          data={info}
                          style={styles.MoviesContainer}
                          renderItem={item => renderMyMovies(item)}
                          keyExtractor={item => item.id}
                        />
                      ) : (
                        <View style={{backgroundColor: 'white'}}></View>
                      )
                    ) : (
                      <FlatList
                        data={data}
                        style={styles.container}
                        renderItem={item => renderAllMovies(item)}
                        keyExtractor={item => item.id}
                        ListFooterComponent={renderFooter}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                      />
                    )}
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
      <ModalForm visible={visible} setVisible={setVisible} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fcff',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
  card: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  Heading: {
    fontSize: 30,
    fontWeight: '900',
    color: 'black',
    alignSelf: 'center',
  },
  MoviesContainer: {
    maxHeight: 610,
  },
  bigContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});
export default HomeScreen;
