const router = require("express")();

// views settings are set independently for this domain router
// for any other domain, omit these next two lines
router.set("views", join(__dirname, "views"));
router.set("view engine", "ejs");

/* GET / */
router.get("/", function(req, res)
{
	res.send("Hello World :)");
});

module.exports = router;
