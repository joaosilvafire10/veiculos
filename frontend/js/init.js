import { getVeiculos, getVeiculoById, salvarVeiculo, excluirVeiculo } from './apiService.js';

function setupVehicleForm(form) {
    const params = new URLSearchParams(location.hash.split('?')[1]);
    const id = params.get('id');

    if (id) {
        getVeiculoById(id)
            .then(v => {
                form.id.value = v.id || '';
                form.modelo.value = v.modelo || '';
                form.chassi.value = v.chassi || '';
                form.fabricacao.value = v.dataFabricacao.split('T')[0] || '';
                form.placa.value = v.placa || '';
                document.getElementById(`vendido-${v.vendido ? 'sim' : 'nao'}`).checked = true;
                form.quilometragem.value = v.quilometragem || '';
            })
            .catch(error => {
                console.error("Erro ao carregar veículo:", error);
                alert(`Erro ao carregar veículo: ${error.message}`);
            });
    } else {
        form.reset();
        document.getElementById('vendido-nao').checked = true;
    }

    form.onsubmit = async (e) => {
        e.preventDefault();
        try {
            const veiculo = {
                id: form.id.value || null,
                modelo: form.modelo.value,
                chassi: form.chassi.value,
                dataFabricacao: form.fabricacao.value,
                placa: form.placa.value,
                vendido: form.querySelector('input[name="vendido"]:checked').value === 'sim',
                quilometragem: parseInt(form.quilometragem.value)
            };

            await salvarVeiculo(veiculo);
            alert('Veículo salvo com sucesso!');
            location.hash = '#/list';
        } catch (error) {
            alert(`Erro ao salvar: ${error.message}`);
        }
    };
}

async function loadVeiculosList() {
    const tbody = document.querySelector("#lista tbody");
    if (!tbody) {
        console.error("Tabela não encontrada");
        return;
    }

    tbody.innerHTML = '<tr><td colspan="8">Carregando...</td></tr>';

    try {
        const veiculos = await getVeiculos();

        if (!veiculos || veiculos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8">Nenhum veículo cadastrado</td></tr>';
            return;
        }

        tbody.innerHTML = veiculos.map(v => `
            <tr>
                <td>${v.id}</td>
                <td>${v.modelo}</td>
                <td>${v.chassi}</td>
                <td>${new Date(v.dataFabricacao).toLocaleDateString()}</td>
                <td>${v.placa}</td>
                <td>${v.vendido ? 'Sim' : 'Não'}</td>
                <td>${v.quilometragem}</td>
                <td>
                    <button onclick="location.hash = '#/form?id=${v.id}'">Editar</button>
                    <button onclick="window.excluirVeiculo(${v.id})">Excluir</button>
                </td>
            </tr>`).join("");
    } catch (error) {
        console.error("Erro ao carregar veículos:", error);
        tbody.innerHTML = `<tr><td colspan="8">Erro ao carregar veículos: ${error.message}</td></tr>`;
    }
}

function loadVeiculoForm() {
    const checkForm = () => {
        const form = document.getElementById('vehicle-form');
        if (form) {
            setupVehicleForm(form);
        } else {
            setTimeout(checkForm, 50);
        }
    };
    checkForm();
}

export function initApp(route) {
    if (route.startsWith('/form')) {
        loadVeiculoForm();
    } else {
        loadVeiculosList();
    }
}

window.excluirVeiculo = async function(id) {
    if (confirm("Deseja realmente excluir este veículo?")) {
        try {
            await excluirVeiculo(id);
            alert("Veículo excluído com sucesso!");
            if (location.hash === '#/list') {
                loadVeiculosList();
            } else {
                location.hash = '#/list';
            }
        } catch (error) {
            alert(`Erro ao excluir veículo: ${error.message}`);
        }
    }
};