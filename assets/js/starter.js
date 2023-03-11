// Importing JavaScript
//
// You have two choices for including Bootstrap's JS files—the whole thing,
// or just the bits that you need.


// Option 1
//
// Import Bootstrap's bundle (all of Bootstrap's JS + Popper.js dependency)

import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


// Option 2
//
// Import just what we need

// If you're importing tooltips or popovers, be sure to include our Popper.js dependency
// import "../../node_modules/popper.js/dist/popper.min.js";

// import "../../node_modules/bootstrap/js/dist/util.js";
// import "../../node_modules/bootstrap/js/dist/modal.js";


function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

let genres = null


var select = document.getElementById('genreRootSelect');

function pick_genre(genres){
    
    let current_genres = genres
    let path = []  
    while(true){
        let genre = choose(Object.keys(current_genres))
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
    
    let root_genre = null;
    let style_genre = null;

    var root_genre_item = select.options[select.selectedIndex];
    if(root_genre_item !== undefined){
        let root_genre_start = root_genre_item.text

        // pick root genre
        root_genre = [root_genre_start].concat(pick_genre(globalThis.genres[root_genre_start]))
        // pick style genre
        style_genre = pick_genre(globalThis.genres)

    }
    else{
        // root genre
        root_genre = pick_genre(globalThis.genres)
        // pick style genre
        style_genre = pick_genre(globalThis.genres)

    }
    output_area.text(`${root_genre} in the style of ${style_genre}`);

};


async function main(){
    console.log("MAIN")
    let r = await fetch('../../assets/json/genres_v0.json')
    let json  = await r.json()
    delete json.__meta__
    globalThis.genres = json
    



    for (const [key, value] of Object.entries(globalThis.genres)) {

        var opt = document.createElement('option');
        opt.value = key;
        opt.innerHTML = key;
        select.appendChild(opt);
    }



    document.getElementById('generate_button').onclick = on_generate;


}



main();



