//All the cards will be here
const state = {
  tasklist: [],
};

// dom manipulations
// this is to get the div from HTML
const taskModel = document.querySelector(".task__modal__body");
// This is for new modal
const taskcontent = document.querySelector(".task__content");

// This is to push the data to HTML
const htmlTaskContent = ({ id, title, description, type, url }) =>
  `
<div class='col-md-6 col-lg-4 mt-3' id=${id}key=${id}>
<div class='card shadow-sm tasl__card'>
<div class='card-header d-flex justify-content-end task__card__header'>
<button type='button' class='btn btn-outline-info mr-2' name=${id}>
<i class='fa fa-pencil-alt' name=${id}></i>
</button>
<button type='button' class='btn btn-outline-danger mr-2' name=${id}>
<i class='fa fa-trash-alt' name=${id}></i>
</button> 

<div class='card-body'>
${
  url &&
  `<img width='100%' src=${url} alt='card image here' class='card-image-top md-3 rounded-lg '/>`
}
<h4 class='task__card__title'> ${title}</h4>
<p class='description trim-3-lines text-muted' data-gram_editor='false'>${description}
</p>
<div class='tags text-white d-flex flex-wrap'>
<span class='badge bg-primary m-1'>${type}</span>
</div>
</div>
<div class='card-footer'>
<button type='button' class='btn btn-outline-primary data-bs-toggle="modal" data-bs-target="#showTask"'>Open Task
</button> 
</div>
</div>
</div>

</div>
`;

// modal in big view
const htmlModalcontent = ({ id, title, description, type, url }) => {
  const date = new Date(parseInt(id));
  // for converting date to int
  return `
  <div id=${id}>
   ${
     url &&
     `<img width='100%' src=${url} alt='card image here' class='img-fluid place__holder__image mb-3'/>`
   }
   <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
  <h2 class='my-3'>${title}</h2>
  <p class='lead '>${description}}</p> 
  <span class='badge bg-primary m-1'>${type}</span>
  </div>
  `;
};

// updating local storage
const updatelocalstorage = () => {
  // to work on group of objects(i.e id, url etc) we are using JSON
  // JSON.stringify is array of objects
  localStorage.setItem(
    "task",
    JSON.stringify({
      // to access array from object
      task: state.tasklist,
    })
  );
};
// this is now for localstorage use, now we want it back in readable
// object to string for reading on UI
const loadinitialdata = () => {
  const localStoragecopy = JSON.parse(localStorage.task);
  // we are storing the data object in "task"

  if (localStoragecopy) state.tasklist = localStoragecopy.task;
  // if localstorage is true or false means if it has any data or not
  state.tasklist.map((cardData) => {
    taskcontent.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
    // adjacenthtml has to do with positions, beforebegin etc named based on div/p/span
  });
};
// for saving data of form
const handlesubmit = (event) => {
  const id = '${date.now()}';
  const input = {
    url: document.getElementById("imageurl").value,
    title: document.getElementById("tasktitle").value,
    description: document.getElementById("taskdesc").value,
    type: document.getElementById("tasktype").value,
    // .value to access the data
  };
  if(input.title===''|| input.title===''|| input.description=== ''){
    return alert("Please Fill all the Fields")
  }
  taskcontent.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({
      // ... we get data in object within an object so we use spread operator
      ...input,
      id,
    })
  );
  state.tasklist.push({...input,id});
  // update data on localstorage even after reloading
  updatelocalstorage();
};
