var json = {
    "region":{
        "warmińsko-mazurskie":{
            "Olsztyn": ["Mercury1", "Mercury2"],
            "Szczytno":["Abc", "Abc1"]
        },
        "małopolskie":{
            "Kraków": ["Krakowianin", "Krakowianin2"],
            "Tarnów": ["Tarnowianin", "Tarnowianin2"]
        },
        "lubelskie":{
            "Lublin": ["Lublinianin1", "Lublinianin2"],
            "Puławy": ["Puławiak1", "Puławiak2"]
        }
    }
};

var selectRegion = document.getElementById("region");

var regionsArr = Object.keys(json.region);

var optionRegion;
var optionTown;
var optionHotel;

// add options to element selectRegion 
for(var i = 0; i < regionsArr.length; i++) {
    optionRegion = document.createElement('option');
    optionRegion.text = regionsArr[i];
    optionRegion.value = regionsArr[i];
    selectRegion.add(optionRegion);
}

// disable town selection until region is not selected
document.getElementById('town').disabled = true;
// disable hotel selection until town is not selected
document.getElementById('hotel').disabled = true;

selectRegion.addEventListener('change', function(){
    if (selectRegion.value !== '') {
        var selectTown = document.getElementById('town');
        // clear town options
        selectTown.innerHTML = '';
        // set default option
        optionTown = document.createElement('option');
        optionTown.text = "Wybierz miasto";
        optionTown.value = '';
        selectTown.add(optionTown);
        
        // add town options associated with region
        var towns = json.region[selectRegion.value];
        var townsArr = Object.keys(towns);        
        for (i = 0; i < townsArr.length; i++) {
            optionTown = document.createElement('option');
            optionTown.text = townsArr[i];
            optionTown.value = townsArr[i];
            selectTown.add(optionTown);
        }
        
        // enable town selection
        document.getElementById('town').disabled = false;        
        
        selectTown.addEventListener('change', function() {
            var regionName = selectRegion.value;
            var townName = selectTown.value;
//            console.log(regionName, townName);
            if (regionName !== '' && townName !== '') {
                // get selected town
                var hotels = getHotels(regionName, townName);
                var selectHotel = document.getElementById('hotel');
                // clear hotel options
                selectHotel.innerHTML = '';
                // set default option
                optionHotel = document.createElement('option');
                optionHotel.text = "Wybierz hotel";
                optionHotel.value = '';
                selectHotel.add(optionHotel);
                for (i = 0; i < hotels.length; i++) {
                    optionHotel = document.createElement('option');
                    optionHotel.text = hotels[i];
                    optionHotel.value = hotels[i];
                    selectHotel.add(optionHotel);
                }
                selectHotel.addEventListener('change', function() {
                   var hotelName = selectHotel.value;
                   console.log(regionName, townName, hotelName);
                   var hotelChoice = document.getElementById('hotelChoice');
                   hotelChoice.innerHTML = 
                        '<p>Wybrałeś hotel: <span>' 
                        + hotelName + ' ' + townName + ' ' + regionName + '</span></p>';
                }); 
            } else {
                // disable hotel selection
                document.getElementById('hotel-choice').disabled = true;
            }
        });
        
        
    } else {
        // disable town selection
        document.getElementById('town').disabled = true;
    }
//    console.log(selectRegion.value);
});

//var selectHotel= document.getElementById('hotel');
//selectHotel.disabled = true;
//
//selectHotel.addEventListener('change', function() {
//    
//});

function getHotels(regionName, townName){
    if (townName !=='') {
        // enable hotel selection
        document.getElementById('hotel').disabled = false;        
//        console.log(json.region[regionName][townName]);
        return json.region[regionName][townName];
    } else {
        // disable hotel selection
        document.getElementById('hotel').disabled = true;
    }
}


