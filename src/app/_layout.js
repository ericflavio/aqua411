//Nota: Esta é a primeira task de execução do APP, antes de tudo. E a próxima
//task, por ele invocada, é a de Contexto, e por fim as rotas/páginas.
import AuthProvider from '../contexts/auth';
import { Slot } from 'expo-router';

//Slot => representa todas as rotas filhas (childrens)
export default function RootLayout() {
  console.log("_layout_root <iniciando o app>");
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}
