let numPlayers;
let numHoles = 18;
let myDate = new Date();
let levelDisplay = {
    pro: 'no', 
    champ: 'no', 
    men: 'yes',
    women: 'no'
};

class GolfCourse {
    constructor() {
        this.pro = [];
        this.champion = [];
        this.men = [];
        this.women = [];
        this.hcp = [];
        this.par = [];
    }
}

(function(){
    document.getElementById('gameDate').innerHTML += myDate.toDateString();
    getCourses();
    
})();

function getCourses() {
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let allCourses = JSON.parse(this.responseText);
            console.log(allCourses);
            for (let i=0; i<allCourses.courses.length; i++) {
                document.getElementById('golfCourses').innerHTML += 
                    `<figure>
                        <img src="${allCourses.courses[i].image}">
                        <figcaption>${allCourses.courses[i].name}</figcaption>
                        <button onclick="loadCourse(${allCourses.courses[i].id})">Select</button>
                    </figure>`;
            }
        }
    };
    xhttp.open('GET', "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.setRequestHeader('ContentType', 'application/json');
    xhttp.send();
}

function loadCourse(golfId) {
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {

            // load course name, address etc at the top of score card
            let courseAPI = JSON.parse(this.responseText); 
            let courseInfo = new GolfCourse(); 
            document.getElementById('courseName').innerHTML = courseAPI.data.name;
            document.getElementById('courseAddress').innerHTML = courseAPI.data.addr1;
            document.getElementById('courseCity').innerHTML = 
                `${courseAPI.data.city}, ${courseAPI.data.stateOrProvince}  ${courseAPI.data.zipCode}`;
            document.getElementById('coursePhone').innerHTML = 
                `${courseAPI.data.phone} <i class="fas fa-golf-ball"></i> ${courseAPI.data.website}`;  

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
            addRow('champ', courseInfo.champion);
            addRow('men', courseInfo.men);
            addRow('women', courseInfo.women);
            addRow('hcp', courseInfo.hcp);
            addRow('par', courseInfo.par);
        }                         
    };

    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/${golfId}`, true);
    xhttp.send();
}

function buildScoreCard(golfId) {

    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            myCourse = JSON.parse(this.responseText);

            // Selected Golf Course information at Top of Score Card

            document.getElementById('courseName').innerHTML = myCourse.data.name;
            document.getElementById('courseAddress').innerHTML = myCourse.data.addr1;
            document.getElementById('courseCity').innerHTML = 
                `${myCourse.data.city}, ${myCourse.data.stateOrProvince}  ${myCourse.data.zipCode}`;
            document.getElementById('coursePhone').innerHTML = 
                `${myCourse.data.phone} <i class="fas fa-golf-ball"></i> ${myCourse.data.website}`;
        }
    };
    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/${golfId}`, true);
    xhttp.send();
}

function addRow(name, array) {
    document.getElementById(`${name}Row`).innerHTML = `<div class="name">${name.toUpperCase()}</div>`;
    for (let i=0; i<9; i++) {
        document.getElementById(`${name}Row`).innerHTML += `<div class="hole${i}">${array[i]}</div>` 
    }
    document.getElementById(`${name}Row`).innerHTML += `<div class="outScore"></div>`     
    for (let i=9; i<18; i++) {
        document.getElementById(`${name}Row`).innerHTML += `<div class="hole${i}">${array[i]}</div>` 
    }
    document.getElementById(`${name}Row`).innerHTML += `<div class="inScore"></div>`  
    document.getElementById(`${name}Row`).innerHTML += `<div class="totalScore"></div>`  
}