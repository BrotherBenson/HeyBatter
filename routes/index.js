var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('./menus/main.ejs');
});

router.get('/league', function(req, res, next) {
  res.render('./league/league.ejs');
});

router.get('/game', function(req, res, next) {
  res.render('./game/game.ejs');
});

router.get('/playoffs', function(req, res, next) {
  res.render('./schedule/playoffs.ejs');
});

router.get('/playerCareer', function(req, res, next) {
  res.render('./menus/playerCareer.ejs');
});

router.get('/coachCareer', function(req, res, next) {
  res.render('./menus/coachCareer.ejs');
});

router.get("/meetings/gm", function(req, res, next){
	res.render('./meetings/gm.ejs');
});

router.get("/meetings/coach", function(req, res, next){
	res.render('./meetings/coach.ejs');
});

router.get("/meetings/player", function(req, res, next){
	res.render('./meetings/player.ejs');
});

router.get("/meetings/agent", function(req, res, next){
	res.render('./meetings/agent.ejs');
});

router.get("/schedule/team", function(req, res, next){
	res.render('./schedule/team.ejs');
});

router.get("/game", function(req, res, next){
	res.render('./game/game.ejs');
});

router.get("/team/roster", function(req, res, next){
	res.render('./team/roster.ejs');
});

router.get("/team/depthchart", function(req, res, next){
	res.render('./team/depthchart.ejs');
});

router.get("/league/news", function(req, res, next){
	res.render('./league/news.ejs');
});

router.get("/league/leaders", function(req, res, next){
	res.render('./league/leaders.ejs');
});

module.exports = router;