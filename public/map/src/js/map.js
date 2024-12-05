let map;
let markers = [];

// Inicialização do mapa | Erros na main por falta de inicialização prévia como primeira função a ser declarada e chamada em todos os aqruivos do folder map.
export function initializeMap() {
    if (map) return;

    map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
}

// Plota os marcadores no mapa | Personalizar os marcadores e adicionar raio('circulo') da precisão do marcador.
export function plotOnMap(addresses) {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    addresses.forEach(addr => {
        if (addr.lat && addr.lng) {
            const marker = L.marker([addr.lat, addr.lng]).addTo(map);
            marker.bindPopup(addr.rawAddress).openPopup();
            markers.push(marker);
        }
    });

    const validCoordinates = addresses.filter(addr => addr.lat && addr.lng);
    if (validCoordinates.length > 1) {
        map.fitBounds(validCoordinates.map(addr => [addr.lat, addr.lng]));
    } else if (validCoordinates.length === 1) {
        map.setView([validCoordinates[0].lat, validCoordinates[0].lng], 13);
    }
}
