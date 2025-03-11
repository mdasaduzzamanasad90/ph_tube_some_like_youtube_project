// api categories button
const loadcategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displaycategories(data.categories))
    .catch((error) => console.log(error));
};

// remove color dainamic categories button 
const removeactive = () => {
  const removebutton = document.getElementsByClassName('category-btn');
  for(let btn of removebutton){
    btn.classList.remove("activebutton");
  }
}

// add color dainamic categories button
function categoriesButtonFunction (id) {

  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activebutton = document.getElementById(`btn-${id}`)
      const activeallbutton = document.getElementById('allbutton');

      removeactive();
      activebutton.classList.add('activebutton');
      activeallbutton.classList.remove('activebutton');
      displayvideo (data.category)
    })
    .catch((error) => console.log(error));

};

// display categories button
const displaycategories = (categories) => {
  const buttoncategories = document.getElementById("categoriesbutton");
  categories.forEach((element) => {

    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="categoriesButtonFunction(${element.category_id})" class ="btn category-btn" id="btn-${element.category_id}">${element.category}</button>
    `
    // append
    buttoncategories.appendChild(div);
  });
};

// api video
const loadvideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeactive();
      const allbuttonclick = document.getElementById('allbutton');
      allbuttonclick.classList.add("activebutton");
      displayvideo(data.videos)
    })
    .catch((error) => console.log(error));
};

// display video
const displayvideo = (video) => {
  const videofiled = document.getElementById("videofield");
  videofiled.innerHTML = ""

  if(video.length === 0){
    videofiled.classList.remove("grid");
    videofiled.innerHTML = `
    <div class ="flex flex-col gap-5 justify-center items-center mt-20 lg:mt-32">
    <img src="resources/Icon.png" alt="">
    <h1 class="font-bold text-xl lg:text-3xl text-center">Oops!! Sorry, There is no content here</h1>
    </div>
    `
    return;
  }
  else{
    videofiled.classList.add("grid");
  }

  video.forEach((element) => {
    // console.log(element);
    const card = document.createElement("div");
    card.classList = "card";
    card.innerHTML = ` 
    <figure class ="h-[200px] relative">
        <img
        src="${element.thumbnail}"
        alt="Shoes"
        class=" h-full w-full object-cover"/>
        ${
          element.others.posted_date?.length === 0?"":`<span class= "absolute lg:text-[10px] text-[5px] right-3 bottom-2 text-white bg-black px-3 rounded-xl">${gettime(element.others.posted_date)}</span>`
        }
        
  </figure>
  <div class="flex lg:py-5 py-3 gap-3 lg:gap-5">
    <div>
        <img class ="h-10 w-10 object-cover rounded-full" src="${element.authors[0].profile_picture}" alt="">
    </div>
    <div>
      <h1 class="font-bold lg:text-xl text-base">${element.title}</h1>
      <div class="flex gap-2">
        <p class="text-slate-500 font-normal lg:text-base text-xs">${element.authors[0].profile_name}</p>
            
        ${element.authors[0].verified === true ? `<img class="w-4 h-4" src="resources/verify.png" alt="">` : ""}
      </div>
      <p>
        <button onclick="loaddetiles ('${element.video_id}')" class = "underline hover1 text-slate-500 font-normal lg:text-base text-xs">details</button>
      </p>
      <p class="text-slate-400 lg:text-base text-xs ">${element.others.views}</p>
    </div>
  </div>`;

    // append
    videofiled.appendChild(card);
  });
};

// api detiles
const loaddetiles = (id) => {
  // console.log("hello")
  
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    .then((res)=>res.json())
    .then((data)=>displaydetiles (data.video))
    .catch((error)=>console.log(error))

}

//display detiles 
const displaydetiles = (v) =>{

  const detailescontainer = document.getElementById("modelcontainer");
  detailescontainer.innerHTML = `
  <img src="${v.thumbnail}"/>
  <p>${v.description}</p>
  `

  document.getElementById('custommodel').showModal();

}

loadcategories();
loadvideo();


// time function
function gettime(time){

  const year = parseInt(time / 31104000);
  const reminingsecond = time % 31104000;
  const month = parseInt(reminingsecond / 2592000);
  const reminingsecond1 = reminingsecond % 2592000;
  const day = parseInt(reminingsecond1 / 86400);
  const reminingsecond2 = reminingsecond1 % 86400;
  const hour = parseInt(reminingsecond2 / 3600);
  const reminingsecond3 = reminingsecond2 % 3600;
  const minute = parseInt(reminingsecond3 / 60);
  const second = reminingsecond3 % 60;
  return (`${year} year ${month} month ${day} day ${hour} hour ${minute} minute ${second} second`);

}


