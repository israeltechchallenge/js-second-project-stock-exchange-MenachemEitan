
class Marquee{
    constructor(htmlElm){
       this.container =  htmlElm;
       this.url = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index';

    }
    async load(){
        let allCompanyList =await serverReq(this.url).then(res => {return(res);})
        let container = this.container;
        let ul = document.createElement('ul')
        for (let i=0; i<allCompanyList.length; i++){
            let li = document.createElement('li');
            li.innerHTML = allCompanyList[i].symbol + " "+ "$"+allCompanyList[i].price ;
            ul.appendChild(li)
        }container.appendChild(ul) 
    }
}


async function serverReq(url) {
    const response = await fetch(url);
    return response.json();
}