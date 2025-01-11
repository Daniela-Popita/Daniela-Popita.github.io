const animals = [
  {
    name: "Dogs",
    category: "Mammals",
    description: "Responsive to training and human emotions.",
    image: "dog.jpeg",
  },
  {
    name: "Dolphins",
    category: "Mammals",
    description: "Quick to react to sounds and social cues.",
    image: "dolphin.jpeg",
  },
  {
    name: "Cats",
    category: "Mammals",
    description: "Respond to specific sounds like their names.",
    image: "cat.jpeg",
  },
  {
    name: "Chimpanzees",
    category: "Mammals",
    description: "Highly intelligent and social.",
    image: "chimpanzee.jpg",
  },
  {
    name: "Parrots",
    category: "Birds",
    description: "Mimic sounds and respond to training.",
    image: "parrot.jpg",
  },
  {
    name: "Crows",
    category: "Birds",
    description: "Problem-solving and adaptive.",
    image: "crow.jpg",
  },
  {
    name: "Octopuses",
    category: "Marine Animals",
    description: "Highly intelligent and responsive.",
    image: "octopus.jpg",
  },
  {
    name: "Chameleons",
    category: "Reptiles",
    description: "Change color to respond to the environment.",
    image: "chameleon.jpg",
  },
  {
    name: "Frogs",
    category: "Amphibians",
    description: "Quick reactions when hunting insects.",
    image: "frog.jpg",
  },
  {
    name: "Bees",
    category: "Insects",
    description: "Respond to patterns, colors, and pheromones.",
    image: "bee.jpg",
  },
  {
    name: "Elephants",
    category: "Mammals",
    description: "Responsive to social bonds and training.",
    image: "elephant.jpg",
  },
];

const container = document.getElementById("animalsContainer");

animals.forEach((animal) => {
  const card = document.createElement("div");
  card.classList.add("col-md-6", "col-lg-4");

  card.innerHTML = `
      <div class="card h-100">
        <img src="images/${animal.image}" class="card-img-top" alt="${animal.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${animal.name}</h5>
          <p class="card-text"><strong>Category:</strong> ${animal.category}</p>
          <p class="card-text">${animal.description}</p>
          <button class="btn btn-primary mt-auto" onclick="showDetails('${animal.name}')">Learn More</button>
        </div>
      </div>
    `;

  container.appendChild(card);
});

function showDetails(name) {
  alert(`More information about ${name} will be available soon!`);
}

document.getElementById("colorPicker").addEventListener("input", function () {
  const chameleon = document.getElementById("chameleon");
  chameleon.style.backgroundColor = this.value;

  // Ensure all parts (head, tail, legs) change color
  const parts = chameleon.querySelectorAll(".head, .tail, .leg");
  parts.forEach((part) => {
    part.style.backgroundColor = this.value;
    part.style.boxShadow = `0 0 20px ${this.value}`; // Add glow effect
  });
});
