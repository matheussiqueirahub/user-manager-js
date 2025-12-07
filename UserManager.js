class UserManager {
    constructor() {
        this.users = [];
        this.currentId = 1;
        this.load();
    }

    createUser(nome, email) {
        if (!this.validateEmail(email)) {
            throw new Error("Email inválido.");
        }

        const user = {
            id: this.currentId++,
            nome,
            email,
            dataCriacao: new Date().toLocaleString('pt-BR')
        };

        this.users.push(user);
        this.save();
        return user;
    }

    listUsers() {
        return this.users;
    }

    updateUser(id, novosDados) {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            throw new Error("Usuário não encontrado.");
        }

        if (novosDados.email && !this.validateEmail(novosDados.email)) {
            throw new Error("Email inválido.");
        }

        this.users[userIndex] = { ...this.users[userIndex], ...novosDados };
        this.save();
        return this.users[userIndex];
    }

    deleteUser(id) {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            throw new Error("Usuário não encontrado.");
        }

        this.users.splice(userIndex, 1);
        this.save();
    }

    save() {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentId', this.currentId.toString());
    }

    load() {
        const storedUsers = localStorage.getItem('users');
        const storedId = localStorage.getItem('currentId');

        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
        }

        if (storedId) {
            this.currentId = parseInt(storedId, 10);
        }
    }

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}

// Export specific for browser environment not using modules implicitly, 
// but sticking to standard script loading for simplicity or could be ES modules.
// For this setup, we'll keep it as a global class or export if using modules.
// We will attach it to window for simple script usage or just define it.
window.UserManager = UserManager;
