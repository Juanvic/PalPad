import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Sobre() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Créditos</Text>
        <Text style={styles.subtitle}>Juan Almeida desevolvedor do app</Text>
        <Text>Todos os créditos para o criador da api</Text>
        <Link href='/'>Clica aqui para voltar</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
