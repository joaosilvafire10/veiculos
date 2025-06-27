const routes = {
    '/form': 'views/form.html',
    '/list': 'views/list.html'
};

async function loadView(hash) {
    const route = hash.replace('#', '') || '/list';
    const path = routes[route.split('?')[0]] || routes['/list'];

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

        const html = await response.text();
        document.getElementById('app').innerHTML = html;

        // Importa dinamicamente o init.js
        const { initApp } = await import('./init.js');
        initApp(route);

    } catch (error) {
        console.error("Falha ao carregar view:", error);
        document.getElementById('app').innerHTML = `
            <div class="error">
                <h2>Erro ao carregar a página</h2>
                <p>${error.message}</p>
                <button onclick="location.hash = '#/list'">Voltar para lista</button>
            </div>
        `;
    }
}

window.addEventListener('hashchange', () => loadView(location.hash));
window.addEventListener('load', () => loadView(location.hash));