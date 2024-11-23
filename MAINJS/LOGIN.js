
window.onkeydown = (k) => {
    if (k.key == "Enter") {
        btn_submi_login.click();
    }
}
let inp_pass = document.getElementById("inp_pass");
let inp_email = document.getElementById("inp_email");

function _(m) { console.log(m); }
var p_show_pass = document.querySelector(".show_pass");
inp_pass.onchange = () => {
    if (inp_pass.value == "") {
        p_show_pass.innerHTML = ""
    }
}
inp_pass.onkeydown = () => {
    inp_pass.type = "password";
    p_show_pass.innerHTML = "show"
}
p_show_pass.addEventListener("click", () => {
    if (p_show_pass.innerHTML == "show") {
        inp_pass.type = "text";
        p_show_pass.innerHTML = "hide"
    }
    else {
        inp_pass.type = "password";
        p_show_pass.innerHTML = "show"
    }
})
var shadowDiv = document.querySelector(".shadowDiv");
var btn_refuseCoockie = document.querySelector("#btn_refuseCoockie");
var btn_donfrCoockie = document.querySelector("#btn_donfrCoockie");
let btn_submi_login = document.getElementById("btn_submi_login");
btn_submi_login.addEventListener("click", () => {
    var err_n = 0;
    let errs = document.querySelectorAll('input');
    for (i of errs) {
        if (i.value == "") {
            i.focus();
            err_n++;
            return
        }
    }
    if (err_n == 0) {
        var pass = inp_pass.value;
        pass = JSON.stringify(pass)

        $.post(
            "MAINPHP/login.php", {
            email: inp_email.value,
            password: pass
        }
        ).done(
            res => {
                res = JSON.parse(res);
                if (typeof (res) == "object") {
                    localStorage.removeItem("SWINGM_USER_ID")
                    localStorage.setItem("SWINGM_USER_ID" , res.user_id)
                    url_ = document.referrer;
                    if(url_ == ""){ url_ = "./main.html" } ;
                    if(url_ == "http://localhost/SWINGM2/PROFILE_page.html"){ url_ = "main.html" } ;
                    window.location.href = url_;
                }else if(res== "err_password"){
                    noticeError("كلمة المرور غير صحيحة",btn_submi_login);
                }else if( res== "err_email"){
                    noticeError("البريد الالكتروني غير صحيح" ,btn_submi_login);
                }

            }
        )
    }

})


