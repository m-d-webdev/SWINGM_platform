function d(elem, className = "display") {
  elem.classList.add(className);
}
function r(elem, className = "display") {
  elem.classList.remove(className);
}
function _(m) {
  console.log(m);
}
function W_CLICK_R(btn, MAIN_ele, ELEMENTS_to_R) {
  window.onclick = (e) => {
    if (!btn.contains(e.target) && !MAIN_ele.contains(e.target)) {
      ELEMENTS_to_R.forEach((el) => r(el));
    }
  };
}
function ReSetLocalStorage(ItemName, value, concepte) {
  if (concepte == "add") {
    var old_data = localStorage.getItem(ItemName);
    old_data = JSON.parse(old_data);
    if (old_data == null) {
      var array_vakues = [];
      array_vakues.push(value);
      array_vakues = JSON.stringify(array_vakues);
      localStorage.setItem(ItemName, array_vakues);
    } else if (old_data != null) {
      old_data.push(value);
      old_data = JSON.stringify(old_data);
      localStorage.removeItem(ItemName);
      localStorage.setItem(ItemName, old_data);
    }
  } else if (concepte == "remove") {
    var old_data = localStorage.getItem(ItemName);
    var new_data = old_data.filter((item) => item != value);
    localStorage.removeItem(ItemName);
    new_data = JSON.stringify(new_data);
    localStorage.setItem(ItemName, new_data);
  }
}
function sendItem(
  sender_id,
  receiver_ids = [],
  type = "ma9al",
  item_id = null
) {
  if (type == "ma9al") {
    $.post("../MAINPHP/sendItem.php").done((res) => {
    });
  }
}
const textareas = document.querySelectorAll("textarea");
textareas.forEach((textarea) => {
  textarea.addEventListener("input", function () {
    this.style.height = "auto"; // Reset the height
    this.style.height = this.scrollHeight + "px"; // Set the height to the scroll height
  });
  textarea.addEventListener("blur", function () {
    this.style.height = "auto"; // Reset the height
    this.style.height = this.scrollHeight + "px"; // Set the height to the scroll height
  });
  textarea.addEventListener("focus", function () {
    this.style.height = "auto"; // Reset the height
    this.style.height = this.scrollHeight + "px"; // Set the height to the scroll height
  });
});

function addRate(item_id, type = "") {
  let inputs_stas = RATING_POPUP.querySelectorAll("input");
  let btn_send_ratting = RATING_POPUP.querySelector("#btn_send_ratting");
  var num_ratting = 0;

  inputs_stas[0].onclick = () => {
    num_ratting = 5;
  };

  inputs_stas[1].onclick = () => {
    num_ratting = 4;
  };

  inputs_stas[2].onclick = () => {
    num_ratting = 3;
  };

  inputs_stas[3].onclick = () => {
    num_ratting = 2;
  };

  inputs_stas[4].onclick = () => {
    num_ratting = 1;
  };

  btn_send_ratting.onclick = () => {
    var desc = RATING_POPUP.querySelector("#inp_desRatting").value;
    startLoader();
    $.post("../MAINPHP/addRate.php", {
      user_id: UserID,
      item_id: item_id,
      type: type,
      ratting: num_ratting,
      coment: desc,
    }).done((res) => {
      if (res == "done") {
        stopLoader();
        ReSetLocalStorage(`SWINGM_RATINGS_OF_${type}`, item_id, "add");
        r(PAGE_COMENT);
        r(RATING_POPUP);
        d(MESSAGE_POPUP);
        MESSAGE_POPUP.querySelector("p").innerText = "تم إرسال التقييم ";
        setTimeout(() => {
          r(MESSAGE_POPUP);
        }, 1500);
      }
    });
  };
}
function open_report(btn, item_id, type) {
  if (type == "comments" || type == "replyreplies" || type == "replies") {
    cnt_pg_cometn.classList.add("ad_filter");
  }
  d(PAGE_COMENT);
  d(popUp_report);
  window.onclick = (e) => {
    if (!popUp_report.contains(e.target) && !btn.contains(e.target)) {
      if (type == "comments" || type == "replies" || type == "replyreplies") {
        cnt_pg_cometn.classList.remove("ad_filter");
      } else {
        r(PAGE_COMENT);
      }
      r(popUp_report);
    }
  };
  let btns_report = document.querySelectorAll(".list_choeses_report span");
  let btn_send_report = document.getElementById("btn_send_report");
  btn_send_report.disabled = true;
  reason = [];
  var num_choossed = 0;
  btns_report.forEach((btn) => {
    btn.classList.remove("acitve_report");
    btn.querySelector("img").src =
      "http://localhost/SWINGM2/ResearcherSpace/Articles.html";

    btn.onclick = () => {
      if (
        btn.querySelector("img").src ==
        "http://localhost/SWINGM2/ResearcherSpace/Articles.html"
      ) {
        btn.querySelector("img").src = "icones/tick.png";
        btn.classList.add("acitve_report");
        num_choossed++;
        reason.push(btn.querySelector("p").innerText);
      } else {
        btn.classList.remove("acitve_report");
        btn.querySelector("img").src =
          "http://localhost/SWINGM2/ResearcherSpace/Articles.html";
        if (num_choossed > 0) {
          num_choossed--;
        }
        reason = reason.filter(
          (item) => item != btn.querySelector("p").innerText
        );
      }

      if (num_choossed > 0) {
        btn_send_report.disabled = false;
      } else if (num_choossed == 0) {
        btn_send_report.disabled = true;
      }
    };
  });
  let inp_desc = document.querySelector(".inp_desc");

  btn_send_report.onclick = () => {
    addReport(UserID, reason, inp_desc.value, item_id, type);
  };
}
function addReport(reporder_id, reason = [], desc = "", item_id, type = "") {
  startLoader();
  $.post("../MAINPHP/addReport.php", {
    reporder_id: reporder_id,
    reason: reason,
    desc: desc,
    item_id: item_id,
    type: type,
  }).done((res) => {
    if (res == "done") {
      stopLoader();
      ReSetLocalStorage(`SWINGM_REPORTS_OF_${type}`, item_id, "add");
      if (type == "articles") {
        r(PAGE_COMENT);
      }
      if (type == "comments" || type == "replies" || type == "replyreplies") {
        cnt_pg_cometn.classList.remove("ad_filter");
      }
      r(REPORT_POPUP);
      r(MESSAGE_POPUP);
      d(MESSAGE_POPUP);
      MESSAGE_POPUP.querySelector("p").innerText = "تم الإبلاغ ";
      setTimeout(() => {
        r(MESSAGE_POPUP);
      }, 2000);
    } else {
      _("error");
    }
  });
}

let coment_space = document.querySelector(".coment_space");
var inp_wr_coment = document.getElementById("inp_wr_coment");
let btnSendComment = document.querySelector("#btnSendComment");
let coment_main = document.querySelector(".coment_main");
inp_wr_coment.disabled = true;
inp_wr_coment.setAttribute("placeholder", "يجب أن تسجل الدخول لتتمكن من مشاركة تعليقات ");

inp_wr_coment.onkeydown = (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    btnSendComment.click();
  }
};
const PAGE_COMENT = document.querySelector(".page_coment");
let MAIN_COMENT = document.querySelector(".cnt_pg_cometn");
var curentOppendItem, choosedItem, choosed_item_id, chooosed_itme_type;
function open_coment(btn) {
  d(PAGE_COMENT);
  d(MAIN_COMENT);
  W_CLICK_R(btn, MAIN_COMENT, [MAIN_COMENT, PAGE_COMENT]);

  if (curentOppendItem != choosed_item_id + "_" + chooosed_itme_type) {
    coment_space.replaceChildren();
    let loaderDev = document.createElement("div");
    loaderDev.className = "loader2";
    coment_space.appendChild(loaderDev);
    curentOppendItem = choosed_item_id + "_" + chooosed_itme_type;
    $(document).ready(() => {
      $.get("./php/getComent.php", {
        item_id: choosed_item_id,
        type: chooosed_itme_type,
      }).done((res) => {

        loaderDev.remove();
        res = JSON.parse(res);
        setCommentes(res, chooosed_itme_type, choosed_item_id);
      });
    });

  }

  // SET COMMENTES---------------
}
function setCommentes(object, type, item_id) {
  if (Object.keys(object).length == 0) {
    coment_space.innerHTML = `<p class="no_comment"> لا يوجد تعليقات لحد الساعة  </p>`;
    addComment(item_id, type);
  } else {
    object.forEach((coment) => {
      let cloneComment = coment_main.cloneNode(true);
      cloneComment.querySelector(".full_name_coment").innerText =
        coment.first_name + " " + coment.last_name;
      cloneComment.setAttribute("coment_id", coment.comment_id);
      cloneComment
        .querySelector(".full_name_coment")
        .setAttribute("user_id", coment.user_id);
      cloneComment.querySelector(".coment_text").innerText =
        coment.comment_text;
      cloneComment.querySelector(".num_like_coment").innerText =
        coment.num_likes;
      cloneComment.querySelector(".time_coment").innerText =
        coment.created_at.substring(0, coment.created_at.indexOf(" "));
      cloneComment.querySelector(".cnt_img2 img").src =
        ".././" + coment.linkPRF;
      if (coment.user_id == UserID) {
        cloneComment.querySelector(".btn_unlike_coment").remove();
        cloneComment.querySelector(".btn_moreCBCOMENT").remove();
        cloneComment.querySelector(".btn_rep_coment").remove();
      }
      d(cloneComment);
      coment_space.appendChild(cloneComment);
      COMMENT_FUNCTION(cloneComment);
      if (coment.hasReplay == "true") {
        prepareRplayedComment(cloneComment, coment.comment_id);
      }
    });
    addComment(item_id, type);
  }
}
function prepareRplayedComment(cloneComment, comment_id) {
  let CLONE_list_replayed_coment = list_replayed_coment.cloneNode(true);
  d(CLONE_list_replayed_coment);
  cloneComment.appendChild(CLONE_list_replayed_coment);
  let title_list_replay = cloneComment.querySelector(".title_list_replay");
  title_list_replay.onclick = () => {
    title_list_replay.disabled = true;

    title_list_replay.setAttribute("oppned", "true");
    if (!CLONE_list_replayed_coment.querySelector(".coment_main_repaly")) {
      $(document).ready(function () {
        $.get("./php/getRepliesComments.php", {
          comment_id: comment_id,
        }).done((res) => {
          setRepliesCommet(CLONE_list_replayed_coment, JSON.parse(res));
          let reapliesElements = CLONE_list_replayed_coment.querySelectorAll(
            ".coment_main_repaly"
          );
          runLoop(0);
          title_list_replay.classList.toggle("deg_img");
          function pauseLoop(i, callback) {
            setTimeout(() => {
              callback(i + 1);
            }, 50);
          }
          function runLoop(i) {
            if (i < reapliesElements.length) {
              reapliesElements[i].classList.toggle("display");
              pauseLoop(i, runLoop);
            } else {
              title_list_replay.disabled = false;
            }
          }
        });
      });
    } else {
      let reapliesElements = CLONE_list_replayed_coment.querySelectorAll(
        ".coment_main_repaly"
      );
      runLoop(0);
      title_list_replay.classList.toggle("deg_img");
      function pauseLoop(i, callback) {
        setTimeout(() => {
          callback(i + 1);
        }, 50);
      }
      function runLoop(i) {
        if (i < reapliesElements.length) {
          reapliesElements[i].classList.toggle("display");
          pauseLoop(i, runLoop);
        } else {
          title_list_replay.disabled = false;
        }
      }
      if (CLONE_list_replayed_coment.querySelector(".show_more_replies")) {
        let show_more_replies =
          CLONE_list_replayed_coment.querySelector(".show_more_replies");
        show_more_replies.classList.toggle("display");
      }
    }
  };
}
function prepareRpliesReply(cloneComment, reply_id) {
  let CLONE_list_replayed_coment = list_replayed_coment.cloneNode(true);
  d(CLONE_list_replayed_coment);
  cloneComment.appendChild(CLONE_list_replayed_coment);
  let title_list_replay = cloneComment.querySelector(".title_list_replay");
  title_list_replay.onclick = () => {
    title_list_replay.disabled = true;

    title_list_replay.setAttribute("oppned", "true");
    if (!CLONE_list_replayed_coment.querySelector(".coment_main_repaly")) {
      $(document).ready(function () {
        $.get("./php/getRepliesReply.php", {
          reply_id: reply_id,
        }).done((res) => {
          setRepliesReply(CLONE_list_replayed_coment, JSON.parse(res));
          let reapliesElements = CLONE_list_replayed_coment.querySelectorAll(
            ".coment_main_repaly"
          );

          runLoop(0);
          title_list_replay.classList.toggle("deg_img");
          function pauseLoop(i, callback) {
            setTimeout(() => {
              callback(i + 1);
            }, 50);
          }
          function runLoop(i) {
            if (i < reapliesElements.length) {
              reapliesElements[i].classList.toggle("display");
              pauseLoop(i, runLoop);
            } else {
              title_list_replay.disabled = false;
            }
          }
        });
      });
    } else {
      let reapliesElements = CLONE_list_replayed_coment.querySelectorAll(
        ".coment_main_repaly"
      );
      runLoop(0);
      title_list_replay.classList.toggle("deg_img");
      function pauseLoop(i, callback) {
        setTimeout(() => {
          callback(i + 1);
        }, 50);
      }
      function runLoop(i) {
        if (i < reapliesElements.length) {
          reapliesElements[i].classList.toggle("display");
          pauseLoop(i, runLoop);
        } else {
          title_list_replay.disabled = false;
        }
      }
    }
  };
}

function addComment() {
  btnSendComment.disabled = false;
  inp_wr_coment.value = "";
  inp_wr_coment.style.height = "auto";
  inp_wr_coment.style.height = inp_wr_coment.scrollHeight + "px";

  btnSendComment.onclick = () => {
    if (coment_space.querySelector(".no_comment")) {
      coment_space.querySelector(".no_comment").remove();
    }
    btnSendComment.disabled = true;
    if (inp_wr_coment.value != "") {
      let cloneComment = coment_main.cloneNode(true);
      cloneComment.querySelector(".full_name_coment").innerText =
        INFO_USER.first_name + " " + INFO_USER.last_name;
      cloneComment.classList.add("sending");
      cloneComment.querySelector(".coment_text").innerText =
        inp_wr_coment.value;
      cloneComment.querySelector(".time_coment").innerText =
        new Date().getDate();
      cloneComment
        .querySelector(".cnt_img2 img")
        .setAttribute("src", `../${INFO_USER.linkPRF}`);
      cloneComment.querySelector(".interaction_coment").remove();
      let loaderDev = document.createElement("div");
      loaderDev.className = "loader";
      cloneComment.appendChild(loaderDev);
      d(cloneComment);
      coment_space.appendChild(cloneComment);
      coment_space.scrollTop = coment_space.scrollHeight;
      setTimeout(() => {
        $(document).ready(function () {
          $.post("./php/addComent.php", {
            content_id: choosed_item_id,
            content_type: chooosed_itme_type,
            comment_text: inp_wr_coment.value,
            user_id: UserID,
          }).done((res) => {
            let coment = JSON.parse(res);
            let cloneComment = coment_main.cloneNode(true);
            cloneComment.querySelector(".full_name_coment").innerText =
              coment.first_name + " " + coment.last_name;
            cloneComment.setAttribute("coment_id", coment.comment_id);
            cloneComment
              .querySelector(".full_name_coment")
              .setAttribute("user_id", coment.user_id);
            cloneComment.querySelector(".coment_text").innerText =
              coment.comment_text;
            cloneComment.querySelector(".time_coment").innerText =
              coment.created_at.substring(0, coment.created_at.indexOf(" "));

            cloneComment.querySelector(".btn_unlike_coment").remove();
            cloneComment.querySelector(".btn_moreCBCOMENT").remove();
            cloneComment.querySelector(".btn_rep_coment").remove();

            cloneComment.querySelector(".cnt_img2 img").src =
              ".././" + coment.linkPRF;
            d(cloneComment);

            let oldElm = coment_space.querySelector(".sending");
            coment_space.replaceChild(cloneComment, oldElm);
            inp_wr_coment.value = "";
            inp_wr_coment.style.height = "auto";
            inp_wr_coment.style.height = inp_wr_coment.scrollHeight + "px";

            choosedItem.querySelector(".num_coments").innerText =
              parseInt(choosedItem.querySelector(".num_coments").innerText) + 1;
            COMMENT_FUNCTION(cloneComment);
          });
        });
      }, 1500);
    }
  };
}
let coment_main_repaly = document.querySelector(".coment_main_repaly");
let list_replayed_coment = document.querySelector(".list_replayed_coment");

function AddRepliComment(commnet_elem, commnet_id) {
  btnSendComment.disabled = false;
  btnSendComment.onclick = () => {
    let alrefyHaveListReplies = false;
    btnSendComment.disabled = true;
    if (inp_wr_coment.value != "") {
      if (!commnet_elem.querySelector(".list_replayed_coment")) {
        let CLONE_list_replayed_coment = list_replayed_coment.cloneNode(true);
        let cloneComment = coment_main_repaly.cloneNode(true);
        cloneComment.querySelector(".full_name_coment").innerText =
          INFO_USER.first_name + " " + INFO_USER.last_name;
        cloneComment.classList.add("sending");
        cloneComment.querySelector(".coment_text").innerText =
          inp_wr_coment.value;
        cloneComment.querySelector(".time_coment").innerText =
          new Date().getDay();
        cloneComment
          .querySelector(".cnt_img2 img")
          .setAttribute("src", `../${INFO_USER.linkPRF}`);
        cloneComment.querySelector(".interaction_coment").remove();
        let loaderDev = document.createElement("div");
        loaderDev.className = "loader";
        cloneComment.appendChild(loaderDev);
        CLONE_list_replayed_coment.appendChild(cloneComment);
        d(CLONE_list_replayed_coment);
        commnet_elem.appendChild(CLONE_list_replayed_coment);
        show_list_rep(CLONE_list_replayed_coment);
        CLONE_list_replayed_coment.querySelector(".title_list_replay").click();
      } else {
        alrefyHaveListReplies = true;
        let cloneComment = coment_main_repaly.cloneNode(true);
        cloneComment.querySelector(".full_name_coment").innerText =
          INFO_USER.first_name + " " + INFO_USER.last_name;
        cloneComment.classList.add("sending");
        cloneComment.querySelector(".coment_text").innerText =
          inp_wr_coment.value;
        cloneComment.querySelector(".time_coment").innerText =
          new Date().getDate();
        cloneComment
          .querySelector(".cnt_img2 img")
          .setAttribute("src", `../${INFO_USER.linkPRF}`);
        cloneComment.querySelector(".interaction_coment").remove();
        let loaderDev = document.createElement("div");
        loaderDev.className = "loader";
        cloneComment.appendChild(loaderDev);
        let CLONE_list_replayed_coment = commnet_elem.querySelector(
          ".list_replayed_coment"
        );
        CLONE_list_replayed_coment.appendChild(cloneComment);
        let bntOpenList =
          CLONE_list_replayed_coment.querySelector(".title_list_replay");
        d(cloneComment);
      }
      setTimeout(() => {
        $(document).ready(
          $.post("./php/addReplayComent.php", {
            comment_id: commnet_id,
            comment_text: inp_wr_coment.value,
            user_id: UserID,
          }).done((res) => {
            let newCommentObject = JSON.parse(res);
            newCommentObject = newCommentObject.reply;
            let cloneComment = coment_main_repaly.cloneNode(true);
            cloneComment.setAttribute("id", newCommentObject.reply_id);
            cloneComment.querySelector(".full_name_coment").innerText =
              newCommentObject.first_name + " " + newCommentObject.last_name;
            cloneComment
              .querySelector(".full_name_coment")
              .setAttribute("user_id", newCommentObject.user_id);
            cloneComment.querySelector(".coment_text").innerText =
              newCommentObject.reply_text;
            cloneComment.querySelector(".time_coment").innerText =
              newCommentObject.created_at.substring(
                0,
                newCommentObject.created_at.indexOf(" ")
              );
            cloneComment
              .querySelector(".cnt_img2 img")
              .setAttribute("src", `../${newCommentObject.linkPRF}`);

            // sete
            var CLONE_list_replayed_coment = commnet_elem.querySelector(
              ".list_replayed_coment"
            );
            CLONE_list_replayed_coment.replaceChild(
              cloneComment,
              CLONE_list_replayed_coment.querySelector(".sending")
            );
            let bntOpenList =
              CLONE_list_replayed_coment.querySelector(".title_list_replay");

            if (bntOpenList.classList.contains("deg_img")) {
              d(cloneComment);
            } else {
              if (alrefyHaveListReplies) {
                if (bntOpenList.getAttribute("oppned") == "true") {
                  bntOpenList.click();
                } else {
                  bntOpenList.classList.add("deg_img");
                  d(cloneComment);
                  let pShowMoreReplies = document.createElement("div");
                  pShowMoreReplies.className = "show_more_replies";
                  pShowMoreReplies.innerText = "تحميل المزيد ....";
                  pShowMoreReplies.setAttribute("dir", "rtl");
                  d(pShowMoreReplies);
                  CLONE_list_replayed_coment.appendChild(pShowMoreReplies);
                  pShowMoreReplies.onclick = () => {
                    bntOpenList.classList.remove("deg_img");
                    pShowMoreReplies.remove();
                    cloneComment.remove();
                    setTimeout(() => {
                      CLONE_list_replayed_coment.querySelector(
                        ".title_list_replay"
                      ).click();
                    }, 200);
                  };
                }
              } else {
                bntOpenList.click();
              }
            }

            REPLAIE_FUNCTION(cloneComment);
            addComment();
          })
        );
      }, 1500);
    }
  };
}
function AddRepliRepaly(commnet_elem, commnet_id) {
  let alrefyHaveListReplies = false;
  btnSendComment.disabled = false;
  btnSendComment.onclick = () => {
    btnSendComment.disabled = true;
    if (inp_wr_coment.value != "") {
      if (!commnet_elem.querySelector(".list_replayed_coment")) {
        let CLONE_list_replayed_coment = list_replayed_coment.cloneNode(true);
        let cloneComment = coment_main_repaly.cloneNode(true);
        cloneComment.querySelector(".full_name_coment").innerText =
          INFO_USER.first_name + " " + INFO_USER.last_name;
        cloneComment.classList.add("sending");
        cloneComment.querySelector(".coment_text").innerText =
          inp_wr_coment.value;
        cloneComment.querySelector(".time_coment").innerText =
          new Date().getDate();
        cloneComment
          .querySelector(".cnt_img2 img")
          .setAttribute("src", `../${INFO_USER.linkPRF}`);
        cloneComment.querySelector(".interaction_coment").remove();
        let loaderDev = document.createElement("div");
        loaderDev.className = "loader";
        cloneComment.appendChild(loaderDev);
        CLONE_list_replayed_coment.appendChild(cloneComment);
        d(CLONE_list_replayed_coment);
        commnet_elem.appendChild(CLONE_list_replayed_coment);
        show_list_rep(CLONE_list_replayed_coment);
        let bntOpenList =
          CLONE_list_replayed_coment.querySelector(".title_list_replay");
        d(cloneComment);

        // 0766029834
      } else {
        alrefyHaveListReplies = true;
        let cloneComment = coment_main_repaly.cloneNode(true);
        cloneComment.querySelector(".full_name_coment").innerText =
          INFO_USER.first_name + " " + INFO_USER.last_name;
        cloneComment.classList.add("sending");
        cloneComment.querySelector(".coment_text").innerText =
          inp_wr_coment.value;
        cloneComment.querySelector(".time_coment").innerText =
          new Date().getDate();
        cloneComment
          .querySelector(".cnt_img2 img")
          .setAttribute("src", `../${INFO_USER.linkPRF}`);
        cloneComment.querySelector(".interaction_coment").remove();
        let loaderDev = document.createElement("div");
        loaderDev.className = "loader";
        cloneComment.appendChild(loaderDev);
        //

        let CLONE_list_replayed_coment = commnet_elem.querySelector(
          ".list_replayed_coment"
        );
        CLONE_list_replayed_coment.appendChild(cloneComment);
        let bntOpenList =
          CLONE_list_replayed_coment.querySelector(".title_list_replay");
        d(cloneComment);
      }
      $(document).ready(
        $.post("./php/addReplareply.php", {
          comment_id: commnet_id,
          comment_text: inp_wr_coment.value,
          user_id: UserID,
        }).done((res) => {
          let newCommentObject = JSON.parse(res);
          newCommentObject = newCommentObject.reply;
          let cloneComment = coment_main_repaly.cloneNode(true);
          cloneComment.setAttribute("id", newCommentObject.reply_id);
          cloneComment.querySelector(".full_name_coment").innerText =
            newCommentObject.first_name + " " + newCommentObject.last_name;
          cloneComment
            .querySelector(".full_name_coment")
            .setAttribute("user_id", newCommentObject.user_id);
          cloneComment.querySelector(".coment_text").innerText =
            newCommentObject.reply_text;
          cloneComment.querySelector(".time_coment").innerText =
            newCommentObject.created_at.substring(
              0,
              newCommentObject.created_at.indexOf(" ")
            );
          cloneComment
            .querySelector(".cnt_img2 img")
            .setAttribute("src", `../${newCommentObject.linkPRF}`);
          var CLONE_list_replayed_coment = commnet_elem.querySelector(
            ".list_replayed_coment"
          );
          CLONE_list_replayed_coment.replaceChild(
            cloneComment,
            CLONE_list_replayed_coment.querySelector(".sending")
          );
          let bntOpenList =
            CLONE_list_replayed_coment.querySelector(".title_list_replay");
          if (bntOpenList.classList.contains("deg_img")) {
            d(cloneComment);
          } else {
            if (alrefyHaveListReplies) {
              if (bntOpenList.getAttribute("oppned") == "true") {
                bntOpenList.click();
              } else {
                bntOpenList.classList.add("deg_img");
                d(cloneComment);
                let pShowMoreReplies = document.createElement("div");
                pShowMoreReplies.className = "show_more_replies";
                pShowMoreReplies.innerText = "تحميل المزيد ....";
                pShowMoreReplies.setAttribute("dir", "rtl");
                d(pShowMoreReplies);
                CLONE_list_replayed_coment.appendChild(pShowMoreReplies);
                pShowMoreReplies.onclick = () => {
                  bntOpenList.classList.remove("deg_img");
                  pShowMoreReplies.remove();
                  cloneComment.remove();
                  setTimeout(() => {
                    CLONE_list_replayed_coment.querySelector(
                      ".title_list_replay"
                    ).click();
                  }, 200);
                };
              }
            } else {
              bntOpenList.click();
            }
          }
          REPLAIE_FUNCTION(cloneComment);
          addComment();
        })
      );
    }
  };
}

function setRepliesCommet(commnet_elem, newCommentObject) {
  newCommentObject.forEach((newCommentObject) => {
    let cloneComment = coment_main_repaly.cloneNode(true);
    cloneComment.setAttribute("reply_id", newCommentObject.reply_id);
    cloneComment.querySelector(".full_name_coment").innerText =
      newCommentObject.first_name + " " + newCommentObject.last_name;
    cloneComment
      .querySelector(".full_name_coment")
      .setAttribute("user_id", newCommentObject.user_id);
    cloneComment.querySelector(".coment_text").innerText =
      newCommentObject.reply_text;
    cloneComment.querySelector(".time_coment").innerText =
      newCommentObject.created_at.substring(
        0,
        newCommentObject.created_at.indexOf(" ")
      );
    cloneComment
      .querySelector(".cnt_img2 img")
      .setAttribute("src", `../${newCommentObject.linkPRF}`);
    commnet_elem.appendChild(cloneComment);

    REPLAIE_FUNCTION(cloneComment);
    if (newCommentObject.hasReplay == "true") {
      prepareRpliesReply(cloneComment, newCommentObject.reply_id);
    }
  });
}

function setRepliesReply(commnet_elem, newCommentObject) {
  newCommentObject.forEach((newCommentObject) => {
    let cloneComment = coment_main_repaly.cloneNode(true);
    cloneComment.setAttribute("reply_id", newCommentObject.reply_id);
    cloneComment.querySelector(".full_name_coment").innerText =
      newCommentObject.first_name + " " + newCommentObject.last_name;
    cloneComment
      .querySelector(".full_name_coment")
      .setAttribute("user_id", newCommentObject.user_id);
    cloneComment.querySelector(".coment_text").innerText =
      newCommentObject.reply_text;
    cloneComment.querySelector(".time_coment").innerText =
      newCommentObject.created_at.substring(
        0,
        newCommentObject.created_at.indexOf(" ")
      );
    cloneComment
      .querySelector(".cnt_img2 img")
      .setAttribute("src", `../${newCommentObject.linkPRF}`);
    commnet_elem.appendChild(cloneComment);
    REPLAIEReplay_FUNCTION(cloneComment);
  });
}

function show_list_rep(list) {
  let title_list_replay = list.querySelector(".title_list_replay");
  let reapliesElements;
  title_list_replay.onclick = () => {
    title_list_replay.disabled = true;
    title_list_replay.setAttribute("oppned", "true");
    reapliesElements = list.querySelectorAll(".coment_main_repaly");
    runLoop(0);
    title_list_replay.classList.toggle("deg_img");
  };

  function pauseLoop(i, callback) {
    setTimeout(() => {
      callback(i + 1);
    }, 50);
  }

  function runLoop(i) {
    if (i < reapliesElements.length) {
      reapliesElements[i].classList.toggle("display");
      pauseLoop(i, runLoop);
    } else {
      title_list_replay.disabled = false;
    }
  }
}
function REPLAIE_FUNCTION(comment) {
  let btnLikeComment = comment.querySelector(".btn_like_coment");
  let ownerComment = comment.querySelector(".full_name_coment");
  btnLikeComment.querySelector("img").src = "icones/like2.png";
  if (ownerComment.getAttribute("user_id") != UserID) {
    let btndesLikeComment = comment.querySelector(".btn_unlike_coment");
    let btn_signalComment = comment.querySelector(".btn_moreCBCOMENT");
    let btn_rep_coment = comment.querySelector(".btn_rep_coment");
    btndesLikeComment.querySelector("img").src = "icones/unlike.png";
    btndesLikeComment.onclick = () => {
      if (btnLikeComment.querySelector("img").src.match("icones/likeOn.png")) {
        btnLikeComment.querySelector("img").src = "icones/like2.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) -
          1;
      }
      if (
        btndesLikeComment.querySelector("img").src.match("icones/unlike.png")
      ) {
        btndesLikeComment.querySelector("img").src = "icones/unlikeOn.png";
      } else {
        btndesLikeComment.querySelector("img").src = "icones/unlike.png";
      }
    };
    btn_signalComment.onclick = () => {
      open_report(
        btn_signalComment,
        comment.getAttribute("reply_id"),
        "replies"
      );
    };
    btn_rep_coment.onclick = () => {
      var replayedPersomn;
      if (replayedPersomn != ownerComment.innerText) {
        replayedPersomn = ownerComment.innerText;
        reply_how.innerText = comment;
        let cloneELEM = comment.cloneNode(true);
        cloneELEM.querySelector(".interaction_coment").remove();
        if (cloneELEM.querySelector(".list_replayed_coment")) {
          cloneELEM.querySelector(".list_replayed_coment").remove();
        }
        inp_wr_coment.setAttribute(
          "placeholder",
          "الرد على تعليق  " + ownerComment.innerText
        );
        reply_how.replaceChildren(cloneELEM);
        d(reply_how);
        window.onclick = (e) => {
          if (
            !write_coment_space.contains(e.target) &&
            !btn_rep_coment.contains(e.target)
          ) {
            reply_how.innerText = "";
            inp_wr_coment.setAttribute("placeholder", "شارك تعليقك ");
            W_CLICK_R(MAIN_COMENT, MAIN_COMENT, [MAIN_COMENT, PAGE_COMENT]);
          }
        };
      }
      AddRepliRepaly(comment, comment.getAttribute("reply_id"));
      inp_wr_coment.focus();
    };
    btnLikeComment.onclick = () => {
      btndesLikeComment.querySelector("img").src = "icones/unlike.png";
      if (btnLikeComment.querySelector("img").src.match("icones/like2.png")) {
        btnLikeComment.querySelector("img").src = "icones/likeOn.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) +
          1;
      } else {
        btnLikeComment.querySelector("img").src = "icones/like2.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) -
          1;
      }
    };
  } else {
    comment.querySelector(".btn_unlike_coment").remove();
    comment.querySelector(".btn_moreCBCOMENT").remove();
    comment.querySelector(".btn_rep_coment").remove();
    d(comment, "ownComment");
    btnLikeComment.onclick = () => {
      if (btnLikeComment.querySelector("img").src.match("icones/like2.png")) {
        btnLikeComment.querySelector("img").src = "icones/likeOn.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) +
          1;
      } else {
        btnLikeComment.querySelector("img").src = "icones/like2.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) -
          1;
      }
    };
  }

  ownerComment.onclick = () => {
    if (ownerComment.getAttribute("user_id") != UserID) {
      let hrefToPage =
        "aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL^" +
        ownerComment.getAttribute("user_id") +
        "&aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL";
      hrefToPage = JSON.stringify(encodeURIComponent(hrefToPage));
      window.location.href = "../usersInfo.html?UserIdentifyer=" + hrefToPage;
    } else if (UserID != undefined) {
      window.location.href = ".././PROFILE_PAGE.html";
    }
  };
}
function REPLAIEReplay_FUNCTION(comment) {
  let btnLikeComment = comment.querySelector(".btn_like_coment");
  let ownerComment = comment.querySelector(".full_name_coment");
  btnLikeComment.querySelector("img").src = "icones/like2.png";
  if (ownerComment.getAttribute("user_id") != UserID) {
    let btndesLikeComment = comment.querySelector(".btn_unlike_coment");
    let btn_signalComment = comment.querySelector(".btn_moreCBCOMENT");
    comment.querySelector(".btn_rep_coment").remove();
    btndesLikeComment.querySelector("img").src = "icones/unlike.png";
    btndesLikeComment.onclick = () => {
      if (btnLikeComment.querySelector("img").src.match("icones/likeOn.png")) {
        btnLikeComment.querySelector("img").src = "icones/like2.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) -
          1;
      }
      if (
        btndesLikeComment.querySelector("img").src.match("icones/unlike.png")
      ) {
        btndesLikeComment.querySelector("img").src = "icones/unlikeOn.png";
      } else {
        btndesLikeComment.querySelector("img").src = "icones/unlike.png";
      }
    };
    btn_signalComment.onclick = () => {
      open_report(
        btn_signalComment,
        comment.getAttribute("reply_id"),
        "replyreplies"
      );
    };
    btnLikeComment.onclick = () => {
      btndesLikeComment.querySelector("img").src = "icones/unlike.png";
      if (btnLikeComment.querySelector("img").src.match("icones/like2.png")) {
        btnLikeComment.querySelector("img").src = "icones/likeOn.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) +
          1;
      } else {
        btnLikeComment.querySelector("img").src = "icones/like2.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) -
          1;
      }
    };
  } else {
    comment.querySelector(".btn_unlike_coment").remove();
    comment.querySelector(".btn_moreCBCOMENT").remove();
    comment.querySelector(".btn_rep_coment").remove();
    d(comment, "ownComment");
    btnLikeComment.onclick = () => {
      if (btnLikeComment.querySelector("img").src.match("icones/like2.png")) {
        btnLikeComment.querySelector("img").src = "icones/likeOn.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) +
          1;
      } else {
        btnLikeComment.querySelector("img").src = "icones/like2.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) -
          1;
      }
    };
  }

  ownerComment.onclick = () => {
    if (ownerComment.getAttribute("user_id") != UserID) {
      let hrefToPage =
        "aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL^" +
        ownerComment.getAttribute("user_id") +
        "&aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL";
      hrefToPage = JSON.stringify(encodeURIComponent(hrefToPage));
      window.location.href = "../usersInfo.html?UserIdentifyer=" + hrefToPage;
    } else if (UserID != undefined) {
      window.location.href = ".././PROFILE_PAGE.html";
    }
  };
}
function COMMENT_FUNCTION(comment) {
  let btnLikeComment = comment.querySelector(".btn_like_coment");
  btnLikeComment.querySelector("img").src = "icones/like2.png";
  for (var i of likedPostsAray) {
    if (i.item_id == comment.getAttribute("coment_id") && i.item_type == "comment") {
      btnLikeComment.querySelector("img").src = "icones/likeOn.png";
      break;
    }
  }
  let ownerComment = comment.querySelector(".full_name_coment");
  if (ownerComment.getAttribute("user_id") != UserID) {
    let btndesLikeComment = comment.querySelector(".btn_unlike_coment");
    let btn_signalComment = comment.querySelector(".btn_moreCBCOMENT");
    let btn_rep_coment = comment.querySelector(".btn_rep_coment");
    btndesLikeComment.querySelector("img").src = "icones/unlike.png";

    btndesLikeComment.onclick = () => {
      if (btnLikeComment.querySelector("img").src.match("icones/likeOn.png")) {
        btnLikeComment.querySelector("img").src = "icones/like2.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) -
          1;
        btndesLikeComment.disabled = true;
        cancel_like(comment.getAttribute("coment_id"), "comment");
        setTimeout(() => {
          btndesLikeComment.disabled = false;
        }, 1000);
      }
      if (
        btndesLikeComment.querySelector("img").src.match("icones/unlike.png")
      ) {
        btndesLikeComment.querySelector("img").src = "icones/unlikeOn.png";
      } else {
        btndesLikeComment.querySelector("img").src = "icones/unlike.png";
      }
    };
    btn_signalComment.onclick = () => {
      open_report(
        btn_signalComment,
        comment.getAttribute("coment_id"),
        "comments"
      );
    };
    btn_rep_coment.onclick = () => {
      var replayedPersomn;
      if (replayedPersomn != ownerComment.innerText) {
        replayedPersomn = ownerComment.innerText;
        let cloneELEM = comment.cloneNode(true);
        cloneELEM.querySelector(".interaction_coment").remove();
        if (cloneELEM.querySelector(".list_replayed_coment")) {
          cloneELEM.querySelector(".list_replayed_coment").remove();
        }
        inp_wr_coment.setAttribute(
          "placeholder",
          "الرد على تعليق  " + ownerComment.innerText
        );
        reply_how.replaceChildren(cloneELEM);
        d(reply_how);
        window.onclick = (e) => {
          if (
            !write_coment_space.contains(e.target) &&
            !btn_rep_coment.contains(e.target)
          ) {
            reply_how.innerText = "";
            inp_wr_coment.setAttribute("placeholder", "شارك تعليقك ");
            W_CLICK_R(MAIN_COMENT, MAIN_COMENT, [MAIN_COMENT, PAGE_COMENT]);
          }
        };
      }
      AddRepliComment(comment, comment.getAttribute("coment_id"));
      inp_wr_coment.focus();
    };
    btnLikeComment.onclick = () => {
      btndesLikeComment.querySelector("img").src = "icones/unlike.png";
      if (btnLikeComment.querySelector("img").src.match("icones/like2.png")) {
        btnLikeComment.querySelector("img").src = "icones/likeOn.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) +
          1;
        add_like(comment.getAttribute("coment_id"), "comment");

        btnLikeComment.disabled = true;
        setTimeout(() => {
          btnLikeComment.disabled = false;
        }, 1000);
      } else {
        btnLikeComment.querySelector("img").src = "icones/like2.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) -
          1;

      }
    };

  } else {
    d(comment, "ownComment");
    btnLikeComment.onclick = () => {
      if (btnLikeComment.querySelector("img").src.match("icones/like2.png")) {
        btnLikeComment.querySelector("img").src = "icones/likeOn.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) +
          1;
        add_like(comment.getAttribute("coment_id"), "comment");

      } else {
        btnLikeComment.querySelector("img").src = "icones/like2.png";
        btnLikeComment.querySelector(".num_like_coment").innerText =
          parseInt(btnLikeComment.querySelector(".num_like_coment").innerText) -
          1;
      }
    };
  }

  ownerComment.onclick = () => {
    if (ownerComment.getAttribute("user_id") != UserID) {
      let hrefToPage =
        "aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL^" +
        ownerComment.getAttribute("user_id") +
        "&aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL";
      hrefToPage = JSON.stringify(encodeURIComponent(hrefToPage));
      window.location.href = "../usersInfo.html?UserIdentifyer=" + hrefToPage;
    } else if (UserID != undefined) {
      window.location.href = ".././PROFILE_PAGE.html";
    }
  };
}
// -------------------------------------------

function add_like(post_id, type_item) {
  $.post("./php/add_like.php", {
    user_id: UserID,
    type_item: type_item,
    post_id: post_id,
  }).done((res) => {
    if (res == "done") {
      // window.location.reload();
    }
  });
}
function cancel_like(post_id, type_item) {
  $.post("./php/cancel_like.php", {
    user_id: UserID,
    type_item: type_item,
    post_id: post_id,
  })
}

// -------------

let INFO_USER = {};
var UserID;
let btn_profile_page = document.getElementById("btn_profile_page");

getInfoUser();
function getInfoUser() {
  if (localStorage.getItem("SWINGM_USER_ID") != null) {
    UserID = localStorage.getItem("SWINGM_USER_ID");
    d(btn_profile_page);
    $.post("../MAINPHP/getInfoUser.php", {
      user_id: UserID,
    }).done((res) => {
      INFO_USER = JSON.parse(res);
      inp_wr_coment.setAttribute("placeholder", "شارك تعليقك ....");
      inp_wr_coment.disabled = false;
      setInfoUser();
    });
  }
}

let imgUser = document.getElementById("imgUser");
function setInfoUser() {
  imgUser.setAttribute("src", `../${INFO_USER.linkPRF}`);
  localStorage.setItem(
    "SWINGM_USER_FOLLOWERS",
    JSON.stringify(INFO_USER.Followers)
  );
  localStorage.setItem(
    "SWINGM_USER_FOLLOWING",
    JSON.stringify(INFO_USER.Following)
  );
}
let likedPostsAray = [];
function getLikedPosts() {
  if (UserID != undefined) {
    $.post("./php/getLikedPosts.php", {
      user_id: UserID,
    }).done((res) => {
      localStorage.setItem(
        "SWINGM_LIKED_POSTS",
        JSON.stringify(JSON.parse(res))
      );
      likedPostsAray = JSON.parse(res);
    });
  }
}
// MA(AAALlllllllllllllllllllllllllllllllllllllllllllll);
let lastChoose;
lastChoose = localStorage.getItem("lastChoose");
window.onload = () => {
  getLikedPosts();

  setTimeout(() => {
    if (lastChoose == null) {
      btn_getMA9ALAT.click();
    } else {
      if (lastChoose == "M") {
        btn_getMA9ALAT.click();
      } else if (lastChoose == "B") {
        btn_get_books.click();
      } else if (lastChoose == "N") {
        btn_get_news.click();
      }
    }
  }, 500);
};

let snt_ma9alat = document.querySelector(".snt_ma9alat");
let ma9al_div3 = document.querySelector(".ma9al");
let pop_message = document.querySelector(".pop_message");

let btn_getMA9ALAT = document.getElementById("btn_getMA9ALAT");
let btn_get_books = document.getElementById("btn_get_books");
let btn_get_news = document.getElementById("btn_get_news");
btn_getMA9ALAT.addEventListener("click", () => {
  localStorage.setItem("lastChoose", "M");
  snt_ma9alat.replaceChildren();
  getMa9alat();
  if (document.querySelector(".chooedActive")) {
    document.querySelector('.chooedActive').classList.remove('chooedActive');
  }
  d(btn_getMA9ALAT, "chooedActive")
});

btn_get_books.addEventListener("click", () => {
  localStorage.setItem("lastChoose", "B");
  snt_ma9alat.replaceChildren();
  getBooks();
  if (document.querySelector(".chooedActive")) {
    document.querySelector('.chooedActive').classList.remove('chooedActive');
  }
  d(btn_get_books, "chooedActive");
});
btn_get_news.addEventListener("click", () => {
  localStorage.setItem("lastChoose", "N");
  lastChoose = btn_get_news;
  snt_ma9alat.replaceChildren();
  getNews();
  if (document.querySelector(".chooedActive")) {
    document.querySelector('.chooedActive').classList.remove('chooedActive');
  }
  d(btn_get_news, "chooedActive")
});

// =---------------------
function getMa9alat() {
  var elentsMa9alat = document.querySelectorAll(".ma9al.display");
  var listIds = [];
  elentsMa9alat.forEach((el) => {
    listIds.push(el.getAttribute("id"));
  });
  listIds.push(0);
  listIds = listIds.filter((el) => el != null);
  listIds = JSON.stringify(listIds);
  startLoader();
  $.post("./php/getMa9alat.php", {
    ma9alat_ids: listIds,
  }).done((res) => {
    stopLoader();
    res = JSON.parse(res);
    for (let i of res) {
      let CLONE_ma9al_div = ma9al_div3.cloneNode(true);
      CLONE_ma9al_div.setAttribute("id", i.article_id);
      CLONE_ma9al_div.querySelector(".title_article").innerText = i.title;
      CLONE_ma9al_div.querySelector(".m9l_text").innerText = i.article_text;
      CLONE_ma9al_div.querySelector(".user_name").innerText =
        i.first_name + " " + i.last_name;
      CLONE_ma9al_div.querySelector(".user_name").setAttribute(
        "id",
        i.writer_id
      );
      CLONE_ma9al_div.querySelector(".img_prf img").src = "../" + i.linkPRF;
      CLONE_ma9al_div.querySelector(".time_post").innerText =
        i.date_post.substring(0, i.date_post.indexOf(" "));
      CLONE_ma9al_div.querySelector(".num_like").innerText = i.num_likes;
      CLONE_ma9al_div.querySelector(".num_coments").innerText = i.countComemnt;
      d(CLONE_ma9al_div);
      snt_ma9alat.appendChild(CLONE_ma9al_div);
      MA9AL_FUNCTION(CLONE_ma9al_div);
    }
  });
}

function MA9AL_FUNCTION(ma9al) {
  let title_article = ma9al.querySelector(".title_article");
  let m9l_text = ma9al.querySelector(".m9l_text");
  let btn_likeMA9AL = ma9al.querySelector("#btn_like_post");
  let num_like = ma9al.querySelector(".num_like");
  let btn_OPEN_PAGE_COMENT = ma9al.querySelector("#btn_pg_coment");
  let num_coments = ma9al.querySelector(".num_coments");
  let time_post = ma9al.querySelector(".time_post");
  let btn_MORE_CHOESES = ma9al.querySelector(".btn_more_detail1");
  let List_choices = ma9al.querySelector(".List_choices");
  let writer_NAME = ma9al.querySelector(".user_name");
  let writer_PROFIL_IMG = ma9al.querySelector(".img_prf img");
  btn_likeMA9AL.querySelector("img").src = "icones/btnLike.png";
  for (var i of likedPostsAray) {
    if (i.item_id == ma9al.getAttribute("id") && i.item_type == "article") {
      btn_likeMA9AL.querySelector("img").src = "icones/like.png";
      break;
    }
  }
  btn_likeMA9AL.onclick = () => {
    let img_h = btn_likeMA9AL.querySelector("img");
    if (img_h.src.match("icones/btnLike.png")) {
      num_like.innerText = parseInt(num_like.innerText) + 1;
      img_h.src = "icones/like.png";
      btn_likeMA9AL.querySelector("img").classList.add("popup_lik");
      btn_likeMA9AL.disabled = true;
      add_like(ma9al.getAttribute("id"), "article");
      setTimeout(() => {
        btn_likeMA9AL.disabled = false;
      }, 10000);
    } else {
      img_h.src = "icones/btnLike.png";
      btn_likeMA9AL.querySelector("img").classList.remove("popup_lik");
      num_like.innerText = parseInt(num_like.innerText) - 1;
      btn_likeMA9AL.disabled = true;
      cancel_like(ma9al.getAttribute("id"), "article");
      setTimeout(() => {
        btn_likeMA9AL.disabled = false;
      }, 10000);
    }
  };

  btn_OPEN_PAGE_COMENT.onclick = () => {
    choosed_item_id = ma9al.getAttribute("id");
    chooosed_itme_type = "article";
    choosedItem = ma9al;
    open_coment(btn_OPEN_PAGE_COMENT);
    /*/ 
                   JQUERY 
                 /*/
  };
  var btns_choeses = List_choices.querySelectorAll("button");
  if (UserID == undefined) {
    btn_MORE_CHOESES.disabled = true
  } else {
    btn_MORE_CHOESES.disabled = false

  }
  btn_MORE_CHOESES.onclick = () => {
    check_ratting();
    check_saved();
    check_ratting();
    check_following();

    r(MESSAGE_POPUP);
    document.querySelectorAll(".List_choices").forEach((el) => r(el));
    d(List_choices);
    W_CLICK_R(btn_MORE_CHOESES, List_choices, [List_choices]);
    btns_choeses[0].onclick = () => {
      $.post("../MAINPHP/saveItems.php", {
        item_id: ma9al.getAttribute("id"),
        user_id: UserID,
        contentType: "article",
      }).done((res) => {
        if (res == "done") {
          ReSetLocalStorage(
            "SWINGM_MA9AL_SAVED",
            ma9al.getAttribute("id"),
            "add"
          );
          MESSAGE_POPUP.querySelector("p").innerText = "تم حفض العنصر ";
          d(MESSAGE_POPUP);
          r(List_choices);
          check_saved();
        } else {
          MESSAGE_POPUP.querySelector("p").innerText = "لم يتم حفظ العنصر ";
          d(MESSAGE_POPUP);
          setTimeout(() => {
            r(List_choices);
          }, 1000);
        }
      });
    };

    btns_choeses[1].onclick = () => {
      if (UserID != undefined) {
        let follow_id = writer_NAME.getAttribute("id");
        $.post("../MAINPHP/addFollowe.php", {
          user_id: UserID,
          follow_id: follow_id,
        }).done((res) => {
          try {
            if (res == "done") {
              ReSetLocalStorage("SWINGM_USER_FOLLOWING", follow_id, "add");
              MESSAGE_POPUP.querySelector("p").innerText =
                "أنت الآن تتابع الكاتب ";
              d(MESSAGE_POPUP);
              r(List_choices);
            } else {
            }
          } catch (er) {
            MESSAGE_POPUP.querySelector("p").innerText =
              "حدث خطا أثناء تنفيذ هذه العملية ";
            d(MESSAGE_POPUP);
            setTimeout(() => {
              r(List_choices);
            }, 1000);
          }
        });
      }

      r(List_choices);
      MESSAGE_POPUP.querySelector("p").innerText = "";
      d(MESSAGE_POPUP);
    };

    btns_choeses[2].onclick = () => {
      open_report(btns_choeses[2], ma9al.getAttribute("id"), "articles");
    };

    btns_choeses[3].onclick = () => {
      addRate(ma9al.getAttribute("id"), "ma9al");
      r(List_choices);
      d(PAGE_COMENT);
      d(RATING_POPUP);
      W_CLICK_R(btns_choeses[3], RATING_POPUP, [RATING_POPUP, PAGE_COMENT]);
    };
  };
  writer_NAME.onclick = () => {
    if (writer_NAME.getAttribute("id") != UserID) {
      let hrefToPage =
        "aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL^" +
        writer_NAME.getAttribute("id") +
        "&aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL";
      hrefToPage = JSON.stringify(encodeURIComponent(hrefToPage));
      window.location.href = "../usersInfo.html?UserIdentifyer=" + hrefToPage;
    } else if (UserID != undefined) {
      window.location.href = ".././PROFILE_PAGE.html";
    }
  };
  function check_following() {
    let follwiung_persones = localStorage.getItem("SWINGM_USER_FOLLOWING");
    if (follwiung_persones == null) {
      return false;
    } else if (follwiung_persones != null) {
      follwiung_persones = JSON.parse(follwiung_persones);
      if (follwiung_persones.includes(writer_NAME.getAttribute("id"))) {
        btns_choeses[2].disabled = true;
        btns_choeses[2].innerText = writer_NAME.innerText + `   النت تتابع`;

        // d(btns_choeses[2], "advanced-quantum-field-theory-and-applications-in-high-energy-particle-physics");
      } else {
        return false;
      }
    }
  }

  function check_saved() {
    let follwiung_persones = localStorage.getItem("SWINGM_MA9AL_SAVED");
    if (follwiung_persones == null) {
      return false;
    } else if (follwiung_persones != null) {
      follwiung_persones = JSON.parse(follwiung_persones);
      if (follwiung_persones.includes(ma9al.getAttribute("id"))) {
        btns_choeses[0].disabled = true;
        btns_choeses[0].innerText = "لقد قمت  بحفظ هذا العنصر ";

        // d(btns_choeses[0], "advanced-quantum-field-theory-and-applications-in-high-energy-particle-physics");
      } else {
        return false;
      }
    }
  }

  function check_ratting() {
    var tated_items = localStorage.getItem("SWINGM_RATINGS_OF_ma9al");
    if (tated_items != null) {
      tated_items = JSON.parse(tated_items);
      if (tated_items.includes(ma9al.getAttribute("id"))) {
        btns_choeses[4].disabled = true;
        btns_choeses[4].innerText = "لقد قمت بتقييم هذا العنصر ";
        // d(btns_choeses[4], "advanced-quantum-field-theory-and-applications-in-high-energy-particle-physics");
      }
    }
  }
  check_report();
  function check_report() {
    var tated_items = localStorage.getItem("SWINGM_REPORTS_OF_article");
    if (tated_items != null) {
      tated_items = JSON.parse(tated_items);
      if (tated_items.includes(ma9al.getAttribute("id"))) {
        btns_choeses[3].disabled = true;
        btns_choeses[3].innerText = "لقد قمت بالإبلاغ عن هذا العنصر ";
      }
    }
  }

}

// BOOOK
let mainBooks = document.querySelector(".mainBooks");
let bookElement = document.querySelector(".book");
function getBooks() {
  startLoader();
  var elentsBooks = document.querySelectorAll(".book.display");
  var listIds = [];
  elentsBooks.forEach((el) => {
    listIds.push(el.getAttribute("id"));
  });

  listIds.push(0);
  listIds = listIds.filter((el) => el != null);
  listIds = JSON.stringify(listIds);

  $.post("./php/getBooks.php", {
    books_ids: listIds,
  }).done((res) => {
    stopLoader();
    res = JSON.parse(res);
    mainBooks.replaceChildren();
    for (var b of res) {
      let cloneBook = bookElement.cloneNode(true);
      cloneBook.setAttribute("id", b.book_id);
      cloneBook.querySelector(".cntImage img").src = ".././" + b.cover_src;
      cloneBook.querySelector(".btnGetBook").href =
        "./index.html?book_id=" +
        b.book_id +
        "&book_name=" +
        b.name.replace(/ /g, "_");
      cloneBook.querySelector(".nameBook").innerText = b.name;
      cloneBook.querySelector(".num_coments").innerText = b.countComemnt;
      cloneBook.querySelector("#writer_name").innerText = b.writer_name;
      cloneBook.querySelector("#type_book").innerText = b.genre;

      d(cloneBook);
      mainBooks.appendChild(cloneBook);
    }
    snt_ma9alat.appendChild(mainBooks);
    BOOK_FUNCTION();
  });
}

function BOOK_FUNCTION() {
  let booksElemts = document.querySelectorAll(".book.display");
  booksElemts.forEach((book) => {
    var bnt_open_page_coment = book.querySelector("#btn_open_page_coment");
    bnt_open_page_coment.onclick = () => {
      choosed_item_id = book.getAttribute("id");
      chooosed_itme_type = "book";
      choosedItem = book;
      open_coment(bnt_open_page_coment, book.getAttribute("id"), "book");
    };
  });
}

// NEWS -------------
let news = document.querySelector(".news");
let cnt_Top_stories = document.querySelector(".cnt_Top_stories");
let LatestNews = document.querySelector(".LatestNews");
function getNews() {
  startLoader();
  var elentsBooks = document.querySelectorAll(".book.display");
  var listIds = [];
  elentsBooks.forEach((el) => {
    listIds.push(el.getAttribute("id"));
  });
  listIds.push(0);
  listIds = listIds.filter((el) => el != null);
  listIds = JSON.stringify(listIds);
  $.post("./php/getNews.php", {
    books_ids: listIds,
  }).done((res) => {
    stopLoader();
    res = JSON.parse(res);
    res.forEach((r) => {
      r.link_paths = JSON.parse(r.link_paths);
    });
    d(news);
    var counterManyElem = 0;
    var countMainELEm = 0;
    var cloneCNTNEW = news.cloneNode(true);

    for (var n of res) {
      if (
        !cloneCNTNEW.querySelector(".cnt_Top_stories.display") ||
        countMainELEm == 4 ||
        counterManyElem == 6
      ) {
        countMainELEm = 0;
        if (counterManyElem == 6) {
          counterManyElem = 0;
        }
        let cloneNews = cnt_Top_stories.cloneNode(true);
        let mainImage
        for (var ob in n.link_paths) {
          mainImage = n.link_paths[ob];
          break;

        };
        
        cloneNews.querySelector(".newIMG img").src = ".././" + mainImage;
        cloneNews.querySelector(".titleNews").innerText = n.title;
        var contentNew = n.content;
        contentNew = contentNew.substring(0, 800);
        cloneNews.querySelector(".textNews").innerText = contentNew;
        if (n.content.length > 800) {
          cloneNews.querySelector(".textNews").innerText += " ... المزيد ";
        }

        cloneNews.setAttribute("new_id", n.news_id);
        d(cloneNews);
        newFunction(cloneNews);
        cloneCNTNEW.appendChild(cloneNews);
      } else {
        let cloneNews = LatestNews.cloneNode(true);
        let mainImage = n.link_paths.img1;
        cloneNews.querySelector(".newIMGLASTN img").src = ".././" + mainImage;
        cloneNews.querySelector(".titlastsleNews").innerText = n.title;
        var contentNew = n.content;
        contentNew = contentNew.substring(0, 200);
        cloneNews.querySelector(".textlastsleNews").innerText = contentNew;
        if (n.content.length > 200) {
          cloneNews.querySelector(".textlastsleNews").innerText +=
            " ... المزيد ";
        }
        cloneNews.setAttribute("new_id", n.news_id);
        d(cloneNews);
        cloneCNTNEW.appendChild(cloneNews);
        newFunction(cloneNews);
        countMainELEm++;
      }
      counterManyElem++;
      snt_ma9alat.appendChild(cloneCNTNEW);
    }
    // r(PAGE_COMENT);
    // r(menu_fad);
  });
}

function newFunction(news) {
  news.onclick = () => {
    btnGetMore.click();
  };
  let btnGetMore = news.querySelector(".btnGetMore");
  btnGetMore.onclick = () => {
    let new_id = news.getAttribute("new_id");
    window.location.href = `./AboutNew.html?new_id=${new_id}`;
  };
}
// COMMENT SPAE ------------------------

let REPORT_POPUP = document.querySelector(".popUp_report");
let FRIEND_LIST_div = document.querySelector(".cnt_list_friend");
let RATING_POPUP = document.querySelector(".CntRatting");
let MESSAGE_POPUP = document.querySelector(".pop_message");

// M E N U B A R E -------------------------------
var btn_ADD_ARTICLE = document.querySelector("#btn_ADD_ARTICLE");
var btn_write_ma9al = document.querySelector("#btn_write_ma9al");

let menu = document.querySelector(".menu");

let btn_PAGE_SEARCH = document.getElementById("btn_PAGE_SEARCH");
btn_PAGE_SEARCH.addEventListener("click", () => {
  window.location.href = window.location.origin + "/SWINGM2/SEARCH_PAGE.html";
});

btn_profile_page.addEventListener("click", () => {
  if (UserID != undefined) {
    window.location.href =
      window.location.origin + "/SWINGM2/PROFILE_PAGE.html";
  }
});
// *-----------COMMENTS SPACE HERE------------------------------
let btn_canc_pg_coment = document.querySelector("#btn_canc_pg_coment");
let cnt_pg_cometn = document.querySelector(".cnt_pg_cometn");

btn_canc_pg_coment.addEventListener("click", () => {
  r(PAGE_COMENT);
  r(MAIN_COMENT);
});

var write_coment_space = document.querySelector(".write_coment_space");
var reply_how = document.querySelector(".reply_how");
var popUp_report = document.querySelector(".popUp_report");
let btn_moreCBCOMENT = document.querySelectorAll(".btn_moreCBCOMENT");

let cnt_list_friend = document.querySelector(".cnt_list_friend");
function choose_friendToSend() {
  let cnt_friendDIV = FRIEND_LIST_div.querySelectorAll(".cnt_friendDIV");
  cnt_friendDIV.forEach((btn656) => {
    btn656.onclick = () => {
      if (!btn656.querySelector(".imgChooesd")) {
        let img_clone = document.querySelector("img");
        img_clone.src = "icones/accept.png";
        img_clone.className = "imgChooesd";
        btn656.classList.add("activeChooesdFriend");
        btn656.insertBefore(img_clone, btn656.firstChild);
      } else {
        btn656.querySelector(".imgChooesd").remove();
        btn656.classList.remove("activeChooesdFriend");
      }
    };
  });
}

// REPOSRTE *------------------------------
