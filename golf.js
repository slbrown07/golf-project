let numPlayers;
let numHoles = 18;
let myDate = new Date();
let allCourses;
let myCourse;
let levelDisplay = {
    pro: 'no', 
    champion: 'no', 
    men: 'yes',
    women: 'no'
};

(function(){
    document.getElementById('gameDate').innerHTML += myDate.toDateString();
    getCourses();
    
})();

function getCourses() {
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            allCourses = JSON.parse(this.responseText);
            console.log(allCourses);
            for (let i=0; i<allCourses.courses.length; i++) {
                document.getElementById('golfCourses').innerHTML += 
                    `<figure>
                        <img src="${allCourses.courses[i].image}">
                        <figcaption>${allCourses.courses[i].name}</figcaption>
                        <button onclick="buildCard(${allCourses.courses[i].id})">Select</button>
                    </figure>`;
            }
        }
    };
    xhttp.open('GET', "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.setRequestHeader('ContentType', 'application/json');
    xhttp.send();
}

function golfLevels(golfId) {
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            myLevels = JSON.parse(this.responseText);
            for (let x=0; x<4; x++) {
                let levelType = `${myLevels.data.holes[0].teeBoxes[x].teeType}`;
                let parType = `${myLevels.data.holes[0].teeBoxes[x].par}`;
                let hcpType = `${myLevels.data.holes[0].teeBoxes[x].hcp}`;
                document.getElementById(`${levelType}`).innerHTML = 
                    `<div class="${levelType}">${levelType.toUpperCase()}</div>`;
                document.getElementById('par').innerHTML = 
                    `<div class="par">PAR</div>`;
                document.getElementById('hcp').innerHTML = 
                    `<div class="hcp">HANDICAP</div>`;
                for (let i=0; i<myLevels.data.holes.length; i++) {
                    document.getElementById(`${levelType}`).innerHTML +=
                        `<div class="${levelType}">${myLevels.data.holes[i].teeBoxes[x].yards}</div>`;
                    document.getElementById('par').innerHTML +=
                        `<div class="par">${myLevels.data.holes[i].teeBoxes[x].par}</div>`;
                    document.getElementById('hcp').innerHTML +=
                        `<div class="hcp">${myLevels.data.holes[i].teeBoxes[x].hcp}</div>`;
                }
            }
        }                            
    };
    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/${golfId}`, true);
    xhttp.send();
}

function buildCard(golfId) {

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

    // Create Column Headers
    document.getElementById('colHead').innerHTML += `<div class="nameCol">Name</div>`;
    for(let i = 1; i <= 9; i++) {
        document.getElementById('colHead').innerHTML += `<div class="hole${i}">Hole ${i}</div>`;
    }
    document.getElementById('colHead').innerHTML += `<div class="inScore">In Score</div>`;
    for(let i=10; i<=18; i++){
        document.getElementById('colHead').innerHTML += `<div class="hole${i}>Hole ${i}</div>`;
    }
    document.getElementById('colHead').innerHTML += `<div class="OutScore">Out Score</div>`;
    document.getElementById('colHead').innerHTML += `<div id="totalScore">Total Score</div>`;

    // Load pro, champion, men, women par and hcp

    golfLevels(golfId);

}

function proDisplay() {
    if (levelDisplay.pro == 'no') { 
        document.getElementById('levelOptions').innerHTML = 
            `<div><i class="far fa-circle"></i> Pro</div>`;
    } else {
        document.getElementById('levelOptions').innerHTML = 
            `<div><i class="far fa-check-circle"></i> Pro</div>`;
    }
    if (levelDisplay.champion == 'no') { 
        document.getElementById('levelOptions').innerHTML += 
            `<div><i class="far fa-circle"></i> Champion</div>`;
    } else {
        document.getElementById('levelOptions').innerHTML += 
            `<div><i class="far fa-check-circle"></i> Champion</div>`;
    }
    if (levelDisplay.men == 'no') { 
        document.getElementById('levelOptions').innerHTML += 
            `<div><i class="far fa-circle"></i> Men</div>`;
    } else {
        document.getElementById('levelOptions').innerHTML += 
            `<div><i class="far fa-check-circle"></i> Men</div>`;
    }
    if (levelDisplay.women == 'no') { 
        document.getElementById('levelOptions').innerHTML += 
            `<div><i class="far fa-circle"></i> Women</div>`;
    } else {
        document.getElementById('levelOptions').innerHTML += 
            `<div><i class="far fa-check-circle"></i> Women</div>`;
    }
}


function displayLevel() {
    switch (level) {
        case 'pro':
            levelDisplay.pro = ans;
            scoreCard()
    }
}

function golfLevel(levelId) {
    
}

function addPlayer() {
    // for(let i=1; i<=9; i++) {
            //    document.getElementById('rowHeading').innerHTML += `<div class="titleRow">Hole ${i}</div>`;
            // }
            // document.getElementById('rowHeading').innerHTML += `<div id='inScore'>In Score</div>`;
            // for(let i=10; i<=18; i++){
            //     document.getElementById('rowHeading').innerHTML += `<div>Hole ${i}</div>`;
            // }
            // document.getElementById('rowHeading').innerHTML += `<div id='outScore'>Out Score</div>`;
            // document.getElementById('rowHeading').innerHTML += `<div id='totalScore'>Total Score</div>`;
        
}