const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');
const input = document.querySelector('input');
const button = document.querySelector('button');
let queryData;

button.addEventListener('click', async() => {
    const response = await fetch(input.value)
    const data = await response.json();
    
    Object.getOwnPropertyNames(data).forEach(item => {
        if(item === 'results') {
            queryData = data.results.data;
        }
        if(item === 'facets'){
            queryData = data.facets[0].values;
        }
    });
    
    let text = `<tr>`;
    for(const header in queryData[0]) {
        if(typeof queryData[0][header] === 'object') {
            for (const headerTable in queryData[0][header]) {
                text += `<th>${headerTable.toUpperCase()}</th>`;
            }
        }else{
            text += `<th>${header.toUpperCase()}</th>`;
        }
    }
    let bodyText = `<tr>`;

    queryData.forEach(item => {  
        Object.values(item).map(elem => {
           // console.log(typeof elem);
            if(typeof elem === 'object') {
                for(const gsgsg in elem) {
                    bodyText += `<td>${elem[gsgsg]}</td>`;  
                }
            }else{
                bodyText += `<td>${elem}</td>`; 
            }   
        }); 
        bodyText += `</tr>`;   
    })   
    text += `</tr>`;
    thead.innerHTML = text;
    tbody.innerHTML = bodyText;
});


    
