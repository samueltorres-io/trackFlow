// Função para formatar e geocodificar o endereço
export async function geocodeAddress(address) {
    // Valida e formata o endereço
    const formattedAddress = encodeURIComponent(address.trim().replace(/\s+/g, ' '));

    try {
        // Faz a solicitação à API do Nominatim
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${formattedAddress}&format=json&addressdetails=1&limit=1`);
        const data = await response.json();

        // Verifica se a resposta da API contém dados válidos
        if (data.length === 0) {
            throw new Error('Endereço não encontrado');
        }

        // Extrai o endereço simples e as coordenadas
        const addressData = data[0];
        const address = `${addressData.address.house_number || ''} ${addressData.address.road || ''}, ${addressData.address.city || ''}, ${addressData.address.country || ''}`;
        const formattedAddressResult = {
            lat: parseFloat(addressData.lat),
            lng: parseFloat(addressData.lon)
        };

        // Retorna o resultado formatado
        return formattedAddressResult;
    } catch (error) {
        console.error('Erro na solicitação:', error);
        throw error; // Repassa o erro para ser tratado no main.js
    }
}
