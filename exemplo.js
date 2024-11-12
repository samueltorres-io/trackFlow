const addressData = {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "unidade": "",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "estado": "São Paulo",
    "regiao": "Sudeste",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
  };
  
  const address = `${addressData.logradouro}, ${addressData.bairro}, ${addressData.localidade}, ${addressData.uf}, ${addressData.cep}`;
  
  fetch(`https://geocode.xyz/${encodeURIComponent(address)}?json=1`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Erro na geocodificação:', data.error.description);
      } else {
        const latitude = data.latt;
        const longitude = data.longt;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      }
    })
    .catch(error => console.error('Erro na solicitação:', error));
  


    // int: 92 String: CARLOS MARIO RIMAZZA, String: Mauá, String: Brasil
    // {numero, rua, cidade, pais} = 0,9 de pontuação de confiança.
    // inlatt": "-23.68293", "inlongt": "-46.46344"
    // "alt": {
    // "loc": {
    //   "staddress": "RUA CARLOS MARIO RIMAZZA",
    //   "stnumber": "450",
    //   "postal": "09360-500",
    //   "latt": "-23.68293",
    //   "city": "Mauá",
    //   "prov": "SP",
    //   "longt": "-46.46344",
    //   "class": {}
    //   }
    //  },


    // https://geocode.xyz/92,Hauptstr.,+57632+Berzhausen

    // stnumber " :  {92}
    //  endereço " :  " Hauptstraße "
    //  postal " :  " 57632 "
    //  cidade " :  " Berzhausen "

    //https://geocode.xyz/450,CARLOS+MARIO+RIMAZZA,Maua,Brasil&auth=1383418226983017451x25062



//     Parâmetros de saída esperados
// Nome do parâmetro	Descrição	Valores de saída esperados
// nome	O nome completo da rua.	Corda.
// cidades	Os nomes das cidades para cada rua	Uma variedade de nomes de cidades.
// cidade	nome da cidade	Um único nome de cidade.
// publicar	o posto ou código postal	Um único código postal ou CEP.
// rua	nome da rua	Um único nome de rua.
// num	número da rua	Um único número de rua.
// pontuação	A pontuação do ranking da partida. Quanto maior o número, melhor a partida	Um único número.


// https://geocode.xyz/?region=BR&geoit=JSON&stnumber=450&streetname=Carlos+Mario+Rimazza&cityname=Maua


// const axios = require('axios');
// const parâmetros = {
//   auth: 'seu código de autenticação',
//   localize: 'Stora Torget 1, 582 19 Linkoping',
//   json: '1'
// }

// axios.get('https://geocode.xyz', {params})
//   .então(resposta => {
//     console.log(resposta.dados);
//   }).catch(erro => {
//     console.log(erro);
//   });



// https://geocode.xyz/?region=BR&geoit=JSON&locate=450%20Carlos%20mario%20rimazza%20maua%20brasil




// Na construção de

// ?(indica o início dos
// &(separar
// =(associar chave e valor nos parâmetros),
// #(indica um fragmento
// /(s
// Como o espaço não%20. Écodificação percentual (ou **URLCodificação de URL ), que

// Exem
// Espaço ( ) :%20
// Mais ( +) :%2B
// E comercial ( &) :%26
// Ponto de interrogação ( ?) :%3F
// Por exemplo, se você quiser enviar o endereço"450 Carlos mario rimazza maua brasil"em você%20, como

// Isento
// Endereço original:


// Copiar código
// 450 Carlos mario rimazza maua brasil
// Endereço enviado em URL:

// perl

// Copiar código
// 450%20Carlos%20mario%20rimazza%20maua%20brasil