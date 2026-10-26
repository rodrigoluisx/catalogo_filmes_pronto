import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Inicio() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.emoji}>🎬</Text>
        <Text style={styles.title}>Catálogo de Filmes</Text>
        <Text style={styles.subtitle}>
          Organize seus filmes favoritos em um só lugar.
        </Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => router.push("/consultar_filmes")}>
        <Text style={styles.buttonIcon}>📽️</Text>
        <View style={styles.buttonText}>
          <Text style={styles.buttonTitle}>Consultar filmes</Text>
          <Text style={styles.buttonSubtitle}>Ver e excluir filmes cadastrados</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => router.push("/cadastrar_filme")}>
        <Text style={styles.buttonIcon}>＋</Text>
        <View style={styles.buttonText}>
          <Text style={styles.buttonTitle}>Cadastrar filme</Text>
          <Text style={styles.buttonSubtitle}>Adicionar um novo título ao catálogo</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>

      <Text style={styles.footer}>Projeto acadêmico • React Native + Firebase</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22, justifyContent: "center", gap: 16 },
  hero: { alignItems: "center", marginBottom: 24 },
  emoji: { fontSize: 62, marginBottom: 12 },
  title: { color: "#FFFFFF", fontSize: 28, fontWeight: "800", textAlign: "center" },
  subtitle: { color: "#A7ADBC", fontSize: 15, textAlign: "center", marginTop: 10, lineHeight: 22 },
  primaryButton: { backgroundColor: "#7657F6", borderRadius: 18, padding: 18, flexDirection: "row", alignItems: "center" },
  secondaryButton: { backgroundColor: "#1B1F2A", borderWidth: 1, borderColor: "#34394A", borderRadius: 18, padding: 18, flexDirection: "row", alignItems: "center" },
  buttonIcon: { fontSize: 28, marginRight: 14, color: "#FFFFFF" },
  buttonText: { flex: 1 },
  buttonTitle: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  buttonSubtitle: { color: "#D1D4DE", fontSize: 12, marginTop: 5 },
  arrow: { color: "#FFFFFF", fontSize: 30, marginLeft: 8 },
  footer: { color: "#777F91", textAlign: "center", fontSize: 12, marginTop: 28 },
});
