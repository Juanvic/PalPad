import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Global from "../Global";
import { StatusBar } from "expo-status-bar";
import api from "../api";

export interface Pal {
  id: number;
  key: string;
  name: string;
  description: string;
  // types: TypesEnum[];
  suitabilities?: string[];
  // suitability: ISuitability[];
  drops?: string[];
  image?: string;
  // aura: IAura;
  wiki?: string;
  // skills: ISkill[];
  // stats: IStats;
  asset?: string;
  genus?: string;
  rarity?: number;
  price?: number;
  size?: "l" | "xl" | "xs" | "m" | "s";
  // breed: IBreedMeta;
}

export default function Index() {
  
  const [infoPal, setInfoPal] = useState<Pal[]>([]);
  const [searchPalName, setSearchPalName] = useState("");


  const fetchData = async () => {
    try {
      const response = await api.get('?page=1&limit=10&name=Relaxaurus');
      const data = response.data;
      console.log(data);
      
      setInfoPal(data);
      // console.log("Infopal: "+ infoPal.content[0].name);
      // console.log(infoPal.name);
      
    } catch (error: any) {
      console.log(error);
      
    } finally {
    }

  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light"/>
      <Text style={[styles.header]}>Palpad</Text>
      <TextInput
        value={searchPalName}
        onChangeText={(text) => setSearchPalName(text)}
        onChange={fetchData}
        placeholder="Search"
        placeholderTextColor="#ccc"
        style={styles.searchBox}
        clearButtonMode="always"
        autoCorrect={false}
        //onChangeText={(s) => search(s)}
        // value={searchQuery}
        // onChange={handleAsyncStorage}
        // onChangeText={(value) => setSearchQuery(value)}
      />

      
      
      {/* <Text style={styles.text}>{"Nº" + infoPal.content[0].key} {infoPal.content[0].name} </Text> */}
      {/* <Text style={styles.text}> {infoPal[0].name} </Text> */}
      <Text style={styles.text}> Texto base </Text>



      <Text style={styles.text}>Number: {infoPal[0].key}</Text>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Global.COLOR.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  text: {
    color: '#fff',
  },
  header: {
    color: Global.COLOR.ORANGE,
    fontFamily: "Calibri Bold",
    fontSize: 30,
    fontWeight: 500,
    alignSelf: "center",
  },
  card: {
    backgroundColor: Global.COLOR.CARDBACKGROUND,
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 10,
    padding: 12,
    marginTop: 30,
    elevation: 2,
    maxWidth: 280,
  },
  shadowProp: {
    shadowColor: Global.COLOR.SHADOW,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textoPals: {
    color: "#fff",
    fontFamily: "Calibri Regular",
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
    paddingTop: 10,
  },
  viewButton: {
    paddingTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    gap: 50,
  },
  searchBox: {
    height: 50,
    width: '75%',
    color: "#fff",
    justifyContent: "center",
    backgroundColor: "#363636",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
});