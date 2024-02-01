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
  Alert,
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

  useEffect(() => {
    getPals();
  }, []);

  if (!loaded) {
    return null;
  }

  const [selectedPals, setSelectedPals] = useState(-1);

  const [selectedItems, setSelectedItems] = useState([]);

  const handleOnLongPress = (data) => {
    setSelectedItems([...selectedItems, '#' + data.key + ' ' + data.name]);
  };

  onShowItemSelected = () => {
    const listSelected = data.filter(item => item.selected == true);
    let contentAlert = '';
    listSelected.forEach(item => {
      contentAlert = contentAlert + `${item.key}. ` + item.name + '\n';
    })
    Alert.alert("Pals Collected", {selectedItems}
    
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1d1d1d" />
      <Text style={[styles.header]}>PalDeck</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{selectedItems.length}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.itemBox,
          pressed && {
            opacity: 0.8,
          },
        ]}
        onPress={()=> 
          Alert.alert("Pals Collected" ,`${selectedItems.map((secItem) => secItem).join("\n")}`) 
        }
      >
        <Text
          style={{ fontWeight: "600", color: "white", paddingHorizontal: 20 }}
        >
          See more
        </Text>
      </Pressable>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          initialNumToRender={9}
          data={formatData(data, columns)}
          keyExtractor={({ id }) => id}
          numColumns={columns}
          columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 20,
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={[styles.card, styles.shadowProp]}>
              <Pressable
                // onPress={() => {Linking.openURL(item.wiki)}}
                style={{
                  backgroundColor:
                    selectedPals == index
                      ? Global.COLOR.ORANGE
                      : Global.COLOR.CARDBACKGROUND,
                }}
                onPress={() => {
                  setSelectedPals(index);
                  handleOnLongPress(item);
                }}

                // onLongPress={()=>handleOnLongPress(item)}
              >
                <View style={styles.image}>
                  <Image
                    source={{ uri: `${item.imageWiki}` }}
                    style={{
                      // flex: 1,
                      width: "100%",
                      height: 75,
                      backgroundColor:
                        selectedPals == index
                          ? "#fff"
                          : Global.COLOR.CARDBACKGROUND,
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
    // alignItems: "center",
    // padding: 24,
    // paddingHorizontal: 50,
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
    height: "100%", //antes era 200
    width: 100,
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
  image: {
    borderColor: Global.COLOR.BORDERCARD,
    borderWidth: 2,
    borderRadius: 10,
  },
  selecionado: {
    backgroundColor: Global.COLOR.ORANGE,
  },
  textContainer: {
    alignSelf: "center",
    marginBottom: 30,
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
