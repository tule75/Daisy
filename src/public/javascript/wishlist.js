

const $ = document.querySelector.bind(document)
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


const choose = $(".choose")
const buy = $(".buy")
const check = $(".check")

    choose.onclick = function () {
        check.classList.add("open")
        check.onclick = function () {
            buy.classList.add("open")
        }
    }