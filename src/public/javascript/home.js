        
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




    // const btnAdd = document.querySelector('.btn')
    const voucherText1 = document.querySelector('.coupontext1')
    const voucherText2 = document.querySelector('.coupontext2')
    const voucherText3 = document.querySelector('.coupontext3')

    const btnVouchers = document.querySelectorAll('.coupon-btn')
    const coupon1 = document.querySelector('.coupon-1')
    const coupon2 = document.querySelector('.coupon-2')
    const coupon3 = document.querySelector('.coupon-3')

    btnVouchers.forEach((voucher) => {
        // console.log(voucher)
        voucher.addEventListener('click', couponClick);
    })
     

    function couponClick() {
        if(this.classList.contains('coupon-1')) {
            voucherText1.innerHTML='oke'
           
        } 
        if (this.classList.contains('coupon-2')) {
            voucherText2.innerHTML='okela'
        }
        if (this.classList.contains('coupon-3')) {
            voucherText3.innerHTML='okelala'
        }
    }
