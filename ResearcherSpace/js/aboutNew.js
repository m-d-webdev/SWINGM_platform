function _(m) {
  console.log(m);
}
function d(elem, d = "s-X3z-V4rB-H8tQ") {
  elem.forEach((e) => e.classList.add(d));
}
function r(elem, d = "s-X3z-V4rB-H8tQ") {
  elem.forEach((e) => e.classList.remove(d));
}
function c(btn, elem, elme2, d = "s-X3z-V4rB-H8tQ") {
  window.onclick = (e) => {
    if (!btn.contains(e.target) && !elem.contains(e.target)) {
      elme2.forEach((e) => r([e]));
    }
  };
}

function i(elem, vaue) {
  document.querySelector(elem).innerHTML = vaue;
}
const textareas = document.querySelectorAll("textarea");
textareas.forEach((textarea) => {
  textarea.addEventListener("input", function () {
    this.style.height = "auto"; // Reset the height
    this.style.height = this.scrollHeight + "px"; // Set the height to the scroll height
  });
});
let new_id = window.location.search;
new_id = new_id.substring(new_id.indexOf("=") + 1);
let ImgsDesc = document.querySelector(".ImgsDesc");
let cntImgDecription = document.querySelector(".cntImgDecription");
let btn_back = document.querySelector("#btn_back");
btn_back.onclick =() =>{
  window.history.back();
}
GET_New(new_id);
function GET_New() {
  $.get(`./php/getNew.php?new_id=${new_id}`).done((res) => {
    res = JSON.parse(res);
    i(".TitleNews", res.title);
    document.querySelector("#NewText").innerText = res.content;
    let NewsImgs = res.link_paths;
    NewsImgs = JSON.parse(NewsImgs);
    document.querySelector("#NewImg").src = "../" + NewsImgs.img1;
    for (var it in NewsImgs) {
      let cloneCENT = cntImgDecription.cloneNode(true);
      cloneCENT.querySelector("img").src = "../" + NewsImgs[it];
      d([cloneCENT]);
      ImgsDesc.appendChild(cloneCENT);
      ZoomIGM(cloneCENT.querySelector("img"));
    }
  });
}

let imgs = document.querySelectorAll(".ImgsDesc img");
imgs.forEach((i) => ZoomIGM(i));
let shadowDev = document.querySelector(".shadowDev");
function ZoomIGM(img) {
  img.onclick = () => {
    shadowDev.querySelector("img").src = img.src;
    d([shadowDev]);
    c(img, shadowDev.querySelector("img"), [shadowDev]);
  };
}
let Maincomments = document.querySelector(".Maincomments");
GetComment();
function GetComment() {
  $.get(`./php/getComent.php?item_id=${new_id}&type=news`).done((res) => {
    res = JSON.parse(res);
    res.forEach((com) => {
      let cloneCOMENT = document.querySelector(".COMENT").cloneNode(true);
      cloneCOMENT.querySelector(".comUserName").innerText =
        com.first_name + " " + com.last_name;
      cloneCOMENT.querySelector(".content").innerText = com.comment_text;
      cloneCOMENT
        .querySelector(".cntUserComent")
        .querySelector("img").src = ".././" + com.linkPRF;
        d([cloneCOMENT]);

      COMENT_FUNCTION(cloneCOMENT);
      Maincomments.appendChild(cloneCOMENT);
    });
  });
}

let coments = document.querySelectorAll(".COMENT");
COMENT_FUNCTION(coments[0]);

let UserID;
getUserId();
function getUserId() {
  loclId = localStorage.getItem("SWINGM_USER_ID");
  if (loclId != null) {
    UserID = loclId;
  }
}
function COMENT_FUNCTION(com) {
  let bntLikeCom = com.querySelector(".interactionComent button");
  bntLikeCom.onclick = () => {
    if (bntLikeCom.querySelector("img").src.match("icones/like2.png")) {
      bntLikeCom.querySelector("img").src = "./icones/likeOn.png";
      d([bntLikeCom.querySelector("img")], "animate__bounceIn");
    } else {
      bntLikeCom.querySelector("img").src = "./icones/like2.png";
      r([bntLikeCom.querySelector("img")], "animate__bounceIn");
    }
  };
}

let btnSendComment = document.querySelector("#btnCendComent");
let inpComentContent = document.querySelector("#inpComentContent");
let addCommentDiv = document.querySelector(".addCommentDiv");
addComment();
function addComment() {
  btnSendComment.disabled = false;
  btnSendComment.onclick = () => {
    // if (coment_space.querySelector(".no_comment")) {
    //   coment_space.querySelector(".no_comment").remove();
    // }
    if (inpComentContent.value != "") {
      let loaderDev = document.createElement("div");
      loaderDev.className = "loader";
      btnSendComment.querySelector("img").src = "";
      btnSendComment.appendChild(loaderDev);
      setTimeout(() => {
        $(document).ready(function () {
          $.post("./php/addComent.php", {
            content_id: new_id,
            content_type: "news",
            comment_text: inpComentContent.value,
            user_id: UserID,
          }).done((res) => {
            com = JSON.parse(res);
            let cloneCOMENT = document
              .querySelector(".COMENT")
              .cloneNode(true);
            cloneCOMENT.querySelector(".comUserName").innerText =
              com.first_name + " " + com.last_name;
            cloneCOMENT.querySelector(".content").innerText =
              com.comment_text;
            cloneCOMENT
              .querySelector(".cntUserComent")
              .querySelector("img").src = ".././" + com.linkPRF;
              d([cloneCOMENT]);
            COMENT_FUNCTION(cloneCOMENT);
            
            Maincomments.appendChild(cloneCOMENT);
            btnSendComment.querySelector('.loader').remove();
            btnSendComment.querySelector('img').src = "./icones/send.png";
            inpComentContent.value = "";
          });
        });
      }, 1500);
    }
  };
}
