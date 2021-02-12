var updateIndex;
var addBtn             = document.getElementById('addBtn');
var saveBtn            = document.getElementById('saveBtn');
var productName        = document.getElementById('productName');
var productCompany     = document.getElementById('productCompany');
var productPrice       = document.getElementById('productPrice');
var productDescription = document.getElementById('productDescription');
var input=document.getElementsByClassName('form-control');
var searchInput = document.getElementById('search-input');
var products;

if(localStorage.getItem('productList')==null){
    products=[];
}else{
    products=JSON.parse(localStorage.getItem('productList'));
    dsiplayProduct();
}

addBtn.onclick=function()
{
    addProduct();
    dsiplayProduct();
    resetForm();
}
function addProduct()
{
    var product = {
        productName:productName.value,
        productCompany:productCompany.value,
        productPrice:productPrice.value,
        productDescription:productDescription.value 
    }
    products.push(product);
    localStorage.setItem('productList',JSON.stringify(products));
    
}
function dsiplayProduct()
{
    
   var trs="";
    for(var i=0;i<products.length;i++)
    {
        trs+=`<tr><td>`+ products[i].productName +`</td> 
        <td>` +products[i].productCompany+`</td>
        <td>`+products[i].productPrice+`</td>
        <td>`+products[i].productDescription+`</td>
        <td><button onclick='deleteProduct(`+i+`)' class='btn btn-danger'>delete</button></td>
        <td><button onclick='editProduct(`+i+`)' class='btn btn-warning'>edit</button></td>
        </tr>`
    }

    document.getElementById('tableBody').innerHTML=trs;
}
function resetForm()
{
for(var i=0;i<input.length;i++)
{
    input[i].value="";
}

    searchInput.value="";
    addBtn.style.display="block";
    saveBtn.style.display="none";
    
}

function deleteProduct(index)
{  
    products.splice(index,1);
    localStorage.setItem('productList',JSON.stringify(products));
    dsiplayProduct();
    resetForm();

}

function search(searchTxt)
{
  var trs="";
  for(var i=0;i<products.length;i++)
  {
      if(products[i].productName.toLowerCase().includes(searchTxt.toLowerCase()) )
      trs+=`<tr>
      <td>`+ products[i].productName +`</td> 
      <td>`+products[i].productCompany+`</td>
      <td>`+products[i].productPrice+`</td>
      <td>`+products[i].productDescription+`</td>
      <td><button onclick="deleteProduct(`+i+`)" class='btn btn-danger'>delete</button></td>
      <td><button onclick='editProduct(`+i+`)' class='btn btn-warning'>edit</button></td>
      </tr>` 
     }
      document.getElementById('tableBody').innerHTML=trs;

}


function editProduct(index)
{
    updateIndex = index;
    addBtn.style.display="none";
    saveBtn.style.display="block";
    productName.value = products[index].productName;
    productCompany.value = products[index].productCompany;
    productPrice.value = products[index].productPrice;
    productDescription.value = products[index].productDescription;

    
}

function saveChanges(){
    products[updateIndex].productName = productName.value;
    products[updateIndex].productCompany = productCompany.value;
    products[updateIndex].productPrice = productPrice.value;
    products[updateIndex].productDescription = productDescription.value;
    localStorage.setItem('productList',JSON.stringify(products));
    dsiplayProduct();
    
    addBtn.style.display="block";
    saveBtn.style.display="none";
    
}

saveBtn.onclick=function()
{
    saveChanges();
    resetForm();
}

productName.addEventListener('onkeyup',function(){

    var regex = /^[A-Z][a-z]{2,7}$/;
    if(regex.test(productName.value)){
        alert('sss');
        productName.classList.remove('is-invalid');
        productName.classList.add('is-valid');

    }
    else
    {
        alert('sss');
        productName.classList.add('is-invalid');
    }
});

var num = 10;
var ternary = (num > 5)?"OK":"No";
console.log("ternary="+ternary);