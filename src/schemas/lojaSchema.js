//Horário de expediente
export var schemaLojaExpediente = {
  dia: ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],
  aberto: ["s","s","s","s","s","s","s"],
  hrInicio: ["","","","","","",""],
  hrFim: ["","","","","","",""],
  horasExpediente: "17"
};

export var schemaLojaDadosMinimos = {
  id: "",
  nome: "",
  apelido: "",
  status: "",
  cnpj: ""
};
export var schemaLojaDados = {
  id: "",
  nome: "",
  apelido: "",
  status: "",
  cnpj: "",
  email: "",
  whatsapp: "",
  idImagemCapa: "",
};
export var schemaLojaStatus = {
  id: "",
  nome: "",
  descricao: "",
  inPermiteEdicao: false,
  dfs: [],
};
export var schemaLojaEndereco = {
  cep: "",
  localidade: "",
  uf: "",
  ddd: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
};
export var schemaLojaLocalizacao = {
  latitude: "",
  longitude: "",
  urlMapa: "",
};
export var schemaLojaHorarioFuncionamento = {
  flagSempreAberto: false, //24h por dia
  dia: ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],
  flagDiaAberto: [true,true,true,true,true,true,true],
  horaInicio: ["00:00","00:00","00:00","00:00","00:00","00:00","00:00"],
  horaFim: ["00:00","00:00","00:00","00:00","00:00","00:00","00:00"],
};
