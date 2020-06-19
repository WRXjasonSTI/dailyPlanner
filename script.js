$(document).ready(function () {

var currentDate = moment().format("Do[ of] MMMM[,] YYYY");
var currentDay = moment().format('[Today is a ]dddd');
var currentTime = moment().format('[It is] hh:mm a');
var currentHour = moment().format('h a');
var idkMan = moment().format('L');


console.log(moment());
console.log(currentDate);
console.log(currentDay);
console.log(currentTime);
console.log(currentHour);
console.log(idkMan);


$(date).text(currentDate);
$(day).text(currentDay);
$(time).text(currentTime);

// moment object
var m = moment.parseZone()
var today = moment.parseZone()
// array to set hours
var workHours = [m.startOf('day').add(9, 'hours').format("hh:mm a"),m.startOf('day').add(10, 'hours').format("hh:mm a"),m.startOf('day').add(11, 'hours').format("hh:mm a"),m.startOf('day').add(12, 'hours').format("hh:mm a"),m.startOf('day').add(13, 'hours').format("hh:mm a"),m.startOf('day').add(14, 'hours').format("hh:mm a"),m.startOf('day').add(15, 'hours').format("hh:mm a"),m.startOf('day').add(16, 'hours').format("hh:mm a"),m.startOf('day').add(17, 'hours').format("hh:mm a"),m.startOf('day').add(18, 'hours').format("hh:mm a")]
var workHoursHH = [m.startOf("day").add(9,"hours").format("HH"),m.startOf("day").add(10,"hours").format("HH"),m.startOf("day").add(11,"hours").format("HH"),m.startOf("day").add(12,"hours").format("HH"),m.startOf("day").add(13,"hours").format("HH"),m.startOf("day").add(14,"hours").format("HH"),m.startOf("day").add(15,"hours").format("HH"),m.startOf("day").add(16,"hours").format("HH"),m.startOf("day").add(17,"hours").format("HH"),m.startOf("day").add(18,"hours").format("HH")]

// link html 
var taskList = $("#taskDiv")

// array for tasks
var tasks = {
    timeBlks : [" "," "," "," "," "," "," "," "," "],
}

// initialize check for existing tasks then check for existing entires
function init() {
    // recalling local storage
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
        
    // setting local storage
    if (storedTasks !== null) {
        tasks = storedTasks;
    } else{
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    renderWorkHours()
}

init();

function renderWorkHours() {
    // effective initialize with clearing
    taskList.empty()
        // loop through work hours, also creating Bootstrap based sections
        for (i = 0; i < workHours.length-1; i++) {
        var newDiv = $("<div>")
        newDiv.addClass("row time-block shadow p-3 mb-5 bg-white rounded")

        var label = $("<label>")
        label.addClass("description col-2")
        label.text(workHours[i] + " - " + workHours[i+1])

        var textArea = $("<textarea>")
        textArea.attr("id", "txt"+i)

        var thisTask = tasks.timeBlks[i]
        // Conditional for past-due tasks
        if ((workHoursHH[i] < today.format("HH"))) {
            textArea.addClass("bg-secondary col-9")
        }
        // if current text-block value is greater than today add future class to the textarea
        else if ((workHoursHH[i] > today.format("HH"))) {
            textArea.addClass("bg-light")
            textArea.text(thisTask)
        }
        // if the the current text-block value is between the current time add the present class to the textarea
        else if (workHoursHH[0] = today.format("HH")) {
            textArea.addClass("bg-success")
            textArea.text(thisTask)
        }
        
        // Save button creation with class
        var saveButton = $("<button>");
        saveButton.addClass("btn btn-primary col-1");
        saveButton.text("Save");
        saveButton.attr("data-value", i)
        saveButton.attr("type", "submit");
        // append the created elements to the new div
        label.appendTo(newDiv);
        textArea.appendTo(newDiv);
        saveButton.appendTo(newDiv);
        // append the div to the taskList
        newDiv.appendTo(taskList)
        }
}
    
    function storeTask() {
        // formatting
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }   


 $(".time-block").submit(function (e) { 
     e.preventDefault();     
 });

    // Save button functionality using THIS to indicate specific time block saves
    $(".saveBtn").click(function (e) { 
        e.preventDefault();
        var timeBlock  = $(this).attr("data-value");
        var areaVal = $("#txt"+timeBlock).val().trim()
        tasks.timeBlks.splice((timeBlock),1,(areaVal))
        storeTask();
        document.reload();
    });

    // Clear All button functionality
    $("#clearAll").click(function (e) { 
        e.preventDefault();
        localStorage.clear();
        document.reload();
    });

});