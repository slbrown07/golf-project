let rowDisplay = {
    pro: 'no',
    champion: 'no',
    men: 'yes',
    women: 'no',
    hcp: 'yes'
}


function displayOptions(level) {

    console.log(rowDisplay[level]);
}

displayOptions('pro');