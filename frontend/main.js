let btn = document.getElementById('showBtn');
btn.addEventListener('click', () => {
    let data = document.getElementById('field').value;
    let list = document.getElementById('list');
    list.innerHTML = "";
    data = data.trim();
    if(data != ""){
        data = data.split(' ');
        console.log(data);
        let url = "http://localhost:8081/getWeather";
        // var fetchOptions = {
        //     method: "POST",
        //     header: new Headers({
        //         "Content-Type": "application/json",
        //     }),
            //cross origin mode is needed as we are not using the same domain
            // mode: "cors"
        // }
        // let obj = {
        //     cities : data,
        // }
        // fetchOptions.body = JSON.stringify(obj);
        // fetch(url,fetchOptions)
        // .then((response)=>{
        //     return console.log(response.json());
        // })
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        let obj = JSON.stringify({cities : data})
        xhr.onload = function() {
            let data = JSON.parse(this.responseText);
            let result = Object.entries(data.weather);
            for(let i=0; i<result.length; i++){
                let li = document.createElement('li');
                li.textContent = "" + result[i][0] + " : " + result[i][1];
                list.prepend(li);
            }
        };
        xhr.send(obj);
    }
})