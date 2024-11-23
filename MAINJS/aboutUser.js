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

let btn_back = document.querySelector("#btn_back");
btn_back.addEventListener("click", () => {
  window.history.back();
})
const FILTER_DIV = document.querySelector(".FILTER_DIV");
let cntConfirm = document.querySelector(".cntConfirm");
let btn_folloe = document.querySelector("#btn_folloe");
let CNT_OCNFIRMDIV = document.querySelector(".CNT_OCNFIRMDIV");
let INFO_USER = {};
var UserID, owner;

getInfoUser();

function getInfoUser() {
  var urlCom = window.location.search;
  owner = urlCom.substring(urlCom.indexOf("=") + 1);
  owner = JSON.parse(decodeURIComponent(owner));
  owner = owner.substring(owner.indexOf("^") + 1 ,owner.indexOf("&"));
  if (localStorage.getItem("SWINGM_USER_ID") != null) {
    UserID = localStorage.getItem("SWINGM_USER_ID");
  }

  if (owner != undefined) {
    $.post("./MAINPHP/getInfoUser.php", {
      user_id: owner,
    }).done((res) => {
      INFO_USER = JSON.parse(res);
      setInfoUser();
    });
  }
}
checkFollowing();
function checkFollowing() {
  if (localStorage.getItem("SWINGM_USER_FOLLOWING") != null) {
    var old_data = localStorage.getItem("SWINGM_USER_FOLLOWING");
    old_data = JSON.parse(old_data);
    if (old_data.includes(owner)) {
      btn_folloe.querySelector("img").src = "./MEDIA/add-friend.png";
      btn_folloe.querySelector("p").innerHTML = "تتابعه";
    } else {
      btn_folloe.querySelector("img").src = "./MEDIA/add.png";
      btn_folloe.querySelector("p").innerHTML = "متابعة";
    }
  }
}

btn_folloe.onclick = () => {
  if (btn_folloe.querySelector("p").innerHTML == "تتابعه") {
    d([CNT_OCNFIRMDIV, cntConfirm]);
    cntConfirm.querySelector("h4").innerHTML =
      "    هل تريد إلغاء متابعة  " + full_Name_user.innerHTML;
    let btnAccept = document.querySelector("#btnAccept");
    let btnCancel = document.querySelector("#btnCancel");
    btnCancel.onclick = () => {
      r([CNT_OCNFIRMDIV, cntConfirm]);
    };
    btnAccept.onclick = () => {
      $(document).ready(() => {
        $.post("./MAINPHP/cancelFollowing.php", {
          user_id: UserID,
          followee_id: owner,
        }).done((res) => {
          if (res == "done") {
            ReSetLocalStorage("SWINGM_USER_FOLLOWING", owner, "remove");
            location.reload();
          }
        });
      });
    };
  } else if (btn_folloe.querySelector("p").innerHTML == "متابعة") {
    $(document).ready(() => {
      $.post("./MAINPHP/addFollowe.php", {
        user_id: UserID,
        follow_id: owner,
      }).done((res) => {
        ReSetLocalStorage("SWINGM_USER_FOLLOWING", owner, "add");
        location.reload();
      });
    });
  }
};

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

var userIdentufyer = document.querySelector(".userAdress");
var full_Name_user = document.querySelector(".full_Name_user");
var userJob = document.querySelector("#userJob");
var inerFOLLOWERS = document.querySelector("#inerFOLLOWERS");
var innerFOLLOWING = document.querySelector("#innerFOLLOWING");
var img_user = document.querySelector(".cnt_img_user img");

function setInfoUser() {
  img_user.src = `./${INFO_USER.linkPRF}`;
  userIdentufyer.innerHTML = owner;
  full_Name_user.innerHTML =
    INFO_USER.first_name + " " + INFO_USER.last_name;
  userJob.innerHTML = INFO_USER.job;
  innerFOLLOWING.innerHTML = INFO_USER.Following.length;
  inerFOLLOWERS.innerHTML = INFO_USER.Followers.length;
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
  $.get("./MAINPHP/getFollowers.php?user_id=" + owner).done((res) => {
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
      CLONED_elem_user_freind.setAttribute(
        "follower_id",
        element.follower_id
      );
      d([CLONED_elem_user_freind]);
      list_follers.appendChild(CLONED_elem_user_freind);
    });
  });
  cnt_fullLISTFRIEND.querySelector(".title_cntasd").innerHTML =
    "المتابعين ";
});

btn_show_list_follwing.addEventListener("click", () => {
  d([FILTER_DIV, cnt_fullLISTFRIEND]);
  c(btn_show_list_follwing, cnt_fullLISTFRIEND, [
    cnt_fullLISTFRIEND,
    FILTER_DIV,
  ]);
  $.get("./MAINPHP/getFollowing.php?user_id=" + owner).done((res) => {
    list_follers.replaceChildren();
    res = JSON.parse(res);
    if (res.length == 0) {
      list_follers.appendChild(document.createElement("div")).innerHTML =
        "لا يتابع أحدا ";
    }
    res.forEach((element) => {
      let CLONED_elem_user_freind = elem_user_freind.cloneNode(true);
      CLONED_elem_user_freind.querySelector(".cnt_nameuser").innerHTML =
        element.first_name + " " + element.last_name;
      CLONED_elem_user_freind.querySelector(".cnt_imgFOL img").src =
        "./" + element.linkPRF;
      CLONED_elem_user_freind.setAttribute(
        "followee_id",
        element.followee_id
      );
      d([CLONED_elem_user_freind]);
      list_follers.appendChild(CLONED_elem_user_freind);
    });
  });
  cnt_fullLISTFRIEND.querySelector(".title_cntasd").innerHTML = "يتابع ";
});



