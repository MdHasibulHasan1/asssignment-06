// declare global variable to sort card
let currentData;
// declare global variable to store the data of fetchToolsData function
let loadedData;
// function for control spinner
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner-section');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    } 
}
// fetch tools data
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
// display Tools Details 
const displayToolsDetails=(tools)=>{
    // console.log(tools[2].published_in);
    // display 6 cards
    const seeMoreSection = document.getElementById('see-more-section');
    if(tools.length > 6) {
        seeMoreSection.classList.add('d-none');
        currentData=[...tools];
    }
    else{
        seeMoreSection.classList.remove('d-none');
        currentData=[...tools];
    }
    
    const toolsCard = document.getElementById('tools-card-container');
    tools.forEach(singleTool => {
        // console.log(singleTool);
        const {image, published_in, features, name, id}=singleTool;
        // console.log(features);
        toolsCard.innerHTML+=`
        <div class="col">
            <div class="card">
            <img src="${image ? image : "Not found"}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol class="list-unstyled">
                    <li>${features[0] ? '1. '+ features[0] : ''}</li>
                    <li>${features[1] ? '2. '+ features[1] : ''}</li>
                    <li>${features[2] ? '3. '+ features[2] : ''}</li>
                    <li>${features[3] ? '4. '+ features[3] : ''}</li>
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
                        <i onclick="loadToolDetails('${id}')" class="fa-solid rounded-circle p-2 bg-danger-subtle fa-arrow-right" data-bs-toggle="modal" data-bs-target="#toolDetailsModal"></i>
                    </div>
                </div>
            </div>
            </div>
        </div>
        `;
    });
    toggleSpinner(false);
}

// fetch tools details to set in the modal
const loadToolDetails=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetailsInModel(data.data);
}
// Display data in the modal
const displayDetailsInModel=(singleDetails)=>{
    // console.log(singleDetails.image_link);
    
    const {description, input_output_examples, image_link, pricing, features, integrations, accuracy}=singleDetails;
   
    let allFeatures= [];
    for (const key in features) {
        if (features.hasOwnProperty.call(features, key)) {
            const feature = singleDetails.features[key];
            // console.log(feature.feature_name);
            allFeatures.push(feature?.feature_name);
            // console.log(allFeatures);

            const toolDetails=document.getElementById('tool-details');
    toolDetails.innerHTML='';
    toolDetails.innerHTML += `

    <div class="col">
        <div class="card bg-danger bg-danger-subtle border border-danger rounded ">
           
            <div class="card-body">
            <h5 class="card-title">${description}</h5>
                <div class="row row-cols-3 d-flex  justify-content-between text-center">
                    <div style="width: 32%" class="text-success col bg-white rounded py-2 ">
                        <div class="fs-6">${pricing? pricing[0].price : "Free of Cost/"}</div>
                        <div class="fs-6">${pricing? pricing[0].plan : 'Basic'}</div>
                    </div>
                    <div style="width: 32%" class="text-warning col bg-white rounded py-2 ">
                        <div class="fs-6">${pricing? pricing[1].price : "Free of Cost/"}</div>
                        <div class="fs-6">${pricing? pricing[1].plan : 'Pro'}</div>
                    </div>
                    <div style="width: 32%" class="text-danger col bg-white rounded py-2 ">
                        <div class="fs-6">${pricing? pricing[2].price : "Free of Cost/"}</div>
                        <div class="fs-6">${pricing? pricing[2].plan : 'Enterprise'}</div>
                    </div>
                </div>
                
                <div class="d-flex mt-4 gap-4 justify-content-between">
                    <div class="text-bg-black ">
                        <h5 class="card-title fw-bold">Features</h5>
                        <ul id="all-features-container">
                            
                        </ul>
                    </div>
                    <div class="">
                        <h5 class="card-title fw-bold">Integrations</h5>
                        <ul id="integrations-container" >
                            <p style="margin-left: -30px;">${integrations? '' : "No data Found"}</p>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  </div>
  <div class="col">
        <div class="card">
                <div class="position-relative">
                    <span class="badge text-bg-danger position-absolute top-0 mt-2 me-2 end-0">${accuracy.score ? accuracy.score*100+' % accuracy' : ''}</span>
                    <img src="${image_link[0] ? image_link[0] : "Not found"}" class="card-img-top" alt="...">
                </div>
            <div class="card-body">
            <h5 class="card-title text-center">${input_output_examples? input_output_examples[0].input : "Can you give any example?"}</h5>
            <p class="card-title text-center">${input_output_examples? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
            </div>
        </div>
  </div>
    `;
    // set data in the all-features-container
    const allFeaturesContainer = document.getElementById('all-features-container');
        for (const feature of allFeatures) {
            const li = document.createElement('li');
            li.innerHTML= feature;  
            allFeaturesContainer.appendChild(li);
        }
    // set data in the integrations-container
    const integrationsContainer = document.getElementById('integrations-container');
        for (const integration of integrations? integrations : []) {
            const li = document.createElement('li');
            li.innerHTML= integration;  
            integrationsContainer.appendChild(li);
        }

        }
    }
}

// sort card by date
const sortByDate=()=>{
    document.getElementById('tools-card-container').innerHTML='';
    currentData.sort((x, y) => {
        x = new Date(x.published_in),
         y = new Date(y.published_in);
       return y - x;
    });
    displayToolsDetails(currentData);
    console.log(loadedData);
}






