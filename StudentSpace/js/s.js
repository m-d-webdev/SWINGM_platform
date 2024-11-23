function _(m) {
  console.log(m);
}
function tog(elem, d = "s-X3z-V4rB-H8tQ") {
  elem.forEach((e) => e.classList.toggle(d));
}

function d(elem, d = "s-X3z-V4rB-H8tQ") {
  elem.forEach((e) => e.classList.add(d));
}

function r(elem, d = "s-X3z-V4rB-H8tQ") {
  elem.forEach((e) => e.classList.remove(d));
}

function c(btn, elem1, elems, classNan = "s-X3z-V4rB-H8tQ") {
  window.onclick = (e) => {
    if (!btn.contains(e.target) && !elem1.contains(e.target)) {
      elems.forEach((e) => r([e], classNan));
    }
  };
}

$(document).ready(function () {
  $.get("./php/getLessons.php").done((res) => {
    res = JSON.parse(res);
    res.forEach((obj) => {
      objectLevel[obj.level_school].push(obj);
    });
  });
});

let objectLevel = {
  lyce1: [],
  bac13OLOM: [],
  bac1ADABPlus3olom: [],
  bac2ADABPLUS3olom: [],
}

let btn_get1BACADAB = document.querySelector(".btn_get1BACADAB");
let btn_get1BACSC = document.querySelector(".btn_get1BACSC");
let btn_getJID3 = document.querySelector(".btn_getJID3");
let btn_get_2back = document.querySelector(".btn_get_2back");
let listLessons = document.querySelector(".listLessons");

let btnSchoolLevles = document.querySelector(".btnSchoolLevles");
btnSchoolLevles.addEventListener("click", () => {
  EffectDisapre(licNV_schol, undefined, btnSchoolLevles, "AnimatioEle", "AnimatioEle1", 300, "-")
});

let SELECTED_LESSON = document.querySelector(".SELECTED_LESSON");
SELECTED_LESSON.onclick = () => {
  EffectDisapre(listLessons, undefined, SELECTED_LESSON, "activeListLessons", "disactiveListLessons", 300, "-")
}


let lessonName = document.querySelector(".lessonName");
let licNV_schol = document.querySelector(".licNV_schol");


let btnsSchoolLevles = licNV_schol.querySelectorAll("button");
btnsSchoolLevles[0].addEventListener("click", () => {
  openLesson([objectLevel.lyce1]);
  btnSchoolLevles.querySelector('p').innerHTML = btnsSchoolLevles[0].querySelector('p').innerText

})
btnsSchoolLevles[1].addEventListener("click", () => {
  openLesson([objectLevel.bac13OLOM])
  btnSchoolLevles.querySelector('p').innerHTML = btnsSchoolLevles[1].querySelector('p').innerText
})
btnsSchoolLevles[2].addEventListener("click", () => {
  openLesson([objectLevel.bac1ADABPlus3olom])
  btnSchoolLevles.querySelector('p').innerHTML = btnsSchoolLevles[2].querySelector('p').innerText
})
btnsSchoolLevles[3].addEventListener("click", () => {
  openLesson([objectLevel.bac2ADABPLUS3olom])
  btnSchoolLevles.querySelector('p').innerHTML = btnsSchoolLevles[3].querySelector('p').innerText
})


let curentLvl;
function openLesson([lvl]) {
  curentLvl = lvl;
  listLessons.replaceChildren();
  lvl.forEach((n) => {
    let cloneElem = lessonName.cloneNode(true);
    cloneElem.querySelector("p").innerText = n.lesson_name;
    cloneElem.querySelector("span").innerText =
      n.lesson_type == "TEXT" ? "نص" : n.lesson_type;
    cloneElem.setAttribute("lesson_id", n.lesson_id);
    listLessons.appendChild(cloneElem);
  });

  chooseLessons();

}

let containerLesson = document.querySelector(".containerLesson");
let textElem = document.querySelector(".L");
let videoElem = document.querySelector(".T");
let pdfElem = document.querySelector(".lessonAsPDF");
let curentBtnClicked;
function chooseLessons() {
  let listLessonselements = document.querySelectorAll(".listLessons .lessonName");
  let lessonElement;
  EffectDisapre(listLessons, undefined, licNV_schol, "activeListLessons", "disactiveListLessons", 300, "-")

  listLessonselements.forEach((lesson) => {
    lesson.onclick = () => {
      SELECTED_LESSON.querySelector("p").innerHTML = lesson.querySelector("p").innerText
      if (curentBtnClicked != undefined) {
        r([curentBtnClicked], "activeCNTNAME");
      }
      curentBtnClicked = lesson;
      d([lesson], "activeCNTNAME");
      let lessonObj = curentLvl.filter((n) => {
        return n.lesson_id == lesson.getAttribute("lesson_id");
      })[0];
      if (lessonObj.lesson_type == "TEXT") {
        lessonElement = textElem.cloneNode(true);
        $.get(`.././${lessonObj.lesson_path}`).done((res) => {
          lessonElement.querySelector(".cntContentLessonL").innerHTML =
            JSON.parse(res);
          lessonElement
            .querySelector(".cntContentLessonL")
            .querySelectorAll("img")
            .forEach((img) => {
              let oldSrc = img.getAttribute("src");
              oldSrc = oldSrc.substring(oldSrc.lastIndexOf("./") + 1);
              img.setAttribute("src", `.././ProfessorSpace/${oldSrc}`);
            });
          lessonElement
            .querySelector(".cntContentLessonL")
            .querySelectorAll(".cntButtonREGLE")
            .forEach((el) => {
              el.remove();
            });
        });

        lessonElement.querySelector(".titleLesson").innerText =
          lessonObj.lesson_name;
        d([lessonElement]);
        containerLesson.replaceChildren(lessonElement);
      } else if (lessonObj.lesson_type == "VIDEO") {
        lessonElement = videoElem.cloneNode(true);
        lessonElement.querySelector(".titleLesson").innerText =
          lessonObj.lesson_name;
        lessonElement.querySelector(
          ".vedio-tutorial"
        ).src = `.././${lessonObj.lesson_path}`;
        d([lessonElement]);
        containerLesson.replaceChildren(lessonElement);
      } else if (lessonObj.lesson_type == "PDF") {
        lessonElement = pdfElem.cloneNode(true);
        lessonElement.querySelector(".titleLesson").innerText =
          lessonObj.lesson_name;
        lessonElement.querySelector(".linkPDF_lesson").href =
          ".././" + lessonObj.lesson_path;
        lessonElement.querySelector(".linkPDF_lesson2").href =
          ".././" + lessonObj.lesson_path;
        lessonElement
          .querySelector(".linkPDF_lesson2")
          .setAttribute("download", lessonObj.lesson_name);
        d([lessonElement]);
        containerLesson.replaceChildren(lessonElement);
      }
    };
  });
}

let cntReasuSearch = document.querySelector(".cntReasuSearch");
let inputSearch = document.getElementById("inpSeaarch");
inputSearch.onfocus = () => {
  if (curentLvl == undefined) {
    EffectDisapre(licNV_schol, undefined, inputSearch, "AnimatioEle", "AnimatioEle1", 300, "-")
  }
}
inputSearch.onkeyup = () => {

  let wordSearch = inputSearch.value;
  if (wordSearch.length >= 3) {
    d([cntReasuSearch]);
    cntReasuSearch.replaceChildren();
    let result = [];
    if (curentLvl != undefined) {
      result = curentLvl.filter((el) => {
        return el.lesson_name.includes(wordSearch);
      });
    }
    if (result.length == 0) {
      cntReasuSearch.innerText = "لا يوجد نتائج بحث";
      c(inputSearch, cntReasuSearch, [cntReasuSearch]);
    }

    result.forEach((el) => {
      let myp = document.createElement("p");
      myp.innerText = el.lesson_name;
      myp.setAttribute("lesson_id", el.lesson_id);

      myp.onclick = () => {
        let listLessons = document.querySelectorAll(
          ".listLessons .lessonName"
        );
        listLessons.forEach((lesson) => {
          if (lesson.getAttribute("lesson_id") == myp.getAttribute("lesson_id")) {
            lesson.click();
            r([cntReasuSearch]);
          }
        });
      };
      cntReasuSearch.appendChild(myp);
    });
  }


  else {
    c(inputSearch, cntReasuSearch, [cntReasuSearch]);
  }
};



