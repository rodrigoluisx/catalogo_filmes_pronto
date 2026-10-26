import { router } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable,
  ScrollView, StyleSheet, Text, TextInput, View
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { db } from "../firebaseConfig";

const GENEROS = ["Ação", "Animação", "Aventura", "Comédia", "Documentário", "Drama", "Fantasia", "Ficção científica", "Romance", "Suspense", "Terror", "Outro"];
const CLASSIFICACOES = ["Livre", "10 anos", "12 anos", "14 anos", "16 anos", "18 anos"];

export default function CadastrarFilme() {
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState(String(new Date().getFullYear()));
  const [idadeIndicativa, setIdadeIndicativa] = useState("Livre");
  const [genero, setGenero] = useState("Ação");
  const [diretor, setDiretor] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    const nomeLimpo = nome.trim();
    const diretorLimpo = diretor.trim();
    const anoNumero = Number(ano);
    const anoAtual = new Date().getFullYear();

    if (!nomeLimpo || !diretorLimpo || !ano.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha o nome, o ano e o diretor.");
      return;
    }
    if (!Number.isInteger(anoNumero) || anoNumero < 1888 || anoNumero > anoAtual + 10) {
      Alert.alert("Ano inválido", `Informe um ano entre 1888 e ${anoAtual + 10}.`);
      return;
    }

    try {
      setSalvando(true);
      await addDoc(collection(db, "filmes"), {
        nome: nomeLimpo,
        ano: anoNumero,
        idadeIndicativa,
        genero,
        diretor: diretorLimpo,
        criadoEm: serverTimestamp(),
      });
      Alert.alert("Sucesso", "Filme cadastrado no Firebase!", [
        { text: "OK", onPress: () => router.replace("/consultar_filmes") },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao salvar", "Não foi possível salvar. Confira a configuração e as regras do Firebase.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Novo filme</Text>
        <Text style={styles.description}>Preencha os dados para adicionar ao catálogo.</Text>

        <Text style={styles.label}>Nome do filme *</Text>
        <TextInput value={nome} onChangeText={setNome} placeholder="Ex.: Interestelar" placeholderTextColor="#737B8C" style={styles.input} />

        <Text style={styles.label}>Ano de lançamento *</Text>
        <TextInput value={ano} onChangeText={setAno} placeholder="Ex.: 2014" placeholderTextColor="#737B8C" keyboardType="number-pad" maxLength={4} style={styles.input} />

        <Text style={styles.label}>Idade indicativa</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={idadeIndicativa} onValueChange={setIdadeIndicativa} dropdownIconColor="#FFFFFF" style={styles.picker}>
            {CLASSIFICACOES.map((item) => <Picker.Item key={item} label={item} value={item} color="#111111" />)}
          </Picker>
        </View>

        <Text style={styles.label}>Gênero</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={genero} onValueChange={setGenero} dropdownIconColor="#FFFFFF" style={styles.picker}>
            {GENEROS.map((item) => <Picker.Item key={item} label={item} value={item} color="#111111" />)}
          </Picker>
        </View>

        <Text style={styles.label}>Diretor *</Text>
        <TextInput value={diretor} onChangeText={setDiretor} placeholder="Ex.: Christopher Nolan" placeholderTextColor="#737B8C" style={styles.input} />

        <Pressable style={[styles.button, salvando && styles.disabled]} onPress={salvar} disabled={salvando}>
          {salvando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Salvar filme</Text>}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  heading: { color: "#FFFFFF", fontSize: 25, fontWeight: "800" },
  description: { color: "#A7ADBC", marginTop: 6, marginBottom: 22 },
  label: { color: "#E5E7EF", fontWeight: "600", marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: "#1B1F2A", color: "#FFFFFF", borderColor: "#34394A", borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15 },
  pickerWrap: { backgroundColor: "#1B1F2A", borderColor: "#34394A", borderWidth: 1, borderRadius: 12, overflow: "hidden" },
  picker: { color: "#FFFFFF" },
  button: { backgroundColor: "#7657F6", borderRadius: 12, padding: 16, alignItems: "center", marginTop: 28 },
  disabled: { opacity: 0.65 },
  buttonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
});
