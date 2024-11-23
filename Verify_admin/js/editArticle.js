
function _(m) { console.log(m) };
function D(elem, className = "s-X3z-V4rB-H8tQ") { elem.forEach(e => e.classList.add(className)) };
function R(elem, className = "s-X3z-V4rB-H8tQ") { elem.forEach(e => e.classList.remove(className)) };


let inpSeach = document.getElementById("inpSearch");
let cntResults = document.querySelector(".cntResults");

inpSeach.onkeyup = () => {
    cntResults.replaceChildren();
    D([cntResults]);
    let search = inpSeach.value;
    search = search.trimStart();
    if (search.length > 1) {
        $.get(
            './php/searchForElem.php', {
            columnName: "title",
            tableName: "articles",
            search: search
        }
        ).done(
            res => {
                res = JSON.parse(res);
                if (res.length == 0) {
                    let p = document.createElement("p");
                    p.innerHTML = "لا يوجد نتائج";
                    cntResults.appendChild(p);
                }
                res.forEach(element => {
                    let button = document.createElement("button");
                    button.innerHTML = element.title;
                    button.onclick = () => {
                        inpSeach.value = element.title;
                        Search();
                    }
                    cntResults.appendChild(button);
                });
            }
        )
    }

}


let cntArticle = document.querySelector(".cntArticle");
let article_text = document.getElementById("article_text");
let inpTitleArticle = document.getElementById("inpTitleArticle");
let type_articl = document.getElementById("type_articl");
let btnDelete = document.getElementById("btnDelete");
article_text.onchange = () => {
    let btnSave = article_text.parentElement.querySelector('.btnSave')
    if (article_text.value.length > 0) {
        D([btnSave])
        btnSave.onclick = () => {
            saveEdit('article_text', article_text.value, btnSave)
        }
    }

}
inpTitleArticle.onchange = () => {
    let btnSave = inpTitleArticle.parentElement.querySelector('.btnSave')
    if (inpTitleArticle.value.length > 0) {
        D([btnSave])
        btnSave.onclick = () => {
            saveEdit('title', inpTitleArticle.value, btnSave)
        }
    }

}
type_articl.onchange = () => {
    let btnSave = type_articl.parentElement.querySelector('.btnSave')
    if (type_articl.value.length > 0) {
        D([btnSave])
        btnSave.onclick = () => {
            saveEdit('article_type', type_articl.value, btnSave)
        }
    }

}

function saveEdit(columnName, NewValue, btn) {
    startLoader();
    $.post(
        './php/editInfo.php', {
        tableName: 'articles',
        Id_column_name: 'article_id',
        Id_value: cntArticle.getAttribute("article_id"),
        columnName: columnName,
        NewValue: NewValue
    }
    ).done(
        res => {
            if (res == "done") {
                stopLoader();
                R([btn]);
            }
        }
    )

}


article_text.addEventListener("input", () => {
    article_text.style.height = "auto";
    article_text.style.height = article_text.scrollHeight + "px";
})

function Search() {
    R([cntArticle])
    R([cntResults]);
    let resarch = inpSeach.value;
    resarch = resarch.trimStart();
    $.get(
        './php/getElement.php', {
        columnName: "title",
        tableName: "articles",
        search: resarch
    }
    ).done(
        res => {
            res = JSON.parse(res);
            D([cntArticle])
            res.forEach(element => {
                cntArticle.setAttribute("article_id", element.article_id);
                type_articl.value = element.article_type;
                inpTitleArticle.value = element.title;
                article_text.value = element.article_text;

            });
        }
    )

}


