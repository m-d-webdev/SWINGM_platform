function d(elem, className = "display") {
  elem.classList.add(className);
}
function r(elem, className = "display") {
  elem.classList.remove(className);
}
function _(m) {
  console.log(m);
}
function W_CLICK_R(btn, MAIN_ele, ELEMENTS_to_R, className = "display") {
  window.onclick = (e) => {
    if (!btn.contains(e.target) && !MAIN_ele.contains(e.target)) {
      ELEMENTS_to_R.forEach((el) => r(el, className));
    }
  };
}
function swithClassNames(
  elem,
  clsName1,
  clasName2,
  displayClas = "display",
  timeOut = 500
) {
  r(elem, clsName1);
  d(elem, clasName2);
  setTimeout(() => {
    r(elem, displayClas);
    r(elem, clasName2);
  }, timeOut);
}
window.onload = () => {
  inp_search.focus();
};
unknwUser = true;
let UserId = 0;
if (localStorage.getItem("SWINGM_USER_ID")) {
  UserId = localStorage.getItem("SWINGM_USER_ID");
  unknwUser = false;
} else {
  unknwUser = true;
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
    localStorage.setItem(ItemName, new_data);
  }
}
var type = "";
let cnt_results = document.querySelector(".cnt_results");

var TYPE_ITEME_DIV = document.querySelector(".TYPE_ITEME");
var btn_type_item = document.querySelector("#btn_type_item");
var TYPE_ITEME_BTNS = document.querySelectorAll(".btn_type_search");
TYPE_ITEME_BTNS.forEach((btn) => {
  btn.onclick = () => {
    btn_type_item.innerHTML = btn.innerHTML;
    type = btn.querySelector("p").innerHTML;
    swithClassNames(
      TYPE_ITEME_DIV,
      "animate__fadeInDown",
      "animate__fadeOutUp",
      undefined,
      300
    );
  };
});
TYPE_ITEME_BTNS[0].click();
btn_type_item.onclick = () => {
  d(TYPE_ITEME_DIV);
  d(TYPE_ITEME_DIV, "animate__fadeInDown");
  window.onclick = (e) => {
    if (
      !btn_type_item.contains(e.target) &&
      !TYPE_ITEME_DIV.contains(e.target)
    ) {
      swithClassNames(
        TYPE_ITEME_DIV,
        "animate__fadeInDown",
        "animate__fadeOutUp",
        undefined,
        300
      );
    }
  };
};

let btn_back = document.querySelector("#btn_back");
btn_back.onclick = () => {
  window.location.href = document.referrer;
};

let inp_search = document.querySelector("#inp_search");
let MAIN_Suggestions = document.querySelector(".MAIN_Suggestions");
let btn_search = document.querySelector("#btn_search");
inp_search.onkeyup = (e) => {
  if (inp_search.value.length >= 1 && /[a-zA-Z0-9]/.test(inp_search.value)) {
    $(document).ready(() => {
      let regled_search;
      regled_search = inp_search.value.trimStart();
      if (regled_search.indexOf(" ") != -1) {
        regled_search =regled_search.replace(/ /g, "&");
      } else {
        regled_search = regled_search+ "&" + "";
      }
      $.get("./MAINPHP/getSuggestions.php", {
        search: regled_search,
        type: type,
      }).done((res) => {
        obj = JSON.parse(res);
        if (obj != "No_result") {
          SetSuggestes(obj);
        } else {
          MAIN_Suggestions.innerHTML = " لا توجد نتائج";
        }
      });
    });
    d(MAIN_Suggestions);
  } else {
    r(MAIN_Suggestions);
  }
};
inp_search.onblur = () => {
  window.onclick = (e) => {
    if (!MAIN_Suggestions.contains(e.target)) {
      r(MAIN_Suggestions);
    }
  };
};

function SetSuggestes(obj) {
  MAIN_Suggestions.replaceChildren();
  for (var el in obj) {
    let tablesNamw = el.substring(0, el.indexOf(","));

    d(MAIN_Suggestions);
    let div = document.createElement("div");
    let h4 = document.createElement("h4");
    let typeSgest = document.createElement("p");
    typeSgest.className = "typeSgest";
    div.className = "suggest";
    div.setAttribute("data-type", tablesNamw);

    if (tablesNamw == "articles") {
      h4.innerText = obj[el].title;
      div.setAttribute("data-id", obj[el].article_id);
      typeSgest.innerText = "المقالات";
    } else if (tablesNamw == "users") {
      div.setAttribute("data-id", obj[el].user_id);
      h4.innerText = obj[el].last_name + " " + obj[el].first_name;
      typeSgest.innerText = "أشخاص";
    } else if (tablesNamw == "tutorials") {
      div.setAttribute("data-id", obj[el].lesson_id);
      h4.innerText = obj[el].lesson_name;
      typeSgest.innerText = "الدروس- جذاذات ";
    } else if (tablesNamw == "books") {
      div.setAttribute("data-id", obj[el].book_id);
      h4.innerText = obj[el].name;
      typeSgest.innerText = "الكتب";
    }
    div.append(h4);
    div.appendChild(typeSgest);
    MAIN_Suggestions.appendChild(div);
    SUGGEST_FUNCTION(div);
  }
}

function SUGGEST_FUNCTION(sug) {
  sug.onclick = () => {
    inp_search.value = sug.querySelector("h4").innerText;
    btn_search.click();
  };
}

btn_search.onclick = () => {
  if (inp_search.value.length >= 1) {
    $("#form_search").submit();
  }
};
let noResuEleme = document.querySelector(".noResuEleme");
$(document).ready(
  $("#form_search").on("submit", (e) => {
    e.preventDefault();
    let searchText = inp_search.value.trimStart();
    if (searchText.indexOf(" ") != -1) {
      searchText = searchText.replace(/ /g, "&");
    } else {
      searchText = searchText + "&" + "";
    }
    // _(searchText);
    // for (var i = 0; i < searchText.length; i++) {
    //   if (searchText[i] == " ") {
    //     searchText =
    //       searchText.slice(0, searchText[i]) +
    //       searchText.slice(searchText[i] + 1);
    //   } else if (searchText[i] != " ") {
    //     _("No Mre");
    //     break;
    //   }
    //   _(searchText);
    // }
    if (searchText.length >= 1 && /[a-zA-Z0-9]/.test(searchText)) {
      $.get("./MAINPHP/SEARCH.php", {
        search: searchText,
        type: type,
      }).done((res) => {
        res = JSON.parse(res);
        r(MAIN_Suggestions);
        cnt_results.replaceChildren();
        if (res.length == 0) {
          d(noResuEleme);
          cnt_results.replaceChildren(noResuEleme);
        } else {
          cnt_results.replaceChildren();
          for (var el in res) {
            if (el == "users") {
              setUsers(res[el]);
            } else if (el == "articles") {
              setArticles(res[el]);
            } else if (el == "books") {
              setBooks(res[el]);
            } else if (el == "tutorials") {
              setLessons(res[el]);
            }
          }
        }
      });
    }
  })
);

let cntMa9alatFounded = document.querySelector(".cntMa9alatFounded");
let cntBooksFounded = document.querySelector(".cntBooksFounded");
let cntPeopelFounded = document.querySelector(".cntPeopelFounded");
let cntessonsFounded = document.querySelector(".cntessonsFounded");

function setUsers(object) {
  let cloneCntFounded = cntPeopelFounded.cloneNode(true);
  d(cloneCntFounded);
  object.forEach((r) => {
    if (UserId != r.user_id) {
      let elemUser = document.querySelector(".elemUser").cloneNode(true);
      elemUser.setAttribute("id", r.user_id);
      elemUser.querySelector(".cnt_nameuser").setAttribute("id", r.user_id);
      elemUser.querySelector(".cnt_nameuser").innerHTML =
        r.last_name + "  " + r.first_name;
      elemUser.querySelector(".cnt_imgUser img").src = "./" + r.linkPRF;
      d(elemUser);

      cloneCntFounded.append(elemUser);
      USERS_FUNACTION(elemUser);
    }
    cnt_results.append(cloneCntFounded);
  });
}

function USERS_FUNACTION(elemUser) {
  let cnt_nameuser = elemUser.querySelector(".cnt_nameuser");
  cnt_nameuser.onclick = () => {
    let hrefToPage =
      "aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL^" +
      cnt_nameuser.getAttribute("id") +
      "&aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL";
    hrefToPage = JSON.stringify(encodeURIComponent(hrefToPage));
    window.location.href = "./usersInfo.html?UserIdentifyer=" + hrefToPage;
  };
}
function ARTICLES_FUNACTION(element) {
  let cnt_nameuser = element.querySelector(".cnt_nameuserARTICLE");
  cnt_nameuser.onclick = () => {
    let hrefToPage =
      "aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL^" +
      cnt_nameuser.getAttribute("id") +
      "&aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL";
    hrefToPage = JSON.stringify(encodeURIComponent(hrefToPage));
    window.location.href = "./usersInfo.html?UserIdentifyer=" + hrefToPage;
  };
}

function setArticles(object) {
  let cloneCntFiunedArticles = cntMa9alatFounded.cloneNode(true);
  d(cloneCntFiunedArticles);

  object.forEach((r) => {
    if (UserId != r.user_id) {
      let elemArticle = document.querySelector(".elemArticle").cloneNode(true);
      elemArticle
        .querySelector(".cnt_nameuserARTICLE")
        .setAttribute("id", r.article_id);
      elemArticle.querySelector(".cnt_nameuserARTICLE").innerHTML =
        r.first_name + "  " + r.last_name;
      elemArticle
        .querySelector(".cnt_nameuserARTICLE")
        .setAttribute("id", r.user_id);
      resizeText(elemArticle.querySelector(".m9l_text"), r.article_text);
      elemArticle.querySelector(".titleArticle").innerText = r.title;
      elemArticle.querySelector(".cnt_imgUserARTICLE img").src =
        "./" + r.linkPRF;
      d(elemArticle);
      cloneCntFiunedArticles.append(elemArticle);
      ARTICLES_FUNACTION(elemArticle);
    }
    cnt_results.append(cloneCntFiunedArticles);
  });
}

function resizeText(elem, text) {
  if (text.length >= 300) {
    elem.innerText = text.substring(0, 300);
    let p = document.createElement("p");
    p.className = "btnShowText";
    p.innerHTML = "Show More";
    p.onclick = () => {
      elem.innerText = text;
      p.remove();
    };
    elem.append(p);
  } else {
    elem.innerText = text;
  }
}

function setBooks(object) {
  let clneCntFondedBok = cntBooksFounded.cloneNode(true);
  d(clneCntFondedBok);

  object.forEach((r) => {
    if (r.user_id != UserId) {
      let elemBook = document.querySelector(".book").cloneNode(true);
      elemBook.setAttribute("id", r.book_id);
      elemBook.querySelector("#publisher_name").innerHTML = r.writer_name;
      elemBook.querySelector(".nameBook").innerHTML = r.name;
      elemBook.querySelector(".cntImage img").src = "./" + r.cover_src;
      d(elemBook);
      clneCntFondedBok.append(elemBook);
      BOOKS_FUNACTION(elemBook);
    }
  });

  cnt_results.append(clneCntFondedBok);
}
function BOOKS_FUNACTION(elem) {
  elem.onclick = () => {
    window.location.href = "./ResearcherSpace/index.html?book_id=" + elem.id;
  };
}

function setLessons(object) {
  let CloneCntLessons = cntessonsFounded.cloneNode(true);
  d(CloneCntLessons);
  object.forEach((r) => {
    let textElem;
    if (r.lesson_type == "TEXT") {
      textElem = document.querySelector(".L").cloneNode(true);
      textElem.querySelector(".titleLesson").innerHTML = r.lesson_name;
      $.get(`./${r.lesson_path}`).done((res) => {
        textElem.querySelector(".cntContentLessonL").innerHTML =
          JSON.parse(res);
        textElem.querySelectorAll("img").forEach((img) => {
          let srcIMG = img.getAttribute("src");
          img.src =
            "./ProfessorSpace/" + srcIMG.substring(srcIMG.indexOf("/") + 1);
        });
        textElem
          .querySelectorAll(".cntButtonREGLE")
          .forEach((el) => el.remove());
      });
      d(textElem, "s-X3z-V4rB-H8tQ");
    }
    if (r.lesson_type == "VIDEO") {
      textElem = document.querySelector(".T").cloneNode(true);
      textElem.querySelector(".titleLesson").innerHTML = r.lesson_name;
      textElem.querySelector("video source").src = "./" + r.lesson_path;
      d(textElem, "s-X3z-V4rB-H8tQ");
    }
    if (r.lesson_type == "PDF") {
      textElem = document.querySelector(".lessonAsPDF").cloneNode(true);
      textElem.querySelector(".titleLesson").innerHTML = r.lesson_name;
      textElem.querySelector(".linkPDF_lesson").href = "./" + r.lesson_path;
      textElem.querySelector(".linkPDF_lesson2").href = "./" + r.lesson_path;
      textElem
        .querySelector(".linkPDF_lesson2")
        .setAttribute("download", r.lesson_name);
      d(textElem, "s-X3z-V4rB-H8tQ");
    }
    if (r.lesson_type == "CRUST") {
      textElem = document.querySelector(".spraye").cloneNode(true);
      textElem.querySelector(".title_sprayer").innerHTML = r.lesson_name;
      textElem.querySelector(".btn_get_sprayer").href = "./" + r.lesson_path;
      textElem.querySelector(".btn_get_sprayer2").href = "./" + r.lesson_path;
      textElem.querySelector(".btn_get_sprayer").setAttribute("download", "");
      d(textElem, "s-X3z-V4rB-H8tQ");
    }
    CloneCntLessons.append(textElem);
  });

  cnt_results.append(CloneCntLessons);
}
