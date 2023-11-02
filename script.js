let input = document.querySelector("input");
let movies = document.querySelector("#movie");
let btn1 = document.querySelector(".next");
let pop = document.querySelector("#popup");
let apiKey = "895e59dd";
btn1.style.display="none";
// ----------------------fetch data-----------------------------------//
let page = 1;
async function fetchAPI(pg) {
    let search = input.value;
    // console.log(search);
    try {
        let data = null;
        data = await fetch(` https://www.omdbapi.com/?&apikey=${apiKey}&s=${search}&page=${pg} `);
        data = await data.json()
        viewthose(data);
        // console.log(data);
    } catch (error) {
        // console.log("error");

    }
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
    btn1.style.display="none";

});


let viewDetails = ()=>{
    pop.showModal();
}

// ----------------------------------show movies on ui-----------------------//
function viewthose(data){
    // console.log(data.Search);
    let showdata = data.Search;

    showdata.forEach((item)=>{
        let film = document.createElement("div");
        film.classList.add("image");

        let ele = document.createElement("img");
        ele.src = item.Poster;

        let para = document.createElement("p");
        para.innerText=`view deatils`;
        para.classList.add("para");


        let id=item.imdbID;

        film.appendChild(para);
        film.appendChild(ele);
        movies.appendChild(film);
        let imdbid = item.imdbID;
        film.addEventListener("click", (e)=>{

            fordetails(id);
            viewDetails();

        })


    })
    btn1.style.display="block";
// ---------------------------------for more btns----------------------------------//
    btn1.addEventListener("click", ()=>{
        page++;
        fetchAPI(page);
    })


}

// ------------------------------view details on popup------------------//
async function fordetails(id){
    pop.innerHTML="";
    let fetchfordtl = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=895e59dd`)
    let final = await fetchfordtl.json();
    console.log(final);
    let detailsall = document.createElement("div");
    detailsall.classList.add("pagination")
    detailsall.innerHTML =`
    <div class ="forimg"><img src = ${final.Poster}></div>
    <div class ="fordtls">
    <p>Title: <span>${final.Title}<span></p>
    <p>Year: <span>${final.Year}<span></p>
    <p>Released: <span>${final.Released}<span></p>
    <p>Actors
    : <span>${final.Actors
    }<span></p>
    <p>Director
    : <span>${final.Director}<span></p>
    <p>Writer: <span>${final.Writer}<span></p>
    <p>Language
    : <span>${final.Language
    }<span></p>
    <button class ="cross">cancle</button></div>
    `
    pop.appendChild(detailsall);

    let cross = document.querySelector(".cross");
    cross.addEventListener("click", ()=>{
        // document.location.reload();
        // Modal();
        closedilog();
        
    })
}


function closedilog(){
    pop.close();
}
// create by bhumi-------------------😊