import { getVeiculos, salvarVeiculo, excluirVeiculo, getVeiculoById } from "./apiService.js";

export function init(route) {
    if (route === '/list') {
        loadVeiculosList();
    }

    if (route.startsWith('/form')) {
        loadVeiculoForm();
    }
}

function loadVeiculosList() {
    const tbody = document.querySelector("#lista tbody");
    tbody.innerHTML = '<tr><td colspan="8">Carregando...</td></tr>';

    getVeiculos()
        .then(veiculos => {
            if (veiculos.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8">Nenhum veículo cadastrado</td></tr>';
                return;
            }

            tbody.innerHTML = veiculos.map(v => `
                <tr>
                    <td>${v.id}</td>
                    <td>${v.modelo}</td>
                    <td>${v.chassi}</td>
                    <td>${v.dataFabricacao}</td>
                    <td>${v.placa}</td>
                    <td>${v.vendido ? 'Sim' : 'Não'}</td>
                    <td>${v.quilometragem}</td>
                    <td>
                        <button onclick="location.hash = '#/form?id=${v.id}'">Editar</button>
                        <button onclick="excluir(${v.id})">Excluir</button>
                    </td>
                </tr>`).join("");
        })
        .catch(error => {
            console.error("Erro ao carregar veículos:", error);
            tbody.innerHTML = `<tr><td colspan="8">Erro ao carregar veículos: ${error.message}</td></tr>`;
        });
}

function loadVeiculoForm() {
    const form = document.querySelector("#vehicle-form");
    const params = new URLSearchParams(location.hash.split('?')[1]);
    const id = params.get('id');

    if (id) {
        getVeiculoById(id)
            .then(v => {
                document.getElementById("id").value = v.id;
                document.getElementById("modelo").value = v.modelo;
                document.getElementById("chassi").value = v.chassi;
                document.getElementById("fabricacao").value = v.dataFabricacao;
                document.getElementById("placa").value = v.placa;
                document.getElementById(`vendido-${v.vendido ? 'sim' : 'nao'}`).checked = true;
                document.getElementById("quilometragem").value = v.quilometragem;
            })
            .catch(error => {
                console.error("Erro ao carregar veículo:", error);
                alert(`Erro ao carregar veículo: ${error.message}`);
            });
    }

    form.onsubmit = async (e) => {
        e.preventDefault();
        try {
            const veiculo = {
                id: form.id.value || null,
                modelo: form.modelo.value,
                chassi: form.chassi.value,
                fabricacao: form.fabricacao.value,
                placa: form.placa.value,
                vendido: document.querySelector('input[name="vendido"]:checked').value === 'sim',
                quilometragem: parseInt(form.quilometragem.value)
            };

            await salvarVeiculo(veiculo);
            alert("Veículo salvo com sucesso!");
            location.hash = '#/list';
        } catch (error) {
            console.error("Erro ao salvar veículo:", error);
            alert(`Erro ao salvar veículo: ${error.message}`);
        }
    };
}

window.excluir = async function(id) {
    if (confirm("Deseja realmente excluir este veículo?")) {
        try {
            await excluirVeiculo(id);
            alert("Veículo excluído com sucesso!");
            location.reload();
        } catch (error) {
            console.error("Erro ao excluir veículo:", error);
            alert(`Erro ao excluir veículo: ${error.message}`);
        }
    }
};