let map;
let markers = [];

// Espera até o DOM estar pronto para inicializar o mapa
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
});

// Função verifucação e inicialização do mapa
export function initializeMap() {
    // Verifica se o mapa já foi inicializado.
    if(map) {
        return; // Se já estiver inicializado, não faz nada.
    }

    // Futuramente, subir um random de cordenadas de pontos turísticos ao ivés de um fixo.
    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    
}


export function plotOnMap(addresses) {
    // Limpa os marcadores antigos
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Adiciona novos marcadores
    addresses.forEach(addr => {
        if (addr.lat && addr.lng) {
            const marker = L.marker([addr.lat, addr.lng]).addTo(map);
            marker.bindPopup(addr.rawAddress).openPopup(); // Popup com o endereço original
            markers.push(marker);
        }
    });

    // Ajusta o zoom
    const validCoordinates = addresses.filter(addr => addr.lat && addr.lng);
    if (validCoordinates.length > 1) {
        const bounds = validCoordinates.map(addr => [addr.lat, addr.lng]);
        map.fitBounds(bounds);
    } else if (validCoordinates.length === 1) {
        map.setView([validCoordinates[0].lat, validCoordinates[0].lng], 13);
    }
}