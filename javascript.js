let input = document.getElementById("textarea");
let taskCon = document.getElementById("task-container");
let check = document.getElementById("check")
let id = localStorage.getItem("id") || 1;

let data = readtodo();
data.forEach((todo) => {
    create_div(todo)
})
input.addEventListener("keyup", function (event) {

    var x = event.key;
    if (x === 'Enter') {
        let valuex = input.value;
        if (valuex.trim().length === 0) {
            alert("enter a text please");
        }
        else {
            var checkx = false;
            let obj = {
                id: id,
                value: valuex,
                check: checkx
            }
            create_div(obj);
            storeinlocalstrage(obj);
            id++;
            input.value = "";
        }
    }
}
);

function storeinlocalstrage(value) {
    let olddata = localStorage.getItem("todo");
    if (olddata) {
        olddata = JSON.parse(olddata);
        olddata.push(value);
    } else {
        olddata = [value];
    }
    localStorage.setItem("todo", JSON.stringify(olddata));
}

function readtodo() {
    let datastring = localStorage.getItem("todo");
    if (!datastring) {
        return [];
    } else {
        return JSON.parse(datastring);
    }
}

function create_div(obj) {
    var task = document.createElement("div")
    var task1 = document.createElement("div")
    var task2 = document.createElement("div")
    let p = document.createElement("p");
    let check = document.createElement("input");
    let span = document.createElement("span");
    let hr = document.createElement("hr");
    let button = document.createElement("button");
    button.className = "btn btn-info";
    button.innerText = "Edit";
    span.innerText = "X";
    span.style.fontWeight = "bold";

    button.addEventListener("click", function () {
        input.innerText = obj.value;
        console.log(obj);
        edit(obj);
    })
    p.innerText = obj.value;
    span.addEventListener("click", function () {
        taskCon.removeChild(task);
        taskCon.removeChild(hr);
        console.log(obj);
        removethis(obj);

    })

    check.addEventListener("click", function () {
        if (obj.check == false) {
            p.style.textDecoration = "line-through";
            obj.check = true;
        }
        else {
            p.style.textDecoration = "none";
            obj.check = false;
        }
        console.log(obj);
        updatecheck(obj);
    })
    check.type = "checkbox";
    if (obj.check) {
        p.style.textDecoration = "line-through";
        check.checked = "true";
    } else
        p.style.textDecoration = "none";

    check.style.margin = "0px 10px";
    span.style.marginRight = "20px";
    task.className = "d-flex justify-content-between";
    task1.appendChild(p);
    task2.appendChild(button);
    task2.appendChild(check);
    task2.appendChild(span);
    task.appendChild(task1);
    task.appendChild(task2);
    taskCon.appendChild(task);
    taskCon.appendChild(hr);
}

function removethis(task) {
    var olddata = readtodo();
    for (var i = 0; i < olddata.length; i++) {
        if (olddata[i].value === task.value) {
            olddata.splice(i, 1);
        }
    }
    localStorage.setItem("todo", JSON.stringify(olddata));
}

function updatecheck(task) {
    var olddata = readtodo();
    for (var i = 0; i < olddata.length; i++) {
        if (olddata[i].value === task.value) {
            olddata[i] = task;
            break;
        }
    }
    localStorage.setItem("todo", JSON.stringify(olddata));
}

function edit(task) {
    var olddata = readtodo();
    for (var i = 0; i < olddata.length; i++) {
        if (olddata[i].value === task.value) {
            console.log(olddata[i].value);
            input.addEventListener("keyup", () => {
                olddata[i].value === input.innerText;
            })
            break;
        }
    }
    localStorage.setItem("todo", JSON.stringify(olddata));
}