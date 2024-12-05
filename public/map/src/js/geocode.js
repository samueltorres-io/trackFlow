export async function geocodeAddress(address) {
    // formata o endereço removendo espaços e substituindo por %20% para a API receber sem erros.
    const formattedAddress = encodeURIComponent(address.trim().replace(/\s+/g, ' '));
    console.log(formattedAddress);

    try {
        // API do Nominatim | Não precisa de token | Fazer seg. verificação com a geocode, pois se não encontrar endereço via Nominatim, puxa via geocode de forma async.
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${formattedAddress}&format=json&addressdetails=1&limit=1`);
        const data = await response.json();
        console.log(data);

        // função async do endereço para geocode deve ser desenvolvida em paralelo com a request do nominatim. | Preferencia sempre da Nominatim. seguiremos assim!!!!

        if (data.length === 0) {
            throw new Error('Endereço não encontrado');
            // Fazer o Placeholder em vermelho dizendo que o endereço não foi encontrado!!!
        }

        const addressData = data[0];
        const address = `${addressData.address.house_number || ''} ${addressData.address.road || ''}, ${addressData.address.city || ''}, ${addressData.address.country || ''}`;
        const formattedAddressResult = {
            lat: parseFloat(addressData.lat),
            lng: parseFloat(addressData.lon)
        };

        // Retorna o resultado formatado
        console.log(formattedAddressResult);
        return formattedAddressResult;
    } catch (error) {
        console.error('Erro na solicitação:', error);
        throw error; // Repassa o erro para ser tratado no main.js
    }
}