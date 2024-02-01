import { StatusBar } from "expo-status-bar";
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
} from "react-native";
import React, { useEffect, useState } from "react";
import Global from "../../Global";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    "Calibri Regular": require("../../assets/fonts/calibri-regular.ttf"),
    "Calibri Bold": require("../../assets/fonts/calibri-bold.ttf"),
  });

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPals = async () => {
    try {
      const response = await fetch(Global.URL);
      const json = await response.json();
      setData(json.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPals();
  }, []);



  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1d1d1d" />
      <Text style={[styles.header]}>Palpad</Text>
      {/* <TextInput
        placeholder="Search"
        placeholderTextColor= "#ccc"
        style={styles.searchBox}
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChange={(query) => handleSearch(query)}
      /> */}

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          initialNumToRender={2}
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                Linking.openURL(item.wiki);
              }}
              style={({ pressed }) => [
                styles.itemBox,
                pressed && {
                  opacity: 0.8,
                  backgroundColor: "white",
                },
              ]}
            >
              <View style={[styles.card, styles.shadowProp]}>
                <View>
                  <Image
                    source={{ uri: `${item.imageWiki}` }}
                    style={{
                      flex: 1,
                      width: 130,
                      height: 130,
                      borderColor: Global.COLOR.BORDERCARD,
                      borderWidth: 2,
                      borderRadius: 20,
                      resizeMode: "contain",
                      alignSelf: "center",
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Calibri Bold",
                    fontSize: 30,
                    fontWeight: "bold",
                    alignSelf: "center",
                    paddingTop: 10,
                  }}
                >
                  {"Nº" + item.key} {item.name}
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Calibri Regular",
                    fontSize: 30,
                    fontWeight: "500",
                    alignSelf: "center",
                    paddingTop: 10,
                  }}
                >
                  Type:{" "}
                  {item.types.map((secType) => secType).join(" \nType²: ")}{" "}
                </Text>
                <Text style={styles.textoPals}>
                  Suitability:{" "}
                  {item.suitability
                    .map((secSuit) => secSuit.type + " Lv " + secSuit.level)
                    .join(" \n ")}{" "}
                </Text>
                <Text style={styles.textoPals}>
                  Drops: {item.drops.map((secItem) => secItem).join(" & ")}
                </Text>
                <Text style={styles.textoPals}>Aura: {item.aura.name}</Text>
                <Text style={styles.textoPals}>
                  Aura Description: {item.aura.description}
                </Text>
                <Text style={styles.textoPals}>
                  Pal Description: {item.description}
                </Text>
                <Text style={styles.textoPals}></Text>
              </View>
            </Pressable>
          )}
        />
      )}
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
    height:  50,
    justifyContent: 'center',
    backgroundColor: "#363636",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
});
