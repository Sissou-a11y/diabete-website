document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    const registerForm = document.querySelector('.form-box.Register form');
    const loginForm = document.querySelector('.form-box.login form');

    let registeredUser = null;

    // Animation bascule entre login / register
    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // Validation email
    function isValidEmail(email) {
        // Regex simple pour valider le format email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Validation mot de passe
    function isValidPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    }

    // Validation nom d'utilisateur
    function isValidUsername(username) {
        const regex = /^[a-zA-Z0-9]{4,20}$/;
        return regex.test(username);
    }

    // Formulaire d'inscription
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = registerForm.querySelector('input[placeholder="Username"]').value.trim();
        const email = registerForm.querySelector('input[type="email"]').value.trim();
        const password = registerForm.querySelector('input[placeholder="Password"]').value.trim();

        // Vérification des champs
        if (!isValidUsername(username)) {
            alert("Le nom d'utilisateur doit contenir entre 4 et 20 caractères alphanumériques.");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Adresse e-mail invalide. Exemple valide : exemple@mail.com");
            return;
        }

        if (!isValidPassword(password)) {
            alert("Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.");
            return;
        }

        // Sauvegarde utilisateur temporaire
        registeredUser = { username, email, password };
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        container.classList.remove('active');
        registerForm.reset();
    });

    // Formulaire de connexion
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = loginForm.querySelector('input[placeholder="Username"]').value.trim();
        const password = loginForm.querySelector('input[placeholder="Password"]').value.trim();

        if (!registeredUser) {
            alert("Aucun compte enregistré. Veuillez vous inscrire d'abord.");
            return;
        }

        if (username !== registeredUser.username || password !== registeredUser.password) {
            alert("Nom d'utilisateur ou mot de passe incorrect.");
            return;
        }

        alert("Connexion réussie !");
        loginForm.reset();
    });
});
