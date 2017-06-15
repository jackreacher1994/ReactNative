import React, { Component, } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ListView
} from 'react-native';
import upload from '../helpers/ImageUploader';
import {setEmail, addEmail, getEmail, listenForChange, removeEmail} from '../helpers/DBUtils';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: null,
      primaryEmail: null,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  uploadImage() {
    upload(() => {
        this.setState({
            uri: ''
        })
    }, (uri) => {
      this.setState({
          uri: uri
      });
    })
  }

  listen() {
    var emails = [];
    listenForChange((value, key) => {
      emails.push({
        email: value,
        key: key
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(emails)
      });
    }, (key) => {
      emails = emails.filter((x) => x.key!==key);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(emails)
      });
    });
  }
  setDB() {
    setEmail();
  }
  addDB() {
    addEmail();
  }
  getDB() {
    getEmail((primaryEmail) => {
      this.setState({
        primaryEmail: primaryEmail
      });
    });
  }
  renderHang(rowData) {
    return (
      <View>
        <TouchableOpacity onPress={() => removeEmail(rowData.key)}>
          <Text>{rowData.email}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let primaryEmail = this.state.primaryEmail===null ? null : <Text>{this.state.primaryEmail}</Text>
    return (
      <View style={styles.container}>
        {
            (() => {
                switch(this.state.uri){
                    case '':
                        return <ActivityIndicator />;
                    case null:
                        return null;
                    default:
                        return (
                            <View>
                                <Image source={{uri:this.state.uri}} style={styles.uploadImage} />
                                <Text>URI: {this.state.uri}</Text>
                            </View>
                        );
                }
            }) ()
        }
        <TouchableOpacity onPress={this.uploadImage.bind(this)}>
          <Text style={styles.button}>
            Upload
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.setDB.bind(this)}>
          <Text style={styles.button}>
            Set DB
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.addDB.bind(this)}>
          <Text style={styles.button}>
            Add DB
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getDB.bind(this)}>
          <Text style={styles.button}>
            Get DB
          </Text>
        </TouchableOpacity>
        {primaryEmail}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderHang.bind(this)}
        />
      </View>
    )
  }

  componentDidMount() {
    this.listen();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  uploadImage: {
    width: 200,
    height: 200
  }
});

export default Welcome;