const loadToolsData = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayToolsDetails(data.data);
}

const displayToolsDetails=(data)=>{
    // console.log(data.tools);
    const toolsCard = document.getElementById('tools-card-container');
    data.tools.forEach(singleTool => {
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
                        <h6>${new Date()}</h6>
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
}


const loadToolDetails=async(id)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetailsInModel(data.data);
}
const displayDetailsInModel=(singledetails)=>{
    console.log(singledetails);
    
    const {description, image_link}=singledetails;
    
    const toolDetails=document.getElementById('tool-details');
    toolDetails.innerHTML = `
    <div class="col">
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">${description}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
        <img src="${image_link[0]}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        </div>
    </div>
    `
}