
const list = document.querySelector<HTMLUListElement>("ul");
const input = document.querySelector<HTMLInputElement>("form input");
const button = document.querySelector<HTMLButtonElement>("form button");
 
type Task={
    title: string,
    completed: boolean,
    createdAt:  Date,
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
    updatedCount();
})

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
    updatedCount();
})


const addTask = function():void{

    if(list?.innerHTML){
        list.innerHTML = "";
    } 

    tasks.forEach((task, index)=>{

        const taskList = document.createElement("li");
        const div =document.createElement("div")
        div.setAttribute("class", "list-container");

        const label = document.createElement("label")
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");

        if(checkBox.checked){
            label.setAttribute("class", "completed");
            saveTask();
           }
         else
         label.setAttribute("class", "");
         label.append(checkBox, task.title);

        const div2 = document.createElement("div");
        div2.setAttribute("class", "div2");
        div2.append(label);

        const iconDiv = document.createElement("div");
        iconDiv.setAttribute("class", "icons");

        const deleteImg = document.createElement("img");
        deleteImg.src = "../delete.png";
        deleteImg.addEventListener("click", () => remove(index)); 

        const editImg = document.createElement("img");
        editImg.src = "../edit.png"; 
        editImg.addEventListener("click", () => edit(index));

        iconDiv.append(editImg, deleteImg);
        div.append(div2, iconDiv);
        taskList.append(div);
        list?.append(taskList);

        checkBox.checked=task.completed;
        checkBox.addEventListener("change", ()=>{       
             task.completed=checkBox.checked;
             console.log(tasks);
             if(checkBox.checked){
                label.setAttribute("class", "completed");
               }
             else{
             label.setAttribute("class", "");}
             saveTask();
             updatedCount();
     
        });

        if(checkBox.checked){
            label.setAttribute("class", "completed");
           }
         else
         label.setAttribute("class", "");

    })
   
}

const remove =function(index:number){
    tasks.splice(index, 1);
    addTask();
    saveTask();
    updatedCount();
}

const edit = function(index:number){
    if (input?.value ==null) {   
    } else { 
        input.value=tasks[index].title;
        tasks.splice(index, 1);
        addTask();  
        saveTask(); 
        updatedCount();
    }
}
const updatedCount = ()=>{

    let count = <HTMLParagraphElement>document.querySelector(".task-count p");
    let progress = <HTMLDivElement>document.querySelector(".progress");
    let message = <HTMLParagraphElement>document.querySelector(".title p");

    let totalTask = tasks.length;
    let completedTask = tasks.filter(task => task.completed).length;
    count.innerHTML= completedTask +" / "+totalTask;
    if(totalTask==0&&completedTask==0){
        progress.style.width="0%";
    }
    else{
        progress.style.width=completedTask/totalTask*100+"%";
    }
    

    if(totalTask==completedTask&&totalTask!=0&&completedTask!=0){
        message.innerHTML="You Completed Your Tasks!!"
        confettiEffect();
    }
    else{
        message.innerHTML="Keep it up"
    }

}
const confettiEffect = (): void => {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio: number, opts: object): void {
        (window as any).confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
};
