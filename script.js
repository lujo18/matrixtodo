const ui = document.querySelector("#ui");
const nui = document.querySelector("#nui");
const uni = document.querySelector("#uni");
const nuni = document.querySelector("#nuni");

const taskBoxes = document.querySelectorAll(".list-box");

const taskInput = document.querySelector("#task-input");
const taskButton = document.querySelector("#task-add");


let itemLocations = {
    ui : {
        tasks: []
    },
    nui : {
        tasks: []
    },
    uni : {
        tasks: []
    },
    nuni : {
        tasks: []
    }
}

console.log(itemLocations.ui["tasks"])

function populateStorage() {
    sessionStorage.setItem("currentTasks", JSON.stringify(itemLocations));
}

function setTasks () {

    itemLocations = JSON.parse(sessionStorage.getItem("currentTasks"));
    
    taskBoxes.forEach(function(e) {
        let taskCont = e.querySelector(".task-cont")
        taskCont.innerHTML = ""
        
    })

    Object.keys(itemLocations).forEach(function(key){
        
        taskBoxes.forEach(function (box) {
            itemLocations[key].tasks.forEach(function(item) {
                let wrapper = document.createElement("div")
                wrapper.classList.add("task-wrapper")
                wrapper.innerHTML = item;
                let taskCont = box.querySelector(".task-cont")
                if(box.id == key) {
                    taskCont.appendChild(wrapper);
                    const index = itemLocations[key].tasks.length - 1

                    wrapper.querySelector(".delete-task-cont").onclick = function() {
                        
                        itemLocations[key].tasks.splice(index, 1);
                        populateStorage();
                        setTasks()
                
                    }

                    const checkbox = wrapper.querySelector("input[type='checkbox']");
                    
                    checkbox.addEventListener("click", function() {
                        if (checkbox.value == 0) {
                            checkbox.value = 1
                        } else if (checkbox.value == 1) {
                            checkbox.value = 0
                        }
                        

                        let element = checkbox.closest(".task-wrapper").outerHTML

                        itemLocations[key].tasks[index] = element;

                        
                        setTimeout(() => {
                            populateStorage();
                            setTasks();
                        }, 500);
                        
                    })
                }
            })  
        })
        
    })
    
}


function createTask () {

    const newDiv = document.createElement("div");
    
    newDiv.classList.add("todo-item");
    setTimeout(function() {
        newDiv.style.opacity = 1;
    }, 100)


    const taskName = document.createElement("h2");
    newDiv.appendChild(taskName);
    taskName.innerText = task;

    const actionCont = document.createElement("div");
    newDiv.appendChild(actionCont)


    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.value = 0;
    taskCheck.classList.add("checkmark");
    actionCont.appendChild(taskCheck)

    const deleteTaskCont = document.createElement("div");
    deleteTaskCont.classList.add("delete-task-cont");


    const deleteTask = document.createElement("div");
    deleteTask.classList.add("delete-task");
    deleteTaskCont.appendChild(deleteTask);
    actionCont.appendChild(deleteTaskCont);
    

    itemLocations[chosenBox.id].tasks.push(newDiv.outerHTML);
    populateStorage();
    console.log(itemLocations)
    setTasks()
    //chosenBox.appendChild(newDiv);


    
}

let allBoxes = []
taskBoxes.forEach(function (e) {
    allBoxes.push(e)
})

let chosenBox;
function chooseBox () {
    taskBoxes.forEach(function(box) {
        box.classList.add("highlight");
        box.addEventListener("click", function createBox() {
            chosenBox = box

            task = taskInput.value;
            if (task) {
                taskInput.value = "";
                createTask();
            }
            

            taskBoxes.forEach(function(e) {
                console.log(e)
                e.removeEventListener("click", createBox);
                e.classList.remove("highlight");
            })
        });
            
        
    
    })

    
}

let task;
taskButton.addEventListener("click", async function () {
    chooseBox();
})



const welcomePage = document.querySelector("#welcome-screen");

function enterApp() {
    welcomePage.classList.add("hide")
}


console.log(sessionStorage.getItem("currentTasks"))
if (!(sessionStorage.getItem("currentTasks"))) {
    populateStorage()
} else {
    welcomePage.classList.add("hide");
    console.log("Already have a session storage")
}
setTasks()