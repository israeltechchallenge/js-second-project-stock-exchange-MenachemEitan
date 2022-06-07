var whatToSearch = document.querySelector("#whichCompany");
let extraData = []
// let symbols = serverReq('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/financial-statement-symbol-lists')



function searchCompany() {
    let serverUrl = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=' + whatToSearch.value + '&amp;limit=10&amp;exchange=NASDAQ'
    serverReq(serverUrl).then(async res => {
        await loadListOfCompanies(res)
    })
        ;
}

async function loadListOfCompanies(list) {
    const companiList = document.createElement('div');
    for (let i = 0; i < list.length; i++) {
        if (i >= 10) { break }
        let comapni = document.createElement('a');
        const extraInfo = await getMorInfo(list[i].symbol);
        // console.log(extraInfo);
        let row = "("+ list[i].symbol+")" + ", " + list[i].name;
        let url = "company.html?symbol=" + list[i].symbol;
        comapni.innerHTML = row;
        if (extraInfo[0]!=0){
            let copanyImg = document.createElement('img');
            copanyImg.style.height='50px';
            copanyImg.style.width='50px';
            copanyImg.setAttribute('src',extraInfo[0]);
            comapni.appendChild(copanyImg)
        }
        if (extraInfo[1]!=0){
            let chang = document.createElement('p');
            chang.innerText ="%"+ extraInfo[1];
            comapni.appendChild(chang)
        }
        comapni.setAttribute('id', 'comapni');
        comapni.setAttribute('class', 'row');
        comapni.addEventListener("click", () => { document.getElementById('preloader').style.visibility = 'visible' });
        comapni.setAttribute('href', url);
        comapni.setAttribute('target', '_self');
        companiList.appendChild(comapni);
    }
    const container = document.getElementById('companiList');
    document.getElementById('preloader').style.visibility = 'hidden';
    container.appendChild(companiList);
}

async function serverReq(url) {
    document.getElementById('preloader').style.visibility = 'visible';
    const response = await fetch(url);
    return response.json();
}

async function getMorInfo(symbol) {
    let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/' + symbol;
    const res = await serverReq(url);
    return  returnExtraData(res)

}
function returnExtraData(data) {
    let extraDataList = []
    try {
        extraDataList.push(data.profile.image)
    }catch{extraDataList.push(0)}
    try {
        extraDataList.push(data.profile.changes)
    }catch{extraDataList.push(0)}
    
    

    return extraDataList;
}