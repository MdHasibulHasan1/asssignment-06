let currentData;

let loadedData;

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader-section');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    } 
}


const fetchToolsData = async() =>{
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    loadedData = [...data.data.tools];
    
    displayToolsDetails(data.data.tools.slice(0, 6));
    
}

// See More section
const seeMoreCard=async()=>{
    document.getElementById('tools-card-container').innerHTML='';
    displayToolsDetails(loadedData);
}



const displayToolsDetails=(tools)=>{
    
    console.log(tools[2].published_in);
    // display 6 cards
    const seeMoreSection = document.getElementById('see-more-section');
    /* const loaderSection=document.getElementById('loader-section"'); */
    if(tools.length > 6) {
        seeMoreSection.classList.add('d-none');
        currentData=[...tools];
        /* const sortButton = document.getElementById('sort-button').addEventListener('click', function(){
            sortByDate(tools);
        }) */
    }
    else{
        seeMoreSection.classList.remove('d-none');
        currentData=[...tools];
        
    }
    
    const toolsCard = document.getElementById('tools-card-container');
    tools.forEach(singleTool => {
        console.log(singleTool);
        const {image, published_in, features, name, id}=singleTool;
        console.log(singleTool);
        toolsCard.innerHTML+=`
        <div class="col">
            <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol type="1">
                    <li>${features[0]}</li>
                    <li>${features[1]}</li>
                    <li>${features[2]}</li>
                </ol>
                <hr>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${name}</h5>
                        <div class="d-flex gap-2">
                            <i class="fa-solid fa-calendar-days"></i>
                            <h6>${published_in}</h6>
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
const displayDetailsInModel=(singleDetails)=>{
    console.log(singleDetails.pricing);
    
    
    const {description, image_link, pricing, input_output_examples, features, integrations, accuracy}=singleDetails;
    let allFeatures= [];
    for (const key in features) {
        if (features.hasOwnProperty.call(features, key)) {
            const feature = singleDetails.features[key];
            console.log(feature.feature_name);
            allFeatures.push(feature.feature_name);
            console.log(accuracy.score);
            const toolDetails=document.getElementById('tool-details');
    toolDetails.innerHTML='';
    toolDetails.innerHTML += `
    <div class="col">
        <div class="card bg-danger bg-danger-subtle border border-warning rounded">
            <div class="card-body">
                <h5 class="card-title">${description}</h5>
                <div class="row row-cols-3 d-flex justify-content-between text-center">
                    <div style="width: 30%" class="text-success col bg-white rounded p-2">
                        <div class="fs-6">${pricing[0].price ? pricing[0].price : 'Free of Cost/'}</div>
                        <div class="fs-6">${pricing[0].plan ? pricing[0].plan : 'Basic'}</div>
                    </div>
                    <div style="width: 30%" class="text-warning col bg-white rounded p-2">
                        <div class="fs-6">${pricing[1].price ? pricing[1].price :'Free of Cost/'}</div>
                        <div class="fs-6">${pricing[1].plan ? pricing[1].plan : 'Pro'}</div>
                    </div>
                    <div style="width: 30%" class="text-danger col bg-white rounded p-2">
                        <div class="fs-6">${pricing[2].price ? pricing[2].price :'Free of Cost/'}</div>
                        <div class="fs-6">${pricing[2].plan ? pricing[2].plan : 'Enterprise'}</div>
                    </div>
                </div>

                <div class="d-flex gap-4 justify-content-between">

                    <div class="text-bg-black ">
                        <h5 class="card-title fw-bold">Features</h5>
                        <ul>
                            <li>${allFeatures[0]}</li>
                            <li>${allFeatures[1]}</li>
                            <li>${allFeatures[2]}</li>
                        </ul>
                    </div>
                    <div class="">
                        <h5 class="card-title fw-bold">Integrations</h5>
                        <ul>
                            <li>${singleDetails.integrations[0]}</li>
                            <li>${singleDetails.integrations[1]}</li>
                            <li>${singleDetails.integrations[2]}</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
        <div class="position-relative">
            <span class="badge text-bg-danger position-absolute top-0 mt-2 me-2 end-0">${accuracy.score ? accuracy.score*100 +'% accuracy' :''}</span>
            <img src="${image_link[0] ? image_link[0] : "image not available"}" class="card-img-top" alt="...">
        </div>
        <div class="card-body my-2">
        <h5 class="card-title">${input_output_examples[0].input ? input_output_examples[0].input : "Can you give any example?"}</h5>
        <p class="card-title">${input_output_examples[0].output ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
        </div>
        </div>
    </div>
    `;

        }
    }
    



 

}











fetchToolsData();