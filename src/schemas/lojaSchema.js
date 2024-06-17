//Franquia vinculada à loja
export var schemaLojaFranquiaVinculada = {
  //Setado pelo franqueado
  idFranquia: "",
  dataVinculo: '00/00/0000', //Data que o franqueado criou o vinculo
  //Setado pelo franqueador
  dataInicioVinculoConfirmado: "00/00/0000",
  dataFimVinculoConfirmado: '00/00/0000',
  dataRegistroInicioVinculo: "00/00/0000",
  dataRegistroFimVinculo: '00/00/0000',
  idUsuarioConfirmacao: '',
  status: '', //[Solicitado, Aprovado, Reprovado, Removido]
};

//Horário de expediente
export var schemaLojaExpediente = {
  dia: ["Seg","Ter","Qua","Qui","Sex","Sab","Dom"],
  aberto: ["s","s","s","s","s","s","s"],
  hrInicio: ["","","","","","",""],
  hrFim: ["","","","","","",""],
  inPermanentementeAberto: true,
  inAtendeChamadosForaDoExpediente: false, 
};

//Dados mínimos e complementares
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

//Status 
export var schemaLojaStatus = {
  id: "",
  nome: "",
  descricao: "",
  inPermiteEdicao: false,
  dfs: [],
};

//Endereço
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

//Localização
export var schemaLojaLocalizacao = {
  latitude: "",
  longitude: "",
  urlMapa: "",
};