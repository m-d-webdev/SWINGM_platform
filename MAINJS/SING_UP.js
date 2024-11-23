function d(elem, className = "display") {
  elem.classList.add(className);
}
function r(elem, className = "display") {
  elem.classList.remove(className);
}
function _(m) {
  console.log(m);
}
function c(btn, MAIN_ele, ELEMENTS_to_R) {
  window.onclick = (e) => {
    if (!btn.contains(e.target) && !MAIN_ele.contains(e.target)) {
      ELEMENTS_to_R.forEach((el) => r(el));
    }
  };
}

let docu_ref = "";
window.onload = () => {
  docu_ref = document.referrer;
};

let form_signin = document.getElementById("form_signin");
let btn_submit = document.getElementById("btn_next_signin");
let checked_img = document.querySelector(".checked_img");
let err_conf_pas = document.querySelector(".err_conf_pas");
let inp_email = document.querySelector("#inp_email2");
let inp_pass2 = document.querySelector("#inp_pass2");
let inp_pass2_conf = document.querySelector("#inp_pass2_conf");

inp_pass2_conf.disabled = true;
inp_pass2.onchange = () => {
  if (inp_pass2.value != inp_pass2_conf.value) {
    checked_img.classList.remove("display");
  } else if (inp_pass2.value == inp_pass2_conf.value) {
    checked_img.classList.add("display");
  }

  if (inp_pass2.value != "") {
    inp_pass2_conf.disabled = false;
  } else {
    inp_pass2_conf.disabled = true;
  }
};
inp_pass2_conf.onkeyup = () => {
  err_conf_pas.innerHTML = "";
  if (inp_pass2_conf.value == inp_pass2.value) {
    checked_img.classList.add("display");
  } else {
    checked_img.classList.remove("display");
  }
};
const RegExp1 = /([a-zA-Z][0-9]|[a-zA-Z])*\@[a-zA-Z]*\.[a-zA-Z]{2,6}/;
let elegal_chr = [
  " ",
  "!",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "+",
  "=",
  "/",
  "\\",
  ",",
  ";",
  ":",
  "<",
  ">",
  "?",
  "[",
  "]",
  "{",
  "}",
  "|",
  "~",
  "`",
];
inp_email.onkeydown = (e) => {
  if (elegal_chr.includes(e.key)) {
    e.preventDefault();
  }
};
let errorP = document.querySelector(".errorP");
inp_email.onblur = (e) => {
  if (!inp_email.value.match(RegExp1)) {
    inp_email.parentElement.parentElement.classList.add("err");
  } else {
    errorP.classList.remove("display");
    inp_email.parentElement.parentElement.classList.remove("err");
    btn_submit.disabled = true;
    $(document).ready(function () {
      $.get("./MAINPHP/checkEmail.php", {
        email: inp_email.value,
      }).done((res) => {
        if (res == "false") {
          inp_email.parentElement.parentElement.classList.remove("err");
          btn_submit.disabled = false;
        } else {
          inp_email.parentElement.parentElement.classList.add("err");
          errorP.classList.add("display");
        }
      });
    });
  }
};
var shadowDiv = document.querySelector(".shadowDiv");
var btn_refuseCoockie = document.querySelector("#btn_refuseCoockie");
var btn_donfrCoockie = document.querySelector("#btn_donfrCoockie");
btn_submit.onclick = () => {
  let info = [];
  var err = 0;
  let job = form_signin.querySelector("select");
  if (inp_email.classList.contains("err")) {
    err++;
  }
  if (job.value == "") {
    err++;
  }
  let all_inputs = form_signin.querySelectorAll("input");
  for (i of all_inputs) {
    if (i.value == "") {
      i.focus();
      err++;
      return;
    } else {
      info.push(i.value);
    }
  }
  //
  if (!checked_img.classList.contains("display")) {
    err++;
    err_conf_pas.innerHTML = "تاكيد كلمة المرور غير صحيح  ";
  }
  if (err == 0) {
    info.push(job.value);
    info = JSON.stringify(info);
    $(document).ready(() => {
      var formData = $("#form_signin").serialize();
      // formData = JSON.stringify(formData)
      $.post("MAINPHP/create_ac.php", {
        info: formData,
      }).done((res) => {
        try {
          res = JSON.parse(res);
          localStorage.removeItem("SWINGM_USER_ID");
          localStorage.setItem("SWINGM_USER_ID", res.user_id);
          var encryptStrinng =
            "7gHb8P0mN2fX9jTq5V6L1zA4wQ3E2dC" +
            res.user_id +
            "{}gHb8P0mN2fX9jTq5V6L1zA4wQ3E";
          var encryptStrinng = JSON.stringify(encryptStrinng);
          encryptStrinng = encodeURIComponent(encryptStrinng);
          let origin = window.location.origin;
          ref =
            origin +
            "/SWINGM2/change_prf.html?data=" +
            encryptStrinng +
            "^" +
            docu_ref;
          window.location.href = ref;
        } catch (error) {
          _(error);
        }
      });
    });
  }
};
