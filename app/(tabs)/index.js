import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Linking } from "react-native";
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
      <Text style={[styles.header]}>Palpédia</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          initialNumToRender={2}
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={[styles.card, styles.shadowProp]}>
              <View style={styles.image}>
                <Pressable
                  onPress={() => {Linking.openURL(item.wiki)}}
                  style={({ pressed }) => [
                    styles.itemBox,
                    pressed && {
                      opacity: 0.8,
                      backgroundColor: 'white'
                    },
                  ]}
                >
                  <Image
                    source={{ uri: `${item.imageWiki}` }}
                    style={{
                      flex: 1,
                      width: 200,
                      height: 200,
                      resizeMode: "contain",
                      alignSelf: 'center'
                    }}
                  />
                </Pressable>

              </View>
              <Text style={styles.textoPals}>
                Nome: {item.name} {"\n"}
                Tipo:{" "}
                {item.types.map((secType) => secType).join(" & ")} {"\n"}
                Serventia:{" "}
                {item.suitability
                  .map((secSuit) => secSuit.type + " Lv " + secSuit.level)
                  .join(" & ")}{" "}
                {"\n"}
                Drops:{" "}
                {item.drops.map((secItem) => secItem).join(" & ")} {"\n"}
                Habilidade: {item.aura.name} {"\n"}
                Descrição da Habilidade: {item.aura.description} {"\n"}
              </Text>

              {/* Essa view de botão pra fazer alguma coisa com cada card, pode ser um check pra marcar o card */}
              {/* <View style={styles.viewButton}> 
                <Button title='✓' color={('#d1861a')} onPress={() => Alert.alert('Este botão deve carregar a próxima página!')}/>
                <Button title='✖' color={('gray')} onPress={() => Alert.alert('Este botão deve carregar a próxima página!')}/>
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
    fontFamily: "Calibri Bold",
    fontSize: 30,
    fontWeight: 500,
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
    paddingTop: 5,
  },
  viewButton: {
    paddingTop: 10,
    alignSelf: 'center',
    flexDirection: "row",
    gap: 50,
  },
  image: {
    borderColor: '#a8c4c8',
    borderWidth: 2,
    borderRadius: 20

  },
});
