console.log("Data Js added");

// Global variable to store pets
let allPets = [];

// Load Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// Load Pets
const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      allPets = data.pets; // Store pets globally
      displayPets(allPets);
      addSortButton(); // Call this after pets are loaded
    })
    .catch((error) => console.log(error));
};

// Display Categories and Add Click Event
const displayCategories = (categories) => {
  const CategoryContainer = document.getElementById("Categories");
  CategoryContainer.innerHTML = ""; // Clear previous categories

  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn btn-outline border-[black] px-12 category-button";
    button.setAttribute("data-category", item.category); // Set category attribute
    button.innerHTML = `
      <div class="flex gap-2 items-center">
        <span class="w-[40px]">
          <img class="w-full" src="${item.category_icon}">
        </span>
        <span class="text-lg">${item.category}</span>
      </div>
    `;

    button.addEventListener("click", () => filterPets(item.category)); // Add click event
    CategoryContainer.append(button);
  });
};

// Filter pets according to category
const filterPets = (category) => {
  const petContainer = document.getElementById("datas");
  const spinner = document.getElementById("spinner");

  petContainer.innerHTML = ""; // Clear old data
  spinner.classList.remove("hidden"); // Show spinner

  setTimeout(() => {
    spinner.classList.add("hidden"); // Hide spinner after 2 seconds

    const filteredPets = allPets.filter(pet => pet.category.toLowerCase() === category.toLowerCase());

    if (filteredPets.length === 0) {
      petContainer.innerHTML = `
          <div class="grid place-items-center h-64 bg-slate-400 py-10 text-red-500 font-bold text-xl col-span-3">
            <div class="text-center">
             <img src="Assets/error.webp" class="w-24 h-24 mx-auto mb-4">
             <p>No Information Available</p>
            </div>
          </div>
      `;
    } else {
      displayPets(filteredPets);
    }
  }, 2000); // Wait 2 seconds before showing pets
};



// Function to Show the Adoption Modal with Countdown
const showAdoptModal = () => {
  const modal = document.getElementById("adopt-modal");
  const countdownElement = document.getElementById("countdown");

  modal.classList.remove("hidden");

  let countdown = 3;
  countdownElement.textContent = countdown;

  const timer = setInterval(() => {
    countdown -= 1;
    countdownElement.textContent = countdown;

    if (countdown === 0) {
      clearInterval(timer);
      modal.classList.add("hidden");
    }
  }, 1000);
};

// Details button function
const loadDetails =async (petId)=>{
  console.log(petId);
  const uri =`https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.petData);
}

const displayDetails = (petData) => {
  console.log(petData);

  const detailContainer = document.getElementById("modal-content");

  detailContainer.innerHTML = `
    <div class="p-4 w-full">
      <img src="${petData.image}" class="mx-auto" />
      <p class="text-left mt-4">${petData.pet_name}</p>
      <div class="flex justify-between">
        <div>
          <div class="flex item-center gap-2">
            <img class="w-[20px]" src="Assets/Breedlogo.png">
            <p class="text-[card-text] font-semibold">Breed: ${petData.breed}</p>
          </div>
          
          <div class="flex item-center gap-2">
            <img class="w-[20px]" src="Assets/Genderlogo.png">
            <p class="text-[card-text] font-semibold">Gender: ${petData.gender}</p>
          </div>

           <div class="flex item-center gap-2 mt-1">
            <i class="fa-solid fa-virus"></i>
            <p class="text-[card-text] font-semibold">Vaccinated_status: ${petData.vaccinated_status}</p>
          </div>

        </div>

        <div>
          <div class="flex item-center gap-2">
            <img class="w-[20px]" src="Assets/Birthlogo.png">
            <p class="text-[card-text] font-semibold">Birth: ${petData.date_of_birth}</p>
          </div>

          <div class="flex item-center gap-2">
            <img class="w-[15px]" src="Assets/Pricelogo.png">
            <p class="text-[card-text] font-semibold">Price: ${petData.price}</p>
          </div>
        </div>
      </div>
    </div>

    <h3 class="font-bold text-2xl">Detail Information</h3>
    <p>${petData.pet_details}</p>
  `;

  document.getElementById("customModal").showModal();
};


// Display Pets
const displayPets = (pets) => {
  const petContainer = document.getElementById("datas");
  petContainer.innerHTML = ""; // Clear existing cards

  pets.forEach((item) => {
    const price = item.price ? item.price : "Information Unavailable";
    const birthDate = item.date_of_birth ? item.date_of_birth : "Information Unavailable";

    const card = document.createElement("div");
    card.classList = "card card-compact w-[full] lg:w-[300px] lg:w-[full] border-2 border-[light-ash-color]";
    card.innerHTML = `
      <figure class="rounded-xl">
        <img class="p-4 pet-image" src="${item.image}"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title">${item.pet_name}</h2>
          <div class="flex item-center gap-2">
            <img class="w-[20px]" src="Assets/Breedlogo.png">
            <p class="text-[card-text] font-semibold">Breed: ${item.breed}</p>
          </div>
          <div class="flex item-center gap-2">
            <img class="w-[20px]" src="Assets/Birthlogo.png">
            <p class="text-[card-text] font-semibold">Birth: ${birthDate}</p>
          </div>
          <div class="flex item-center gap-2">
            <img class="w-[20px]" src="Assets/Genderlogo.png">
            <p class="text-[card-text] font-semibold">Gender: ${item.gender}</p>
          </div>
          <div class="flex item-center gap-2">
            <img class="w-[15px]" src="Assets/Pricelogo.png">
            <p class="text-[card-text] font-semibold">Price: ${price}</p>
          </div>
          <hr>
        <div class="flex justify-around mt-3">
          <button class="btn btn-outline like-button" data-image="${item.image}">
            <i class="fa-regular fa-thumbs-up"></i>
          </button>
          <button class="btn btn-outline text-[#0E7A81] adopt-button">Adopt</button>
          <button onclick ="loadDetails('${item.petId}')" class="btn btn-outline text-[#0E7A81]">Details</button>
        </div>
      </div>
    `;
    petContainer.append(card);
  });

  // Add event listener to like buttons AFTER the elements are created
  document.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const imageUrl = e.currentTarget.getAttribute("data-image");
      renderLikedImage(imageUrl);
    });
  });

  // Add event listener to "Adopt" buttons
  document.querySelectorAll(".adopt-button").forEach((button) => {
    button.addEventListener("click", showAdoptModal);
  });
};



// Function to Render Liked Image
const renderLikedImage = (imageUrl) => {
  const likedContainer = document.getElementById("liked-images");
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.classList = "liked-image w-[100px] h-[100px] object-cover rounded-md";
  likedContainer.appendChild(imgElement);
};

// Function to Sort Pets by Price in Descending Order
const sortByPrice = () => {
  const sortedPets = [...allPets].sort((a, b) => b.price - a.price);
  displayPets(sortedPets);
};

// Function to Add "Sort by Price" Button
const addSortButton = () => {
  const container = document.getElementById("sort-container");
  if (!container) {
    console.error("sort-container div not found in the DOM!");
    return;
  }

  // Clear previous button if exists
  container.innerHTML = "";

  const sortButton = document.createElement("button");
  sortButton.classList = "btn bg-[#0E7A81] text-[white]";
  sortButton.innerText = "Sort by Price";
  sortButton.addEventListener("click", sortByPrice);

  container.appendChild(sortButton);
};

// Load everything after the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadPets();
});
