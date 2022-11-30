
    // luu vouchers
    const getVouchers = document.querySelectorAll(".coupon-btn")
    const follow = document.querySelector(".btn--follow")
    // var value = document.querySelector(".btn--follow").value

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
   
  


    // 
