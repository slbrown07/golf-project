

class GolfCourse {
    constructor() {
        this.name = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
        this.phone = '';
        this.website = '';
        this.pro = [];
        this.champion = [];
        this.men = [];
        this.women = [];
        this.hcp = [];
        this.par = [];
    } 
}

let courseInfo = new GolfCourse();

function loadCourse(golfId) {
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let courseAPI = JSON.parse(this.responseText);
            // let courseInfo = new GolfCourse(); 
            // load golf course address, phone and website
            courseInfo.name = courseAPI.data.name;
            courseInfo.street = courseAPI.data.addr1;
            courseInfo.city = courseAPI.data.city;
            courseInfo.state = courseAPI.data.stateOrProvince;
            courseInfo.zip = courseAPI.data.zipCode;
            courseInfo.phone = courseAPI.data.phone;
            courseInfo.website = courseAPI.data.website;          
            // load course information into GolfCourse class
            for (let i=0; i < courseAPI.data.holes.length; i++) {
                let num = courseAPI.data.holes[i].teeBoxes[0].yards;
                courseInfo.pro.push(num);
            } 
            for (let i=0; i < courseAPI.data.holes.length; i++) {
                let num = courseAPI.data.holes[i].teeBoxes[1].yards;
                courseInfo.champion.push(num);
            } 
            for (let i=0; i < courseAPI.data.holes.length; i++) {
                let num = courseAPI.data.holes[i].teeBoxes[2].yards;
                courseInfo.men.push(num);
            } 
            for (let i=0; i < courseAPI.data.holes.length; i++) {
                let num = courseAPI.data.holes[i].teeBoxes[3].yards;
                courseInfo.women.push(num);
            } 
            for (let i=0; i < courseAPI.data.holes.length; i++) {
                let num = courseAPI.data.holes[i].teeBoxes[0].par;
                courseInfo.par.push(num);
            } 
            for (let i=0; i < courseAPI.data.holes.length; i++) {
                let num = courseAPI.data.holes[i].teeBoxes[0].hcp;
                courseInfo.hcp.push(num);
            }  
            addRow('pro', courseInfo.pro);    
        }                         
    };

    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/${golfId}`, true);
    xhttp.send();
}

loadCourse(18300);

function addRow(name, array) {
    for (let i=0; i<9; i++) {
        document.getElementById(`${name}Row`).innerHTML +=
            `<div class="hole${i}">${array[i]}</div>` 
    }
    

}

