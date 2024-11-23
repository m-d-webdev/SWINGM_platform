function _(m) {
  console.log(m);
}
function d(elem, d = "s-X3z-V4rB-H8tQ") {
  elem.forEach((e) => e.classList.add(d));
}
function r(elem, d = "s-X3z-V4rB-H8tQ") {
  elem.forEach((e) => e.classList.remove(d));
}
function c(btn, elem1, elems) {
  window.onclick = (e) => {
    if (!btn.contains(e.target) && !elem1.contains(e.target)) {
      elems.forEach((e) => r([e]));
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

let btn_back = document.querySelector("#btn_back");
btn_back.addEventListener("click", () => {
  window.history.back();
});

const FILTER_DIV = document.querySelector(".FILTER_DIV");
let cntConfirm = document.querySelector(".cntConfirm");
let CNT_OCNFIRMDIV = document.querySelector(".CNT_OCNFIRMDIV");
let INFO_USER = {};
var UserID;

getInfoUser();
function getInfoUser() {
  var urlCom = window.location.search;
  if (urlCom.indexOf("=") != -1) {
    UserID = urlCom.substring(urlCom.indexOf("=") + 1);
  } else {
    if (localStorage.getItem("SWINGM_USER_ID") != null) {
      UserID = localStorage.getItem("SWINGM_USER_ID");
    }
  }
  if (UserID != undefined) {
    startLoader();
    $.post("./MAINPHP/getInfoUser.php", {
      user_id: UserID,
    }).done((res) => {
      stopLoader();
      INFO_USER = JSON.parse(res);
      setInfoUser();
    });
  }
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
    old_data = JSON.parse(old_data);
    var new_data = old_data.filter((item) => item != value);
    localStorage.removeItem(ItemName);
    new_data = JSON.stringify(new_data);
    localStorage.setItem(ItemName, new_data);
  }
}

var userEmail = document.querySelector("#inpEmailEdit");
var inpFirstNmae = document.querySelector("#inpFirstNmae");
var inpLastName = document.querySelector("#inpLastName");
var userIdentufyer = document.querySelector(".userAdress");
var full_Name_user = document.querySelector(".full_Name_user");
var userJob = document.querySelector("#userJob");
var inpuserJob = document.querySelector("#inpOccupation");
var inerFOLLOWERS = document.querySelector("#inerFOLLOWERS");
var innerFOLLOWING = document.querySelector("#innerFOLLOWING");
var innerFRIEND = document.querySelector("#innerFRIEND");
var img_user = document.querySelector(".cnt_img_user img");
var img_userEDIt = document.querySelector(".cntOmgToEdit img");

function setInfoUser() {
  document.querySelector(".cntImgUSER img").src = `./${INFO_USER.linkPRF}`;
  img_user.src = `./${INFO_USER.linkPRF}`;
  img_userEDIt.src = `./${INFO_USER.linkPRF}`;
  userEmail.value = INFO_USER.email;
  userIdentufyer.innerHTML = UserID;
  full_Name_user.innerHTML = INFO_USER.first_name + " " + INFO_USER.last_name;
  inpFirstNmae.value = INFO_USER.first_name;
  inpLastName.value = INFO_USER.last_name;
  inpuserJob.value = INFO_USER.job;
  userJob.innerHTML = INFO_USER.job;
  innerFOLLOWING.innerHTML = INFO_USER.Following.length;
  inerFOLLOWERS.innerHTML = INFO_USER.Followers.length;
}
//

let listBooks = document.querySelector(".listBooks");
let cntBook = document.querySelector(".cntBook");

function getBooks() {
  startLoader();
  $.get("./MAINPHP/getSavedBooks.php", {
    user_id: UserID,
  }).done((res) => {
    stopLoader();
    let booksInfo = JSON.parse(res);
    listBooks.replaceChildren();
    if (booksInfo.length == 0) {
      listBooks.innerHTML = "<p class ='noResult'>فارغ </p>";
    }
    booksInfo.forEach((element) => {
      let bookElem = cntBook.cloneNode(true);
      bookElem.querySelector(".bookName").innerText = element.name;
      bookElem.querySelector(".cnt_imgBook img").src = `./${element.cover_src}`;
      bookElem.setAttribute("book_id", element.book_id);
      bookElem.querySelector(".likForBook").href =
        "./ResearcherSpace/index.html?book_id=" +
        element.book_id +
        "&book_name=" +
        element.name.replace(/ /g, "_");
      listBooks.appendChild(bookElem);
      BOOK_FUNCTION(bookElem);
    });
  });
}

function BOOK_FUNCTION(bookElem) {
  bookElem.querySelector(".cnt_imgBook").onclick = () => {
    bookElem.querySelector(".likForBook").click();
  };
  let btnRemoveFromLibrary = bookElem.querySelector(".btnRemoveF_library");
  btnRemoveFromLibrary.onclick = () => {
    d([CNT_OCNFIRMDIV, cntConfirm]);
    cntConfirm.querySelector("h4").innerHTML = "أنت متاكد من حدف هذا العنصر ";

    let btnAccept = document.querySelector("#btnAccept");
    let btnCancel = document.querySelector("#btnCancel");

    btnCancel.onclick = () => {
      r([CNT_OCNFIRMDIV, cntConfirm]);
    };
    btnAccept.onclick = () => {
      r([CNT_OCNFIRMDIV, cntConfirm]);

      $(document).ready(() => {
        startLoader();
        $.post("./MAINPHP/removeFromLibrary.php", {
          user_id: UserID,
          item_id: bookElem.getAttribute("book_id"),
        }).done((res) => {
          if (res == "success") {
            stopLoader();
            bookElem.remove();
            ReSetLocalStorage(
              "SWINGM_USER_LIBRARY",
              bookElem.getAttribute("book_id"),
              "remove"
            );
          }
        });
      });
    };
  };
}
// ================================================================
let listSavedItems = document.querySelector(".listSavedItems");
let MA9AL = document.querySelector(".MA9AL");

function getSavedItems() {
  startLoader();
  $.get("./MAINPHP/getSavedItems.php", {
    user_id: UserID,
  }).done((res) => {
    stopLoader();
    listSavedItems.replaceChildren();
    let savedItemsInfo = JSON.parse(res);
    if (savedItemsInfo.length == 0) {
      listSavedItems.innerHTML = "<p class ='noResult'>فارغ </p>";
    }
    savedItemsInfo.forEach((element) => {
      let savedItem = MA9AL.cloneNode(true);
      savedItem.querySelector(".titleMa9alSaved").innerText = element.title;
      let textArticle = element.article_text;
      resizeText(savedItem.querySelector(".contentMa9al"), textArticle);
      savedItem.setAttribute("saved_id", element.saved_id);
      listSavedItems.appendChild(savedItem);
      SAVED_ITEM(savedItem);
    });
  });
}

function SAVED_ITEM(savedItem) {
  let btnRemoveItem = savedItem.querySelector(".bntRemoveMa9al");

  btnRemoveItem.onclick = () => {
    d([CNT_OCNFIRMDIV, cntConfirm]);
    cntConfirm.querySelector("h4").innerHTML = "أنت متاكد من حدف هذا العنصر ";

    let btnAccept = document.querySelector("#btnAccept");
    let btnCancel = document.querySelector("#btnCancel");

    btnCancel.onclick = () => {
      r([CNT_OCNFIRMDIV, cntConfirm]);
    };
    btnAccept.onclick = () => {
      r([CNT_OCNFIRMDIV, cntConfirm]);

      $(document).ready(() => {
        startLoader();
        $.post("./MAINPHP/removeSaevdItem.php", {
          user_id: UserID,
          item_id: savedItem.getAttribute("saved_id"),
        }).done((res) => {
          if (res == "done") {
            stopLoader();
            savedItem.remove();
            ReSetLocalStorage(
              "SWINGM_MA9AL_SAVED",
              savedItem.getAttribute("saved_id"),
              "remove"
            );
          }
        });
      });
    };
  };
}

function resizeText(elemText, text) {
  if (text.length > 200) {
    Subedtext = text.substring(0, 200) + "  ...";
    elemText.innerText = Subedtext;

    let button = document.createElement("button");
    button.innerText = "اظهار المزيد";
    button.className = "btnMoreText";
    elemText.appendChild(button);
    button.onclick = () => {
      elemText.innerText = text;
    };
  } else {
    elemText.innerText = text;
  }
}

//-------------------------------
let btn_saveEdit = document.getElementById("btn_saveEdit");
btn_saveEdit.disabled = true;
btn_saveEdit.onclick = () => {
  $(document).ready(() => {
    startLoader();
    $.post("./MAINPHP/saveChoane.php", {
      user_id: UserID,
      first_name: inpFirstNmae.value,
      last_name: inpLastName.value,
      job: inpuserJob.value,
      email: userEmail.value,
    }).done((res) => {
      if (res == "done") {
        stopLoader();
        window.location.reload();
      }
    });
  });
};

[userEmail, inpuserJob, inpLastName, inpFirstNmae].forEach((elem) => {
  elem.onchange = () => {
    btn_saveEdit.disabled = false;
  };
});

// EDIT ELEMENTS SCRIPT HERE ------------------------------
var btn_change_pic = document.getElementById("change_pic");
btn_change_pic.onclick = () => {
  var encryptStrinng =
    "7gHb8P0mN2fX9jTq5V6L1zA4wQ3E2dC" +
    UserID +
    "{}gHb8P0mN2fX9jTq5V6L1zA4wQ3E";
  var encryptStrinng = JSON.stringify(encryptStrinng);
  encryptStrinng = encodeURIComponent(encryptStrinng);
  var ref =
    origin +
    "/SWINGM2/change_prf.html?data=" +
    encryptStrinng +
    "^" +
    window.location.origin;
  window.location.href = ref;
};

// -----------------------------------------------

let btn_openSetting = document.getElementById("btn_sett");
let btn_openotification = document.getElementById("btn_notificto");
let cnt_notifications = document.querySelector(".cnt_notifications");
let otherInfoELEM = document.querySelector(".otherInfoELEM");
let btnCancelEdit = document.querySelector("#btnCancelEdit");
btn_openSetting.addEventListener("click", () => {
  d([otherInfoELEM, FILTER_DIV]);
  c(btn_openSetting, otherInfoELEM, [otherInfoELEM, FILTER_DIV]);
  btnCancelEdit.addEventListener("click", () => {
    r([otherInfoELEM, FILTER_DIV]);
  });
});
btn_openotification.addEventListener("click", () => {
  d([FILTER_DIV, cnt_notifications]);
  c(btn_openotification, cnt_notifications, [cnt_notifications, FILTER_DIV]);

  $(document).ready(() => {
    startLoader();
    $.post("./MAINPHP/getNotices.php", {
      user_id: UserID,
    }).done((res) => {
      stopLoader();
      setNotices(res);
    });
  });
});

let list_notf = document.querySelector(".list_notf");
let cnt_notif = document.querySelector(".cnt_notif");

function setNotices(res) {
  data = JSON.parse(res);
  list_notf.replaceChildren();
  data.forEach((element) => {
    let CLONED_cnt_notif = cnt_notif.cloneNode(true);
    CLONED_cnt_notif.querySelector(".time_notf").innerHTML =
      element.date_receive;
    CLONED_cnt_notif.querySelector(".notif_text").innerHTML =
      element.notice_text;
    CLONED_cnt_notif.querySelector(".cnt_imgnotf img").src =
      "./" + element.pic_notice;
    d([CLONED_cnt_notif]);
    list_notf.appendChild(CLONED_cnt_notif);
  });
}

// ---------------------------------------------------
let btn_show_list_followers = document.getElementById("bnt_follwes");
let btn_show_list_follwing = document.getElementById("btn_follwing");
let list_follers = document.querySelector(".list_follers");
let cnt_fullLISTFRIEND = document.querySelector(".cnt_fullLISTFRIEND");
let elem_user_freind = document.querySelector(".cnt_followers");

btn_show_list_followers.addEventListener("click", () => {
  d([FILTER_DIV, cnt_fullLISTFRIEND]);
  c(btn_show_list_followers, cnt_fullLISTFRIEND, [
    cnt_fullLISTFRIEND,
    FILTER_DIV,
  ]);
  startLoader();
  $.get("./MAINPHP/getFollowers.php?user_id=" + UserID).done((res) => {
    stopLoader();
    res = JSON.parse(res);
    list_follers.replaceChildren();

    if (res.length == 0) {
      list_follers.appendChild(document.createElement("div")).innerHTML =
        "لا يوجد متابعين";
    }
    res.forEach((element) => {
      let CLONED_elem_user_freind = elem_user_freind.cloneNode(true);
      CLONED_elem_user_freind.querySelector(".cnt_nameuser").innerHTML =
        element.first_name + " " + element.last_name;
      CLONED_elem_user_freind.querySelector(".cnt_imgFOL img").src =
        "./" + element.linkPRF;
      CLONED_elem_user_freind.setAttribute("follower_id", element.follower_id);
      d([CLONED_elem_user_freind]);
      list_follers.appendChild(CLONED_elem_user_freind);
    });
    listi_follwers();
  });
  cnt_fullLISTFRIEND.querySelector(".title_cntasd").innerHTML = "المتابعين ";
});

btn_show_list_follwing.addEventListener("click", () => {
  d([FILTER_DIV, cnt_fullLISTFRIEND]);
  c(btn_show_list_follwing, cnt_fullLISTFRIEND, [
    cnt_fullLISTFRIEND,
    FILTER_DIV,
  ]);
  startLoader();
  $.get("./MAINPHP/getFollowing.php?user_id=" + UserID).done((res) => {
    stopLoader();
    list_follers.replaceChildren();
    res = JSON.parse(res);
    if (res.length == 0) {
      list_follers.appendChild(document.createElement("div")).innerHTML =
        "لا تتابع أحدا ";
    }
    res.forEach((element) => {
      let CLONED_elem_user_freind = elem_user_freind.cloneNode(true);
      CLONED_elem_user_freind.querySelector(".cnt_nameuser").innerHTML =
        element.first_name + " " + element.last_name;
      CLONED_elem_user_freind.querySelector(".cnt_imgFOL img").src =
        "./" + element.linkPRF;
      CLONED_elem_user_freind.setAttribute("followee_id", element.followee_id);
      d([CLONED_elem_user_freind]);
      list_follers.appendChild(CLONED_elem_user_freind);
    });
    listi_follwings();
  });
  cnt_fullLISTFRIEND.querySelector(".title_cntasd").innerHTML = "أتابع";
  var edt_st_btn = cnt_fullLISTFRIEND.querySelector(".edt_st_btn");
  edt_st_btn.innerHTML = "إلغاء المتابعة";
});

function listi_follwers() {
  let cnt_FriendDIVS = list_follers.querySelectorAll(".cnt_followers");
  cnt_FriendDIVS.forEach((div_FRIEND) => {
    let btn_edt = div_FRIEND.querySelector(".edt_st_btn");
    btn_edt.innerHTML = "مسح  ";
    btn_edt.onclick = () => {
      remove_follwer(div_FRIEND, div_FRIEND.getAttribute("follower_id"));
    };
  });
}

function listi_follwings() {
  let cnt_FriendDIVS = list_follers.querySelectorAll(".cnt_followers");
  cnt_FriendDIVS.forEach((div_FRIEND) => {
    let btn_edt = div_FRIEND.querySelector(".edt_st_btn");
    btn_edt.innerHTML = "إلغاء المتابعة   ";
    btn_edt.onclick = () => {
      remove_follwing(div_FRIEND, div_FRIEND.getAttribute("followee_id"));
    };
  });
}

function remove_follwer(div_FRIEND, id) {
  d([CNT_OCNFIRMDIV, cntConfirm]);
  cntConfirm.querySelector("h4").innerHTML = "هل تريد حذف هذا المتابع؟";
  let btnAccept = document.querySelector("#btnAccept");
  let btnCancel = document.querySelector("#btnCancel");
  btnCancel.onclick = () => {
    r([CNT_OCNFIRMDIV, cntConfirm]);
    setTimeout(() => {
      d([FILTER_DIV, cnt_fullLISTFRIEND]);
      c(btn_show_list_follwing, cnt_fullLISTFRIEND, [
        cnt_fullLISTFRIEND,
        FILTER_DIV,
      ]);
    }, 100);
  };
  btnAccept.onclick = () => {
    startLoader();
    $.post("./MAINPHP/removeFollower.php", {
      user_id: UserID,
      follower_id: id,
    }).done((res) => {
      if (res == "done") {
        stopLoader();
        r([CNT_OCNFIRMDIV, cntConfirm]);
        setTimeout(() => {
          ReSetLocalStorage("SWINGM_USER_FOLLOWING", id, "remove");
          div_FRIEND.remove();
        }, 100);
      }
    });
  };
}
function remove_follwing(div_FRIEND, id) {
  d([CNT_OCNFIRMDIV, cntConfirm]);
  cntConfirm.querySelector("h4").innerHTML =
    " هل تريد   إلغاء متابعة هذا الشخص ";
  let btnAccept = document.querySelector("#btnAccept");
  let btnCancel = document.querySelector("#btnCancel");
  btnCancel.onclick = () => {
    r([CNT_OCNFIRMDIV, cntConfirm]);
    setTimeout(() => {
      d([FILTER_DIV, cnt_fullLISTFRIEND]);
      c(btn_show_list_follwing, cnt_fullLISTFRIEND, [
        cnt_fullLISTFRIEND,
        FILTER_DIV,
      ]);
    }, 100);
  };
  btnAccept.onclick = () => {
    startLoader();
    $.post("./MAINPHP/cancelFollowing.php", {
      user_id: UserID,
      followee_id: id,
    }).done((res) => {
      if (res == "done") {
        stopLoader();
        r([CNT_OCNFIRMDIV, cntConfirm]);
        ReSetLocalStorage("SWINGM_USER_FOLLOWING", id, "remove");
        div_FRIEND.remove();
      }
    });
  };
}

let btn_logout = document.getElementById("btn_logout");
btn_logout.addEventListener("click", () => {
  d([CNT_OCNFIRMDIV, cntConfirm]);
  cntConfirm.querySelector("h4").innerHTML = "تاكيد تسجيل الخروج ";

  let btnAccept = document.querySelector("#btnAccept");
  let btnCancel = document.querySelector("#btnCancel");
  btnCancel.onclick = () => {
    r([CNT_OCNFIRMDIV, cntConfirm]);
  };
  btnAccept.onclick = () => {
    localStorage.clear();
    window.location.replace("./main.html");  
    // window.location.href = "./main.html";
  };
});

let btnGetInfo = document.getElementById("btnGetInfo");
let cntImgUSER = document.querySelector(".cntImgUSER");
let btnGetLibrary = document.getElementById("btnGetLibrary");
let btnGetSaved = document.getElementById("btnGetSaved");

let mainInfo = document.querySelector(".mainInfo");
let libraryBooks = document.querySelector(".libraryBooks");
let savedItems = document.querySelector(".savedItems");
cntImgUSER.onclick = () => btnGetInfo.click();
btnGetInfo.onclick = () => {
  document.querySelector(".chooedButton").classList.remove("chooedButton");
  d([btnGetInfo], "chooedButton");
  d([mainInfo]);
  r([libraryBooks, savedItems]);
};
btnGetInfo.click();
btnGetLibrary.onclick = () => {
  document.querySelector(".chooedButton").classList.remove("chooedButton");
  d([btnGetLibrary], "chooedButton");
  d([libraryBooks]);
  r([mainInfo, savedItems]);
  getBooks();
};
btnGetSaved.onclick = () => {
  document.querySelector(".chooedButton").classList.remove("chooedButton");
  d([btnGetSaved], "chooedButton");
  d([savedItems]);
  r([mainInfo, libraryBooks]);
  getSavedItems();
};
