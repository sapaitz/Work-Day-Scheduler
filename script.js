$(document).ready(function() {
    
    
    function displayTime() {
        var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        $("#currentDay").html(currentTime) 
        setTimeout(displayTime, 1000);
    }
    displayTime() 
    
    var userInput = [] 

    $(".saveBtn").on("click", function() {
        var value = $(this).siblings(".description").val(); 
        var time = $(this).parent().attr("id"); 
        var dateAdded = moment().format("dddd, MMMM Do"); 
      
        userInput.push({description: value, time: time, date: dateAdded});
        
               
        localStorage.setItem("userInput", JSON.stringify(userInput));
        
    });

    var storedInput = JSON.parse(localStorage.getItem("userInput"));

    if (storedInput !== null) {
        userInput = storedInput;
    }

    
    for(var i = 0; i < userInput.length; i++) {
        var userDescription = userInput[i].description;
        $("#" + userInput[i].time).children(".description").text(userDescription);
      }

    function updateHour() {
        var currentHour = moment().hours()
        
            $(".time-block").each(function() {

            var rowHour = parseInt($(this).attr("id").split("-")[1]);

            if(currentHour > rowHour) {
                $(this).addClass("past")
            }
            else if(currentHour === rowHour) {
                $(this).removeClass("past")
                $(this).addClass("present")
                
            }
            else {
                $(this).removeClass("past")
                $(this).removeClass("present")
                $(this).addClass("future")
            }

        })
    }
    updateHour()

    var remainingSeconds = 10;

    function time() {
        setInterval(function() {
            remainingSeconds--;

            if (remainingSeconds === 0) {
                updateHour();
                remainingSeconds = 10;
            }
        }, 1000)
    }
    time()
    
})