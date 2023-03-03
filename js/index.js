let loadedToolsData=[];
const loadToolsData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    // loadToolsData=data.data.tools;
    displayToolsDetails(data.data.tools.slice(0, 6));
}
//   ?????????????????????????????????????
const showAllCard=async()=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById('tools-card-container').innerHTML='';
    // loadToolsData=data.data.tools;
    displayToolsDetails(data.data.tools);
    displayToolsDetails(loadToolDetails);
}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader-section');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    } 
}
const displayToolsDetails=(tools)=>{
    toggleSpinner(true);
    console.log(tools);
    // display 6 cards
    // const loaderSection = document.getElementById('loader-section');
    const showAllSection = document.getElementById('show-all-section');
    // const loaderSection=document.getElementById('loader-section"');
    if(6<=tools.length) {
        // tools = tools.slice(0, 6);
        // loaderSection.classList.remove('d-none');
        showAllSection.classList.remove('d-none');
        
    }
    else{
        showAllSection.classList.add('d-none');
        // loaderSection.classList.add('d-none');
        
    }
    const toolsCard = document.getElementById('tools-card-container');
    tools.forEach(singleTool => {
        const {image, features, name, id}=singleTool;
        // console.log(singleTool);
        toolsCard.innerHTML+=`
        <div class="col">
            <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <div>
                    <h6>1. ${features[0]}</h6>
                    <h6>2. ${features[1]}</h6>
                    <h6>3. ${features[2]}</h6>
                </div>
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${name}</h5>
                        <div class="d-flex gap-2">
                            <i class="fa-solid fa-calendar-days"></i>
                            <h6>${new Date().toLocaleDateString("en-US")}</h6>
                        </div>
                    </div>
                    <div>
                        <i onclick="loadToolDetails('${id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#toolDetailsModal"></i>
                    </div>
                </div>
            </div>
            </div>
        </div>
        `;
    });
    toggleSpinner(false);
}


const loadToolDetails=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetailsInModel(data.data);
}
const displayDetailsInModel=(singledetails)=>{
    console.log(singledetails.features);
    
    const {description, image_link, pricing, input_output_examples, features, integrations}=singledetails;
    
    const toolDetails=document.getElementById('tool-details');
    toolDetails.innerHTML='';
    toolDetails.innerHTML += `
    <div class="col">
        <div class="card bg-danger bg-danger-subtle border border-warning rounded">
            <div class="card-body">
                <h5 class="card-title">${description}</h5>
                <div class="d-flex gap-2 text-center justify-content-between">
                    <div class="text-success bg-white rounded p-2">
                        <div class="fs-6">${pricing[0].price}</div>
                        <div class="fs-6">${pricing[0].plan}</div>
                    </div>
                    <div class="text-warning bg-white rounded p-2">
                        <div class="fs-6">${pricing[1].price}</div>
                        <div class="fs-6">${pricing[1].plan}</div>
                    </div>
                    <div class="text-danger bg-white rounded p-2">
                        <div class="fs-6">${pricing[2].price}</div>
                        <div class="fs-6">${pricing[2].plan}</div>
                    </div>
                </div>

                <div class="d-flex gap-4 justify-content-between">

                    <div class="">
                        <h5 class="card-title">Features</h5>
                        <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        </ul>
                    </div>
                    <div class="text-warning">
                        <h5 class="card-title">Integrations</h5>
                        <div class="fs-6">${pricing[1].price}</div>
                        <div class="fs-6">${pricing[1].plan}</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
        <img src="${image_link[0] ? image_link[0] : "image not available"}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${input_output_examples[0].input ? input_output_examples[0].input : "Can you give any example?"}</h5>
        <p class="card-title">${input_output_examples[0].output ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
        </div>
        </div>
    </div>
    `;




 

}