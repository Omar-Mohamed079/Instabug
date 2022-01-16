import React, {useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {Modal, TextInput} from 'react-native-paper';
import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {addMovies} from '../redux/moviesSlice';
import {useDispatch} from 'react-redux';
const ModalForm = ({visible, setVisible}) => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({});
  const [title, setTitle] = useState('');
  const [Overview, setOverview] = useState('');
  const hideModal = () => setVisible(false);
  const submitMovie = () => {
    const imagePath = image.path;
    if (title.length === 0) {
      console.log('not valid title');
      return false;
    }
    if (Overview.length === 0) {
      console.log('not valid Overview');
      return false;
    }
    if (!image.path) {
      console.log('not valid image');
      return false;
    }
    setVisible(false);
    dispatch(addMovies({title, Overview, imagePath, date}));
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
        <TextInput
          style={{width: '90%', marginBottom: 30}}
          mode="outlined"
          label="Overview"
          placeholder="Type something"
          right={<TextInput.Affix text="/100" />}
          onChangeText={item => setOverview(item)}
        />
        <Button title="Select Date" onPress={() => setOpen(true)} />
        <TouchableOpacity onPress={() => ImagePicker()}>
          <ImageBackground
            source={require('../assets/plus.png')}
            style={{width: 30, height: 30, marginTop: 30}}
          />
        </TouchableOpacity>
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
    height: 400,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    position:"absolute",
    top:50
  },
  submitButton: {
    width: 100,
    height: 30,
    backgroundColor: 'blue',
  },
});
export default ModalForm;
