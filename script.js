document.addEventListener("DOMContentLoaded", () => {
  const network = document.querySelector(".neuron-network");
  const title = document.querySelector(".title");
  const svg = document.querySelector(".connections");
  const neuronCount = 8;
  const neuronURLs = {
    1: "AnimlalsFull.html",
    2: "page2.html",
    3: "responsiveInMedicine.html",
    4: "responsiveInArt.html",
    5: "responsiveInEducation.html",
    6: "page6.html",
    7: "responseToFeelings.html",
    8: "impossibleResponse.html",
  };

  // Function to create neurons in a centered circle
  const createNeurons = () => {
    const neurons = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;

    for (let i = 0; i < neuronCount; i++) {
      const angle = (i / neuronCount) * 2 * Math.PI; // Evenly spaced angles
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // Create neuron
      const neuron = document.createElement("div");
      neuron.classList.add("neuron");
      neuron.style.left = `${x - 30}px`; // Adjust for neuron size (60px diameter)
      neuron.style.top = `${y - 30}px`;
      neuron.dataset.id = i + 1;
      network.appendChild(neuron);

      // Store position for drawing lines
      neurons.push({ element: neuron, x, y });
    }

    // Position the title at the center
    title.style.left = `${centerX - title.offsetWidth / 2}px`;
    title.style.top = `${centerY - title.offsetHeight / 2}px`;

    return neurons;
  };

  const drawConnections = (neurons) => {
    // Clear existing lines
    svg.innerHTML = "";

    // Ensure gradient is properly defined in the SVG
    const gradientExists = svg.querySelector("#gradient");
    if (!gradientExists) {
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      const gradient = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      gradient.setAttribute("id", "gradient");
      gradient.setAttribute("x1", "0%");
      gradient.setAttribute("y1", "0%");
      gradient.setAttribute("x2", "100%");
      gradient.setAttribute("y2", "0%");

      // Define gradient stops
      const stop1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop1.setAttribute("offset", "0%");
      stop1.setAttribute(
        "style",
        "stop-color:rgb(124, 205, 219); stop-opacity: 1"
      );

      const stop2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop2.setAttribute("offset", "100%");
      stop2.setAttribute(
        "style",
        "stop-color: #rgb(10, 65, 75); stop-opacity: 1"
      );

      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      defs.appendChild(gradient);
      svg.appendChild(defs); // Add gradient definition to SVG
    }

    // Draw lines between all neurons
    neurons.forEach((source) => {
      neurons.forEach((target) => {
        if (source !== target) {
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );

          const svgRect = svg.getBoundingClientRect();
          const sourceX = source.x - svgRect.left;
          const sourceY = source.y - svgRect.top;
          const targetX = target.x - svgRect.left;
          const targetY = target.y - svgRect.top;

          // Set line attributes
          line.setAttribute("x1", sourceX);
          line.setAttribute("y1", sourceY);
          line.setAttribute("x2", targetX);
          line.setAttribute("y2", targetY);
          line.setAttribute("stroke", "url(#gradient)"); // Reference the gradient
          line.setAttribute("stroke-width", "2");
          svg.appendChild(line); // Add line to SVG
        }
      });
    });
  };

  // Function to hide lines and title
  const hideUI = () => {
    title.style.transition = "opacity 0.5s ease";
    svg.style.transition = "opacity 0.5s ease";
    title.style.opacity = "0";
    svg.style.opacity = "0";
  };

  // Function to show lines and title
  const showUI = () => {
    title.style.opacity = "1";
    svg.style.opacity = "1";
  };

  // Function to zoom in on a clicked neuron
  const zoomNeuron = (neuron) => {
    const id = neuron.dataset.id;

    if (id === "2" || id === "6") {
      showMessage("Not all things are responsive :(");
    } else {
      hideUI();

      const rect = neuron.getBoundingClientRect();
      const scale = 5; // Scale factor for closer zoom

      // Calculate the translation
      const shiftX =
        (window.innerWidth / 2 - (rect.left + rect.width / 2)) * scale;
      const shiftY =
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * scale;

      // Apply zoom transform: Translate first, then scale
      network.style.transition = "transform 1s ease";
      network.style.transform = `translate(${shiftX}px, ${shiftY}px) scale(${scale})`;

      // After zoom completes, grow the neuron
      setTimeout(() => {
        neuron.classList.add("grow");

        // Check if the neuron ID is 2 or 6, then show a message instead of navigating

        setTimeout(() => {
          const url = neuronURLs[id];
          if (url) {
            window.location.href = url; // Navigate to the URL
          } else {
            console.error(`No URL found for neuron ID: ${id}`);
          }
        }, 2000); // Delay navigation until grow animation finishes
      }, 1000); // Wait for zoom animation
    }
  };

  // Function to show a message around the network
  const showMessage = (message) => {
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");
    messageBox.innerHTML = message;
    network.appendChild(messageBox);

    // Style and animation for message box
    messageBox.style.position = "absolute";
    messageBox.style.left = "50%";
    messageBox.style.top = "50%";
    messageBox.style.transform = "translate(-50%, -50%)";
    messageBox.style.padding = "20px";
    messageBox.style.backgroundColor = "#7CE6B0";
    messageBox.style.color = "#0A002B";
    messageBox.style.borderRadius = "10px";
    messageBox.style.textAlign = "center";
    messageBox.style.fontSize = "1.5rem";
    messageBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    messageBox.style.opacity = "1";
    messageBox.style.zIndex = "1000";
    messageBox.style.animation = "fadeIn 1s forwards";

    //Remove message after 5 seconds
    setTimeout(() => {
      messageBox.style.animation = "fadeOut 1s forwards";
      setTimeout(() => {
        messageBox.remove();
      }, 1000); // Wait for fade-out animation to finish
    }, 1500);
  };

  // Add click event for zoom effect
  const neurons = createNeurons();
  drawConnections(neurons);

  neurons.forEach(({ element }) => {
    element.addEventListener("click", () => zoomNeuron(element));
  });

  // Handle resizing
  window.addEventListener("resize", () => {
    network.innerHTML = ""; // Clear neurons
    svg.innerHTML = ""; // Clear lines
    const updatedNeurons = createNeurons();
    drawConnections(updatedNeurons);
    updatedNeurons.forEach(({ element }) => {
      element.addEventListener("click", () => zoomNeuron(element));
    });
  });
});
