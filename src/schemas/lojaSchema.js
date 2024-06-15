//Horário de expediente
export var schemaLojaExpediente = {
  dia: ["Seg","Ter","Qua","Qui","Sex","Sab","Dom"],
  aberto: ["s","s","s","s","s","s","s"],
  hrInicio: ["","","","","","",""],
  hrFim: ["","","","","","",""],
  inPermanentementeAberto: true,
  inAtendeChamadosForaDoExpediente: false, 
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