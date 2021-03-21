$(function (){
    let button = document.getElementById("button");
    let text = document.getElementById("current_time");

    button.addEventListener("click",function () {
        text.innerText = Date();
    });
});

