
const list = document.querySelector<HTMLUListElement>("ul");
const input = document.querySelector<HTMLInputElement>("form input");
const button = document.querySelector<HTMLButtonElement>("form button");
 
type Task={
    title: string,
    completed: boolean,
    createdAt:  Date,
}

const tasks:Task[]=[];
button?.addEventListener('click', function(e){
    e.preventDefault();
    if(input?.value == "" || input?.value==null ){
        return 
    }
    // input.value// after this point no longer null because we have an if statment that checks if its null so typescript knows afterr that point there is noprobablity of it being null

    
    const newtask:Task={
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newtask);
    addTask( );
    input.value="";
    console.log(tasks);
    saveTask();
})

const addTask = function():void{

    if(list?.innerHTML){
        list.innerHTML = "";
    } 

    tasks.forEach((task)=>{

        const taskList = document.createElement("li");
        const div =document.createElement("div")
        div.setAttribute("class", "list-container");
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        const label = document.createElement("label")
        label.append(checkBox, task.title); 
        // div.innerHTML= `<div class="div2">${label.innerHTML}</div><div class="icons"> <img src="../edit.png" onclick="remove(${index})"><img src="../delete.png" onclick="remove(${index})"></div>`
        taskList.append(label);
        list?.append(taskList);

        checkBox.checked=task.completed;
        checkBox.addEventListener("change", ()=>{       
             task.completed=checkBox.checked;
             console.log(tasks)
             saveTask();
             
        })
        // if(checkBox.checked){
        //     label.setAttribute("class", ".completed")
        //  }

    })
    
    

    
}

const saveTask= function():void{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const getTask=function(){ 

    let savedTask =localStorage.getItem("tasks")
     if(savedTask==null){
        return
     } 
     let saved:Task[] =JSON.parse(savedTask);
     saved.forEach((task)=>{
        tasks.push(task)
     })

     
     
}
document.addEventListener("DOMContentLoaded",()=>{
    getTask();
    addTask();
})