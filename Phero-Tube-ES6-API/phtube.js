const  getData=async (id=1000)=>{
     
    const fetchData=await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data=await fetchData.json();
    let AllData=data['data'];
    //if array lenght is empty
    if(AllData.length===0){
        AllData=false;
        AppentChild(AllData);
        return;
    }else{
        AppentChild(AllData);

    }
    return AllData;   
}//ende getData function here


//....Set the post on contain......//
    let day=0;
    let hrs=0;
    let min=0;
    //function.........
    function HourseMin(seconds){

        // Calculate days....
        let hour = Math.floor(seconds / 3600);
        let days=Math.floor(hour/24);
            day=days;
        //calculate hourse.......
        let hours=(hour % 24);
           hrs=hours;
        // Calculate remaining seconds after converting to hours
        let remainingSeconds = seconds % 3600;
        // Calculate minutes
        let minutes = Math.floor(remainingSeconds / 60);
        min=parseInt(minutes);

            const id=seconds;
        if(!!id){
            const hidePostDate=document.getElementById(id);

            if(day>0){
                const postContain=document.createElement('p');
                postContain.innerHTML=`<span class="text-xs">${day}days ${hrs}hrs ${min}min ago</span>`
                //add hrs min....
                hidePostDate.appendChild(postContain);
            }else{
                const postContain=document.createElement('p');
                postContain.innerHTML=`<span class="text-xs">${hrs}hrs ${min}min ago</span>`
                //add hrs min....
                hidePostDate.appendChild(postContain);

            }

        }
    };



//get container div......
const container=document.getElementById('mainContainer');
const Emptycontainer=document.getElementById('NoitemsAvailable');


const AppentChild=(data)=>{
    container.innerHTML=' ';

    if(data){
        let blueTick=false;

        //forEach loop throw........
       data.forEach((dataEle) => {

        //Unique id for blueTick.........
        let uniqueId = `Unic_${Date.now()}_${Math.floor(Math.random() * 10000)}`;


        const blueTickcheck=(dataEle?.authors[0]?.verified || false);
        blueTick=blueTickcheck;
        
        const ChildContainer=document.createElement('div');

        ChildContainer.innerHTML=`<div>
            <div class="relative"><figure ><img class="rounded-lg h-44 lg:h-56 w-[100%] relative" src="${dataEle.thumbnail}" alt="Shoes" /><div id="${dataEle.others.posted_date}" class=" text-white bg-black p-[4px] text-xs rounded absolute bottom-2 right-2"> </div></figure></div>

            <div class="mt-2 flex">
                <figure class="mr-2"><img class="w-7 h-7 rounded-full " src="${dataEle.authors[0].profile_picture}" alt="image" /></figure>
                
                <div>
                    <p class='font-bold'>${dataEle.title}</p>
                    <p  class="text-xs font-semibold">${dataEle.authors[0].profile_name}</spanK><span class="ml-[6px]" id="${uniqueId}"></span></p>
                    <p class="text-xs sfont-semibold"><span >${dataEle.others.views}</span> views</p>
                </div>

            </div>
          </div>`
          

        container.appendChild(ChildContainer);
        HourseMin(dataEle.others.posted_date);

        if (blueTick) {
            const getEleBlue = document.getElementById(uniqueId);
            getEleBlue.innerHTML = `<i class="fas fa-check-circle text-blue-500"></i>`;
        }       

      });}//end if....
    if(data===false){
        Emptycontainer.innerHTML=`<div class="flex items-center w-full h-screen mx-auto pb-52"><div class="flex flex-col items-center w-80 mx-auto"><img class="w-20 h-20" src="icon.png"><p class="mt-4 font-bold text-center text-2xl">Oops!! Sorry, There is no content here</p></div></div>`
    }else{
        Emptycontainer.innerHTML='';

    }
}//end forEach......



//catagory fetch function......
const catagory=async()=>{
    const fetchCata=await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const DataConvert=await fetchCata.json();
    const data=DataConvert.data;
    return data;
}


//All button calling.....
const All=async()=>{
    const getCatagoryData=await catagory();
    const AllCata=parseInt(getCatagoryData[0].category_id);
    getData(AllCata);

};
All()

//music button calling........
const music=async()=>{
    const getCatagoryData=await catagory();
    const MusicCata=parseInt(getCatagoryData[1].category_id);
    getData(MusicCata);
  
}

//comedy button calling........
const comedy=async()=>{
    const getCatagoryData=await catagory();
    const ComedyCata=parseInt(getCatagoryData[2].category_id);
    getData(ComedyCata);
}

//drawing button calling........
const drawing=async()=>{
    const getCatagoryData=await catagory();
    const drawingCata=parseInt(getCatagoryData[3].category_id);
    getData(drawingCata);
}



// Function to compare view counts as numbers
function compareViews(a, b) {
    function parseViewCount(viewCount) {
      if (viewCount.endsWith('k')) {
        return parseFloat(viewCount) * 1000;
      } else {
        return parseFloat(viewCount);
      }
    }
  
    const viewsA = parseViewCount(a.others.views);
    const viewsB = parseViewCount(b.others.views);
  
    return viewsB - viewsA; // Sort in descending order
  }
  
  // Function to sort data by views in descending order
  function sortByViewsDescending(data) {
    const sortArray= data.sort(compareViews);
    AppentChild(sortArray);
  }

  //sort by views button......
  const sortViews=async()=>{
    const AllData=await getData();
    sortByViewsDescending(AllData);
  }




  