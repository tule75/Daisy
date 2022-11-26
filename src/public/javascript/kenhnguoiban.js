

 const $ = document.querySelector.bind(document);
 const $$ = document.querySelectorAll.bind(document);

 const getContainers = $$(".container-content")
    const navbars = $$(".navbar-item")
    const forItems = $$(".for-item")
    const setManageItems = $$(".manage-item")
    const containerContents = $$(".container-content")
    const containerItems  = $$(".container-item")

    const headerTitles = $$(".head-title")
    const titleItems = $$(".wrap-item")

    const cholayhang = $(".cholayhang")
    const isContainerItem = $(".has-giaohang")

   setManageItems.forEach((manageItem,index) => {
        const  forItem = forItems[index];
        manageItem.onclick = function () {
            $(".for-item.active").classList.remove("active")
            forItem.classList.add("active")
        }
   }) 

   containerContents.forEach((content,index) => {
        const contentItem = containerItems[index]
        content.onclick = function () {
            $(".container-content.active").classList.remove("active")
            $(".container-item.active").classList.remove("active")
            this.classList.add("active")
            contentItem.classList.add("active")
        }
   })


   headerTitles.forEach((headerTitle,index) => {
    const headerTitleItem = titleItems[index]
    headerTitle.onclick = function () {
        $(".wrap-item.active").classList.remove("active")
        $(".head-title.active").classList.remove("active")

        this.classList.add("active")
        headerTitleItem.classList.add("active")
      
    }
})

    
// show discount
    const hasDiscounts = $$(".discount-is")
    const modalShow = $(".modal")
    const modalClose = $(".icon-close")
    const apply = $(".btn-apply")
    const trasher = $(".trasher")

    hasDiscounts.forEach((hasDiscount,index) => {
    hasDiscount.onclick = function () {
        modalShow.classList.add("open")
    }
    })

    // modalClose.onclick = function () {
    //         alert("Ap dung ma thanh cong")
    // }

    apply.onclick = function () {
        alert("Ap dung ma thanh cong")
        $(".modal.open").classList.remove("open")
        trasher.style.display = 'block'
    }

// show noti
    const homeContainer = $(".forhome-container")
    const noti = $(".forhome-noti-order")

    if(noti.classList.contains("showing")) {
        homeContainer.classList.remove("center")
    }