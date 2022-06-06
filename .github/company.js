let url = window.location.search;
let queries = new URLSearchParams(url);
let simbol = queries.get("symbol");
let searchUrl = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/'+simbol
let historyUrl ='https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/'+simbol+'?serietype=line'
fetchUrl(searchUrl,presentCompanyInformation)
fetchUrl(historyUrl, presentCompanyHistroy)



function presentCompanyInformation(data){
    let companyProfile = document.createElement('div');
    let logoAndName =  document.createElement('div');
    let img = document.createElement('img');
    let description = document.createElement('div');
    let companyName = document.createElement('div');
    companyProfile.setAttribute('class', 'container')
    logoAndName.setAttribute('class', 'container row')
    img.setAttribute('src', data.profile.image);
    img.setAttribute('class', 'col-2 img');
    companyName.setAttribute('id','companyName' )
    companyName.setAttribute('class', 'col-9');
    description.setAttribute('id', 'description')
    description.innerHTML = data.profile.description;
    companyName.innerHTML =data.profile.companyName;
    logoAndName.appendChild(img);
    logoAndName.appendChild(companyName);
    companyProfile.appendChild(logoAndName)
    presentStockPrice(data, companyProfile);
    companyProfile.appendChild(description);
    let header = document.getElementById('header');
    header.appendChild(companyProfile);
}
function presentStockPrice(data, htmlElement){
    let container = document.createElement('div')
    let price = data.profile.price;
    let changes = data.profile.changes;
    let priceElement = document.createElement('p');
    let changesElement =  document.createElement('p');
    container.setAttribute('class', 'row')
    changesElement.setAttribute('class', 'changes col');
    priceElement.setAttribute('class', 'price col-2')
    priceElement. innerText = 'Stock price: $'+ price;
    if (changes>0){
        changesElement.innerText = "(+"+changes+"%)"
        changesElement.style.color = "green"
    }else changesElement.innerText = "("+changes+"%)"
    container.appendChild(priceElement);
    container.appendChild(changesElement)
    htmlElement.appendChild(container)

}

function  presentCompanyHistroy(history){
    const labels = [];
    const price = [];
    const ctx = document.getElementById('myChart').getContext('2d');
    for (let i=0; i<history.historical.length; i++){
        let date = parseInt(history.historical[i].date);
        if (i === 0){
            labels.push(date);
        }else if (date<labels[labels.length-1]){
            labels.push(date);
            price.push(history.historical[i].close);
        
        }
    }
    let gradient = ctx.createLinearGradient(0,0,0,400);
    gradient.addColorStop(0,'rgba(58,123,213,1)');
    gradient.addColorStop(1,'rgba(0,210,255,0.3)')
    const data = {
        labels,
        datasets: [{
            data:price,
            label : "Stock Price History",
            fill: true,
            backgroundColor: gradient,
            borderColor:'#000',
            pointBackgroundColor:'#rgb(189,195,199)',
        },
    ],
    }
    const config = {
        type :'line',
        data: data, 
        Option:{
            responsive:true,
 
        },
    };
    const myChart = new Chart(ctx, config);
    document.getElementById('preloader').style.visibility = 'hidden'

}

function fetchUrl(url, cb){
    fetch(url)
        .then(response => response.json())
        .then(data =>{cb(data) })
}