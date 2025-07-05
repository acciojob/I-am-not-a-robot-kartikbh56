//your code here
const images = [
  { class: "img1", src: "https://picsum.photos/id/237/200/300" },
  { class: "img2", src: "https://picsum.photos/seed/picsum/200/300" },
  { class: "img3", src: "https://picsum.photos/200/300?grayscale" },
  { class: "img4", src: "https://picsum.photos/200/300/" },
  { class: "img5", src: "https://picsum.photos/200/300.jpg" },
];

let selected = [];
let duplicatedSrc = "";

const container = document.getElementById("image-container");
const para = document.getElementById("para");
const h = document.getElementById("h");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderImages() {
  selected = [];
  para.textContent = "";
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  container.innerHTML = "";

  const duplicatedIndex = Math.floor(Math.random() * images.length);
  duplicatedSrc = images[duplicatedIndex].src;

  // Clone the images array and insert one duplicate
  let imageSet = [...images];
  imageSet.push({ ...images[duplicatedIndex] });

  // Shuffle the image set
  imageSet = shuffle(imageSet);

  // Create image elements
  imageSet.forEach((imgObj, index) => {
    const img = document.createElement("img");
    img.src = imgObj.src;
    img.dataset.index = index;
    img.classList.add(imgObj.class);
    img.addEventListener("click", () => handleClick(img));
    container.appendChild(img);
  });
}

function handleClick(img) {
  const index = img.dataset.index;

  if (selected.length === 2 || selected.includes(index)) return;

  img.classList.add("selected");
  selected.push(index);
  resetBtn.style.display = "inline";

  if (selected.length === 2) {
    verifyBtn.style.display = "inline";
  }
}

resetBtn.addEventListener("click", () => {
  renderImages();
});

verifyBtn.addEventListener("click", () => {
  const imgs = document.querySelectorAll("img");
  const [first, second] = selected;

  verifyBtn.style.display = "none";

  if (
    imgs[first].src === imgs[second].src
  ) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

renderImages();
