// Função para formatar e codificar o endereço
function formatedAddress() {

        // Obter o valor do campo de entrada
        const address = document.getElementById('address').value;
        // se os valores forem vazios, deixar o campo vermelho!
        
        // Remover espaços extras e garantir que haja apenas um espaço entre as palavras e substitui múltiplos espaços por um único.
        const adress = encodeURIComponent(address.trim().replace(/\s+/g, ' '));

        fetch(`https://geocode.xyz/?region=BR&geoit=JSON&locate=${adress}&auth=1383418226983017451x25062`)
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
            // retorno Latitude: -23.68293 Longitude: -46.46344
            // Depois é salvar no array e alimentar o mapa, mas definir sequenia de array e replicar entre user e array a mesma sequencia de endereços.
      }




      // Salvar e mostra isso via placerolder ao user
        // const number = document.querySelector('#number');
        // const street = document.querySelector('#street');
        // const city = document.querySelector('#city');
        // const country = document.querySelector('#country');

