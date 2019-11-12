let numPlayers;
let numHoles = 18;
let myDate = new Date();
let allCourses;
let golfCourse;

(function(){
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
                        <button>Select</button>
                    </figure>`;
            }
        }
    };
    xhttp.open('GET', "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.setRequestHeader('ContentType', 'application/json');
    xhttp.send();
}

function myCourse(golfId) {
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            golfCourse = JSON.parse(this.responseText);
            console.log(golfCourse);
            // for (let i=0; i<allCourses.courses.length; i++) {
            //     document.getElementById('golfCourses').innerHTML += 
            //         `<figure>
            //             <img src="${allCourses.courses[i].image}">
            //             <figcaption>${allCourses.courses[i].name}</figcaption>
            //             <button>Select</button>
            //         </figure>`;
            // }
        }
    };
    xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/${golfId}`, true);
    xhttp.send();
}

myCourse(18300);
// function scoreCard() {
    
//     for(let i=1; i<=9; i++) {
//        document.getElementById('rowHeading').innerHTML += `<div class="titleRow">Hole ${i}</div>`;
//     }
//     document.getElementById('rowHeading').innerHTML += `<div id='inScore'>In Score</div>`;
//     for(let i=10; i<=18; i++){
//         document.getElementById('rowHeading').innerHTML += `<div>Hole ${i}</div>`;
//     }
//     document.getElementById('rowHeading').innerHTML += `<div id='outScore'>Out Score</div>`;
//     document.getElementById('rowHeading').innerHTML += `<div id='totalScore'>Total Score</div>`;
// }