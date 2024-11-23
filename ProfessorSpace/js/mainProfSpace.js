
function _(m) { console.log(m) }
function tog(elem, d = 's-X3z-V4rB-H8tQ') { elem.forEach(e => e.classList.toggle(d)); }
function d(elem, d = 's-X3z-V4rB-H8tQ') { elem.forEach(e => e.classList.add(d)); }
function r(elem, d = 's-X3z-V4rB-H8tQ') { elem.forEach(e => e.classList.remove(d)); }
function c(btn, elem1, elems, classNan = "s-X3z-V4rB-H8tQ") {
    window.onclick = (e) => {
        if (!btn.contains(e.target) && !elem1.contains(e.target)) {
            elems.forEach(e => r([e], classNan));
        }
    }
}

let User_id, loged;
checkLogin()
function checkLogin() {
    if (localStorage.getItem("SWINGM_USER_ID") != null) {
        User_id = localStorage.getItem("SWINGM_USER_ID");
        loged = true;
        // _('connectted')

    } else {
        loged = false;
    }


}

let btn_profile_page = document.getElementById('btn_profile_page');
btn_profile_page.onclick = () => {
    if (!loged) {
        alertNonLogin(btn_profile_page);
    } else {
        window.location.href = "..//PROFILE_PAGE.html";
    }
}




let ahowListSchol = document.querySelector(".ahowListSchol");
let licNV_schol = document.querySelector(".licNV_schol");
ahowListSchol.addEventListener("click", () => {
    EffectDisapre(licNV_schol, undefined, ahowListSchol, "animate__fadeInDown", "animate__fadeOutUp", 500, "s-X3z-V4rB-H8tQ")
})

ahowListSchol.disabled = true
let cnt_sprayers = document.querySelector(".cnt_sprayers");
let cnt_Tutorials = document.querySelector(".cnt_Tutorials");
let welcomingDev = document.querySelector(".welcomingDev");
let list_Lesson = document.querySelector(".list_Lesson")
let btnShowLISt = document.getElementById("btnShowLISt")
btnShowLISt.addEventListener("click", () => {
    EffectDisapre(list_Lesson, undefined, btnShowLISt, "animate__fadeInLeftE", "animate__fadeOutLeftE", 300, "s-X3z-V4rB-H8tQ")
})
let btnsLevlSchool = licNV_schol.querySelectorAll("button");

d([welcomingDev]);
let btn_sprayer = document.getElementById("btn_sprayer")
let btnLessons = document.getElementById("btnLessons");

btnLessons.addEventListener('click', () => {
    r([welcomingDev])
    d([cnt_Tutorials]);
    r([cnt_sprayers]);
    EffectDisapre(licNV_schol, undefined, btnLessons, "animate__fadeInDown", "animate__fadeOutUp", 500, "s-X3z-V4rB-H8tQ")

    list_Lesson.replaceChildren();
    allForLesson();
    d([btnLessons], "ACTIEVEbtn_sprayer");
    r([btn_sprayer], "ACTIEVEbtn_sprayer");
    ahowListSchol.disabled = false

})
btn_sprayer.addEventListener('click', () => {
    r([welcomingDev])
    r([cnt_Tutorials]);
    d([cnt_sprayers]);
    list_Lesson.replaceChildren();
    EffectDisapre(licNV_schol, undefined, btn_sprayer, "animate__fadeInDown", "animate__fadeOutUp", 500, "s-X3z-V4rB-H8tQ")

    allForSprayer();
    r([btnLessons], "ACTIEVEbtn_sprayer");
    d([btn_sprayer], "ACTIEVEbtn_sprayer");
    ahowListSchol.disabled = false

});

let objectLevel = {
    lyce1: [],
    bac13OLOM: [],
    bac1ADABPlus3olom: [],
    bac2ADABPLUS3olom: [],
}
getLessons();

function getLessons() {
    $.get(
        './php/getLessons.php'
    ).done(
        res => {
            res = JSON.parse(res);
            res.forEach(
                obj => {
                    let level = obj.level_school
                    objectLevel[level].push(obj);

                }
            )
        }
    )
};

let curentLevel = [];
let cntToturailName = document.querySelector(".cntToturailName.original");

function allForLesson() {
    btnsLevlSchool.forEach(
        btn => {
            btn.addEventListener("click", () => {
                setTimeout(() => {
                    EffectDisapre(list_Lesson, undefined, btnShowLISt, "animate__fadeInLeftE", "animate__fadeOutLeftE", 300, "s-X3z-V4rB-H8tQ")
                }, 200);
                ahowListSchol.querySelector('p').innerHTML = btn.querySelector('p').innerHTML
                setTimeout(() => {
                    openLesson();
                }, 200);
            })
        }
    )

    btnsLevlSchool[0].onclick = () => {
        list_Lesson.replaceChildren();
        curentLevel = objectLevel.lyce1;
        objectLevel.lyce1.forEach(element => {
            if (element.lesson_type != "CRUST") {
                let cntToturailNameCLOPNE = cntToturailName.cloneNode(true);
                d([cntToturailNameCLOPNE]);
                cntToturailNameCLOPNE.querySelector("p").innerHTML = element.lesson_name

                if (element.lesson_type == "TEXT") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(نص) '
                } else if (element.lesson_type == "VIDEO") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(فيديو)'
                } else if (element.lesson_type == "PDF") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(PDF)'
                }
                cntToturailNameCLOPNE.setAttribute("lesson_id", element.lesson_id)
                list_Lesson.append(cntToturailNameCLOPNE);
            }


        });
    }
    btnsLevlSchool[1].onclick = () => {
        curentLevel = objectLevel.bac13OLOM
        list_Lesson.replaceChildren();
        objectLevel.bac13OLOM.forEach(element => {
            if (element.lesson_type != "CRUST") {
                let cntToturailNameCLOPNE = cntToturailName.cloneNode(true);
                d([cntToturailNameCLOPNE]);
                cntToturailNameCLOPNE.querySelector("p").innerHTML = element.lesson_name

                if (element.lesson_type == "TEXT") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(نص) '
                } else if (element.lesson_type == "VIDEO") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(فيديو)'
                } else if (element.lesson_type == "PDF") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(PDF)'
                }
                cntToturailNameCLOPNE.setAttribute("lesson_id", element.lesson_id)
                list_Lesson.append(cntToturailNameCLOPNE);
            }


        });
    }
    btnsLevlSchool[2].onclick = () => {
        list_Lesson.replaceChildren();
        curentLevel = objectLevel.bac1ADABPlus3olom
        objectLevel.bac1ADABPlus3olom.forEach(element => {
            if (element.lesson_type != "CRUST") {
                let cntToturailNameCLOPNE = cntToturailName.cloneNode(true);
                d([cntToturailNameCLOPNE]);
                cntToturailNameCLOPNE.querySelector("p").innerHTML = element.lesson_name

                if (element.lesson_type == "TEXT") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(نص) '
                } else if (element.lesson_type == "VIDEO") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(فيديو)'
                } else if (element.lesson_type == "PDF") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(PDF)'
                }
                cntToturailNameCLOPNE.setAttribute("lesson_id", element.lesson_id)
                list_Lesson.append(cntToturailNameCLOPNE);
            }

        });
    }
    btnsLevlSchool[3].onclick = () => {
        list_Lesson.replaceChildren();
        curentLevel = objectLevel.bac2ADABPLUS3olom
        objectLevel.bac2ADABPLUS3olom.forEach(element => {
            if (element.lesson_type != "CRUST") {
                let cntToturailNameCLOPNE = cntToturailName.cloneNode(true);
                d([cntToturailNameCLOPNE]);
                cntToturailNameCLOPNE.querySelector("p").innerHTML = element.lesson_name

                if (element.lesson_type == "TEXT") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(نص) '
                } else if (element.lesson_type == "VIDEO") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(فيديو)'
                } else if (element.lesson_type == "PDF") {
                    cntToturailNameCLOPNE.querySelector("span").innerHTML = '(PDF)'
                }
                cntToturailNameCLOPNE.setAttribute("lesson_id", element.lesson_id)
                list_Lesson.append(cntToturailNameCLOPNE);
            }

        });
    }
}
function allForSprayer() {
    btnsLevlSchool.forEach(
        btn => {
            btn.addEventListener("click", () => {
                setTimeout(() => {
                    EffectDisapre(list_Lesson, undefined, btnShowLISt, "animate__fadeInLeftE", "animate__fadeOutLeftE", 300, "s-X3z-V4rB-H8tQ")
                }, 200)
                ahowListSchol.querySelector('p').innerHTML = btn.querySelector('p').innerHTML
                setTimeout(() => {
                    openSprayer();
                }, 200)
            })
        }
    )
    btnsLevlSchool[0].onclick = () => {
        list_Lesson.replaceChildren();
        curentLevel = objectLevel.lyce1;
        objectLevel.lyce1.forEach(element => {
            if (element.lesson_type == "CRUST") {
                let cntToturailNameCLOPNE = cntToturailName.cloneNode(true);
                d([cntToturailNameCLOPNE]);
                cntToturailNameCLOPNE.querySelector("p").innerHTML = element.lesson_name
                cntToturailNameCLOPNE.querySelector("span").innerHTML = '(  جذاذة  ) '
                cntToturailNameCLOPNE.setAttribute("lesson_id", element.lesson_id)
                list_Lesson.append(cntToturailNameCLOPNE);
            }
        });
    }
    btnsLevlSchool[1].onclick = () => {
        curentLevel = objectLevel.bac13OLOM
        list_Lesson.replaceChildren();
        objectLevel.bac13OLOM.forEach(element => {
            if (element.lesson_type == "CRUST") {
                let cntToturailNameCLOPNE = cntToturailName.cloneNode(true);
                d([cntToturailNameCLOPNE]);
                cntToturailNameCLOPNE.querySelector("p").innerHTML = element.lesson_name
                cntToturailNameCLOPNE.querySelector("span").innerHTML = '(  جذاذة  ) '
                cntToturailNameCLOPNE.setAttribute("lesson_id", element.lesson_id)
                list_Lesson.append(cntToturailNameCLOPNE);
            }
        });
    }
    btnsLevlSchool[2].onclick = () => {
        list_Lesson.replaceChildren();
        curentLevel = objectLevel.bac1ADABPlus3olom
        objectLevel.bac1ADABPlus3olom.forEach(element => {
            if (element.lesson_type == "CRUST") {
                let cntToturailNameCLOPNE = cntToturailName.cloneNode(true);
                d([cntToturailNameCLOPNE]);
                cntToturailNameCLOPNE.querySelector("p").innerHTML = element.lesson_name
                cntToturailNameCLOPNE.querySelector("span").innerHTML = '(  جذاذة  ) '
                cntToturailNameCLOPNE.setAttribute("lesson_id", element.lesson_id)
                list_Lesson.append(cntToturailNameCLOPNE);
            }
        });
    }
    btnsLevlSchool[3].onclick = () => {
        list_Lesson.replaceChildren();
        curentLevel = objectLevel.bac2ADABPLUS3olom
        objectLevel.bac2ADABPLUS3olom.forEach(element => {
            if (element.lesson_type == "CRUST") {
                let cntToturailNameCLOPNE = cntToturailName.cloneNode(true);
                d([cntToturailNameCLOPNE]);
                cntToturailNameCLOPNE.querySelector("p").innerHTML = element.lesson_name
                cntToturailNameCLOPNE.querySelector("span").innerHTML = '(  جذاذة  ) '
                cntToturailNameCLOPNE.setAttribute("lesson_id", element.lesson_id)
                list_Lesson.append(cntToturailNameCLOPNE);
            }

        });
    }

}
let curentSlected;

function openLesson() {
    let lessonTitles = list_Lesson.querySelectorAll('.cntToturailName');
    let toturial = document.querySelector('.toturial');
    if (lessonTitles.length == 0) {
        list_Lesson.innerHTML = "لم يتم العثور على نتائج ";
    }
    lessonTitles.forEach(element => {
        element.onclick = () => {
            toturial.replaceChildren();
            let id = element.getAttribute("lesson_id");
            let lessonObject = curentLevel.filter(el => { return el.lesson_id == id })[0];

            if (lessonObject.lesson_type == "TEXT") {
                let textElem = document.querySelector(".L").cloneNode(true);
                textElem.querySelector('.titleLesson').innerHTML = lessonObject.lesson_name;
                let lesson_text;
                fetch(`.././${lessonObject.lesson_path}`)
                    .then(
                        res => res.json()
                    )
                    .then(
                        res => {
                            lesson_text = res;
                            textElem.querySelector('.cntContentLessonL').innerHTML = lesson_text;
                            textElem.querySelector('.cntContentLessonL').querySelectorAll('.cntButtonREGLE').forEach(el => el.remove())
                        }
                    )
                d([textElem])
                toturial.appendChild(textElem);
            }

            else if (lessonObject.lesson_type == "VIDEO") {
                let textElem = document.querySelector(".T").cloneNode(true);
                textElem.querySelector('.titleLesson').innerHTML = lessonObject.lesson_name;
                textElem.querySelector('video source').src = ".././" + lessonObject.lesson_path;
                d([textElem])
                toturial.appendChild(textElem);
            }

            else if (lessonObject.lesson_type == "PDF") {
                let textElem = document.querySelector(".lessonAsPDF").cloneNode(true);
                textElem.querySelector('.titleLesson').innerHTML = lessonObject.lesson_name;
                textElem.querySelector('.linkPDF_lesson').href = ".././" + lessonObject.lesson_path;
                textElem.querySelector('.linkPDF_lesson2').href = ".././" + lessonObject.lesson_path;
                textElem.querySelector('.linkPDF_lesson2').setAttribute('download', lessonObject.lesson_name);
                d([textElem])
                toturial.appendChild(textElem);
            }
        }

    })


}
function openSprayer() {
    let lessonTitles = list_Lesson.querySelectorAll('.cntToturailName');
    if (lessonTitles.length == 0) {
        list_Lesson.innerHTML = "لم يتم العثور على نتائج ";

    }
    lessonTitles.forEach(
        s => {
            s.onclick = () => {
                cnt_sprayers.replaceChildren();
                let id = s.getAttribute("lesson_id");
                let lessonObject = curentLevel.filter(
                    el => el.lesson_id == id
                )[0];
                let cloneSpreyer = document.querySelector(".spraye").cloneNode(true);
                cloneSpreyer.querySelector(".title_sprayer").innerHTML = lessonObject.lesson_name;
                cloneSpreyer.querySelector(".btn_get_sprayer2").href = ".././" + lessonObject.lesson_path;
                cloneSpreyer.querySelector(".btn_get_sprayer").href = ".././" + lessonObject.lesson_path;
                cloneSpreyer.querySelector(".btn_get_sprayer").setAttribute("download", lessonObject.lesson_name);
                d([cloneSpreyer]);
                r([list_Lesson]);
                cnt_sprayers.appendChild(cloneSpreyer)
            }

        }

    )
}

