function _(m) {
    console.log(m);
}

var UserId, document_ref;
fom_pc = true;
window.onload = () => {
    fetch_url();
};

function fetch_url() {
    let url_string = window.location.search;
    var encryptedStr = url_string.substring(
        url_string.indexOf("=") + 1,
        url_string.indexOf("^")
    );
    document_ref = url_string.substring(url_string.indexOf("^") + 1);
    document_ref = decodeURIComponent(document_ref);
    if (document_ref == `${window.location.origin}/SWINGM2/page_login.html`) {
        document_ref = "../main.html";
    } else if (
        document.referrer != `${window.location.origin}/SWINGM2/page_sign_in.html`
    ) {
        document_ref = document.referrer;
    }
    encryptedStr = decodeURIComponent(encryptedStr);
    encryptedStr = JSON.parse(encryptedStr);
    user_id = encryptedStr.substring(
        encryptedStr.indexOf("C") + 1,
        encryptedStr.indexOf("{")
    );
    UserId = user_id;
    get_prfilePic();
}

let btn_select_img = document.getElementById("btn_select_img");
let inp_img = document.getElementById("inp_img");
let img_prfil = document.getElementById("img_prfil");
let btn_to_be_sure = document.querySelector(".btn_to_be_sure");

btn_select_img.onclick = () => {
    inp_img.click();
};
inp_img.onchange = () => {
    if (inp_img.files.length > 0) {
        fom_pc = true;
        btn_to_be_sure.classList.add("display");
        img_prfil.src = URL.createObjectURL(inp_img.files[0]);
    }
};
btn_to_be_sure.onclick = () => {
    document.getElementById("btn_submit").click();
};
$(document).ready(function () {
    $(document).on("submit", "#form1", (e) => {
        startLoader();
        e.preventDefault();
        var file = new FormData();
        var img_ = inp_img.files[0];
        file.append("inp_img", img_);
        file.append("user_id", UserId);
        $.ajax({
            url: "MAINPHP/CHANGE_PRF.php",
            method: "post",
            type: "post",
            data: file,
            contentType: false,
            processData: false,
        }).done((res) => {
            if (res == "done") {
                stopLoader();
                window.location.href = document_ref;
            }
        });
    });
});
var btn_skip = document.querySelector(".btn_skip");
btn_skip.onclick = () => {
    window.location.href = document_ref;
};
function get_prfilePic() {
    $.ajax({
        url: "MAINPHP/getInfoUser.php",
        method: "post",
        type: "post",
        data: {
            user_id: UserId,
        },
    }).done((res) => {
        res = JSON.parse(res);
        img_prfil.src = res.linkPRF;
    });
}
