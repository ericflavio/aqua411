export const schemaLojaDadosBasicos = {
  id: "",
  nome: "",
  apelido: "",
  status: "",
  cnpj: ""
};
export const schemaLojaDadosComplementares = {
  id: "",
  nome: "",
  apelido: "",
  status: "",
  cnpj:"",
  imagem:"",
};
export const schemaLojaStatus = {
  id: "",
  nome: "",
  descricao: "",
  inPermiteEdicao: false,
  dfs: [],
};
export const schemaLojaEndereco = {
  cep: "",
  localidade: "",
  uf: "",
  ddd: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
};
export const schemaLojaLocalizacao = {
  latitude: "",
  longitude: "",
  urlMapa: "",
};
export const schemaLojaHorarioFuncionamento = {
  flagSempreAberto: false, //24h por dia
  dia: ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],
  flagDiaAberto: [true,true,true,true,true,true,true],
  horaInicio: ["00:00","00:00","00:00","00:00","00:00","00:00","00:00"],
  horaFim: ["00:00","00:00","00:00","00:00","00:00","00:00","00:00"],
};
