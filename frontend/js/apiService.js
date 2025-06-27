const BASE_URL = "http://localhost:8080/veiculo";

export async function getVeiculos() {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);
    return await response.json();
}

export async function getVeiculoById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);
    return await response.json();
}

export async function salvarVeiculo(veiculo) {
    const url = veiculo.id ? `${BASE_URL}/${veiculo.id}` : BASE_URL;
    const method = veiculo.id ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(veiculo)
    });

    if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);
    return await response.json();
}

export async function excluirVeiculo(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);
}