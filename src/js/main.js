import { geocodeAddress } from './geocode.js';
import { initializeMap, plotOnMap } from './map.js';

let addresses = []; // Armazena os endereços

document.addEventListener('DOMContentLoaded', () => {
    initializeMap(); // Inicializa o mapa
    renderAddressList(); // Renderiza os endereços iniciais
});

// Adicionar novo endereço
document.getElementById('add-address').addEventListener('click', () => {
    addresses.push({ position: addresses.length, rawAddress: '', lat: null, lng: null });
    renderAddressList();
});

// Calcular rota e geocodificar endereços
document.getElementById('calculate-route').addEventListener('click', async () => {
    for (let i = 0; i < addresses.length; i++) {
        if (addresses[i].rawAddress) {
            try {
                const { lat, lng } = await geocodeAddress(addresses[i].rawAddress);
                addresses[i].lat = lat;
                addresses[i].lng = lng;
            } catch (error) {
                console.error(`Erro ao geocodificar o endereço: ${addresses[i].rawAddress}`);
            }
        }
    }
    plotOnMap(addresses);
});

// Função para renderizar a lista de endereços
function renderAddressList() {
    const list = document.getElementById('address-list');
    list.innerHTML = addresses
        .map(
            (addr, idx) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <input 
                type="text" 
                class="form-control me-2" 
                value="${addr.rawAddress}" 
                onchange="updateAddress(${idx}, this.value)"
                placeholder="Digite um endereço"
            />
            <button class="btn btn-danger btn-sm" onclick="removeAddress(${idx})">Remover</button>
        </li>
        `
        )
        .join('');

    // Torna a lista ordenável
    new Sortable(document.getElementById('address-list'), {
        onEnd: (evt) => reorderAddresses(evt.oldIndex, evt.newIndex),
    });
}

// Função para atualizar o endereço
window.updateAddress = (index, value) => {
    addresses[index].rawAddress = value;
};

// Função para remover um endereço
window.removeAddress = (index) => {
    addresses.splice(index, 1);
    renderAddressList();
};

// Função para reordenar os endereços
function reorderAddresses(oldIndex, newIndex) {
    const movedItem = addresses.splice(oldIndex, 1)[0];
    addresses.splice(newIndex, 0, movedItem);
}
