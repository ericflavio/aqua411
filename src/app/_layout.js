//Nota: Esta é a primeira task de execução do APP, antes de tudo. E a próxima
//task, por ele invocada, é a de Contexto, e por fim as rotas/páginas.

import AuthProvider from '../contexts/auth';
import AppRoutes from '../routes/appRoutes';
import { Stack } from "expo-router";
import { myStylesComuns } from '../styles/stylesComuns';

export default function RootLayout() {
  //console.log("_layout:Rota principal do app")

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: myStylesComuns.corCinzMedio,
          tabBarActiveTintColor: myStylesComuns.corTemaAppSecundario,
          tabBarShowLabel: true,
        }} >

        <Stack.Screen name="splash/index" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="(main)" />

      </Stack>
    </AuthProvider>
  )
}
