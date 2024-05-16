//Nota: Esta é a primeira task de execução do APP, antes de tudo. E a próxima
//task, por ele invocada, é a de Contexto, e por fim as rotas/páginas.
import AuthProvider from '../contexts/auth';
import AppRoutes from '../routes/appRoutes';

//Seta a rota inicial
/* export const unstable_settings = {
  initialRouteName: "index",
};
 */
export default function RootLayout() {
  console.log("_layout:Rota principal do app")

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
