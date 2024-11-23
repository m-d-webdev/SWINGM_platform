

function _(m) { console.log(m) }
function tog(elem, d = 's-X3z-V4rB-H8tQ') { elem.forEach(e => e.classList.toggle(d)); }
function d(elem, d = 's-X3z-V4rB-H8tQ') { elem.forEach(e => e.classList.add(d)); }
function r(elem, d = 's-X3z-V4rB-H8tQ') { elem.forEach(e => e.classList.remove(d)); }
function c(btn, elem1, elems, classNan) {
    window.onclick = (e) => {
        if (!btn.contains(e.target) && !elem1.contains(e.target)) {
            elems.forEach(e => r([e], classNan));
        }
    }
}


let addPDFLESON = document.querySelector(".addPDFLESON");
let addVIDEOlesson = document.querySelector(".addVIDEOlesson");
let addLessonAsText = document.querySelector(".addLessonAsText");
let addSprayer = document.querySelector(".addSprayer");
let addExam = document.querySelector(".addExam");
let btnWR = document.getElementById("btnWR");
let btnPDF = document.getElementById("btnPDF");
let btnVideo = document.getElementById("btnVideo");
let btnSPRSYER = document.getElementById("btnSPRSYER");
let btnExam = document.getElementById("btnExam");
let indexELe = 2;


btnWR.addEventListener("click", () => {

    document.querySelectorAll(".menuChoose button").forEach(e => e.classList.remove("activeBTN2"));
    d([btnWR], "activeBTN2")
    SweTchClasses(addLessonAsText);
    indexELe = 2

})
btnPDF.addEventListener("click", () => {

    document.querySelectorAll(".menuChoose button").forEach(e => e.classList.remove("activeBTN2"));
    d([btnPDF], "activeBTN2")
    SweTchClasses(addPDFLESON);
    indexELe = 4

})
btnVideo.addEventListener("click", () => {

    document.querySelectorAll(".menuChoose button").forEach(e => e.classList.remove("activeBTN2"));
    d([btnVideo], "activeBTN2")
    SweTchClasses(addVIDEOlesson);
    indexELe = 3

})

btnSPRSYER.addEventListener("click", () => {

    document.querySelectorAll(".menuChoose button").forEach(e => e.classList.remove("activeBTN2"));
    d([btnSPRSYER], "activeBTN2")
    SweTchClasses(addSprayer);
    indexELe = 1

})

btnExam.addEventListener("click", () => {
        document.querySelectorAll(".menuChoose button").forEach(e => e.classList.remove("activeBTN2"));
        d([btnExam], "activeBTN2");
        SweTchClasses(addExam);
        indexELe = 5
})
btnSPRSYER.click();

    function SweTchClasses(elem) {
        let listContainersForms = [addSprayer, addLessonAsText, addVIDEOlesson, addPDFLESON, addExam];
        listContainersForms.forEach(e => r([e]));
        d([elem], 's-X3z-V4rB-H8tQ');

        let IndexOfElem = listContainersForms.indexOf(elem) + 1;
        if (IndexOfElem <= indexELe) {
            r([elem], "animate__fadeInUp");
            d([elem], "animate__fadeInUp");

        } else {
            r([elem], "animate__fadeInUp");

            d([elem], "animate__fadeInUp");

        }



    }


let kbkINPUPLOAD = document.querySelectorAll(".kbkINPUPLOAD");
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
let VideoLesson = document.getElementById("VideoLesson");
let videoSelected = document.querySelector(".videoSelected");
VideoLesson.onchange = () => {
    if (VideoLesson.files.length > 0) {
        d([videoSelected])
        videoSelected.src = URL.createObjectURL(VideoLesson.files[0])
        document.querySelector('.kbkINPSDU').innerHTML = "تم تحميل الملف بنجاح ";
        document.querySelector('.kbkINPSDU').classList.add("ClsChossedSucssefult")

    }
}

// ADD TEXT LESSONB ***************************************
let chossedELEMEN;
let btnAddGrnadetitle = document.getElementById("btnAddGrnadetitle");

let btnAddSecondtitle = document.getElementById("btnAddSecondtitle");
let btnAddThirdtitle = document.getElementById("btnAddThirdtitle");
let btnAddparagraphe = document.getElementById("btnAddparagraphe");
let btnAddText = document.querySelector(".btnAddText");

let inpPrepareText = document.getElementById("inpPrepareText");
/*THIS ==>  */   let cnttextLesson = document.querySelector(".cnttextLesson");

let BIG_TITLE = document.querySelector(".bigTile");
let SECOND_TITLE = document.querySelector(".secondTile");
let THIRD_TITLE = document.querySelector(".thirdTile");
let PARAGRAPHE = document.querySelector(".textLesson");


btnAddGrnadetitle.onclick = () => {
    chossedELEMEN = BIG_TITLE.cloneNode(true);
    try {
        document.querySelector(".activeBTN").classList.remove("activeBTN")
    } catch { }
    d([btnAddGrnadetitle], "activeBTN")
    inpPrepareText.focus();
}
btnAddSecondtitle.onclick = () => {
    chossedELEMEN = SECOND_TITLE.cloneNode(true);
    try {
        document.querySelector(".activeBTN").classList.remove("activeBTN")
    } catch { }
    d([btnAddSecondtitle], "activeBTN")
    inpPrepareText.focus();
}
btnAddThirdtitle.onclick = () => {

    chossedELEMEN = THIRD_TITLE.cloneNode(true);
    try {
        document.querySelector(".activeBTN").classList.remove("activeBTN")
    } catch { }
    d([btnAddThirdtitle], "activeBTN");
    inpPrepareText.focus();
}
btnAddparagraphe.onclick = () => {
    chossedELEMEN = PARAGRAPHE.cloneNode(true);
    inpPrepareText.focus();
    try {
        document.querySelector(".activeBTN").classList.remove("activeBTN")
    } catch { }
    d([btnAddparagraphe], "activeBTN")
}

setElem();
function setElem() {
    btnAddText.innerHTML = 'إضافة إلى النص';
    btnAddText.onclick = () => {
        if (inpPrepareText.value != "" && chossedELEMEN != undefined) {
            chossedELEMEN.querySelector(".inerhTml").innerHTML = inpPrepareText.value
            d([chossedELEMEN]);
            cnttextLesson.appendChild(chossedELEMEN);
            chossedELEMEN = undefined;
            inpPrepareText.value = "";
            inpPrepareText.style.height = 'auto'; // Reset the height
            inpPrepareText.style.height = this.scrollHeight + 'px'; // Set the height to the scroll height
            try {
                document.querySelector(".activeBTN").classList.remove("activeBTN")
            } catch { }
            lidterBtnsRewrite();
            lidterBtnsremo();
        } else if (inpPrepareText.value == "") {
            inpPrepareText.focus();
        }
    }
}

function lidterBtnsremo() {
    let btnsRewrte = cnttextLesson.querySelectorAll(".btnRemove");
    btnsRewrte.forEach(
        btn => {
            btn.onclick = () => {
                removeElem(btn.parentElement.parentElement);
            }
        }
    )
}

function lidterBtnsRewrite() {
    let btnsRewrte = cnttextLesson.querySelectorAll(".btnRewrit");
    btnsRewrte.forEach(
        btn => {
            btn.onclick = () => {
                setElem();
                ReWriteElem(btn.parentElement.parentElement);
            }
        }
    )
}

function ReWriteElem(elem) {
    btnAddText.innerHTML = 'تعديل ';
    inpPrepareText.value = elem.querySelector('.inerhTml').innerHTML;
    inpPrepareText.focus();
    btnAddText.onclick = () => {
        let newElem = elem.cloneNode(true);
        newElem.querySelector('.inerhTml').innerHTML = inpPrepareText.value
        cnttextLesson.replaceChild(newElem, elem);
        inpPrepareText.value = "";
        inpPrepareText.style.height = 'auto';
        inpPrepareText.style.height = this.scrollHeight + 'px';
        setElem();
        lidterBtnsRewrite();
        lidterBtnsremo();
    }
}
var divUndo = document.querySelector(".divUndo");
var btnUndo = document.querySelector("#btnUndo");
function removeElem(elem) {
    setElem();
    r([elem]);
    d([divUndo]);
    var t1 = setTimeout(
        () => {
            r([divUndo]);
            elem.remove();
        }, 5000);

    btnUndo.onclick = () => {
        d([elem]);
        r([divUndo]);
        setElem();
        clearTimeout(t1);
    }

}
//    SEND --------e--------------

sendLessonPDF();
function sendLessonPDF() {
    let form = document.getElementById("form");
    let btnSendPdf = document.getElementById("btnSendPdf");
    let nameLessonPDF = document.getElementById("nameLessonPDF");
    let firstAreachooseFPDF = form.querySelector("#firstAreachooseFPDF");
    let firstAreachooseFPDF2 = form.querySelector("#firstAreachooseFPDF2");
    let lessonlevel = form.querySelector("#lessonlevel");
    let errorP = form.querySelector(".errorP");
    let PDFLesson = document.getElementById("PDFLesson");
    PDFLesson.onchange = () => {
        if (PDFLesson.files.length > 0) {
            kbkINPUPLOAD[0].innerHTML = "تم تحميل الملف بنجاح ";
            kbkINPUPLOAD[0].classList.add("ClsChossedSucssefult")
            document.querySelector(".namePdf").innerHTML = PDFLesson.files[0].name
        }

    }
    btnSendPdf.onclick = () => {
        let lesson_level = '';
        var error = 0;
        if (nameLessonPDF.value == "") {
            error++;
            d([nameLessonPDF], 'errorMessage');
        } else {
            r([nameLessonPDF], 'errorMessage');
        }
        if (firstAreachooseFPDF.checked == false && firstAreachooseFPDF2.checked == false) {
            error++;
            d([document.querySelector(".cntChosesed")], 'errorMessage');
        } else {
            if (firstAreachooseFPDF.checked == true) {
                lesson_level = 'مجال الجغرافيا';
            } else if (firstAreachooseFPDF2.checked == true) {
                lesson_level = 'مجال التاريخ';
            }
            r([document.querySelector(".cntChosesed")], 'errorMessage');
        }

        if (lessonlevel.value == "") {
            error++;
            d([lessonlevel], 'errorMessage');
        } else {
            r([lessonlevel], 'errorMessage');
        }
        if (PDFLesson.files.length == 0) {
            error++;
            d([errorP])
        } else {
            r([errorP])
        }

        if (error == 0) {
            let data = new FormData(form);
            data.append('lesson_area', lesson_level);
            $.ajax
                ({
                    url: "php/addLessonPDF.php",
                    method: "post",
                    type: "post",
                    data: data,
                    contentType: false,
                    processData: false
                }
                ).done(
                    res => {
                        if (res == "done") {
                            noticeSuccess(undefined, btnSendPdf)
                        }else{

                            noticeError(undefined, btnSendPdf)
                        }
                    }
                )
        } else {
        }
    }
}
sendLessonVideo();
function sendLessonVideo() {
    let formUploadVideo = document.getElementById("formUploadVideo");
    let inpNameLesson = document.getElementById("inpNameLessonV");
    let firstAreachooseFPDF = formUploadVideo.querySelector("#firstAreachooseVEDIO");
    let firstAreachooseFPDF2 = formUploadVideo.querySelector("#firstAreachooseVEDIO2");
    let lessonlevel = formUploadVideo.querySelector("#lessonlevel");
    let VideoLesson = document.getElementById("VideoLesson");

    let errorP = formUploadVideo.querySelector(".errorP");
    let btnSendVideo = document.getElementById("btnSendVideo");
    btnSendVideo.onclick = () => {
        let lesson_level = '';
        var error = 0;
        if (inpNameLesson.value == "") {
            error++;
            d([inpNameLesson], 'errorMessage');
        } else {
            r([inpNameLesson], 'errorMessage');
        }
        if (firstAreachooseFPDF.checked == false && firstAreachooseFPDF2.checked == false) {
            error++;
            d([document.querySelector(".cntChosesed2")], 'errorMessage');
        } else {
            if (firstAreachooseFPDF.checked == true) {
                lesson_level = 'مجال الجغرافيا';
            } else if (firstAreachooseFPDF2.checked == true) {
                lesson_level = 'مجال التاريخ';
            }
            r([document.querySelector(".cntChosesed2")], 'errorMessage');
        }

        if (lessonlevel.value == "") {
            error++;
            d([lessonlevel], 'errorMessage');
        } else {
            r([lessonlevel], 'errorMessage');
        }
        if (VideoLesson.files.length == 0) {
            error++;
            d([errorP])
        } else {
            r([errorP])
        }
        if (error == 0) {
            let data = new FormData(formUploadVideo);
            data.append('lesson_area', lesson_level);
            $.ajax
                ({
                    url: "php/addLessonVideo.php",
                    method: "post",
                    type: "post",
                    data: data,
                    contentType: false,
                    processData: false
                }
                ).done(
                    res => {
                        if (res == "done") {
                            noticeSuccess(undefined, btnSendVideo)
                        }
                    }
                )
        }
    }

}
sendLessonWriting();
function sendLessonWriting() {
    let formWrtiedLesson = document.getElementById("formWrtiedLesson");
    let inpNameLesson = formWrtiedLesson.querySelector("#inpNameLesson");
    let secondAreachooseTEXT = formWrtiedLesson.querySelector("#secondAreachooseTEXT");
    let firstAreachooseTEXT = formWrtiedLesson.querySelector("#firstAreachooseTEXT");
    let lessonlevel = formWrtiedLesson.querySelector("#lessonlevel");
    let cnttextLesson = formWrtiedLesson.querySelector(".cnttextLesson");
    let errorP = formUploadVideo.querySelector(".errorP");
    let btnSendWER = document.getElementById("btnSendWER");
    btnSendWER.onclick = () => {
        let lesson_level = '';
        var error = 0;
        if (inpNameLesson.value == "") {
            error++;
            d([inpNameLesson], 'errorMessage');
        } else {
            r([inpNameLesson], 'errorMessage');
        }
        if (secondAreachooseTEXT.checked == false && firstAreachooseTEXT.checked == false) {
            error++;
            d([document.querySelector(".cntChosesed3")], 'errorMessage');
        }
        else {
            if (firstAreachooseTEXT.checked == true) {
                lesson_level = 'مجال الجغرافيا';
            } else if (secondAreachooseTEXT.checked == true) {
                lesson_level = 'مجال التاريخ';
            }
            r([document.querySelector(".cntChosesed3")], 'errorMessage');
        }

        if (lessonlevel.value == "") {
            error++;
            d([lessonlevel], 'errorMessage');
        } else {
            r([lessonlevel], 'errorMessage');
        }
        if (cnttextLesson.innerHTML == "") {
            error++;
            d([errorP]);
        } else {
            r([errorP]);
        }
        if (error == 0) {
            sendPost();
            function sendPost(concept = "add") {
                let data = new FormData(formWrtiedLesson);
                data.append('lesson_area', lesson_level);
                data.append('concept', concept);
                let text = JSON.stringify(cnttextLesson.innerHTML);
                data.append('textLesson', text);
                $.ajax
                    ({
                        url: "php/addLessontext.php",
                        method: "post",
                        type: "post",
                        data: data,
                        contentType: false,
                        processData: false
                    }
                    ).done(
                        res => {
                            if (res == "done") {
                                noticeSuccess(undefined, btnSendWER)
                            } else {
                                if (res == 'exist') {
                                    let p = '  هذا الدرس  موجود بالفعل ,هل تريد إستبداله بالدرس القديم أو إضافته فقط  ';
                                    function replaceFile() {
                                        sendPost('replace');
                                    }
                                    function addOuther() {
                                        inpNameLesson.value = inpNameLesson.value + "(2)";
                                        sendPost();
                                    }
                                    askNotice(p, ' ستبدال', 'اضافة ', replaceFile, addOuther);
                                } else if (res == 'replaced') {
                                    noticeSuccess(undefined, btnSendWER);

                                }
                            }
                        }
                    )
            }
        }


    }
}
sendSpraey()
function sendSpraey() {
    let formSprayer = document.getElementById("formSprayer");
    let inpNmaeSprayer = document.getElementById("inpNmaeSprayer");
    let firstAreachooseSPRAYER = formSprayer.querySelector("#firstAreachooseSPRAYER");
    let secondAreachooseSPRAYER = formSprayer.querySelector("#secondAreachooseSPRAYER");
    let lessonlevel = formSprayer.querySelector("#lessonlevel");
    let PDFsprayer = document.getElementById("PDFsprayer");

    PDFsprayer.onchange = () => {
        if (PDFsprayer.files.length > 0) {
            kbkINPUPLOAD[1].innerHTML = "تم تحميل الملف بنجاح ";
            kbkINPUPLOAD[1].classList.add("ClsChossedSucssefult")
        }
    }
    let errorP = formSprayer.querySelector(".errorP");
    let btnSendsprayer = document.getElementById("btnSendsprayer");
    btnSendsprayer.onclick = () => {
        let lesson_level = '';
        var error = 0;
        if (inpNmaeSprayer.value == "") {
            error++;
            d([inpNmaeSprayer], 'errorMessage');
        } else {
            r([inpNmaeSprayer], 'errorMessage');
        }
        if (firstAreachooseSPRAYER.checked == false && secondAreachooseSPRAYER.checked == false) {
            error++;
            d([document.querySelector(".cntChosesed2")], 'errorMessage');
        } else {
            if (firstAreachooseSPRAYER.checked == true) {
                lesson_level = 'مجال الجغرافيا';
            } else if (secondAreachooseSPRAYER.checked == true) {
                lesson_level = 'مجال التاريخ';
            }
            r([document.querySelector(".cntChosesed2")], 'errorMessage');
        }

        if (lessonlevel.value == "") {
            error++;
            d([lessonlevel], 'errorMessage');
        } else {
            r([lessonlevel], 'errorMessage');
        }
        if (PDFsprayer.files.length == 0) {
            error++;
            d([errorP])
        } else {
            r([errorP])
        }
        if (error == 0) {
            let data = new FormData(formSprayer);
            data.append('lesson_area', lesson_level);
            $.ajax
                ({
                    url: "php/addSprayer.php",
                    method: "post",
                    type: "post",
                    data: data,
                    contentType: false,
                    processData: false
                }
                ).done(
                    res => {
                        if (res == "done") {
                            noticeSuccess(undefined, btnSendsprayer);
                        } else {
                            noticeError(undefined, btnSendsprayer);
                        }
                    }
                )
        }
    }
}
sendExam()
function sendExam() {
    let formSprayer = document.getElementById("formExam");
    let inpNmaeSprayer = document.getElementById("inpNameExam");
    let lessonlevel = formSprayer.querySelector("#lessonlevel");
    let EXAM_File = document.getElementById("EXAM_File");

    EXAM_File.onchange = () => {
        if (EXAM_File.files.length > 0) {
            kbkINPUPLOAD[2].innerHTML = "تم تحميل الملف بنجاح ";
            kbkINPUPLOAD[2].classList.add("ClsChossedSucssefult")
        }
    }

    let errorP = formSprayer.querySelector(".errorP");
    let btnExam = document.getElementById("btnSendExam");
    btnExam.onclick = () => {
        let lesson_level = '';
        var error = 0;
        if (inpNmaeSprayer.value == "") {
            error++;
            d([inpNmaeSprayer], 'errorMessage');
        } else {
            r([inpNmaeSprayer], 'errorMessage');
        }

        if (lessonlevel.value == "") {
            error++;
            d([lessonlevel], 'errorMessage');
        } else {
            r([lessonlevel], 'errorMessage');
        }
        if (EXAM_File.files.length == 0) {
            error++;
            d([errorP])
        } else {
            r([errorP])
        }
        if (error == 0) {
            let data = new FormData(formSprayer);
            data.append('lesson_area', lesson_level);
            $.ajax
                ({
                    url: "php/addExam.php",
                    method: "post",
                    type: "post",
                    data: data,
                    contentType: false,
                    processData: false
                }
                ).done(
                    res => {
                        if (res == "done") {
                            noticeSuccess(undefined, btnExam);
                        } else {
                            noticeError(undefined, btnExam);
                        }
                    }
                )
        }
    }
}

