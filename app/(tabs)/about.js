import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import React, {useState, useContext} from "react";
import Global from "../../Global";

export default function Sobre() {


  return (
    <View style={[styles.container, {backgroundColor: '#1d1d1d'}]}>
      <View style={styles.main}>
        <Text style={[styles.title, {color: '#fff'}]}>Credits</Text>
        <Text style={[styles.subtitle, {color: '#fff'}]}>Juan Almeida the developer</Text>
        <Link style={{fontStyle: 'italic', color: Global.COLOR.LIGHTBLUE, fontSize: 25}} href='https://bsky.app/profile/juanvic.bsky.social' >@juanvic on Bluesky</Link>
        <Text style={[{color:'#fff', fontSize: 25}]}>Victor Eyer is the api developer</Text>
        <Link style={[{ fontWeight: "bold", fontStyle: 'italic', color: '#fff', fontSize: 25}]} href='https://github.com/mlg404/palworld-paldex-api'>Api's github</Link>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#292929',
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
