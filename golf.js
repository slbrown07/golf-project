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
                        <button onclick="golfLevels(${allCourses.courses[i].id}, 0)">Select</button>
                    </figure>`;
            }
        }
    };
    xhttp.open('GET', "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.setRequestHeader('ContentType', 'application/json');
    xhttp.send();
}

function golfLevels(golfId, levelId) {
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            myLevels = JSON.parse(this.responseText);
            let levelType = `${myLevels.data.holes[0].teeBoxes[levelId].teeType}`;
            document.getElementById('proLevel').innerHTML = 
                `<div class="${levelType}">${levelType}</div>`;
            for (let i=0; i<myLevels.data.holes.length; i++) {
                document.getElementById('proLevel').innerHTML +=
                    `<div class="pro">${myLevels.data.holes[i].teeBoxes[levelId].yards}</div>`;
            }
        }                            
    };
    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/${golfId}`, true);
    xhttp.send();
}

function scoreCard(golfId) {

    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            myCourse = JSON.parse(this.responseText);

            // header information for score card

            document.getElementById('courseName').innerHTML = myCourse.data.name;
            document.getElementById('courseAddress').innerHTML = myCourse.data.addr1;
            document.getElementById('courseCity').innerHTML = 
                `${myCourse.data.city}, ${myCourse.data.stateOrProvince}  ${myCourse.data.zipCode}`;
            document.getElementById('coursePhone').innerHTML = 
                `${myCourse.data.phone} <i class="fas fa-golf-ball"></i> ${myCourse.data.website}`;
            
            // option to select pro, champion etc
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
                               
    };
    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/${golfId}`, true);
    xhttp.send();

    // create header row
    document.getElementById('rowHeaders').innerHTML += `<div id='inScore'>Name</div>`;
    for(let i = 1; i <= 9; i++) {
        document.getElementById('rowHeaders').innerHTML += `<div class="titleRow">Hole ${i}</div>`;
    }
    document.getElementById('rowHeaders').innerHTML += `<div id='inScore'>In Score</div>`;
    for(let i=10; i<=18; i++){
        document.getElementById('rowHeaders').innerHTML += `<div>Hole ${i}</div>`;
    }
    document.getElementById('rowHeaders').innerHTML += `<div id='outScore'>Out Score</div>`;
    document.getElementById('rowHeaders').innerHTML += `<div id='totalScore'>Total Score</div>`;


}

function proDisplay() {
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            myCourse = JSON.parse(this.responseText);
            console.log(myCourse);
        }
    };
    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/18300`, true);
    xhttp.send();
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