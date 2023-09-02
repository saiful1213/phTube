// load the category
const loadCategory = async () => {
   const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
   const data = await response.json();
   const categoryArr = data.data;
   const tabContainer = document.getElementById('tabContainer');
   categoryArr.forEach(category => {
      const div = document.createElement('div');
      div.innerHTML = `
      <a class="tab tabs-boxed px-4 bg-[#25252526] text-black mr-2" onclick="showData('${category.category_id}'); makeRed(this)">${category.category}</a>
      `;
      tabContainer.appendChild(div);
   });
}

// show all card using cardId
const showData = async (categoryId) => {
   const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
   const data = await response.json();
   const tubeArr = data.data;

   // show errMsg in Drawing Category
   const errMsg = document.getElementById('errMsg');
   const errImg = document.getElementById('errImg');
   if (tubeArr.length == 0) {
      errMsg.classList.remove('hidden');
      errImg.classList.remove('hidden');
   } else {
      errMsg.classList.add('hidden');
      errImg.classList.add('hidden');
   }

   const cardContainer = document.getElementById('cardContainer');
   cardContainer.innerHTML = '';

   // loop the array to get the all objects
   tubeArr.forEach(tubeObj => {

      // convert secondsToHour
      const postedDate = tubeObj.others.posted_date.length !== 0 ? secondToHour(tubeObj.others.posted_date) : '';

      // creat a div named card and set innerHTML to show the data on UI
      const card = document.createElement('div');
      card.innerHTML = `
         <div class="relative">
            <img src="${tubeObj.thumbnail}" class="rounded-lg h-48 w-full">
            ${postedDate ? `<p class="absolute bottom-4 text-white text-xs p-1 bg-[#171717] rounded right-4">${postedDate}</p>` :
            `<p class="absolute bottom-4 text-white text-xs p-1 rounded right-4"></p>`}                  
         </div>
         <div class="flex gap-3 mt-5">
            <div>
               <img src="${tubeObj.authors[0].profile_picture}" class="w-12 h-12 rounded-full">
            </div>
            <div class="flex-1">
               <h2 class="text-[#171717] font-bold">${tubeObj.title}</h2>
               <div class="flex items-center">
                  <div class="mr-2">
                     <h3 class="text-[#171717b3] my-2 text-sm">${tubeObj.authors[0].profile_name}</h3>
                  </div>
                  <div>
                     <p>${tubeObj.authors[0].verified ? `<i class="fa-solid fa-circle-check" style="color: #095cec"></i>` : ''}</p>
                  </div>
               </div>
               <p class="text-[#171717b3] text-sm">${tubeObj.others.views} views</P>
            </div>
         </div>
      `;
      cardContainer.appendChild(card);
   });
}

// changeBgInCategory
const makeRed = (data) => {
   data.style.backgroundColor = 'red';
   data.style.color = 'white';
}

// convert secondToHour function
const secondToHour = (sec) => {
   const hour = Math.round(sec / (60 * 60));
   const minuteDivisior = Math.round(sec % (60 * 60));
   const minute = Math.round(minuteDivisior / 60);
   return `${hour}hrs ${minute}min ago`;
}

loadCategory();
showData('1000');