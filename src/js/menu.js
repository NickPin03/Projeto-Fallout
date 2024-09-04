document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.menu-icon');
    const menuList = document.querySelector('.list-content');

    menuButton.addEventListener('click', function () {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true'; // Pega o valor do atributo aria-expanded e compara esse valor com a string 'true'. Só retorna true se ambos forem exatamente iguais
        menuButton.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle the 'open' class on the menu list to show/hide it
        menuList.classList.toggle('open');
    });
});
