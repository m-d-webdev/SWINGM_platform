let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(form);
    $.ajax({
        url: './MAINPHP/contactUs.php',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res == "done") {
                alertSuccess()
            } else {
                noticeError(undefined, form)
            }
        }
    })
});

function alertSuccess() {
    askseccess("لقد تم إرسال الرسالة بنجاح !", form, () => { window.history.back() }, undefined, btnAcceptValu = "العودة إلى الصفحة الرئيسية  ", "حسنا")
}
