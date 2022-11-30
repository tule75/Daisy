
const btnAddfr = document.querySelector(".btn-follow-user")
// const value = document.querySelector(".btn-follow-user").value


btnAddfr.onclick = function () {
    if(btnAddfr.value === "Kết bạn") {
        btnAddfr.value = 'Bạn bè'
    }
    else {
        btnAddfr.value = "Kết bạn"
    }
}
