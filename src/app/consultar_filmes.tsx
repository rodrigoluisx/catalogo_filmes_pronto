import { router, useFocusEffect } from "expo-router";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../firebaseConfig";
import type { Filme } from "../types/Filme";

export default function ConsultarFilmes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useFocusEffect(useCallback(() => {
    setCarregando(true);
    setErro("");
    const filmesQuery = query(collection(db, "filmes"), orderBy("nome", "asc"));
    const unsubscribe = onSnapshot(filmesQuery, (snapshot) => {
      const lista = snapshot.docs.map((item) => {
        const dados = item.data();
        return {
          id: item.id,
          nome: String(dados.nome ?? ""),
          ano: Number(dados.ano ?? 0),
          idadeIndicativa: String(dados.idadeIndicativa ?? "Não informada"),
          genero: String(dados.genero ?? "Não informado"),
          diretor: String(dados.diretor ?? ""),
        };
      });
      setFilmes(lista);
      setCarregando(false);
    }, (error) => {
      console.error(error);
      setErro("Não foi possível carregar os filmes. Verifique a configuração e as regras do Firebase.");
      setCarregando(false);
    });
    return unsubscribe;
  }, []));

  function confirmarExclusao(filme: Filme) {
    Alert.alert("Excluir filme", `Deseja excluir "${filme.nome}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "filmes", filme.id));
          } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível excluir o filme. Confira as regras do Firebase.");
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.heading}>Meus filmes</Text>
          <Text style={styles.subheading}>{filmes.length} {filmes.length === 1 ? "filme cadastrado" : "filmes cadastrados"}</Text>
        </View>
        <Pressable style={styles.addButton} onPress={() => router.push("/cadastrar_filme")}>
          <Text style={styles.addText}>＋ Novo</Text>
        </Pressable>
      </View>

      {carregando ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#9A86FF" /><Text style={styles.message}>Carregando filmes...</Text></View>
      ) : erro ? (
        <View style={styles.center}><Text style={styles.error}>{erro}</Text></View>
      ) : (
        <FlatList
          data={filmes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={filmes.length === 0 ? styles.emptyList : styles.list}
          ListEmptyComponent={<View style={styles.center}><Text style={styles.emptyEmoji}>🍿</Text><Text style={styles.emptyTitle}>Seu catálogo está vazio</Text><Text style={styles.message}>Cadastre o primeiro filme para começar.</Text><Pressable style={styles.addButtonLarge} onPress={() => router.push("/cadastrar_filme")}><Text style={styles.addText}>Cadastrar primeiro filme</Text></Pressable></View>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.poster}><Text style={styles.posterText}>▶</Text></View>
                <View style={styles.movieInfo}>
                  <Text style={styles.movieTitle}>{item.nome}</Text>
                  <Text style={styles.year}>{item.ano} • {item.genero}</Text>
                </View>
                <Pressable accessibilityLabel={`Excluir ${item.nome}`} style={styles.deleteButton} onPress={() => confirmarExclusao(item)}>
                  <Text style={styles.deleteText}>Excluir</Text>
                </Pressable>
              </View>
              <View style={styles.divider} />
              <Text style={styles.detail}><Text style={styles.detailLabel}>Diretor: </Text>{item.diretor}</Text>
              <Text style={styles.detail}><Text style={styles.detailLabel}>Classificação: </Text>{item.idadeIndicativa}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 18, paddingTop: 20 },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  heading: { color: "#FFFFFF", fontSize: 25, fontWeight: "800" },
  subheading: { color: "#A7ADBC", marginTop: 5, fontSize: 13 },
  addButton: { backgroundColor: "#7657F6", paddingHorizontal: 14, paddingVertical: 11, borderRadius: 11 },
  addButtonLarge: { backgroundColor: "#7657F6", paddingHorizontal: 18, paddingVertical: 13, borderRadius: 11, marginTop: 20 },
  addText: { color: "#FFFFFF", fontWeight: "700" },
  list: { paddingBottom: 30, gap: 12 },
  emptyList: { flexGrow: 1, justifyContent: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  message: { color: "#A7ADBC", textAlign: "center", marginTop: 10, lineHeight: 21 },
  error: { color: "#FF8B8B", textAlign: "center", lineHeight: 22 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { color: "#FFFFFF", fontSize: 19, fontWeight: "700" },
  card: { backgroundColor: "#1B1F2A", borderColor: "#303648", borderWidth: 1, borderRadius: 16, padding: 15 },
  cardTop: { flexDirection: "row", alignItems: "center" },
  poster: { width: 42, height: 52, backgroundColor: "#30265E", borderRadius: 9, alignItems: "center", justifyContent: "center", marginRight: 12 },
  posterText: { color: "#BEB2FF", fontSize: 20 },
  movieInfo: { flex: 1 },
  movieTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  year: { color: "#B1B6C5", fontSize: 12, marginTop: 5 },
  deleteButton: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, backgroundColor: "#48232C" },
  deleteText: { color: "#FF9DA9", fontSize: 12, fontWeight: "700" },
  divider: { height: 1, backgroundColor: "#34394A", marginVertical: 12 },
  detail: { color: "#D1D4DE", fontSize: 13, marginTop: 3, lineHeight: 19 },
  detailLabel: { color: "#929AAC", fontWeight: "600" },
});
