var whatToSearch = document.querySelector("#whichCompany");
// let symbols = serverReq('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/financial-statement-symbol-lists')



async function searchCompany(){
    let serverUrl ='https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query='+whatToSearch.value+'&amp;limit=10&amp;exchange=NASDAQ'
    let comapniList=serverReq(serverUrl);

}
function loadListOfCompanies(list){

    const companiList = document.createElement('div');
    for (let i=0; i<list.length; i++){
        if (i>=10){break}
        let comapni = document.createElement('a')
        let row = list[i].symbol+", "+list[i].name;
        let url = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company.html?symbol="+list[i].symbol;
        comapni.innerHTML = row
        comapni.setAttribute('id', 'comapni')
        comapni.setAttribute('class', 'row')
        comapni.addEventListener("click",()=>{document.getElementById('preloader').style.visibility ='visible'})
        comapni.setAttribute('href', url)
        comapni.setAttribute('target', '_self')
        companiList.appendChild(comapni)
    }
    const container = document.getElementById('companiList');
    document.getElementById('preloader').style.visibility = 'hidden';
    container.appendChild(companiList);
}

function serverReq(url){
    document.getElementById('preloader').style.visibility = 'visible';
    fetch(url)
    .then(response => response.json())
    .then(data =>{loadListOfCompanies(data) })
}