
        var btns = document.querySelectorAll('.btn');
        var paginationWrapper = document.querySelector('.pagination-wrapper');
        var bigDotContainer = document.querySelector('.big-dot-container');
        var littleDot = document.querySelector('.little-dot');

            for(var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', btnClick);
            }

            function btnClick() {
            if(this.classList.contains('btn--prev')) {
                paginationWrapper.classList.add('transition-prev');
            } else {
                paginationWrapper.classList.add('transition-next');  
            }
            
            var timeout = setTimeout(cleanClasses, 300);
            }

            function cleanClasses() {
            if(paginationWrapper.classList.contains('transition-next')) {
                paginationWrapper.classList.remove('transition-next')
            } else if(paginationWrapper.classList.contains('transition-prev')) {
                paginationWrapper.classList.remove('transition-prev')
            }
    }

    // luu vouchers
    const getVouchers = document.querySelectorAll(".coupon-btn")

   getVouchers.forEach((voucher) => {
        voucher.onclick = function () {
            if(voucher.value == "Lưu mã") {
                voucher.value = "Đã Lưu"
            }
            else {
                const value2 = "Lưu mã"
                voucher.value = value2
            }
        }
   })
   
    const follow = document.querySelector(".btn--follow")
    var value = document.querySelector(".btn--follow").value

    follow.onclick = function () {
       if(follow.value == "Theo dõi") {
            const value = "Đã Theo Dõi"
            follow.value = value
       }
       else {
            const value2 = "Theo dõi"
            follow.value = value2
       }
    }
   