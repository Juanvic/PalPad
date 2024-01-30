import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  Linking,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import Global from "../../Global";

export default function App() {
  const [loaded] = useFonts({
    "Calibri Regular": require("../../assets/fonts/calibri-regular.ttf"),
    "Calibri Bold": require("../../assets/fonts/calibri-bold.ttf"),
  });

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const columns = 3;

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

  const formatData = (data, columns) => {
    const numberOfFullRows = Math.floor(data.length / columns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * columns;
    while (
      numberOfElementsLastRow !== columns &&
      numberOfElementsLastRow == 0
    ) {
      numberOfElementsLastRow++;
    }

    return data;
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    getPals();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1d1d1d" />
      <Text style={[styles.header]}>PalDeck</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{count}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          initialNumToRender={9}
          data={formatData(data, columns)}
          keyExtractor={({ id }) => id}
          numColumns={columns}
          renderItem={({ item }) => (
            <View style={[styles.card, styles.shadowProp]}>
              <Pressable
                // onPress={() => {Linking.openURL(item.wiki)}}
                onPress={() => setCount(count + 1)}
                onLongPress={() => {
                  setCount(count - 1);
                }}
                style={({ pressed }) => [
                  styles.itemBox,
                  pressed && {
                    opacity: 0.8,
                    backgroundColor: pressed ? "orange" : "green",
                  },
                ]}

              >
                <View style={styles.image}>
                  <Image
                    source={{ uri: `${item.imageWiki}` }}
                    style={{
                      flex: 1,
                      width: 75,
                      height: 75,
                      // backgroundColor: 'white',
                      resizeMode: "contain",
                      alignSelf: "center",
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Calibri Bold",
                    fontWeight: "bold",
                    alignSelf: "center",
                    paddingTop: 10,
                  }}
                >
                  {item.name}
                  {"\n"}
                  {"Nº" + item.key}
                </Text>
                <Text style={styles.textoPals}>
                  Type:{" "}
                  {item.types.map((secType) => secType).join(" \nType²: ")}{" "}
                  {"\n"}
                </Text>

                {/* View de check pra marcar o card */}
                {/* <View style={styles.viewButton}> 
                <Button title='✓' color={('#d1861a')} onPress={() => Alert.alert('Este botão deve carregar a próxima página!')}/>
                <Button title='✖' color={('gray')} onPress={() => Alert.alert('Este botão deve carregar a próxima página!')}/>
              </View> */}
              </Pressable>
            </View>
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
    padding: 24,
    paddingHorizontal: 50,
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
    maxWidth: 150,
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 10,
    margin: 5,
    elevation: 2,
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
    alignSelf: "center",
    fontSize: 15,
    paddingTop: 5,
  },
  viewButton: {
    paddingTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    gap: 50,
  },
  image: {
    borderColor: Global.COLOR.BORDERCARD,
    borderWidth: 2,
    borderRadius: 10,
  },
  selecionado: {
    tintColor: "red",
    backgroundColor: Global.COLOR.ORANGE,
  },
  textContainer: {
    alignSelf: "center",
    marginBottom: 50,
    borderBottomColor: Global.COLOR.DARKGRAY,
    borderBottomWidth: 2,
  },
  text: {
    textAlign: "center",
    color: Global.COLOR.ORANGE,
    padding: 20,
    fontSize: 40,
  },
});
