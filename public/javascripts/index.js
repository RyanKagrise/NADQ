const { logoutUser } = require('');

window.addEventListener('DOMContentLoaded', (e) => {
    const logoutButtons = document.querySelector('.logout-button');
    logoutButtons.addEventListener('click', e => {
        logoutUser();
    })
})
