

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
        // headerTitle.style.color = 'rgb(57, 137, 57)'
      
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
        // trasher.style.display = 'block'
    }

// show noti
    const homeContainer = $(".forhome-container")
    const noti = $(".forhome-noti-order")

    if(noti.classList.contains("showing")) {
        homeContainer.classList.remove("center")
    }

    const has_noti = $(".noti-order-item") 
    const has_notiShowing = $(".noti-order-item.show") 
    if(has_notiShowing.classList.contains("show")) {
        noti.classList.add("showing")
        homeContainer.classList.remove("center")
    }
    else {
        homeContainer.classList.add("center")
        $(".forhome-noti-order.showing").classList.remove("showing")
    }

    const isShow = $(".isshow") 
    const nothing = $(".nothing-case")
    const itemWrap = $(".cart-navbar-item-wrap")

    if(itemWrap.classList.contains("isshow")) {
        nothing.style.display = 'none'
    }
    else {
        nothing.style.display =' block '
    }


    // for all sp
    const inputPlaceholder = $(".input-code")
    const codelistItems = $$(".code-list-item")
    codelistItems.forEach((listItem,index) => {
        listItem.onclick = function () {
            if(index == 0 ) {
            inputPlaceholder.placeholder = 'Tim mã đơn hàng' 
            } 
            else if(index ==1 ) {
                inputPlaceholder.placeholder = 'Tìm tên sản phẩm' 
            } 
            else if (index == 2 ) {
                inputPlaceholder.placeholder = 'Tìm mã vận đơn' 
            }
        }
    }) 

    const isProcess = $(".isProcess")
    const wrapItem = $(".item-has-product")
    const iconFooter = $(".item-footer")

    if(wrapItem.classList.contains("isProcess")) {
        iconFooter.style.display = 'none'
    } else {
        iconFooter.style.display ='flex'
    }

    const accepts = $$(".accept")
    const waiting = $$(".waiting")

    accepts.forEach((accept,index) => {
        const wait = waiting[index]
        accept.onclick = function () {
            this.classList.remove("accept")
            this.classList.add("accepted")
            wait.innerHTML ='Đã xử lý'
            this.innerHTML = 'Đã xác nhận'
            
        }
    })
    
