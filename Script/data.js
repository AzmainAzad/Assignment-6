console.log("Data Js added");

// Create loadCategories
const loadCategories = () =>{
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
};

// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }

// Display Categories
const displayCategories = (categories) =>{

    const CategoryContainer = document.getElementById("Categories");
    
    categories.forEach((item) =>{
      console.log(item);

    // Create a button
      const button = document.createElement("button");
      button.classList = "btn category-btn border-[black] px-12 ";
      button.innerHTML = `
      <div class="flex gap-2 items-center align-center">
      <span class=" w-[40px]"><img class="w-[full]" src=${item.category_icon}></span>
      <span class="text-lg">${item.category}</span>
      </div>
      `

    // add button to CategoryContainer 
    CategoryContainer.append(button);

    });
  
};

loadCategories();