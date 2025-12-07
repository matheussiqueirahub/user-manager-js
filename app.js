document.addEventListener('DOMContentLoaded', () => {
    const userManager = new UserManager();
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const toast = document.getElementById('toast');
    const userIdInput = document.getElementById('userId');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = submitBtn.querySelector('.material-icons-round');
    const cancelBtn = document.getElementById('cancelBtn');

    // Initial render
    renderUsers();

    // Form Submit Handler
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const id = userIdInput.value ? parseInt(userIdInput.value) : null;

        try {
            if (id) {
                userManager.updateUser(id, { nome, email });
                showToast(`Usuário "${nome}" atualizado com sucesso!`);
                resetForm();
            } else {
                userManager.createUser(nome, email);
                showToast(`Usuário "${nome}" criado com sucesso!`);
                userForm.reset();
            }
            renderUsers();
        } catch (error) {
            showToast(error.message, true);
        }
    });

    // Cancel Edit Handler
    cancelBtn.addEventListener('click', () => {
        resetForm();
    });

    // Render Users Function
    function renderUsers() {
        const users = userManager.listUsers();
        userList.innerHTML = '';

        if (users.length === 0) {
            userList.innerHTML = '<div class="empty-state">Nenhum usuário cadastrado ainda.</div>';
            return;
        }

        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                <div class="user-info">
                    <h3>${escapeHtml(user.nome)}</h3>
                    <p>${escapeHtml(user.email)}</p>
                    <p style="font-size: 0.7rem; margin-top: 0.2rem; opacity: 0.6;">Criado em: ${user.dataCriacao}</p>
                </div>
                <div class="user-actions">
                    <button class="btn-icon" onclick="startEdit(${user.id})" title="Editar">
                        <span class="material-icons-round">edit</span>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteUser(${user.id})" title="Excluir">
                        <span class="material-icons-round">delete</span>
                    </button>
                </div>
            `;
            userList.appendChild(userItem);
        });
    }

    // Expose functions to window for onclick handlers
    window.startEdit = (id) => {
        const user = userManager.listUsers().find(u => u.id === id);
        if (user) {
            userIdInput.value = user.id;
            nomeInput.value = user.nome;
            emailInput.value = user.email;

            // UI Update for Edit Mode
            btnText.textContent = 'Salvar Alterações';
            btnIcon.textContent = 'save';
            submitBtn.classList.remove('btn-primary');
            submitBtn.style.backgroundColor = 'var(--secondary-color)';
            submitBtn.style.color = '#000';
            cancelBtn.style.display = 'inline-flex';

            nomeInput.focus();
        }
    };

    window.deleteUser = (id) => {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                userManager.deleteUser(id);
                showToast('Usuário removido.');
                renderUsers();
                // If we were editing the deleted user, reset form
                if (parseInt(userIdInput.value) === id) {
                    resetForm();
                }
            } catch (error) {
                showToast(error.message, true);
            }
        }
    };

    function resetForm() {
        userForm.reset();
        userIdInput.value = '';
        btnText.textContent = 'Adicionar Usuário';
        btnIcon.textContent = 'add';
        submitBtn.classList.add('btn-primary');
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
        cancelBtn.style.display = 'none';
    }

    function showToast(message, isError = false) {
        toast.textContent = message;
        toast.className = `toast show ${isError ? 'error' : ''}`;
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
