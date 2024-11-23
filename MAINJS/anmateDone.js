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
let IconeMessageSuccess = document.querySelector(".IconeMessageSuccess");
let IconeMessageNotice = document.querySelector(".IconeMessageNotice");
let IconeMessageError = document.querySelector(".IconeMessageError");
let IconNotConnected = document.querySelector(".IconNotConnected");
let SHAODWDIV = document.querySelector(".shadowDIV");
let PUP_UPASK_YES_NO = document.querySelector(".PUP_UPASK_YES_NO");
let MessgaeText = document.querySelector(".MessgaeText");
let btn_accept = document.querySelector("#btn_accept");
let btn_refuse = document.querySelector("#btn_refuse");
let icoesImasd = [IconeMessageSuccess, IconeMessageNotice, IconeMessageError];
function askseccess(p = "لقد تمت العملية بنجاح ", btn, success = () => { }, reject = () => { }, btnAcceptValu = "حسنا ", btnRefuseValu = "تراجع") {
  icoesImasd.forEach(i => {
    r([i])
  });
  btn_refuse.innerHTML = btnRefuseValu;
  btn_accept.innerHTML = btnAcceptValu;

  d([IconeMessageSuccess]);
  MessgaeText.innerHTML = p;
  EffectDisapre(PUP_UPASK_YES_NO, SHAODWDIV, btn, "animate__zoomIn", "animate__zoomOut", 200, undefined)

  btn_refuse.onclick = () => {
    r([IconeMessageSuccess]);
    reject();
  };
  btn_accept.onclick = () => {
    r([IconeMessageSuccess]);
    success();
  };
}
function noticeSuccess(p = "لقد تمت العملية بنجاح ", btn) {

  icoesImasd.forEach(i => r([i]));
  btn_refuse.style.display = "none";
  btn_accept.innerHTML = "إغلاق  ";
  d([IconeMessageSuccess]);
  MessgaeText.innerHTML = p;
  EffectDisapre(PUP_UPASK_YES_NO, SHAODWDIV, btn, "animate__zoomIn", "animate__zoomOut", 200, undefined)
  btn_accept.onclick = () => {
    r([IconeMessageSuccess]);
  };
}

function askNotice(
  p,
  btn,
  innerAccept = "حسنا ",
  innerRefuse = "تراجع",
  success = () => { },
  reject = () => { }
) {
  btn_refuse.innerHTML = innerRefuse
  icoesImasd.forEach(i => r([i]));
  btn_accept.innerHTML = innerAccept;
  btn_refuse.style.display = "block";
  MessgaeText.innerHTML = p;
  d([IconeMessageNotice]);
  EffectDisapre(PUP_UPASK_YES_NO, SHAODWDIV, btn, "animate__zoomIn", "animate__zoomOut", 200, undefined)

  btn_refuse.onclick = () => {
    r([IconeMessageNotice]);
    reject();
  };
  btn_accept.onclick = () => {
    r([IconeMessageNotice]);
    success();
  };
}
function noticeError(p = "حدث خطا  حاول مرة أخرى ", btn) {
  icoesImasd.forEach(i => r([i]))

  btn_refuse.style.display = "none";
  btn_accept.innerHTML = "إغلاق";
  MessgaeText.innerHTML = p;
  d([IconeMessageError]);

  EffectDisapre(PUP_UPASK_YES_NO, SHAODWDIV, btn, "animate__zoomIn", "animate__zoomOut", 200, undefined)
  btn_accept.onclick = () => {
    r([IconeMessageError]);
  };
}

function alertNonLogin(btn) {
  icoesImasd.forEach(i => r([i]))
  btn_refuse.innerHTML = "إنشاء حساب جديد ";
  btn_accept.innerHTML = "تسجيل الدخول ";
  d([IconNotConnected]);
  MessgaeText.innerHTML =
    "أنت غير متصل باي حساب  ، يجب عليك تسجيل الدخول أو إنشاء حساب جديد ";

  EffectDisapre(PUP_UPASK_YES_NO, SHAODWDIV, btn, "animate__zoomIn", "animate__zoomOut", 200, undefined)
  btn_refuse.onclick = () => {
    r([IconNotConnected]);
    window.location.href = "../page_sign_in.html";
  };
  btn_accept.onclick = () => {
    r([IconNotConnected]);
    window.location.href = "../page_login.html";
  };
}

function startLoader() {
  let loaderElem = document.createElement("div");
  let containerLoader = document.createElement("div");
  let SHAODWDIV2 = document.createElement("div");
  SHAODWDIV2.className = "shadowDIV2";
  containerLoader.className = "containerLoader";
  loaderElem.className = "loader";
  
  SHAODWDIV2.classList.add("s-X3z-V4rB-H8tQ");
  containerLoader.append(loaderElem);
  SHAODWDIV2.append(containerLoader);
  document.body.append(SHAODWDIV2);
}
function stopLoader() {
  document.querySelector(".shadowDIV2").remove();
}





let [LastAccesElem, lastparent_elem, lastCurrentClassName, lastNextClassName, lastTimeOut, lastDisaplyClassName] = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];;
function EffectDisapre(elem, parent_elem = undefined, btn, currentClassName, nextClassName, timeOut, disaplyClassName = 's-X3z-V4rB-H8tQ') {

  if (LastAccesElem != undefined && LastAccesElem != elem) {
    hideLastOpenElem(LastAccesElem, lastparent_elem, lastCurrentClassName, lastNextClassName, lastTimeOut, lastDisaplyClassName)
  }

  LastAccesElem = elem
  lastparent_elem = parent_elem
  lastCurrentClassName = currentClassName
  lastNextClassName = nextClassName
  lastDisaplyClassName = disaplyClassName
  lastTimeOut = timeOut

  if (parent_elem != undefined) { d([parent_elem], disaplyClassName); }


  d([elem], disaplyClassName)
  d([elem], currentClassName)
  window.onclick = (e) => {
    if (btn != undefined) {
      if (!btn.contains(e.target)) {
        LastAccesElem = undefined
        lastparent_elem = undefined
        lastCurrentClassName = undefined
        lastNextClassName = undefined
        lastDisaplyClassName = undefined
        lastTimeOut = undefined;

        r([elem], currentClassName);
        d([elem], nextClassName);
        setTimeout(() => {
          r([elem], nextClassName);
          r([elem], disaplyClassName);
          if (parent_elem != undefined) { r([parent_elem], disaplyClassName); }
        }, timeOut)

        window.onclick = (ee) => { }
      }
    }


  }


}


function hideLastOpenElem(LastAccesEleme, lastparent_eleme, lastCurrentClassNamee, lastNextClassNamee, lastTimeOute, disaplyClassNamee = 's-X3z-V4rB-H8tQ') {
  d([LastAccesEleme], lastNextClassNamee);
  r([LastAccesEleme], lastCurrentClassNamee);
  setTimeout(() => {
    r([LastAccesEleme], lastNextClassNamee);
    r([LastAccesEleme], disaplyClassNamee);
    if (lastparent_eleme != undefined) { r([lastparent_eleme], disaplyClassNamee); }
  }, lastTimeOute)
}
