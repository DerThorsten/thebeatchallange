
var query_options = {}


const urlParams = new URLSearchParams(window.location.search);


function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

let genres = null



function get_option(n, type,default_value){
    var v = urlParams.get(n);
    if(v !== null && v !== undefined){
        if(type=="int"){
            return Number(v)
        }
        else if(type == "string"){
            return v;
        }
        else{
            throw Error(`"${type}" is unknown query paremter type`);
        }
    }
    else{
        return default_value;
    }
}


function get_options() {
    query_options.n_suggestions  =  get_option("n_suggestions", "int", 3);
    query_options.target_genre = get_option("target_genre", "string", "HipHop")
    console.log(query_options)
    
}

var select = document.getElementById('genreRootSelect');

function pick_genre(genres){
    
    let current_genres = genres
    let path = []  
    while(true){
        console.log(path)
        let genre = choose(Object.keys(current_genres))
        path.push(genre)
        let sub_genre = current_genres[genre]
        if (sub_genre === null){
            break
        }
        current_genres = sub_genre
    }
    //spin();
    return path
}



function on_generate(){


    console.log("generate")
    var outputList = $('#outputList');
    outputList.empty()

    for(let i=0; i<query_options.n_suggestions; ++i){


        const target_genre = query_options.target_genre;


        // pick root genre
        const root_genre = [target_genre].concat(pick_genre(globalThis.genres[target_genre]))
        // pick style genre
        const style_genre = pick_genre(globalThis.genres)

        
        const item = `${root_genre} in the style of ${style_genre}`;


        var li = document.createElement("li");
        li.appendChild(document.createTextNode(item));
        li.setAttribute("class", "list-group-item"); // added line
        outputList.append(li);


    }

};




async function main(){
    console.log("MAIN")

    get_options()

    let r = await fetch('../../assets/json/genres_v0.json')
    let json  = await r.json()
    delete json.__meta__
    globalThis.genres = json
        


    document.getElementById('generate_button').onclick = on_generate;

    on_generate();

}



main();



