class Form{
    constructor(htmlElm){
        this.container = htmlElm;
        this.whatToSearch = document.querySelector("#whichCompany");

    }
    createForm(){
        let whichCompany = document.createElement('input');
        whichCompany.setAttribute("type", "text");
        whichCompany.setAttribute("class", "col-9");
        whichCompany.setAttribute("id", "whichCompany");
        this.whatToSearch = document.querySelector("#whichCompany");
        this.container.appendChild(whichCompany);
    }
    createButton(cb){
       let button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.addEventListener('click',()=>{
            this.searchCompany(this, cb)
        })
        button.textContent = "Serch"
        button.setAttribute('class', 'col-3');
        button.setAttribute('id', 'serchCompani');
        this.container.appendChild(button)
    } 
    searchCompany(_self, cb){
        _self.whatToSearch = document.querySelector("#whichCompany").value;
        document.getElementById('preloader').style.visibility = 'visible';
        let serverUrl = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=' + this.whatToSearch + '&amp;limit=10&amp;exchange=NASDAQ'
        serverReq(serverUrl).then(res => {
            cb(res)
        }); 
    }

    onSearch(cb){
        this.createButton(cb);
        
    }
   async loadListOfCompanies(list) {
        const companiList = document.createElement('div');
        for (let i = 0; i < list.length; i++) {
            if (i >= 10) { break }
            let comapni = document.createElement('a');
            const extraInfo = await this.getMorInfo(list[i].symbol);
            let row = "("+ list[i].symbol+")" + ", " + list[i].name;
            let url = "company.html?symbol=" + list[i].symbol;
            comapni.innerHTML = row;
            if (extraInfo[0]!=0){
                let copanyImg = document.createElement('img');
                copanyImg.style.height='50px';
                copanyImg.style.width='75px';
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
    load(){
        this.createForm();
        
    }

    async  serverReq(url) {
        const response = await fetch(url);
        return response.json();
    }
    async  getMorInfo(symbol) {
        let url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/' + symbol;
        const res = await this.serverReq(url);
        return  this.returnExtraData(res)
    
    }
     returnExtraData(data) {
        let extraDataList = []
        try {
            extraDataList.push(data.profile.image)
        }catch{extraDataList.push(0)}
        try {
            extraDataList.push(data.profile.changes)
        }catch{extraDataList.push(0)}
        
        return extraDataList;
    }
    
}


