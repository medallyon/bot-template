const fs = require("fs-extra")
	, express = require("express")
	, router = express();

router.use(express.static(join(__dirname, "content")));

const domainDir = join(__webdir, "domains")
	, domains = fs.readdirSync(domainDir);

for (const domain of domains)
{
	const domainPath = join(domainDir, domain);
	if (!fs.statSync(domainPath).isDirectory())
		continue;

	// make any domain's 'i' folder statically available under this domain:
	// (vhost) https://i.bot-template.io/{domain}/assets/etc
	// (no vhost) https://bot-template.io/i/{domain}/assets/etc
	if (fs.readdirSync(domainPath).indexOf("i") > -1 && fs.statSync(join(domainPath, "i")).isDirectory())
		router.use(`/${domain}`, express.static(join(domainPath, "i")));
}

module.exports = router;
