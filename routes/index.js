var express = require('express');
var router = express.Router();


const api_key=process.env.API_KEY;
const path = "https://image.tmdb.org/t/p/w500/";


function reduireTexte(texte, longueurMax) {
    if (texte.length <= longueurMax) {
      return texte; 
    } else {
      let texteReduit = texte.substr(0, longueurMax); 
      texteReduit = texteReduit.substr(0, Math.min(texteReduit.length, texteReduit.lastIndexOf(" "))); 
      return texteReduit + "...";
    }
  }
 
  
//   const texteReduit = reduireTexte(texteOrigine, longueurMaximale);



router.get("/movies",(req,res)=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
    .then(response => response.json())
    .then(data =>{
    //    res.json(data);
        
        let lastReleases = [];
        for(let i =0; i<data.results.length;i++){
            let obj ={};
            obj.title= data.results[i].title;
            obj.poster= `${path}${data.results[i].poster_path}`;
            obj.voteAverage= data.results[i].vote_average;
            obj.voteCount= data.results[i].vote_count;
            obj.overview= reduireTexte(data.results[i].overview,100)
            lastReleases.push(obj)
        }
        //! a remplacer par un map §§§
        
        res.json({movies : lastReleases});

    })
    
})


module.exports = router;
