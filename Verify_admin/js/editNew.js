
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
            tableName: "news",
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


let cntNew = document.querySelector(".cntNew");
let title_new = document.getElementById("title_new");
let newsThemes = document.getElementById("newsThemes");
let content = document.getElementById("content");

title_new.onchange = () => {
    let btnSave = title_new.parentElement.querySelector('.btnSave')
    if (title_new.value.length > 0) {
        D([btnSave])
        btnSave.onclick = () => {
            saveEdit('title', title_new.value, btnSave)
        }
    }

}
newsThemes.onchange = () => {
    let btnSave = newsThemes.parentElement.querySelector('.btnSave')
    if (newsThemes.value.length > 0) {
        D([btnSave])
        btnSave.onclick = () => {
            saveEdit('type', newsThemes.value, btnSave)
        }
    }

}
content.onchange = () => {
    let btnSave = content.parentElement.querySelector('.btnSave')
    if (content.value.length > 0) {
        D([btnSave])
        btnSave.onclick = () => {
            saveEdit('content', content.value, btnSave)
        }
    }

}

function saveEdit(columnName, NewValue, btn) {
    startLoader();
    $.post(
        './php/editInfo.php', {
        tableName: 'news',
        Id_column_name: 'news_id',
        Id_value: cntNew.getAttribute("news_id"),
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


content.addEventListener("input", () => {
    content.style.height = "auto";
    content.style.height = content.scrollHeight + "px";
})

let cntNewImgs = document.querySelector(".cntNewImgs");
let cntImgNew = document.querySelector(".cntImgNew");

let ObjectImgs = {};
let newImgsUploaded = [];
function Search() {
    R([cntNew])
    R([cntResults]);
    let resarch = inpSeach.value;
    resarch = resarch.trimStart();
    $.get(
        './php/getElement.php', {
        columnName: "title",
        tableName: "news",
        search: resarch
    }
    ).done(
        res => {
            res = JSON.parse(res);
            D([cntNew])
            res.forEach(element => {
                cntNew.setAttribute("news_id", element.news_id);
                newsThemes.value = element.type;
                title_new.value = element.title;
                content.value = element.content;
                element.link_paths = JSON.parse(element.link_paths);
                ObjectImgs = element.link_paths;
                cntNewImgs.replaceChildren();
                for (var img in element.link_paths) {
                    let cloneImage = cntImgNew.cloneNode(true);
                    cloneImage.querySelector('img').src = ".././" + element.link_paths[img];
                    D([cloneImage]);
                    cntNewImgs.appendChild(cloneImage);
                    accessImg(cloneImage, img);
                }
            });
        }
    )
}

let addedImg = false;
let deletetImg = false;

let btnSaveDelteteImgs = document.querySelector(".btnSaveDelteteImgs");
let btnSaveaddedImgs = document.querySelector(".btnSaveaddedImgs");
let inpUploadImg = document.getElementById("inpUploadImg");
inpUploadImg.onchange = () => {
    if (inpUploadImg.files.length > 0) {
        let cloneImage = cntImgNew.cloneNode(true);
        cloneImage.querySelector('img').src = URL.createObjectURL(inpUploadImg.files[0]);
        D([cloneImage]);
        D([btnSaveaddedImgs]);
        R([btnSaveDelteteImgs]);
        cntNewImgs.appendChild(cloneImage);
        addedImg = true;
        newImgsUploaded.push(inpUploadImg.files[0]);
        accessImg2(cloneImage, inpUploadImg.files[0].name);
        btnSaveaddedImgs.onclick = () => {
            if (!deletetImg) {
                saveAddedImg();
            } else if (deletetImg) {
                saveDeletedImg(btnSaveDelteteImgs);
                saveAddedImg();
            }
        };
    }
}

function accessImg(cloneImage, imgINdex) {
    let btnDeleteImg = cloneImage.querySelector('.btnDeleteImg');
    btnDeleteImg.onclick = () => {
        cloneImage.remove();
        delete ObjectImgs[imgINdex];
        deletetImg = true;
        if (!addedImg) {
            R([btnSaveaddedImgs]);
            D([btnSaveDelteteImgs]);
            btnSaveDelteteImgs.onclick = () => {
                saveDeletedImg(btnSaveDelteteImgs);
            }
        }

    }
}

function accessImg2(cloneImage, nameIMg) {
    let btnDeleteImg = cloneImage.querySelector('.btnDeleteImg');
    btnDeleteImg.onclick = () => {
        cloneImage.remove();
        newImgsUploaded = newImgsUploaded.filter(file => file.name != nameIMg)
    }
}

function saveDeletedImg(btnSaveDelteteImgs) {
    saveEdit('link_paths', JSON.stringify(ObjectImgs), btnSaveDelteteImgs)

}

function saveAddedImg() {
    startLoader();
    let ImgForm = new FormData();
    ImgForm.append("new_id", cntNew.getAttribute("news_id"));
    for (let i = 0; i < newImgsUploaded.length; i++) {
        ImgForm.append('imgs[]', newImgsUploaded[i]);
    }

    $.ajax(
        {
            url: "./php/editNew.php",
            type: "POST",
            data: ImgForm,
            processData: false,
            contentType: false
        }
    ).done(
        res => {
            if (res == "done") {
                stopLoader();
            }
        }
    )
}

