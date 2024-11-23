
function d(elem, className = "XoI-lL--Code-Sir_dare_innak") {
    elem.classList.add(className);
}
function r(elem, className = "XoI-lL--Code-Sir_dare_innak") {
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
        if (old_data != null) {
            old_data = JSON.parse(old_data);
            var new_data = old_data.filter((item) => item != value);
            localStorage.removeItem(ItemName);
            new_data = JSON.stringify(new_data);
            localStorage.setItem(ItemName, new_data);
        }
    }
}
window.onload = () => {
    FetchUrl();
    GetUserId();
};
let UserID;
function GetUserId() {
    let loacId = localStorage.getItem("SWINGM_USER_ID");
    if (loacId != null) {
        UserID = loacId;
    }
}

let btn_back = document.querySelector("#btn_back");
btn_back.addEventListener("click", () => {
    window.history.back();
});

let bookCover = document.querySelector(".cntCover img");
let title = document.querySelector(".title");
let writerElem = document.getElementById("writerElem");
let bookGenre = document.getElementById("bookGenre");
let bookLanguage = document.getElementById("bookLanguage");
let numPages = document.getElementById("numPages");
let booksize = document.getElementById("booksize");
let bookType = document.getElementById("bookType");
let bookDatePublish = document.getElementById("bookDatePublish");

let btnAddTolibrary = document.querySelector(".btnAddTolibrary");
let btnDownload = document.querySelector(".btnDownload");

let imgWriter = document.querySelector(".cntmgWriter img");
let writerName = document.querySelector(".writerName");
let define = document.querySelector(".define");
let bookDescriptioncontent = document.querySelector(
    "#bookDescriptioncontent"
);

let forBrowsing = document.querySelector(".forBrowsing");
imgWriter.onclick = () => {
    forBrowsing.setAttribute(
        "href",
        "https://www.google.com/search?tbm=isch&q=" +
        imgWriter.getAttribute("writer_name").replace(/ /g, "+")
    );
    forBrowsing.click();
};
writerName.onclick = () => {
    forBrowsing.setAttribute(
        "href",
        "https://www.google.com/search?q=" +
        " من هو  " +
        writerName.getAttribute("writer_name").replace(/ /g, "+") +
        "  wikipedia  "
    );
    forBrowsing.click();
};
writerElem.onclick = () => {
    forBrowsing.setAttribute(
        "href",
        "https://www.google.com/search?q=" +
        " من هو  " +
        writerElem.getAttribute("writer_name").replace(/ /g, "+") +
        "  wikipedia  "
    );
    forBrowsing.click();
};
bookGenre.onclick = () => {
    forBrowsing.setAttribute(
        "href",
        "https://www.google.com/search?q=" +
        " مفهوم   " +
        bookGenre.getAttribute("bookGenre").replace(/ /g, "+") +
        " wikipedia"
    );
    forBrowsing.click();
};

let cntRatings = document.querySelector(".cntRatings");
let ratedDev = document.querySelector(".ratedDev");
let cntbook = document.querySelector(".cntbook");

function FetchUrl() {
    let url = new URL(window.location.href);
    let book_id = url.searchParams.get("book_id");
    getBook(book_id);
}
function getBook(book_id) {
    startLoader();
    $.get("./php/getBook.php?book_id=" + book_id).done((res) => {
        stopLoader();
        res = JSON.parse(res);
        bookCover.src = ".././" + res.cover_src;
        btnDownload.setAttribute("href", ".././" + res.pdf_path);
        btnDownload.setAttribute("download", res.name);
        title.innerText = res.name;
        writerElem.innerText = res.writer_name;
        writerName.innerText = res.writer_name;
        writerElem.setAttribute("writer_name", res.writer_name);
        writerName.setAttribute("writer_name", res.writer_name);
        bookGenre.innerText = res.genre;
        bookGenre.setAttribute("bookGenre", res.genre);
        bookLanguage.innerText = res.langue;
        numPages.innerText = res.numPages;
        booksize.innerText = res.size;
        bookType.innerText = res.type;
        bookDatePublish.innerText = res.publication_date;
        imgWriter.src = ".././" + res.writerProfilePic;
        imgWriter.setAttribute("writer_name", res.writer_name);
        define.innerText = res.writerDefine;
        bookDescriptioncontent.innerText = res.description;
        cntbook.setAttribute("book_id", res.book_id);

        setRatings(res.ratings);
        checkInLibrary();
        checkRated();
    });
}
function checkInLibrary() {
    let savedBooks = localStorage.getItem("SWINGM_USER_LIBRARY");
    savedBooks = JSON.parse(savedBooks);
    if (savedBooks != null) {
        if (savedBooks.includes(cntbook.getAttribute("book_id"))) {
            btnAddTolibrary.innerText = `موجود في المكتبة`;
            btnAddTolibrary.disabled = true;
        }
    }
}

function checkRated() {
    let ratedBokk = localStorage.getItem("SWINGM_RATINGS_OF_book");
    ratedBokk = JSON.parse(ratedBokk);
    if (ratedBokk != null) {
        if (ratedBokk.includes(cntbook.getAttribute("book_id"))) {
            btnStar.innerText = "لقد قمت بتقييم هذا الكتاب ";
            btnStar.disabled = true;
            Rerate();
        }
    }
}

function setRatings(obj) {
    let ratedDev = document.querySelector(".ratedDev");
    for (var o of obj) {
        let cloneRatedDev = ratedDev.cloneNode(true);
        cloneRatedDev.querySelector(".cntProfileImg img").src =
            ".././" + o.linkPRF;
        cloneRatedDev.querySelector(".ratedComponent h1").innerText =
            o.first_name + " " + o.last_name;
        cloneRatedDev
            .querySelector(".ratedComponent h1")
            .setAttribute("id", o.user_id);
        cloneRatedDev.querySelector(".message").innerText = o.comment;
        let imgsRate = cloneRatedDev.querySelector(".numRATE ");
        d(cloneRatedDev);
        for (var i = 0; i < o.rating; i++) {
            let img = document.createElement("img");
            img.src = "./icones2/star.png";
            imgsRate.appendChild(img);
        }
        d(cloneRatedDev);
        cloneRatedDev.setAttribute("rating_id", o.rating_id);
        cntRatings.appendChild(cloneRatedDev);
        ratingFunction(cloneRatedDev);
    }
}
function ratingFunction(ELEM) {
    let nigativeElem = localStorage.getItem("SWINGM_RATING_BOOK_NIGATIVE");
    let positiveElem = localStorage.getItem("SWINGM_RATING_BOOK_POSITIVE");
    nigativeElem = JSON.parse(nigativeElem);
    positiveElem = JSON.parse(positiveElem);
    if (nigativeElem != null) {
        if (nigativeElem.includes(ELEM.getAttribute("rating_id"))) {
            r(
                ELEM.querySelector(".interaRate button:nth-child(1)"),
                "activeRate"
            );
            d(
                ELEM.querySelector(".interaRate button:nth-child(2)"),
                "activeRate"
            );
        }
    }
    if (positiveElem != null) {
        if (positiveElem.includes(ELEM.getAttribute("rating_id"))) {
            d(
                ELEM.querySelector(".interaRate button:nth-child(1)"),
                "activeRate"
            );
            r(
                ELEM.querySelector(".interaRate button:nth-child(2)"),
                "activeRate"
            );
        }
    }
    let btnYes = ELEM.querySelector(".interaRate button:nth-child(1)");
    let btnNo = ELEM.querySelector(".interaRate button:nth-child(2)");
    let imgsRate = ELEM.querySelector(".numRATE ").querySelectorAll("img");

    btnYes.onclick = () => {
        d(btnYes, "activeRate");
        r(btnNo, "activeRate");
        ReSetLocalStorage(
            "SWINGM_RATING_BOOK_POSITIVE",
            ELEM.getAttribute("rating_id"),
            "add"
        );
        ReSetLocalStorage(
            "SWINGM_RATING_BOOK_NIGATIVE",
            ELEM.getAttribute("rating_id"),
            "remove"
        );
    };

    btnNo.onclick = () => {
        r(btnYes, "activeRate");
        d(btnNo, "activeRate");
        ReSetLocalStorage(
            "SWINGM_RATING_BOOK_POSITIVE",
            ELEM.getAttribute("rating_id"),
            "remove"
        );
        ReSetLocalStorage(
            "SWINGM_RATING_BOOK_NIGATIVE",
            ELEM.getAttribute("rating_id"),
            "add"
        );
    };
}
btnAddTolibrary.onclick = () => {
    addToLibrary();
};
let shadowElemDev = document.querySelector(".shadowElemDev");
let CNT_RATING_ELEM = document.querySelector(".CNT_RATING_ELEM");
let MESSAGE_POPUP = document.querySelector(".MESSAGE_POPUP");
let rating = document.querySelector(".rating");
let btnStar = document.querySelector(".btnStar");
btnStar.onclick = () => {
    d(shadowElemDev);
    d(CNT_RATING_ELEM);
    W_CLICK_R(btnStar, CNT_RATING_ELEM, [shadowElemDev, CNT_RATING_ELEM]);
    addRate(cntbook.getAttribute("book_id"), "book");
};
function addRate(item_id, type = "") {
    let inputs_stas = rating.querySelectorAll("input");
    let btn_send_ratting = document.querySelector("#btnSendRating");
    var num_ratting = 3;

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
        var desc = document.querySelector("#descrating").value;
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
                r(shadowElemDev);
                r(CNT_RATING_ELEM);
                d(MESSAGE_POPUP, "actievMessage");
                d(MESSAGE_POPUP, "animate__fadeInLeftBig");
                MESSAGE_POPUP.querySelector("p").innerText = "تم إرسال التقييم ";
                setTimeout(() => {
                    d(MESSAGE_POPUP, "animate__fadeOutRightBig");
                    // r(MESSAGE_POPUP);
                    setTimeout(() => {
                        r(MESSAGE_POPUP, "animate__fadeOutRightBig");
                        r(MESSAGE_POPUP, "actievMessage");
                        r(MESSAGE_POPUP, "animate__fadeInLeftBig");
                    }, 500);
                }, 2500);
            }
        });
    };
}

function addToLibrary() {
    startLoader ();
    $.post("./php/addToLibrary.php", {
        user_id: UserID,
        book_id: cntbook.getAttribute("book_id"),
    }).done((res) => {
        if (res == "done") {
            stopLoader ();
            ReSetLocalStorage(
                "SWINGM_USER_LIBRARY",
                cntbook.getAttribute("book_id"),
                "add"
            );
            d(MESSAGE_POPUP, "actievMessage");
            d(MESSAGE_POPUP, "animate__fadeInLeftBig");
            MESSAGE_POPUP.querySelector("p").innerText =
                "تم الاضافة الي المكتبة ";
            setTimeout(() => {
                d(MESSAGE_POPUP, "animate__fadeOutRightBig");
                setTimeout(() => {
                    r(MESSAGE_POPUP, "animate__fadeOutRightBig");
                    r(MESSAGE_POPUP, "actievMessage");
                    r(MESSAGE_POPUP, "animate__fadeInLeftBig");
                }, 500);
            }, 2500);
        }
    });
}

function Rerate() {
    let btnReRate = document.querySelector(".btnReRate");
    d(btnReRate);
    btnReRate.onclick = () => {
        startLoader();
        $.get("./php/getRate.php", {
            book_id: cntbook.getAttribute("book_id"),
            user_id: UserID,
        }).done((res) => {
            stopLoader();
            res = JSON.parse(res);
            d(shadowElemDev);
            d(CNT_RATING_ELEM);
            W_CLICK_R(btnStar, CNT_RATING_ELEM, [
                shadowElemDev,
                CNT_RATING_ELEM,
            ]);
            document.querySelector("#descrating").value = res.comment;
            let inputs_stas = rating.querySelectorAll("input");

            let arr2 = Array.from(inputs_stas);
            arr2 = arr2.reverse();
            inputs_stas = [];
            arr2.forEach((el) => {
                inputs_stas.push(el);
            });
            inputs_stas[res.rating - 1].click();

            inputs_stas[0].onclick = () => {
                num_ratting = 1;
            };

            inputs_stas[1].onclick = () => {
                num_ratting = 2;
            };

            inputs_stas[2].onclick = () => {
                num_ratting = 3;
            };

            inputs_stas[3].onclick = () => {
                num_ratting = 4;
            };

            inputs_stas[4].onclick = () => {
                num_ratting = 5;
            };

            let btn_send_ratting = document.querySelector("#btnSendRating");
            var num_ratting = res.rating;

            btn_send_ratting.onclick = () => {
                var desc = document.querySelector("#descrating").value;
                startLoader();
                $.post("./php/UpdateRate.php", {
                    rate_id: res.rating_id,
                    ratting: num_ratting,
                    coment: desc,
                }).done((res) => {
                    if (res == "done") {
                        stopLoader();
                        r(shadowElemDev);
                        r(CNT_RATING_ELEM);
                        d(MESSAGE_POPUP, "actievMessage");
                        d(MESSAGE_POPUP, "animate__fadeInLeftBig");
                        MESSAGE_POPUP.querySelector("p").innerText =
                            "تم مراجعة  التقييم ";
                        setTimeout(() => {
                            d(MESSAGE_POPUP, "animate__fadeOutRightBig");
                            // r(MESSAGE_POPUP);
                            setTimeout(() => {
                                r(MESSAGE_POPUP, "animate__fadeOutRightBig");
                                r(MESSAGE_POPUP, "actievMessage");
                                r(MESSAGE_POPUP, "animate__fadeInLeftBig");
                            }, 500);
                        }, 2500);
                    }
                });
            };
        });
    };
}
