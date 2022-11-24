

 const $ = document.querySelector.bind(document);
 const $$ = document.querySelectorAll.bind(document);

 const getContainers = $$(".container-content")
    const navbars = $$(".navbar-item")
    const shipment = $(".forshipment")
    const hasShipment = $(".has--manageship")
    const setShip = $(".set-manageship")
    const forHome = $(".forhome")
    const forSetShip = $(".forSetShipment")
    const forItems = $$(".for-item")
    const setManageItems = $$(".manage-item")

   setManageItems.forEach((manageItem,index) => {
        const  forItem = forItems[index];
        manageItem.onclick = function () {
            $(".for-item.active").classList.remove("active")
            forItem.classList.add("active")
        }
   }) 