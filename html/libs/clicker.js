// Функция для получения значения куки
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
// Функция для установки значения куки
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

document.addEventListener("DOMContentLoaded", function() {
    // Проверяем, нажималась ли кнопка ранее
    var buttonClicked = getCookie("buttonClicked");
    if (buttonClicked) {
        document.querySelector(".button-start").disabled = true; // Отключаем кнопку
    }

    // Обработчик события нажатия на кнопку
    document.querySelector(".button-start").addEventListener("click", function() {
        var count = parseInt(document.querySelector(".hero-content__p").innerText.split(": ")[1]);
        count++;
        document.querySelector(".hero-content__p").innerText = "С нами уже: " + count;
        document.querySelector(".button-start").disabled = true; // Отключаем кнопку после нажатия
        setCookie("buttonClicked", "true", 1); // Устанавливаем куку, указывающую, что кнопка была нажата
        // Перенаправляем на указанный URL
        window.location.href = "https://t.me/vpnushka_bot";
    });
});