// CONTACT FORM
document.getElementById("contactForm")?.addEventListener("submit", function(e){
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  let msg = document.getElementById("formMsg");

  if(name === "" || email === ""){
    msg.innerText = "Fill all fields!";
    msg.style.color = "red";
  } else {
    msg.innerText = "Message sent!";
    msg.style.color = "green";
  }
});


// TODO APP (LOCAL STORAGE)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  let list = document.getElementById("taskList");
  if(!list) return;

  list.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerText = task;

    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  tasks.push(input.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
}

renderTasks();


// PRODUCTS
let products = [
  {name:"Laptop", price:50000, category:"electronics"},
  {name:"Phone", price:20000, category:"electronics"},
  {name:"Shirt", price:1000, category:"clothing"},
  {name:"Shoes", price:2000, category:"clothing"}
];

function displayProducts(list) {
  let container = document.getElementById("productList");
  if(!container) return;

  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `<div class="card">${p.name} - ₹${p.price}</div>`;
  });
}

function filterProducts() {
  let value = document.getElementById("filter").value;
  if(value === "all") displayProducts(products);
  else displayProducts(products.filter(p => p.category === value));
}

function sortProducts() {
  let value = document.getElementById("sort").value;
  let sorted = [...products];

  if(value === "low") sorted.sort((a,b)=>a.price-b.price);
  if(value === "high") sorted.sort((a,b)=>b.price-a.price);

  displayProducts(sorted);
}

displayProducts(products);