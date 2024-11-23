function _(m) { console.log(m); }
let info = document.querySelector(".info");
let btn_menu = document.querySelector(".btn_menu");
let btn_can_privsy = document.querySelector("#btn_can_privsy");
let he_abou = document.querySelector("#he_abou");


btn_menu.onclick = () => {
    info.classList.add("display");
    window.onclick = (e) => {
        if (!btn_menu.contains(e.target) && !info.contains(e.target)) {
            info.classList.remove("display");

        }
    }
}

var cnt_btn_login = document.querySelector(".cnt_btn_login");

var User_id;
cnt_btn_login.classList.add('display');

if (localStorage.getItem("SWINGM_USER_ID") !== null) {
    User_id = localStorage.getItem("SWINGM_USER_ID");
    cnt_btn_login.classList.remove('display');

} else {
    cnt_btn_login.classList.add('display');

}


