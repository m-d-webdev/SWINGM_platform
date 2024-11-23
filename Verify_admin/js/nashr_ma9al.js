function _(m) {
    console.log(m);
}
let user_info = document.querySelector(".user_info");
let full_name2 = document.querySelector(".full_name2");
let prof_pic = document.querySelector(".cnt_prof_pic img");
let cnt_matr_connect = document.querySelector(".cnt_matr_connect ");
let INFO_USER, UserID;
getInfoUser();
function getInfoUser() {
    if (localStorage.getItem("SWINGM_USER_ID") != null) {
        UserID = localStorage.getItem("SWINGM_USER_ID");
        user_info.classList.add("display");
        cnt_matr_connect.classList.remove("display");
        $.post("../MAINPHP/getInfoUser.php", {
            user_id: UserID,
        }).done((res) => {
            INFO_USER = JSON.parse(res);
            setInfoUser();
        });
    } else {
        user_info.classList.remove("display");
        cnt_matr_connect.classList.add("display");
    }
}

function setInfoUser() {
    full_name2.innerHTML = INFO_USER.first_name + " " + INFO_USER.last_name;
    prof_pic.src = "../" + INFO_USER.linkPRF;
}

// --------------------------
let inp_article_title = document.getElementById("article_title");
let inp_type_articl = document.getElementById("type_articl");
let inp_article_text_id = document.getElementById("article_text_id");
let btn_share_article = document.getElementById("btn_share_article");
if (UserID == undefined) {
    [
        inp_article_title,
        inp_type_articl,
        inp_article_text_id,
        btn_share_article,
    ].forEach((x) => (x.disabled = true));
}
btn_share_article.addEventListener("click", () => {
    if (
        inp_article_title.value.length > 2 &&
        inp_article_text_id.value.length > 10 &&
        inp_type_articl.value != ""
    ) {
        $.post("./php/addArticle.php", {
            article_title: inp_article_title.value,
            type_articl: inp_type_articl.value,
            article_text: inp_article_text_id.value,
            user_id: UserID,
        }).done((res) => {
            if (res == "done") {
                askseccess(
                    "تم نشر المقال بنجاح ، هل تريد مغادرة هده الصحفة  ؟", btn_share_article,
                    function () {
                        window.history.back();
                    },
                    function () {
                        location.reload();
                    },
                    "حسنا",
                    "إلغاء"
                );
                //   window.location.href = "./Articles.html";
            } else {
                noticeError('حدث خطأ ، حاول مرة اخرى', btn_share_article)
            }
        });
    }
});
