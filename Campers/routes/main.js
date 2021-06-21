var express = require('express');
var router = express.Router();
var msg = require('dialog');
const path = require('path');
const Campground = require( '../schema/Campground')
const Review = require( '../schema/review')

// 메인(검색) 화면
router.get(['/', '/main'], function(req, res) {
    let camp_name = []
    let camp_id = []
    let camp_location = []

    Campground.find({},{Campground_name:true,_id:true,Campground_location:true})
    .then(async(campgrounds)=>{
        for(var i = 0; i<campgrounds.length; i++) {
            camp_name.push(campgrounds[i].Campground_name);
            camp_id.push(campgrounds[i]._id);
            camp_location.push(campgrounds[i].Campground_location);
        }
        var star_point = await calculateStar(camp_name);
        res.render('main_page', { camp_name: camp_name, camp_id: camp_id, camp_location: camp_location, star_point:star_point});    
    })
    
});
           
   

//post형식으로 프론트로부터 데이터 가져오기
router.post('/main', function(req, res) {
    let search = req.body.search;
    let camp_name = [];
    let camp_id = [];
    let camp_location = [];
    var mysort = { Campground_name : -1 };

    Campground.find({Campground_name: new RegExp(`${search}`)})
        .sort(mysort)
        .then(async(result) => {
            for(var i = 0; i < result.length ; i++) { 
                camp_name.push(result[i].Campground_name) ;
                camp_id.push(result[i]._id);
                camp_location.push(result[i].Campground_location);
            }
            var star_point = await calculateStar(camp_name);
            res.render('main_page', { 
                camp_name: camp_name, camp_id: camp_id, camp_location: camp_location,star_point:star_point });
        })
        .catch((err) => {
            console.log(err);
        });
});

//별점 통계
async function calculateStar(camp_name){
    let star_point =[];
    for(var i =0 ; i<camp_name.length; i++){
        await Review.find({Campground_name:`${camp_name[i]}`})
        .then((reviews)=> {
            if(!reviews || reviews.length==0 ){
                star_point.push(0.0);
            }
            else{
                let sum =0;
                for(var j=0; j<reviews.length; j++){
                    sum +=reviews[j].Star_point;
                }
                star_point.push((sum/reviews.length).toFixed(2));
            }
        })
    }
    return star_point;
}


module.exports = router;