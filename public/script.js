document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('show-signup').addEventListener('click', function() {
        document.getElementById('signup-screen').classList.remove('hidden');
        document.getElementById('login-screen').classList.add('hidden');
        console.log("Button pressed");
    });

    document.getElementById('show-login').addEventListener('click', function() {
        document.getElementById('signup-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
        console.log("Button pressed");
    });
});

