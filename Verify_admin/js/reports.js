function _(res) { console.log(res) }

$(document).ready(function () {
    $.get("./php/getReports.php").done(
        res => {
            res = JSON.parse(res);
            res.forEach(element => {
                let cntRe = document.createElement("div")
                cntRe.innerHTML = element.message
                cntRe.className = 'cntReport'
                cntRe.setAttribute("id", element.report_id)
                getReport(cntRe)
                $('.listPreprtsLinks').append(cntRe)
            });
        }
    )
})
let aboutReport = document.querySelector(".aboutReport")
let reprtTitle = document.querySelector("#reprtTitle")
let reportedItem = document.querySelector(".reportedItem")
let reportResons = document.querySelector(".reportResons")
let reportMessage = document.querySelector(".reportMessage")
let itemType = document.querySelector(".itemType")
let reporter = document.querySelector(".reporter")
let reportDate = document.querySelector(".reportDate")
let reporteStatus = document.querySelector(".reporteStatus")

function getReport(elem) {

    elem.onclick = () => {
        r([coment_main]);
        r([ma9al]);
        startLoader();
        $.get(`./php/getReport.php?id=${elem.getAttribute("id")}`
        ).done(
            res => {
                stopLoader();
                res = JSON.parse(res)
                d([aboutReport]);
                aboutReport.setAttribute("id", res.report_id)
                aboutReport.setAttribute("type_item", res.type_item)
                reportedItem.innerText = res.reported_item
                reportedItem.setAttribute("id", res.article_id)
                reportResons.innerText = res.report_reason
                reprtTitle.innerText = elem.querySelector('p').innerText
                reportMessage.innerText = res.message
                switch (res.type_item) {
                    case "books":
                        itemType.innerText = "كتاب"
                        break;
                    case "articles":
                        itemType.innerText = "مقالة"
                        break;
                    case "comments":
                        itemType.innerText = "تعليق"
                        break;
                    case "replies":
                        itemType.innerText = "رد"
                        break;
                }
                reporter.innerText = res.reported_by['last_name'] + " " + res.reported_by['first_name']
                reporter.setAttribute("user_id", res.reported_by['user_id'])
                gotoUsersInfo(reporter)
                reportDate.innerText = res.report_timestamp
                reporteStatus.innerText = (res.ischeck == 'true') ? "مراجعة" : "غير مراجعة"
            }
        )
    }

}
function gotoUsersInfo(elem) {
    elem.onclick = () => {
        let hrefToPage =
            "aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL^" +
            elem.getAttribute("user_id") +
            "&aBcD3Fg!@_+XyZ9wLaBcD3Fg!@_+XyZ9wL";
        hrefToPage = JSON.stringify(encodeURIComponent(hrefToPage));
        window.location.href = "../usersInfo.html?UserIdentifyer=" + hrefToPage;

    }

}
let btnGetAllReports = document.querySelector("#btnGetAllReports")
btnGetAllReports.onclick = () => {
    startLoader();

    $.get("./php/getAllReports.php").done(
        res => {
            stopLoader();
            btnGetAllReports.remove();
            document.querySelector(".listPreprtsLinks").innerHTML = "";
            res = JSON.parse(res);
            res.forEach(element => {
                let cntRe = document.createElement("div")
                cntRe.innerHTML = element.message
                cntRe.className = 'cntReport'
                cntRe.setAttribute("id", element.report_id)
                getReport(cntRe);
                $('.listPreprtsLinks').append(cntRe)
            });
        }
    )
}
let btnChecked = document.querySelector("#btnChecked")
btnChecked.onclick = () => {
    startLoader();
    $.post(`./php/checkReport.php`,
        {
            id: aboutReport.getAttribute("id")
        }
    ).done(
        res => {
            stopLoader();
            if (res == "done") {
                document.querySelectorAll(".cntReport").forEach(element => {
                    if (element.getAttribute("id") == aboutReport.getAttribute("id")) {
                        element.remove();
                    }
                });

                r([aboutReport]);
                r([coment_main]);

            }
        }
    )
}

let btnCheckeArticle = document.querySelector("#btnCheckeArticle")


let coment_main = document.querySelector(".coment_main");
let cnt_img2 = document.querySelector(".cnt_img2 img");
let full_name_coment = document.querySelector(".full_name_coment");
let coment_text = document.querySelector(".coment_text");

let ma9al = document.querySelector(".ma9al");
let title_article = document.querySelector(".title_article");
let m9l_text = document.querySelector(".m9l_text");
let img_prf = document.querySelector(".img_prf img");
let user_name = document.querySelector(".user_name");
let time_post = document.querySelector(".time_post");

btnCheckeArticle.onclick = () => {
    startLoader();
    let type_item = aboutReport.getAttribute("type_item")
    if (type_item == "books") {
        window.location.href = "../ResearcherSpace/index.html?book_id=" + reportedItem.getAttribute("id")
        stopLoader();
    } else if (type_item == "news") {
        let new_id = reportedItem.getAttribute("id");
        window.location.href = `./AboutNew.html?new_id=${new_id}`;

    } else if (type_item == "comments" || type_item == "replies" || type_item == "replyreplies") {
        let columnName = (type_item == "comments") ? "comment_id" : "reply_id"
        let comment_id = reportedItem.getAttribute("id");
        $.get(`./php/getComment.php`,
            {
                comment_id: comment_id,
                tableName: type_item,
                columnName: columnName
            }
        ).done(
            res => {
                res = JSON.parse(res);
                cnt_img2.setAttribute("src", "../" + res.linkPRF);
                full_name_coment.innerText = res['last_name'] + " " + res['first_name']
                coment_text.innerText = (type_item == "comments") ? res.comment_text : res.reply_text
                d([coment_main]);
                window.scrollTo(0, document.body.scrollHeight);
                stopLoader();
            }
        )
    }
    else if (type_item == "articles") {
        $.get(`./php/getArticle.php`,
            {
                article_id: reportedItem.getAttribute("id")
            }
        ).done(
            res => {
                res = JSON.parse(res);
                _(res)
                title_article.innerText = res.title
                m9l_text.innerText = res.article_text
                img_prf.setAttribute("src", "../" + res.linkPRF)
                user_name.innerText = res.last_name + " " + res.first_name
                time_post.innerText = res.time_post
                d([ma9al]);
                stopLoader();
            }
        )

    }
}

