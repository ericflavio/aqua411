//Nota: Esta é a primeira task de execução do APP, antes de tudo. E a próxima
//task, por ele invocada, é a de Contexto, e por fim as rotas/páginas.
import AuthProvider from '../contexts/auth';
import { Slot } from 'expo-router'; //Encapsula todo o conteúdo de rotas. A main/index é a default

//Slot => representa todas as rotas filhas (childrens)
export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}
