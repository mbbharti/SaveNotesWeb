
// console.log("js is added")

shownotes() //whenever refreshed show all the saved notes

//if User add a note add it to the local storage
let addBtn=document.getElementById("addBtn");
addBtn.addEventListener("click",function(e){
    let addTxt=document.getElementById("addTxt");
    let notes=localStorage.getItem("notes");
    if(notes == null)
    {
        notesobj=[];
    }
    else
    {
        notesobj=JSON.parse(notes);
    }
    notesobj.push(addTxt.value);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    addTxt.value="";
    shownotes()
    // console.log(notesobj);
})

//function to show notes/elements from local storage
function shownotes()
{
    let notes=localStorage.getItem('notes');
    if(notes == null)
    {
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    let html="";
    notesobj.forEach(function(element,index) {
        html +=`
        <div class=" noteCard my-2 mx-2 card shadow p-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index+1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-success ">Delete Note</button>
        </div>
      </div>    
        `
    });
        let notesEle=document.getElementById('note')
        if(notesobj.length != 0)
        {
            notesEle.innerHTML=html;
        }
        else
        {
            notesEle.innerHTML=`Nothing to show please refer " Add a Note Section" to add some notes`;
        }
}

//Function to delete a note
function deleteNote(index)
{
    console.log('deleting a note');
    let notes=localStorage.getItem("notes");
    if(notes == null)
    {
        notesobj=[];
    }
    else
    {
        notesobj=JSON.parse(notes);
    }
    notesobj.splice(index,1);  //it will delete the note from given index to number of elements given in second parameter
    localStorage.setItem("notes",JSON.stringify(notesobj));
    shownotes();

}

// Activating Search Bar
let search=document.getElementById('searchTxt');
search.addEventListener('input',function(element){
    let inputVal=search.value.toLowerCase();
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element)
        {
            cardTxt=element.getElementsByTagName("p")[0].innerText;
            if(cardTxt.includes(inputVal))
            {
                element.style.display="block";
            }
            else
            {
                element.style.display="none";
            }
        })
})