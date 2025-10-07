import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  Pressable,
  Alert,
  Button,
  Linking,
  Share,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Global from "../../Global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [loaded] = useFonts({
    "Calibri Regular": require("../../assets/fonts/calibri-regular.ttf"),
    "Calibri Bold": require("../../assets/fonts/calibri-bold.ttf"),
  });

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const columns = 3;

  const getPals = async () => {
    try {
      const response = await fetch(Global.URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setOriginalData(json.content);
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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Pals captured:" +
          "\n" +
          `${selectedItems.map((secItem) => secItem).join("\n")}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getData();
    getPals();
  }, []);

  if (!loaded) {
    return null;
  }

  function search(s) {
    let arr = JSON.parse(JSON.stringify(originalData));
    setData(
      arr.filter(
        (d) => d.name.includes(s) || d.key.includes(s) || d.types.includes(s)
      )
    );
  }

  const [selectedPals, setSelectedPals] = useState(-1);

  const [selectedItems, setSelectedItems] = useState([]);

  const selectPals = (data) => {
    if (selectedItems.includes("#" + data.key + " " + data.name)) {
      //deselect
      const newListItem = selectedItems.filter(
        (dataInfo) => dataInfo !== "#" + data.key + " " + data.name
      );
      return setSelectedItems(newListItem);
    }
    setSelectedItems([...selectedItems, "#" + data.key + " " + data.name]);
    handleAsyncStorage();
  };

  const getSelected = (data) =>
    selectedItems.includes("#" + data.key + " " + data.name);
  const deselectAllItems = () => setSelectedItems([]); //reset all selections

  const [value, setValue] = useState([]);

  async function handleAsyncStorage() {
    //armazenar valor no asyncstorage
    await AsyncStorage.setItem("@App2", JSON.stringify(selectedItems));
    getData();
    console.log("itens selecionados: " + JSON.stringify(selectedItems));
  }

  async function getData() {
    const response = await AsyncStorage.getItem("@App2");
    if (response) {
      setValue(response);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#1d1d1d" />
      <Text style={[styles.header]}>Collection</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textInfo}>
          {selectedItems.length}/{originalData.length}
        </Text>
      </View>
      <View style={{ alignItems: 'center', paddingBottom: 20 }}>

        <TextInput
          placeholder="Search"
          placeholderTextColor="#ccc"
          style={styles.searchBox}
          clearButtonMode="always"
          autoCorrect={false}
          onChangeText={(s) => search(s)}
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.itemBox,
          pressed && {
            opacity: 0.8,
          },
        ]}
        onPress={() =>
          Alert.alert(
            "Collected Pals",
            `${selectedItems.map((secItem) => secItem).join("\n")}`,
            [
              {
                text: "Share",
                onPress: onShare,
              },
              {
                text: "Close",
              },
            ]
          )
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
            <View //card
              style={{
                backgroundColor:
                  selectedPals == index && selectedItems.length > -1
                    ? Global.COLOR.ORANGE
                    : Global.COLOR.CARDBACKGROUND,
                height: "100%",
                width: 100,
                borderWidth: 5,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderRadius: 10,
                margin: 5,
                elevation: 2,
              }}
            >
              <Pressable
                onPress={() => {
                  setSelectedPals(index);
                  setSelectedItems(index);
                  selectPals(item);
                  handleAsyncStorage(item);
                }}
                onLongPress={() => {
                  Linking.openURL(item.wiki);
                }}
              >
                <View style={styles.image}>
                  <Image
                    source={{ uri: `${item.imageWiki}` }}
                    style={{
                      // flex: 1,
                      width: "100%",
                      height: 75,
                      backgroundColor:
                        selectedPals == index && selectedItems.length > -1
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
                  {item.types.map((secType) => secType.name).join(" \n& ")}{" "}
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
  textInfo: {
    textAlign: "center",
    color: Global.COLOR.ORANGE,
    padding: 20,
    fontSize: 40,
  },
  searchBox: {
    // height: 50,
    width: "80%",
    color: "#fff",
    justifyContent: "center",
    backgroundColor: "#363636",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
});
