const BASE_URL = "http://localhost:8080/veiculo";

export async function getVeiculos() {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    return await response.json();
}

export async function getVeiculoById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    return await response.json();
}

export async function salvarVeiculo(veiculo) {
    const veiculoDTO = {
        modelo: veiculo.modelo,
        chassi: veiculo.chassi,
        dataFabricacao: veiculo.fabricacao,
        placa: veiculo.placa,
        vendido: veiculo.vendido,
        quilometragem: veiculo.quilometragem
    };

    const url = veiculo.id ? `${BASE_URL}/${veiculo.id}` : BASE_URL;
    const method = veiculo.id ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(veiculoDTO)
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    return await response.json();
}

export async function excluirVeiculo(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
    }
}