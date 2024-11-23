function _(m) {console.log(m);}
function D(m ,className ="JJ_HH_UU-TT-OO-PP_RR") {(m.forEach( e=> e.classList.add(className)))};
function R(m ,className ="JJ_HH_UU-TT-OO-PP_RR") {(m.forEach( e=> e.classList.remove(className)))};

let linkOf1 = document.querySelector(".linkOf1");
let linkOf2 = document.querySelector(".linkOf2");
let linkOf3 = document.querySelector(".linkOf3");
let linkOf4 = document.querySelector(".linkOf4");
let linkOf5 = document.querySelector(".linkOf5");
let linkOf6 = document.querySelector(".linkOf6");
let linkOf7 = document.querySelector(".linkOf7");
let linkOf8 = document.querySelector(".linkOf8");
let linkOf9 = document.querySelector(".linkOf9");


let btnExecute = document.querySelector(".btnExecute");
btnExecute.onclick =() =>{
    let userName ="swingm-admin@321-admin";
    let passWord = "";
}

function activePage(){
    linkOf1.setAttribute("href" , "./shareBook.html");
    linkOf2.setAttribute("href" , "./shareNews.html");
    linkOf3.setAttribute("href" , "./nashr_ma9al.html");
    linkOf4.setAttribute("href" , "./addLesson.html");
    linkOf5.setAttribute("href" , "./editBook.html");
    linkOf6.setAttribute("href" , "./editNew.html");
    linkOf7.setAttribute("href" , "./editArticle.html");
    linkOf8.setAttribute("href" , "./editLessons.html");
    linkOf9.setAttribute("href" , "./reports.html");
}