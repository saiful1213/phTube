
// load the category
const loadCategory = async () =>{
   const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
   const data = await response.json();
   const categoryArr = data.data;
   // console.log(categoryArr);
   const tabContainer = document.getElementById('tabContainer');
   categoryArr.forEach(category => {
      const div = document.createElement('div');
      div.innerHTML = `
         <a class="tab tab-lifted bg-[#25252526] text-black mr-2" onclick="showData('${category.category_id}'); makeRed(this)">${category.category}</a>
      `;
      tabContainer.appendChild(div);
   });
}

// show all card using cardId
const showData = async (categoryId) =>{
   const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
   const data = await response.json();
   const tubeArr = data.data;
   console.log(tubeArr);


   if(tubeArr.length == 0){
      console.log('array is empty');      
   }   
  
   // const body = document.getElementById('body');
   
   const cardContainer = document.getElementById('cardContainer');
   cardContainer.innerHTML = '';
   tubeArr.forEach(tubeObj =>{
      
      
      const card = document.createElement('div');
      card.innerHTML = `
         <div><img src="${tubeObj.thumbnail}" class="rounded-lg h-48 w-full"></div>
         <div class="flex gap-3 mt-5">
            <div>
               <img src="${tubeObj.authors[0].profile_picture}" class="w-12 h-12 rounded-full">
            </div>
            <div class="flex-1">
               <h2 class="text-[#171717] font-bold">${tubeObj.title}</h2>
               <div class="flex items-center">
                  <div class="mr-2"><h3 class="text-[#171717b3] my-2 text-sm">${tubeObj.authors[0].profile_name}</h3></div>
                  <div>
                     <p>${tubeObj.authors[0].verified ? `<i class="fa-solid fa-circle-check" style="color: #095cec"></i>`:''}</p>
                  </div>
               </div>
               <p class="text-[#171717b3] text-sm">${tubeObj.others.views} views</P>
            </div>
         </div>
      `;
      cardContainer.appendChild(card);
   });
}


const makeRed = (data) =>{
   data.style.backgroundColor = 'red';
   data.style.color = 'white';
}


loadCategory();
showData('1000');