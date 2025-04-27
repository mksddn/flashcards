"use strict";

document.addEventListener('DOMContentLoaded', function () { // Обработчик события, который запускает функцию только когда структура страницы загружена

    const modalTrigger = document.querySelectorAll('[data-modal]'), // Переменная = селектор кнопки вызова окна
          modal = document.querySelector('.modal'), // Переменная = селектор модального окна
          modalCloseBtn = document.querySelector('[data-close]'); // Переменная = селектор кнопки закрытия окна

    modalTrigger.forEach(btn => { // Для каждой кнопки открытия окна
        btn.addEventListener('click', openModal); // Обработчик, при клике, запускает функцию открытия окна
    });

    function closeModal() { // Функция закрытия окна
        modal.classList.add('modal-hide'); // Добавляем к селектору окна класс hide
        modal.classList.remove('modal-show'); // Убираем с селектора окна класс show
        document.body.style.overflow = ''; // Снимаем со страницы (body) запрет на прокрутку
    }

    function openModal() { // Функция открытия окна
        modal.classList.add('modal-show'); // Добавляем к селектору окна класс show
        modal.classList.remove('modal-hide'); // Убираем с селектора окна класс hide
        document.body.style.overflow = 'hidden'; // Запрещаем странице (body) прокрутку на фоне
        clearInterval(modalTimerId); // Очищаем интервал автооткрытия окна (функция объявлена ниже)
    }

    modalCloseBtn.addEventListener('click', closeModal); // При клике на кнопку закрытия окна, обработчик запускает соответствующую функцию

    modal.addEventListener('click', (e) => { // Обработчик следит за кликом по элементу
        if (e.target === modal) { // Если клик был имено по селектору .modal (это подложка), то
            closeModal(); // запускается функция закрытия окна
        }
    });

    document.addEventListener('keydown', (e) => { // Обработчик следит за нажатием клавиши на клавиатуре
        if (e.code === "Escape" && modal.classList.contains('modal-show')) { // Если была нажата клавиша escape и если селектор окна содержит класс show (т.е. показывается), то
            closeModal(); // запускается функция закрытия окна
        }
    });

});