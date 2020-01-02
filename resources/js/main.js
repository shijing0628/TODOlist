
//console.log(JSON.parse(localStorage.getItem('todoList')));

// icon svg
var removeSVG= '<svg aria-hidden="true" fill="#c0cecb" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>';
var completeSVG = '  <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.5 14.5C28.5 21.6322 22.5042 27.5 15 27.5C7.49582 27.5 1.5 21.6322 1.5 14.5C1.5 7.36782 7.49582 1.5 15 1.5C22.5042 1.5 28.5 7.36782 28.5 14.5Z" stroke="#5E9AC4" stroke-width="3"/> <path d="M8 14.5L13 20L21.5 7.5" stroke="#5E9AC4" stroke-width="3"/></svg>';

var data =(localStorage.getItem('todoList'))? JSON.parse(localStorage.getItem('todoList')): {
todo:[],
completed:[]
}

renderTodoList();

//click the add button, add text to the todo list
document.getElementById('add').addEventListener('click',function(){
var value = document.getElementById('item').value;
if(value) {
    addItem(value);

}
})

function dataObjectUpdated(){
    // console.log(JSON.stringify(data));
 localStorage.setItem('todoList',JSON.stringify(data));
 }

document.getElementById('item').addEventListener('keydown', function(e){
    var value = this.value;
if(e.code ==='Enter' && value){
    //console.log(data)
    addItem(value);
    dataObjectUpdated();
    data.todo.push(value);
}
})

function addItem(value){
    addItemToDOM(value);
    document.getElementById('item').value = '';
    dataObjectUpdated();
    data.todo.push(value);
    
}


//renderTodoList
function renderTodoList(){
if(!data.todo.length && !data.completed.length) return;
for (var i=0; i<data.todo.length;i++){
    var value= data.todo[i];
    addItemToDOM(value)
}
for (var j=0; j<data.completed.length;j++){
    var value= data.completed[j];
    addItemToDOM(value,true)
}

}







// remove items
function removeItem(e){

//console.log(this.parentNode.parentNode.parentNode);
var item = this.parentNode.parentNode;
var parent = item.parentNode;
var id=parent.id;
var value=item.innerText;
if(id === 'todo'){
    data.todo.splice(data.todo.indexOf(value),1);  
    }
    else {
        data.completed.splice(data.completed.indexOf(value),1);      
    }
dataObjectUpdated();
parent.removeChild(item);
}

//complete item
function completeItem(){
 var item = this.parentNode.parentNode;
var parent = item.parentNode;

var id= parent.id;
var value=item.innerText;

if(id === 'todo'){
data.todo.splice(data.todo.indexOf(value),1);
data.completed.push(value);
}
else {
    data.completed.splice(data.completed.indexOf(value),1);
    data.todo.push(value);

}
dataObjectUpdated();

var target = (id ==='todo')?document.getElementById('completed'):document.getElementById('todo');

parent.removeChild(item);
target.insertBefore(item, target.ChildNodes);
}


function addItemToDOM(text,completed){

var list= (completed)? document.getElementById('completed'):document.getElementById('todo');

var item = document.createElement('li');
item.innerText=text;

var buttons= document.createElement('div');
buttons.classList.add('buttons');

var remove= document.createElement('button');
remove.classList.add('remove');
remove.innerHTML = removeSVG; 

//add click event
remove.addEventListener('click',removeItem);


var complete= document.createElement('button');
complete.classList.add('complete');
complete.innerHTML = completeSVG;

//add click event for completing
complete.addEventListener('click',completeItem);


buttons.appendChild(remove);
buttons.appendChild(complete);

item.appendChild(buttons);
list.insertBefore(item,list.childNodes[0]);

}