

let btn = document.querySelector('button');

const searchGiphy = async()=>{
  try{
    
    const apiKey = '';
    
    let gifContainer = document.getElementById('gifResults');
    // Grab user input
    let inputElement = document.getElementById('gif');
    let rating = document.querySelector('input[name="rating"]:checked').value;
    const keyWord = inputElement.value;
  
    // if no user input, display default endpoint with welcome gif
    const endpoint = keyWord ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyWord}&limit=50&rating=${rating}&offset=0&lang=en` : `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=welcome&limit=50&rating=${rating}&offset=0&lang=en`;

    // Fetch Request
    const response = await fetch(endpoint);
    const json = await response.json();
    const data = json.data;
    console.log(data)

    // if no results found display no results message
    if(data.length < 1){
      gifContainer.innerHTML = '<h1>oops no gifs found, search again</h1>';
    }else{

      // Create array with img tags with gif
      let gifs = data.map(item => {
          return (`<div class="img-container">
                        <img src=${item.images.original.url} />
                        <p>Rating: ${item.rating.toUpperCase()}</p>
                   </div>`)
      });

      //create a string of img tags
      let htmlImgTags = '';
      for(let i=0; i < gifs.length; i++){
        htmlImgTags += ` ${gifs[i]}`;
      }
      // append string of images to gif container
      gifContainer.innerHTML = htmlImgTags;
      // clear input value
      inputElement.value = ''
    }
  }catch(error){
    console.log(error);
    document.getElementById('container').innerHTML = '<h1> server error please try agian later</h1>';
  }
}

btn.addEventListener('click', searchGiphy);
window.addEventListener('load', searchGiphy);
// checks if enter key is pressed
window.addEventListener('keyup', (event) => {

  if(event.keyCode === 13) searchGiphy();
})

