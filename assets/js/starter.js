// Importing JavaScript
//
// You have two choices for including Bootstrap's JS files—the whole thing,
// or just the bits that you need.


// Option 1
//
// Import Bootstrap's bundle (all of Bootstrap's JS + Popper.js dependency)

// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


// Option 2
//
// Import just what we need

// If you're importing tooltips or popovers, be sure to include our Popper.js dependency
// import "../../node_modules/popper.js/dist/popper.min.js";

import "../../node_modules/bootstrap/js/dist/util.js";
import "../../node_modules/bootstrap/js/dist/modal.js";


function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

let genres = null

function pic_genre(genres){
    
    let current_genres = globalThis.genres
    let path = []  
    while(true){
        let genre = choose(Object.keys(current_genres))
        console.log(`genre: ${genre}`)
        path.push(genre)
        let sub_genre = current_genres[genre]
        if (sub_genre === null){
            break
        }
        current_genres = sub_genre
    }
    return path
}



function on_generate(){
    console.log("generate")
    var output_area = $('#output_area');
    output_area.text("bazinga");

    // pick genre
    const genre = pic_genre()
    output_area.text(genre);
};


async function main(){
    console.log("MAIN")
    let r = await fetch('../../assets/json/genres_v0.json')
    let json  = await r.json()
    delete json.__meta__
    globalThis.genres = json

    console.log(json)

    document.getElementById('generate_button').onclick = on_generate;

}



main();



