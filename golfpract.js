let myCourses;

(function(){
    getCourses();
})();
function getCourses() {
    let xhttp = new XMLHttpRequest(); // new ajax request
    xhttp.onreadystatechange = function() {
        if(this.readState == 4 && this.status == 200) {
            // document.getElementById("practice").innerHTML = this.responseText;
            myCourses = JSON.parse(this.responseText);
            console.log(myCourses);
            for(let i=0;i<myCourses.categories.length; i++){
                $("practice").append(`<div>
                <img width="100" scr="${mycourses[i].courseimages}">
                ${mycourses.categories[i].name}
                <button onclick="getclass(${mycourses.categories[i].catid}")>Select</button>
                </div>`);
            }
        }
    };
    xhttp.open('GET', "classapis/classcategories.txt", true);
    xhttp.send();
}