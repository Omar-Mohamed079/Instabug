import React, {useState} from 'react';
import {View, ImageBackground, TouchableOpacity} from 'react-native';
import {Modal, TextInput} from 'react-native-paper';
import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {StyleSheet} from 'react-native';
import {addMovies} from '../redux/moviesSlice';
import {useDispatch} from 'react-redux';
import {Text} from 'react-native';
import {set} from 'immer/dist/internal';
const ModalForm = ({visible, setVisible}) => {
  const dispatch = useDispatch();
  const [titleError, setTitleError] = useState(false);
  const [overViewError, setoverViewError] = useState(false);
  const [imageError, setimageError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({});
  const [title, setTitle] = useState('');
  const [Overview, setOverview] = useState('');
  const hideModal = () => setVisible(false);
  const submitMovie = () => {
    const imagePath = image.path;
    setTitleError(false);
    setoverViewError(false);
    setimageError(false);

    if (title.length === 0) {
      setTitleError(true);
      return false;
    }
    if (Overview.length === 0) {
      setoverViewError(true);
      return false;
    }
    if (!image.path) {
      setimageError(true);
      return false;
    }
    setVisible(false);
    dispatch(addMovies({title, Overview, imagePath, date}));
    setImage({});
    setTitle('');
    setOverview('');
  };
  const ImagePicker = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image);
    });
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.containerStyle}>
      <TextInput
        style={{width: '90%', marginBottom: 30}}
        mode="outlined"
        label="Title"
        placeholder="Type something"
        right={<TextInput.Affix text="/100" />}
        onChangeText={item => setTitle(item)}
      />
      {titleError && <Text style={styles.error}> Please enter a title</Text>}
      <TextInput
        style={{width: '90%', marginBottom: 30}}
        mode="outlined"
        label="Overview"
        placeholder="Type something"
        right={<TextInput.Affix text="/100" />}
        onChangeText={item => setOverview(item)}
      />
      {overViewError && (
        <Text style={styles.error}> Please enter an overview</Text>
      )}
      <View style={{marginVertical: 20}}>
        <Button title="Select Date" onPress={() => setOpen(true)} />
      </View>
      <View style={{marginVertical: 20}}>
        <Button title="Select an Image" onPress={() => ImagePicker()} />
      </View>
      {imageError && (
        <Text style={styles.error}> Please select an image</Text>
      )}

      <DatePicker
        modal
        style={{backgroundColor: 'white'}}
        mode="date"
        fadeToColor="white"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          console.log(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={{marginTop: 30}}>
        <Button title="Submit" onPress={() => submitMovie()} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    width: '90%',
    height: 500,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    position: 'absolute',
    top: 50,
  },
  submitButton: {
    width: 100,
    height: 30,
    backgroundColor: 'blue',
  },
  error: {
    color: 'red',
  },
});
export default ModalForm;
