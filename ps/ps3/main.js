let selectionTimeout = null;
let eventsWithImages;

getUMEventsWithImages((data) => {
    eventsWithImages = data;
    console.log(eventsWithImages);
    myThumbnails = document.querySelector('#thumbnails');

    // adding each image to the div
    for (let i=0; i<eventsWithImages.length; i++){
        const event = eventsWithImages[i];
        const myimg = document.createElement("img");
        myimg.src = event.styled_images.event_thumb;
        myThumbnails.appendChild(myimg);
    }

    const nextImg = (index) => {
        clearInterval(selectionTimeout); 
        curIndex = index; 
        setSelectedIndex(); 
        selectionTimeout = setInterval(setSelectedIndex, 10000);
    };

    function myHandler(index) {
        return function() {
            nextImg(index);
        };
    }

    function mySetup() {
        const images = document.querySelectorAll('#thumbnails img');
        for (let i = 0; i < images.length; i++) {
            images[i].addEventListener('click', myHandler(i));
        }
    }
    mySetup();

    // changing selected class every 10 seconds
    let curIndex = 0;
    function setSelectedIndex() {
        const images = document.querySelectorAll('#thumbnails img');
        for (i=0; i<images.length; i++) {
            images[i].classList.remove('selected');
            // below was my biggest flaw
            images[i].addEventListener('click', myHandler(i));
        }
        images[curIndex].classList.add('selected');

        // setting the title, link, picture, time, and description
        let title = eventsWithImages[curIndex].event_title;
        let selectedTitle = document.getElementById('selected-title');
        selectedTitle.textContent = title;

        let myLink = eventsWithImages[curIndex].permalink;
        let selectedLink = document.getElementById('selected-title');
        selectedLink.setAttribute('href', myLink);

        pic = eventsWithImages[curIndex].image_url;
        let selectedPic = document.getElementById('selected-image');
        selectedPic.setAttribute('src', pic);

        let time = eventsWithImages[curIndex].datetime_start;
        let selectedTime = document.getElementById('selected-date');
        selectedTime.textContent = getReadableTime(time);

        let description = eventsWithImages[curIndex].description;
        let selectedDescription = document.getElementById('selected-description');
        selectedDescription.textContent = description;
        
        curIndex = (curIndex + 1) % images.length;
    };

    // initial call and setting the 10 second interval
    setSelectedIndex();
    let selectionTimeout = setInterval(setSelectedIndex, 10000);

});
