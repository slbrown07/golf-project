let myDate = new Date();

class GolfCourse {
    constructor() {
        this.pro = [];
        this.champion = [];
        this.men = [];
        this.women = [];
        this.hcp = [];
        this.par = [];
    }

    addHeadings() {
        document.getElementById(`nameRow`).innerHTML = `<div id="headCol">Name</div>`;
        for (let i=0; i<9; i++) {
            document.getElementById(`nameRow`).innerHTML += `<div id="hole${i+1}Col">Hole ${i+1}</div>`; 
        }
        document.getElementById(`nameRow`).innerHTML += `<div id="outCol">Out Total</div>`;     
        for (let i=9; i<18; i++) {
            document.getElementById(`nameRow`).innerHTML += `<div id="hole${i+1}Col">Hole ${i+1}</div>`; 
        }
        document.getElementById(`nameRow`).innerHTML += `<div id="inCol">In Total</div>`;  
        document.getElementById(`nameRow`).innerHTML += `<div id="totalCol">Total</div>`;  
    }
}

class GolfPlayer {
    constructor(name) {
        this.player = '';
        this.score = [];
        this.inScore = 0;
        this.outScore = 0;
        this.totalScore = 0;
    }

    addScore(score) {
        this.score.push(score);
        this.totalScore += score;
        if (this.score.length < 9) {
            this.inScore += score;
        } else {
            this.outScore += score;
        }
    }

    addPlayer(name) {
        this.player = name;
    }
}

(function(){
    document.getElementById('gameDate').innerHTML += myDate.toDateString();
    getCourses();
    
})();

function addRow(name, array) {
    let inTotal = 0;
    let outTotal = 0;
    let grandTotal = 0;
    document.getElementById(`${name}Row`).innerHTML = `<div id="headCol">${name.toUpperCase()}</div>`;
    for (let i=0; i<9 && i<array.length; i++) {
        document.getElementById(`${name}Row`).innerHTML += `<div id="holeCol">${array[i]}</div>`;
        outTotal += array[i]; 
        grandTotal += array[i];
    }
    document.getElementById(`${name}Row`).innerHTML += `<div id="outCol">${outTotal}</div>`;     
    for (let i=9; i<18 && i<array.length; i++) {
        document.getElementById(`${name}Row`).innerHTML += `<div id="holeCol">${array[i]}</div>`; 
        inTotal += array[i];
        grandTotal += array[i];
    }
    document.getElementById(`${name}Row`).innerHTML += `<div id="inCol">${inTotal}</div>`;  
    document.getElementById(`${name}Row`).innerHTML += `<div id="totalCol">${grandTotal}</div>`;  
}

function getCourses() {
    document.getElementById('scoreCard').style.display = 'none';
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let allCourses = JSON.parse(this.responseText);
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
    document.getElementById('scoreCard').style.display = 'block';
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // load course name, address etc at the top of score card
            let courseAPI = JSON.parse(this.responseText); 
            let courseInfo = new GolfCourse(); 
            document.getElementById('courseName').innerHTML = 
                courseAPI.data.name;
            document.getElementById('courseAddress').innerHTML = 
                courseAPI.data.addr1;
            document.getElementById('courseCity').innerHTML = 
                `${courseAPI.data.city}, ${courseAPI.data.stateOrProvince}  ${courseAPI.data.zipCode}`;
            document.getElementById('coursePhone').innerHTML = 
                courseAPI.data.phone;
            document.getElementById('coursePhone').innerHTML =
                courseAPI.data.website;       
            // load course information into GolfCourse class
            for (let i=0; i < courseAPI.data.holes.length; i++) {
                //info for Pro Golfer
                courseInfo.pro.push(courseAPI.data.holes[i].teeBoxes[0].yards); 
                //info for champion golfer
                courseInfo.champion.push(courseAPI.data.holes[i].teeBoxes[1].yards); 
                // info for men golfer
                courseInfo.men.push(courseAPI.data.holes[i].teeBoxes[2].yards);
                // infor for women golfer
                courseInfo.women.push(courseAPI.data.holes[i].teeBoxes[3].yards);
                // info for par
                courseInfo.par.push(courseAPI.data.holes[i].teeBoxes[0].par);
                // infor for hcp
                courseInfo.hcp.push(courseAPI.data.holes[i].teeBoxes[0].hcp);
            }
            courseInfo.addHeadings();
            addRow('pro', courseInfo.pro);
            addRow('champion', courseInfo.champion);
            addRow('men', courseInfo.men);
            addRow('women', courseInfo.women);
            addRow('hcp', courseInfo.hcp);
            addRow('par', courseInfo.par);
        }
    };

    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/${golfId}`, true);
    xhttp.send();
}

function toggle(el) {
    if (document.getElementById(el).style.display == 'none') {
        document.getElementById(el).style.display = '';
    } else {
        document.getElementById(el).style.display = 'none';
    }
}
