let title = document.getElementById('title');
let Price = document.getElementById('Price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let mood = 'create';
let temp;
// get total___________________________________________
function getTotal()
{
    if(Price.value !== '')
    {
        //+ لتحويل القيمة من نص لرقم
        let result = (+Price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#408d8d';
    }
    else
    {
        total.innerHTML = '';
        total.style.background = 'brown';
    }
}

//creat product___________________________________________

/*لو سبتها كد كل مره هعمل اعادة تشغيل هيلاقى المصفوفة فاضية بالتالى هيرجعلى اليانات فاضية فالطريقة التالية لحل المشكلة دى
let dataPro=[];
*/

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
create.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        Price:Price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.value,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //count_____________________________________________________
 if(title.value != '' && Price.value !='' && category.value !=''&& newPro.count<=100){

     if(mood === create){
         if(newPro.count>1){
             for(i=0;i<newPro.count; i++){
                 dataPro.push(newPro)
             }
         }else{
     
             dataPro.push(newPro)
         }
     }else{
         dataPro[temp]=newPro;
         mood = 'create';
         create,this.innerHTML='Create';
         count.style.display = 'block';
 
        }
        clearData()

 }
    //save localstorage_______________________________________________
    localStorage.setItem('product', JSON.stringify(dataPro))
    console.log(dataPro)
    showData()
}
//clear inputs____________________________________________________________
function clearData(){
    title.value ='';
    Price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML ='';
    count.value = '';
    category.value = '';

}
//read________________________________________________________
function showData(){
    getTotal()
    let table='';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i+1].title}</td>
            <td>${dataPro[i].Price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i]. total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick="Update(${i})">update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete .innerHTML=`
        <button onclick="deleteAll ()">Delete All (${dataPro.length}) Elements </button>
        `
    }else{
        btnDelete .innerHTML='';
    }

}
showData()
//delete____________________________________________________________
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product= JSON.stringify(dataPro);
    showData()

}
function deleteAll (){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
//update____________________________________________________________
function Update(i) {
    title.value = dataPro[i].title;
    Price.value = dataPro[i].Price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    create.innerHTML='Update';
    mood='Update';
    temp=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}
//search
let searchMood ='title';
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searcht'){
        searchMood ='title';
    }else{
        searchMood='category';
    }
    
    search.placeholder ='Search By'+searchMood;
    search.focus()
    search.value = '';
    showData()
}

function SearchData(value){
    let table ='';
    for(let i = 0 ; i<dataPro.length ; i++){ 
        if(searchMood == 'title'){
       
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].Price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i]. total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="Update(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `;

            }
        }else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].Price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i]. total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="Update(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>
                `;

            }
        }

    




 
    }
    document.getElementById('tbody').innerHTML = table;


}
//clean data

