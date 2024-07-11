import { callApi } from "./api-client.js";

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', loadMusic);

function loadMusic() {
    const inputValue = document.getElementById("userInput").value;
    const url = `https://itunes.apple.com/search?term=${inputValue}&limit=11`;

    console.log(inputValue)
    
    callApi(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            displayMusic(data.results);
        })
        .catch(error => {
            console.log('Error while calling the API:', error);
        });
}

function displayMusic(data) {
    const musicDiv = document.getElementById('music');
    musicDiv.innerHTML = '';

    data.forEach(item => {
        /* const card1 = `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card">
                    <img src="${item.artworkUrl100}" alt="${item.trackName}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${item.trackName}</h5>
                        <div class="card-text">
                            <button class="btn btn-info cart-button">Add to playlist</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        musicDiv.innerHTML += card; */

        const main = document.createElement('div');
        main.className = "col-12 col-md-6 col-lg-4";
        const card = document.createElement('div');
        card.className = "card";
        const image = document.createElement('img');
        image.className = "card-img-top";
        image.src = item.artworkUrl100;
        image.alt = item.trackName;

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = "card-body";

        const h5 = document.createElement('h5');
        h5.className = "card-title";
        h5.innerText = item.trackName;

        const cardTextDiv = document.createElement('div');
        cardTextDiv.className = "card-text";

        const button = document.createElement('button');
        button.className = "btn btn-info cart-button";
        button.innerText = "Add to Playlist";
        button.addEventListener('click',function() {
            addToPlaylist(item)
        });

        cardTextDiv.appendChild(button);

        cardBodyDiv.appendChild(h5);
        cardBodyDiv.appendChild(cardTextDiv);

        card.appendChild(image);
        card.appendChild(cardBodyDiv);

        main.appendChild(card);
        musicDiv.append(main);


    });
}


function addToPlaylist(data){
    console.log("added")

    /* 
        <div class="col-12">
                        <div class="cart-item"><img
                                src="https://modpizza.com/wp-content/uploads/2021/12/Website-Maddy.png" alt="pizza11"
                                class="cart-item-image">
                            <p>Veggie Zupreme</p>
                            <p>₹ 19.95</p><button class="remove-btn" pizza-id="11">Remove</button>
                        </div>
                    </div>
    
    */

    const col = document.createElement('div');
    col.className = "col-12";

    const item = document.createElement('div');
    item.className = "cart-item";
    
    const image = document.createElement('img');
    image.className = "cart-item-image"
    image.src = data.artworkUrl100;

    const ptag = document.createElement('p');
    ptag.innerText = data.trackName;

    const button = document.createElement('button');
    button.className = "remove-btn";
    /* button.innerText = "Play";
    button1.addEventListener(function() {
        playMusic(data)
        
    }); */

    item.appendChild(image);
    item.appendChild(ptag);
    item.appendChild(button);

    col.appendChild(item);

    const div = document.getElementById('playlist');

    div.appendChild(col);

}


function playMusic(data) {
    const audio = document.getElementById('audio');
    audio.src = data.previewUrl;
}














{/* <audio src="${item.previewUrl}" controls></audio> */}