import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Linking } from "react-native";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    "Calibri Regular": require("./assets/fonts/calibri-regular.ttf"),
  });

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPals = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.12:8080/?page=1&limit=150"
      );
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

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={[styles.header]}>Proto Palpédia</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          initialNumToRender={2}
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={[styles.card, styles.shadowProp]}>
              <Text style={styles.textoPals}>
                Nome: {item.name} {"\n"}
                Tipo: {item.types} {"\n"}
                Serventia:{" "}
                {item.suitability
                  .map((secSuit) => secSuit.type + " Lv " + secSuit.level)
                  .join(" & ")}{" "}
                {"\n"}
                Itens dropados:{" "}
                {item.drops.map((secItem) => secItem).join(" & ")} {"\n"}
                Aura: {item.aura.name} {"\n"}
                Descrição da Aura: {item.aura.description} {"\n"}
              </Text>
              <TouchableOpacity
                onPress={() => {Linking.openURL(item.wiki)}}
              >
                <Image
                  source={{ uri: `${item.imageWiki}` }}
                  style={{
                    flex: 1,
                    width: 280,
                    height: 280,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>

              {/* Essa view de botão pra fazer alguma coisa com cada card, pode ser um check pra marcar o card */}
              {/* <View> 
              <Button title='Check' onPress={() => Alert.alert('Este botão deve carregar a próxima página!')}/>

            </View> */}
            </View>
          )}
        />
      )}
      {/* View de Próxima Página e Retroceder */}
      {/* <View style={styles.viewButton}>
        <Button
          title="Próxima Página"
          onPress={() =>
            Alert.alert("Este botão deve carregar a próxima página!")
          }
        />

        <Button
          title="Retornar"
          onPress={() =>
            Alert.alert("Este botão deve carregar a página anterior!")
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  header: {
    color: "#d1861a",
    // borderColor: "#402c4a",
    marginTop: 10,
    fontFamily: "Calibri Regular",
    fontSize: 30,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#1795d3",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 10,
    padding: 12,
    marginTop: 30,
    elevation: 2,
  },
  shadowProp: {
    shadowColor: "#050c12",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textoPals: {
    color: "#000",
    fontFamily: "Calibri Regular",
    fontSize: 23,
  },
  viewButton: {
    paddingTop: 10,
    flexDirection: "row",
    gap: 50,
  },
});
