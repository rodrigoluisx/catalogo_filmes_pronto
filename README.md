# Catálogo de Filmes — React Native + Expo + Firebase

Aplicativo acadêmico com consulta, cadastro e exclusão de filmes usando Firebase Cloud Firestore.

## Requisitos
- Node.js LTS
- Conta Google para acessar o Firebase
- Expo Go no celular ou emulador Android

## 1. Instalar dependências
Abra a pasta do projeto no terminal e execute:

```bash
npm install
```

## 2. Configurar o Firebase
1. Entre em https://console.firebase.google.com/
2. Crie um projeto.
3. Adicione um aplicativo Web (ícone `</>`).
4. Copie as configurações do Firebase.
5. Abra `src/firebaseConfig.ts` e substitua os valores de exemplo pelas suas credenciais.
6. No Firebase Console, entre em **Firestore Database** e crie um banco de dados.

O app usa a coleção `filmes`; ela é criada automaticamente quando o primeiro filme é cadastrado.

### Regras de teste do Firestore
Para testar rapidamente em um projeto acadêmico, configure as regras do Firestore pelo console. Não deixe o banco público em produção. As regras de segurança dependem de como o professor espera que a autenticação seja feita.

## 3. Executar
```bash
npx expo start
```
Escaneie o QR Code com o Expo Go ou pressione `a` para abrir no emulador Android.

## Funcionalidades
- Tela inicial com atalhos.
- Listagem em tempo real dos filmes salvos.
- Cadastro com nome, ano, classificação indicativa, gênero e diretor.
- Exclusão com confirmação.
- Dados persistidos no Firebase Firestore.

## 4. Publicar no GitHub
Crie um repositório vazio no GitHub. No terminal, dentro desta pasta:

```bash
git init
git add .
git commit -m "Cria catálogo de filmes com Firebase"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Troque o endereço do `git remote` pelo endereço real do seu repositório.
