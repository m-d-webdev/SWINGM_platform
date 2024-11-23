function _(m) { console.log(m); }
function d(elem, className = 'display') { elem.classList.add(className); }
function r(elem, className = 'display') { elem.classList.remove(className); }
let user_info = document.querySelector(".user_info");
let full_name2 = document.querySelector(".full_name2");
let prof_pic = document.querySelector(".cnt_prof_pic img");
let cnt_matr_connect = document.querySelector(".cnt_matr_connect ");
let INFO_USER, UserID;
getInfoUser();
function getInfoUser() {
    if (localStorage.getItem("SWINGM_USER_ID") != null) {
        UserID = localStorage.getItem("SWINGM_USER_ID");
        user_info.classList.add('display');
        cnt_matr_connect.classList.remove('display');
        $.post(
            '../MAINPHP/getInfoUser.php', {
            user_id: UserID
        }
        ).done(
            res => {
                INFO_USER = JSON.parse(res);
                setInfoUser()
            }
        )
    } else {
        user_info.classList.remove('display');
        cnt_matr_connect.classList.add('display');
    }
}

function setInfoUser() {
    full_name2.innerHTML = INFO_USER.first_name + " " + INFO_USER.last_name;
    prof_pic.src = "../" + INFO_USER.linkPRF;
}


const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.addEventListener('input', function () {
        this.style.height = 'auto'; // Reset the height
        this.style.height = this.scrollHeight + 'px'; // Set the height to the scroll height
    });
})

let intro = document.getElementById("inp_title_news");
let newsThemes = document.getElementById("newsThemes");
let content = document.getElementById("inp_news_content");
let btn_submit = document.getElementById('btn_submit')
// --------------------------------------------------------------------
let cntIMGS = document.querySelector(".cntIMGS");
let cnt_img = document.querySelector(".cnt_img");
let inp_add_imge = document.querySelector("#inp_add_imge");
let array_imgs = [];

inp_add_imge.onchange = () => {
    var list_names = []
    var cnt_imgs = document.querySelectorAll(".cnt_img.display");
    cnt_imgs.forEach(
        c => {
            list_names.push(c.getAttribute("id"));
        }
    )
    if (!list_names.includes(inp_add_imge.files[0].name)) {
        var cloneCNTIMG = cnt_img.cloneNode(true);
        cloneCNTIMG.querySelector('.main_img').src = URL.createObjectURL(inp_add_imge.files[0]);
        d(cloneCNTIMG);
        cloneCNTIMG.setAttribute('id', inp_add_imge.files[0].name);
        cntIMGS.appendChild(cloneCNTIMG);
        // data.append('array_imgs[]' ,  inp_add_imge.files[0]);
        array_imgs.push(inp_add_imge.files[0]);
        remImg();
    }


}
function remImg() {
    let cnt_imgs = document.querySelectorAll(".cnt_img.display");
    cnt_imgs.forEach(
        el => {
            var btn_remove_el = el.querySelector(".btn_rmimg");
            btn_remove_el.onclick = () => {
                array_imgs = array_imgs.filter(
                    img => img.name != el.id
                )
                el.remove();
            }
        }
    )
}



btn_submit.onclick = () => {
    $('#form_news').submit();
    // if(document.querySelector('.cnt_img.display') ){

    // }
}
$(document).ready(
    function () {
        $(document).on("submit", "#form_news", (e) => {
            e.preventDefault();
            let data = new FormData();
            data.append('user_id', UserID);
            data.append('news_title', intro.value);
            data.append('content', content.value)
            data.append('newsTheme', newsThemes.value);
            for (let i = 0; i < array_imgs.length; i++) {
                data.append('array_imgs[]', array_imgs[i]);
            }
            $.ajax({
                type: "POST",
                url: "./php/addNews.php",
                data: data,
                processData: false,
                contentType: false,
                success: function (data) {
                    if(data == "done"){
                        window.location.href = document.referrer
                    }
                }
            })
        })
    }
)

