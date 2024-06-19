//Franquia
export var schemaFranquiaDados = {
  idFranquia: "",
  idUsuarioProprietario: "",
  nome: "",
  cnpj: "",
  whatsapp: "",
  siteUrl: "",
  frasePrincipal: "",
  fraseSecundaria: "",
  uriLogotipo: "",
  dataConstituicao: '00/00/0000',
  idUsuarioCadastramento: "",
  idUsuarioAtualizacao: "",
};
//Lista de franquias
export var schemaFranquiaDadosLista = {
  idFranquia: "",
  nome: "",
  frasePrincipal: "",
  fraseSecundaria: "",
  uriLogotipo: "",
};
//Ingerência: permissões sobre as lojas vinculadas
export var schemaFranquiaIngerenciaSobreLojas = {
  inPermiteVerStatusMaquinas: false,
  inPermiteVerCameras: false,
  inPermiteComercializarCreditos: true, //Comprar créditos
};
//Solicitacoes de vinculos pelos lojistas
export var schemaFranquiaSolicitacaoVinculos = {
  idLojaSolicitante: '',
  idSolicitante: '',
  dataSolicitacao: '00/00/0000',
  dataAnaliseVinculo: '00/00/0000', //Quando foi aprovado ou reprovada
  dataRemocaoVinculo: '00/00/0000', //Quando vinculo foi desfeito
  status: '', //[Solicitado, Aprovado, Reprovado, Removido]
};