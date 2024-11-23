

function _(m) {
    console.log(m);
}
function d(elem = [], d = "s-X3z-V4rB-H8tQ") {
    elem.forEach((e) => e.classList.add(d));
}
function dr(elem = [], d = "s-X3z-V4rB-H8tQ") {
    elem.forEach((e) => e.classList.remove(d));
}
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.addEventListener('input', function () {
        this.style.height = 'auto'; // Reset the height
        this.style.height = this.scrollHeight + 'px'; // Set the height to the scroll height
    });
    textarea.addEventListener('focus', function () {
        this.style.height = 'auto'; // Reset the height
        this.style.height = this.scrollHeight + 'px'; // Set the height to the scroll height
    });

})
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

let cntIMG = document.querySelector(".cntIMG");
let btn_uploadOPRFOL_book = document.querySelector(
    ".btn_uploadOPRFOL_book"
);
let btn_uploadBOOK = document.querySelector(".cnt_uploadBook");
let inp_img = document.getElementById("inp_img");
let btnSendBook = document.getElementById("btnSendBook");
btn_uploadOPRFOL_book.onclick = () => {
    inp_img.click();
};



let book_name = document.getElementById("book_name");
let book_writer = document.getElementById("book_writer");
let book_date_publish = document.getElementById("book_date_publish");
let book_description = document.getElementById("book_description");
let book_type = document.getElementById("book_type");
let language = document.getElementById("language");
let inp_bookPDF = document.getElementById("inp_bookPDF");
let inp_imgWriter = document.getElementById("inp_imgWriter");
let btnSerchAuthor = document.getElementById("btnSerchAuthor");
let FathercntImgWriter = document.querySelector(".cntImgWriter");
let cntImgWriter = document.querySelector(".cntImgWriter img");
let bookWriterInfo = document.querySelector("#bookWriterInfo");
inp_img.onchange = () => {
    if (Object.keys(inp_img.files).length > 0) {
        cntIMG.querySelector("img").src = URL.createObjectURL(inp_img.files[0]);
    }
};
inp_imgWriter.onchange = () => {
    if (Object.keys(inp_imgWriter.files).length > 0)
        r([FathercntImgWriter], "heghtGreaterwidth")

    {
        cntImgWriter.src = URL.createObjectURL(inp_imgWriter.files[0]);

    }
};
book_writer.onkeydown = (e) => {
    btnSerchAuthor.href = `https:www.google.com/search?tbm=isch&q=` + book_writer.value.replace(" ", "+");

}
btnSerchAuthor.onclick = (e) => {
    if (book_writer.value == "") {
        book_writer.focus()
        e.preventDefault();
    }
}
btn_uploadBOOK.onclick = () => {
    inp_bookPDF.click();
};
inp_bookPDF.onchange = () => {
    if (inp_bookPDF.files[0].name != undefined) {
        btn_uploadBOOK.innerHTML = inp_bookPDF.files[0].name;
        if (book_name.value == "") {
            book_name.value = inp_bookPDF.files[0].name.split(".")[0];
        }
    }
};
btnSendBook.onclick = () => {
    var empty = 0;

    var textareas = document.querySelectorAll("textarea");
    var inptssdf = document.querySelectorAll("input");
    var sadsd = document.querySelectorAll(".inputsElements select");
    for (var i = 0; i < inptssdf.length; i++) {
        if (inptssdf[i].type != "file") {
            if (inptssdf[i].value == "") {
                inptssdf[i].focus();
                empty++;
                return;
            }
        } else {
            if (Object.keys(inptssdf[i].files).length == 0) {
                askNotice("المعلومات غير مكتملة ", undefined, undefined, () => { }, () => { });
                empty++;
                return;
            }
        }

    }
    for (var i = 0; i < sadsd.length; i++) {
        if (sadsd[i].value == "") {
            askNotice()
            empty++;
            return;
        }
    }
    for (var i = 0; i < textareas.length; i++) {
        if (textareas[i].value == "") {
            textareas[i].focus();
            empty++;
        }
    }
    if (
        empty == 0 &&
        inp_img.files.length > 0 &&
        inp_bookPDF.files.length > 0
    ) {
        $("#form1").submit();
    }
};
$(document).ready(function () {
    $(document).on("submit", "#form1", (e) => {
        e.preventDefault();
        var file = new FormData();
        var img_ = inp_img.files[0];
        file.append("user_id", UserID);
        file.append("book_cover", img_);
        file.append("book_name", book_name.value);
        file.append("book_date_publish", book_date_publish.value);
        file.append("book_type", book_type.value);
        file.append("language", language.value);
        file.append("book_description", book_description.value);
        file.append("bookPDEF", inp_bookPDF.files[0]);
        file.append("book_writer", book_writer.value);
        file.append("writerDefine", bookWriterInfo.value);
        file.append("writerImg", inp_imgWriter.files[0]);

        $.ajax({
            url: "php/shareBook.php",
            method: "post",
            type: "post",
            data: file,
            contentType: false,
            processData: false,
        }).done((res) => {
            if (res == "done") {
                askseccess(
                    "تم نشر المقال بنجاح ، هل تريد مغادرة هده الصحفة  ؟", btnSendBook,
                    function () {
                        window.history.back();
                    },
                    function () {
                        location.reload();
                    },
                    "حسنا",
                    "إلغاء"
                );
            } else {
                noticeError('حدث خطأ ، حاول مرة اخرى', btnSendBook)
            }
        });
    });
});
