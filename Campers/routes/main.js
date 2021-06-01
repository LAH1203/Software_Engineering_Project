var express = require('express');
var router = express.Router();
var msg = require('dialog');
const path = require('path');
const Campground = require( '../schema/Campground')

// 메인(검색) 화면
router.get(['/', '/main'], function(req, res) {
    let camp_name = []
    let camp_id = []
    let camp_location = []

    Campground.find({},{Campground_name:true,_id:true,Campground_location:true},function(error, campgrounds){
        if(error){
            console.log(error);
        } else {

            for(var i = 0; i<campgrounds.length; i++) {
                camp_name.push(campgrounds[i].Campground_name);
                camp_id.push(campgrounds[i]._id);
                camp_location.push(campgrounds[i].Campground_location);
            }
            res.render('main_page', { camp_name: camp_name, camp_id: camp_id, camp_location: camp_location });
        } 
    });
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
        .then((result) => {
            for(var i = 0; i < result.length ; i++) { 
                camp_name.push(result[i].Campground_name) ;
                camp_id.push(result[i]._id);
                camp_location.push(result[i].Campground_location);
            }
            res.render('main_page', { 
                camp_name: camp_name, camp_id: camp_id, camp_location: camp_location });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;