function _(m) { console.log(m); };
function D(elem, className = 'IOU45AH546SPDOIASPDOIASPD45645O_dosadoifds-OASHSAPO') {
    elem.forEach(element => {
        element.classList.add(className)
    });
}
function R(elem, className = 'IOU45AH546SPDOIASPDOIASPD45645O_dosadoifds-OASHSAPO') {
    elem.forEach(element => {
        element.classList.remove(className)
    });
}

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
            columnName: "name",
            tableName: "books",
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
                    button.innerHTML = element.name;
                    button.onclick = () => {
                        inpSeach.value = element.name;
                        Search();
                    }
                    cntResults.appendChild(button);
                });
            }
        )
    }

}

let CoverImg = document.querySelector(".CoverImg");
let imgWriter = document.querySelector(".imgWriter");
let formBook = document.querySelector(".formBook");
let formBookInputs = document.querySelectorAll(".formBook input[type='text']");
formBookInputs.forEach(element => {
    element.onchange = () => {
        D([element.parentNode.querySelector("button")]);

    }
})

let btnsSave = document.querySelectorAll(".formBook  .cntInputComponent button")

btnsSave.forEach(btn => {
    btn.onclick = () => {
        let columnName = btn.parentNode.querySelector('input').getAttribute("name");
        let newValue = btn.parentNode.querySelector('input').value;
        newValue = newValue.trimStart();
        if (newValue.length > 0) {
            Edit(columnName, newValue, btn);
        }
    }
})

let containerBook = document.querySelector(".cntBook");
function Search() {
    R([cntResults]);

    let resarch = inpSeach.value;
    resarch = resarch.trimStart();
    $.get(
        './php/getElement.php', {
        columnName: "name",
        tableName: "books",
        search: resarch
    }
    ).done(
        res => {
            res = JSON.parse(res);
            D([containerBook])
            res.forEach(element => {
                containerBook.setAttribute("book_id", element.book_id);
                formBookInputs[0].value = element.name;
                formBookInputs[1].value = element.publication_date;
                formBookInputs[2].value = element.langue;
                formBookInputs[3].value = element.genre;
                formBookInputs[4].value = element.description;
                formBookInputs[5].value = element.type;
                formBookInputs[6].value = element.writer_name;
                formBookInputs[7].value = element.writerDefine;
                imgWriter.src = "../" + element.writerProfilePic;
                CoverImg.src = "../" + element.cover_src;
            });
        }
    )

}

function Edit(columnName, NewValue, btn) {
    startLoader();
    $.post(
        './php/editInfo.php', {
        tableName: 'books',
        Id_column_name: 'book_id',
        Id_value: containerBook.getAttribute("book_id"),
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

function EditFile(form, columnName, btn) {
    let data = new FormData(form);
    data.append("tableName", 'books');
    data.append("id_column_name", 'book_id');
    data.append("id_value", containerBook.getAttribute("book_id"));
    data.append("tableName", 'books');
    data.append("columnName", columnName);
    startLoader();
    $.ajax(
        {
            url: './php/saveFiles.php',
            type: "POST",
            data: data,
            processData: false,
            contentType: false
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

window.onload = () => {
    inpSeach.focus();
}


let btnSaveCoverImg = document.querySelector(".btnSaveCoverImg");
let inpCoverBook = document.getElementById("inpCoverBook");
inpCoverBook.onchange = () => {
    if (inpCoverBook.files.length > 0) {
        D([btnSaveCoverImg])
        CoverImg.src = URL.createObjectURL(inpCoverBook.files[0]);
        btnSaveCoverImg.onclick = () => {
            let formCoverImg = document.getElementById("formCoverImg");
            EditFile(formCoverImg, 'cover_src', btnSaveCoverImg)
        }
    }
}


let btnSaveWriterImg = document.querySelector(".btnSaveWriterImg");
let inpWriterImg = document.getElementById("inpWriterImg");
inpWriterImg.onchange = () => {
    if (inpWriterImg.files.length > 0) {
        imgWriter.src = URL.createObjectURL(inpWriterImg.files[0]);
        D([btnSaveWriterImg])
        btnSaveWriterImg.onclick = () => {
            let formWRITERIMG = document.getElementById("fromWriterImg");
            EditFile(formWRITERIMG, 'writerProfilePic', btnSaveWriterImg)
        }


    }
}


