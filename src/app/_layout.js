//Nota: Esta é a primeira task de execução do APP, antes de tudo. E a próxima
//task, por ele invocada, é a de Contexto, e por fim as rotas/páginas.
import AuthProvider from '../contexts/auth';
import { Slot } from 'expo-router';

//Seta a rota inicial. Obs: não é necessário colocar "(main)"
export const unstable_settings = {
  initialRouteName: "/home/index",
};

//Slot => representa todas as rotas filhas (childrens)
export default function RootLayout() {
  console.log("_layout:Rota principal do app")

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}
