let input = document.querySelector("input");
let movies = document.querySelector("#movie");
let apiKey = "895e59dd";

// ----------------------fetch data-----------------------------------//
async function fetchAPI() {
    let search = input.value;
    // console.log(searchStr);
    let data = null;
        data = await fetch(` https://www.omdbapi.com/?&apikey=${apiKey}&s=${search}&page=1 `);
        data = await data.json()
        viewthose(data);
}
// --------try to use debauncing technique for controle events firing -------------------//

function debouncing(fetchAPI, delay){
    let time;
    return ()=>{
        if(time){
            clearTimeout(time)
        }
        time = setTimeout(fetchAPI, delay)
    }
}

let AllMovies = debouncing(fetchAPI, 1200);

//----------------------adding events ---------------------//

input.addEventListener("keyup", (e)=>{
    AllMovies()
    // fetchAPI()
    // let final = e.target.value;
    movies.innerHTML="";
});

// if(movies.innerHTML == ""){
//     movies.innerText = "No Movie Yet! ☹️";
// }

// ----------------------------------show movies on ui-----------------------//
function viewthose(data){
    console.log(data.Search);
    let showdata = data.Search;

    showdata.forEach((item)=>{
        let film = document.createElement("div");
        film.classList.add("image");

        let ele = document.createElement("img");
        ele.src = item.Poster;


        film.appendChild(ele);
        movies.appendChild(film);

    })

}