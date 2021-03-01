import React from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View } from "react-native";
import db from "../config";


export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  getNumberOfUnreadNotification = () => {
    db.collection("all_notifications")
      .where("notification_status", "==", "unread")
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => doc.data());
        this.setState({
          value: unreadNotifications.length,
        });
      });
  };
  componentDidMount() {
    this.getNumberOfUnreadNotification();
  }
  BellIconWithBadge = () => {
    return (
      <View>
        <Icon
          name="bell"
          type="entypo"
          color="#328937"
          size={25}
          onPress={() => this.props.navigation.navigate("Notifications")}
        />
        <Badge
          value={this.state.value}
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
      </View>
    );
  };
  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="#328937"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: { color: "#fff", fontSize: 20, fontWeight: "bold" },
        }}
        rightComponent={<this.BellIconWithBadge {...this.props} />}
        backgroundColor="#475867"
      />
    );
  }
}
