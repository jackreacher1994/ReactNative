import React, { Component, } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import pick from '../helpers/ImagePicker';
import upload from '../helpers/ImageUploader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: null,
      data: null
    }
  }

  selectImage() {
    pick((uri, data) => {
      this.setState({
          uri: uri,
          data: data
      });
    })
  }

  uploadImage() {
    upload([
        { name : 'image', filename : 'image.png', data: this.state.data},
    ]);
  }

  render() {
    let img = this.state.uri===null ? null : <Image source={{uri:this.state.uri}} style={styles.uploadImage} />;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableOpacity onPress={this.selectImage.bind(this)}>
          <Text style={styles.instructions}>
            Select an image
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.uploadImage.bind(this)}>
          <Text style={styles.instructions}>
            Upload
          </Text>
        </TouchableOpacity>

        {img}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  uploadImage: {
    width: 200,
    height: 200
  }
});

export default App