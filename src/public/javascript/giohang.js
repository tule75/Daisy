    
   
   let backet = []
   let selectId1 = document.getElementById('id')
//    let selectId2 = document.getElementById('2')
//    let selectId3 = document.getElementById('3')


//    let arrayId = [selectId1,selectId2,selectId3]
   

   let increase = () => {
    let search = backet.find((x) => x.selectId1 === selectId1)
    if(search === undefined) {
        backet.push({
            // id: selectId1,
            item: 1,
        })
    }
    else {
        search.item +=1
    }
        console.log(backet)
    }
    let decrease = () => {
        
    }

    let update =() =>{

    }