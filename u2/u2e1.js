// T4. Trabajo con API
// U2. Peticiones GET y POST con Fetch
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md
export class ReqRes {
    // B. Propiedades estáticas
    static API_URL = 'https://reqres.in/api';
    static ENDPOINT_REGISTER = '/register';
    static ENDPOINT_LOGIN = '/login';
    static ENDPOINT_USERS = '/users';

    // C. Sesión
    session = {
        token: null,
        email: null,
        userId: null
    };

    async register(email, pwd) {
        if (!email) {
            return { error: 'Missing email or username' };
        }
        if (!pwd) {
            return { error: 'Missing password' };
        }

        this.session.email = email;

        const response = await fetch(
            `${ReqRes.API_URL}${ReqRes.ENDPOINT_REGISTER}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: pwd })
            }
        );

        return response.json();
    }

    // E. onRegister
    onRegister(data) {
        if (!data || data.error) {
            return `ERROR_REGISTER. ${data?.error}`;
        }

        this.session.userId = data.id;
        this.session.token = data.token;
    }

    async login(email, pwd) {
        if (!email) {
            return { error: 'Missing email or username' };
        }
        if (!pwd) {
            return { error: 'Missing password' };
        }

        this.session.email = email;

        const response = await fetch(
            `${ReqRes.API_URL}${ReqRes.ENDPOINT_LOGIN}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: pwd })
            }
        );

        return response.json();
    }

    // G. onLogin
    onLogin(data) {
        if (!data || data.error) {
            return `ERROR_LOGIN. ${data?.error}`;
        }

        this.session.token = data.token;
    }

    async getUserList(page = 1, perPage = 6) {
        const url = `${ReqRes.API_URL}${ReqRes.ENDPOINT_USERS}?page=${page}&per_page=${perPage}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return response.json();
    }
}

