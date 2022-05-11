/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

var currentIndex = 0


const showImage = (ev) => {
    var temp = ev
    console.log(temp)

    document.querySelector(".featured_image").style.backgroundImage = temp

};

const showNext = (ev) => {
    console.log("hello")
    currentIndex += 1;

    if (currentIndex < images.length){
        console.log("currentIndex:", currentIndex);
        document.querySelector(".featured_image").style.backgroundImage = "url(\"" + images[currentIndex] + "\")"
    }
    else {
        currentIndex = 0
        document.querySelector(".featured_image").style.backgroundImage = "url(\"" + images[currentIndex] + "\")"
    }
    
    // update .featured_image
};

const showPrev = (ev) => {
    console.log("hello")
    currentIndex -= 1;
    console.log(currentIndex)
    if (currentIndex >= 0){
        document.querySelector(".featured_image").style.backgroundImage = "url(\"" + images[currentIndex] + "\")";
    }
    else {
        currentIndex = images.length - 1;
        document.querySelector(".featured_image").style.backgroundImage = "url(\"" + images[currentIndex] + "\")";
    }
};





const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
        <li class="card">
            <button class="image" 
                style="background-image:url('${image}')"
                data-index=${idx}"
                aria-label="Displays image ${idx} in the main panel."
                onclick = "showImage(this.style.backgroundImage)">
                </button>
        </li>`;
    });
};

initScreen();