// dynamically show phone  arrow function section starts
const loadPhones = (searchText,dataLimit) =>{
const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
fetch(url)
.then( res => res.json())
.then( data => displayPhones(data.data, dataLimit))
}
const displayPhones = (phones, dataLimit) => {
const phoneContainer = document.getElementById('phone-container')
phoneContainer.innerText='';
// display 20 phones only 
const showAll = document.getElementById('show-All');

if (dataLimit && phones.length > 10 ) {
  phones = phones.slice(0, 10);
  showAll.classList.remove('d-none');
} else {
  showAll.classList.add('d-none');
}

// display no phone found 
const noPhoneMessage = document.getElementById('no-found-message');
if(phones.length === 0){
  noPhoneMessage.classList.remove('d-none')
}
else{
  noPhoneMessage.classList.add('d-none');
}
// display all phones found
phones.forEach(phone => {
const phoneDiv = document.createElement('div')
phoneDiv.classList.add('col')
phoneDiv.innerHTML = `
<div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
      <button onclick ="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      `
      phoneContainer.appendChild(phoneDiv);
});
// stop loader spinner 
toggleSpiner(false);
}
// dynamically show phone  arrow function section ends

// search button section starts 
const processSearch = (dataLimit) =>{
  toggleSpiner(true);
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   loadPhones(searchText,dataLimit);
}

document.getElementById('btn-search').addEventListener('click',function(){
  processSearch(10);

  // start loader 
  // toggleSpiner(true);
  //  const searchField = document.getElementById('search-field');
  //  const searchText = searchField.value;
  //  loadPhones(searchText);
})
// search input field keyboard event handler 
document.getElementById('search-field').addEventListener('keypress',function(e){
  if(e.key === 'Enter'){
    processSearch(10); 
  }
})
const toggleSpiner = isLoading =>{
  const loaderSection = document.getElementById('load-spinner');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}
// not the best solution to show all  
document.getElementById('btn-show-all').addEventListener('click',function(){
  processSearch();
})

// loadPhoneDetails section -->
const loadPhoneDetails =(id) =>{
  const url =` https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then( res => res.json())
  .then( data => console.log(data));
}