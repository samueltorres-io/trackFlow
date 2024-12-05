import { geocodeAddress } from './geocode.js';

// Inicializa o mapa
let map = L.map('map').setView([28.2380, 83.9956], 11);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Leaflet &copy; OpenStreetMap contributors',
    maxZoom: 18,
}).addTo(map);

// Inicializa o controle de rota
let routingControl = L.Routing.control({
    waypoints: [],
    routeWhileDragging: true,
}).addTo(map);

let addresses = [];

// Adiciona um novo endereço
document.getElementById('add-address').addEventListener('click', () => {
    addresses.push({ rawAddress: '' });
    renderAddressList();
});

// Renderiza a lista de endereços
function renderAddressList() {
    const list = document.getElementById('address-list');
    list.innerHTML = addresses
        .map(
            (addr, idx) => `
        <li class="list-group-item d-flex justify-content-between align-items-center" data-index="${idx}">
            <input 
                type="text" 
                class="form-control me-2 address-input" 
                value="${addr.rawAddress || ''}" 
                placeholder="Digite um endereço"
            />
            <button class="btn btn-danger btn-sm remove-address">Remover</button>
        </li>`
        )
        .join('');
}

// Atualiza os endereços no array sem geocodificar
document.getElementById('address-list').addEventListener('input', (event) => {
    if (event.target.classList.contains('address-input')) {
        const index = event.target.closest('li').dataset.index;
        const rawAddress = event.target.value;

        // Atualiza o endereço no array
        addresses[index].rawAddress = rawAddress;
    }
});

// Remove um endereço
document.getElementById('address-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-address')) {
        const index = event.target.closest('li').dataset.index;
        addresses.splice(index, 1);
        renderAddressList();
    }
});

// Geocodifica e calcula a rota quando o botão é clicado
document.getElementById('calculate-route').addEventListener('click', async () => {
    const waypoints = [];
    for (let i = 0; i < addresses.length; i++) {
        const addr = addresses[i];
        if (addr.rawAddress.trim()) {
            try {
                const geocoded = await geocodeAddress(addr.rawAddress);
                addresses[i].lat = geocoded.lat;
                addresses[i].lng = geocoded.lng;
                waypoints.push(L.latLng(geocoded.lat, geocoded.lng));
            } catch (error) {
                console.error(`Erro ao geocodificar o endereço: ${addr.rawAddress}`);
            }
        }
    }

    if (waypoints.length > 0) {
        routingControl.setWaypoints(waypoints);
    } else {
        alert('Por favor, insira pelo menos um endereço válido.');
    }
});