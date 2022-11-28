
const btnAddfr = document.querySelector(".btn-follow-user")
// const value = document.querySelector(".btn-follow-user").value


btnAddfr.onclick = function () {
    if(btnAddfr.value === "Ket ban") {
        btnAddfr.value = 'Da Ket ban'
    }
    else {
        btnAddfr.value = "Ket ban"
    }
}
