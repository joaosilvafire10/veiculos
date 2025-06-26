let routes;
routes = {
    '/form': 'views/form.html',
    '/list': 'views/list.html'
};

async function loadView(hash) {
    const route = hash.replace('#', '') || '/list';
    const path = routes[route] || routes['/list'];

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Erro ao carregar a view: ${response.status}`);

        const html = await response.text();
        document.getElementById('app').innerHTML = html;

        const { init } = await import('./init.js');
        init(route);
    } catch (error) {
        console.error("Erro no router:", error);
        document.getElementById('app').innerHTML = `
            <div class="error">
                <h2>Erro ao carregar a página</h2>
                <p>${error.message}</p>
                <button onclick="location.hash = '#/list'">Voltar para a lista</button>
            </div>
        `;
    }
}

window.addEventListener('hashchange', () => loadView(location.hash));
window.addEventListener('load', () => loadView(location.hash));