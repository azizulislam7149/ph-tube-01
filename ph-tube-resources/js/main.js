const loadButton =()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>displayButton(data.categories))
}
const loadVideos =()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res=>res.json())
    .then(data=>displayVideos(data.videos))
}
const displayButton= (categories)=>{
    const buttonContainer = document.getElementById('button-container')
    categories.forEach(item=>{
        const buttonDiv = document.createElement('div')
        buttonDiv.innerHTML= `
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class= 'btn category-btn'>${item.category}</button>
        `
        buttonContainer.appendChild(buttonDiv)
    })
}

const displayVideos = (videos)=>{


   const videosContainer = document.getElementById('videos');
   videosContainer.innerHTML = "";
   if(videos.length === 0  ){
    videosContainer.classList.remove('grid')
    videosContainer.innerHTML= `
    <div class="h-72 flex flex-col items-center justify-center ">
            <img src="design/Frame 3.png" alt="">
             <h1 class="font-extrabold"> No content here in this category</h1>
        </div>
    `
    return;
   }
   else{
    videosContainer.classList.add('grid');
   }
videos.forEach(element => {
    const div = document.createElement('div')
   
    div.classList='card card-compact'
    div.innerHTML = `
    <figure class= 'h-[200px] relative' >
    <img src=${element.thumbnail} class= 'w-full h-full object-cover' alt="">
    ${
        element.others.posted_date?.length == 0 ?"" :` <span class= 'absolute right-2 bottom-2 bg-black p-2 text-white rounded'>${getTimeString(element.others.posted_date)}</span>`  
    }
   
    </figure>
    <div class="px-0 py-4 flex gap-2">
        <div>
            <img src= ${element.authors[0].profile_picture} class="w-10 h-10 rounded-full object-cover alt="">

        </div>
        <div>
            <h2 class= 'font-extrabold'>${element.title} </h2>
            <div class ='flex items-center gap-2'>
             <p>${element.authors[0].profile_name}</p>
             ${element.authors[0].verified=== true? `<img class= 'w-5' src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="">
`: ""}
        
         </div>
            <p> <button onclick= "loadDetails(${element.video_Id})" class = 'btn btn-error'>details</button></p>
        </div>
      </div>

    `
    videosContainer.appendChild(div);
   });
}
loadButton();
loadVideos()
function getTimeString (time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600; 
    const remainingMinute = parseInt(remainingSecond / 60)
   
    remainingSecond  = remainingSecond % 60

    return ` ${hour} hour ${remainingMinute} minte ${remainingSecond} second ago`
}
const result = getTimeString(23333)
console.log(result);

function loadCategoriesVideos(id){
// alert(id)
fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
.then(res=>res.json())
.then(data=>{
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add('active');
    displayVideos(data.category)

})
.catch(error=>console.log(error));

}

const removeActiveClass = ()=>{
    const buttons  = document.getElementsByClassName('category-btn')
   for(const btn of buttons){
    btn.classList.remove('active');
   }
}
removeActiveClass();

const loadDetails = async (videoId)=>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch('url');
    const data = await res.json();
    displayDetails(data.video);


}
const displayDetails = (video)=>{
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML= `
    <img src=${video.thumbnail} alt="">
    <p>${video.description}</p>

    `

    document.getElementById('customModal').showModal();
}