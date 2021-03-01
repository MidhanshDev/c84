import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: "",
      reasonToRequest: "",
    };
  }
  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  addRequest = (bookName, reasonToRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("requested_books").add({
      user_Id: userId,
      book_name: bookName,
      reason_to_request: reasonToRequest,
      request_id: randomRequestId,
    });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Request Book" navigation={this.props.navigation} />
        <KeyboardAvoidingView style={styles.keyboardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder="Enter Book Name"
            onChangeText={(text) => {
              this.setState({
                bookName: text,
              });
            }}
            value={this.state.bookName}
          />
          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            placeholder="Why do You Need The Book"
            onChangeText={(text) => {
              this.setState({
                reasonToRequest: text,
              });
            }}
            value={this.state.reasonToRequest}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.bookName, this.state.reasonToRequest);
            }}
          >
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <Text>Book Request</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  keyboardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#b46",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    backgroundColor: "#844794",
  },
});
