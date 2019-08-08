const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const request = require("request");

// @route   GET /wh
// @desc    Root endpoint for API v1
// @access  Public
router.get("/", (req, res) => {
  res.send(
    JSON.stringify({
      error: "No word is given!",
      endpoint: "https://dict.niweera.gq/wh/{word}",
      note: "Only use a singular word for queries "
    })
  );
});

// @route   GET /wh/:word
// @desc    Get definition for the word given
// @access  Public
router.get("/:word", function(req, res) {
  const queriedWord = req.params.word.split(/[^A-Za-z]/)[0].toLowerCase();

  if (!queriedWord) {
    res.send(
      JSON.stringify({
        error: "No word is given!",
        endpoint: "https://dict.niweera.gq/wh/{word}",
        note: "Only use a singular word for queries"
      })
    );
  } else {
    var url;

    url = `https://www.google.com/search?&q=define+${queriedWord}`;
    url = encodeURI(url);
    request(
      {
        method: "GET",
        url: url,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
        }
      },
      function(err, response, body) {
        if (err) {
          return console.error(err);
        }

        const $ = cheerio.load(body);

        var dictionary = {},
          word = $("div.dDoNo span")
            .first()
            .text(),
          definition,
          mainPart,
          defns;

        if (word.length < 1) {
          //res.header("Access-Control-Allow-Origin", "*");
          return res.status(404).send(
            JSON.stringify({
              error: "Cannot define the given word"
            })
          );
        }

        var queryWord = "";
        queryWord = $("div.dDoNo span")
          .first()
          .text();

        if (
          queryWord.replace(/[^A-Za-z]/g, "").toLowerCase().length + 1 ==
            queriedWord.length &&
          queriedWord.slice(-1) == "s"
        ) {
          dictionary.word = queriedWord;
        } else if (
          queryWord.replace(/[^A-Za-z]/g, "").toLowerCase().length + 1 <=
            queriedWord.length &&
          queriedWord.slice(-1) != "s"
        ) {
          return res.status(404).send(
            JSON.stringify({
              error: "Cannot define the given word"
            })
          );
        } else {
          dictionary.word = queryWord.replace(/[^A-Za-z]/g, "").toLowerCase();
        }

        dictionary.definition = "";

        (definition = ""),
          (defns = $(".lr_dct_ent.vmod.XpoqFe")),
          (mainPart = defns.first().find(".lr_dct_sf_h"));

        mainPart.each(function(i, element) {
          var selector = $(".lr_dct_sf_sens")
            .eq(i)
            .find("div[style='margin-left:20px'] > .PNlCoe");

          selector.each(function(i, element) {
            var newDefinition = "";

            newDefinition = $(this)
              .find("div[data-dobid='dfn']")
              .text();

            definition = newDefinition;
            return false;
          });
          return false;
        });

        dictionary.definition = definition;

        Object.keys(dictionary).forEach(key => {
          Array.isArray(dictionary[key]) &&
            !dictionary[key].length &&
            delete dictionary[key];
        });

        res.header("Content-Type", "application/json");
        //res.header("Access-Control-Allow-Origin", "*");
        res.send(JSON.stringify(dictionary, null, 4));
      }
    );
  }
});

// @route   GET /wh/*
// @desc    Return 404 for all unidentified routes
// @access  Public
const fourNaughtFour = {
  error: "Invalid Endpoint!",
  endpoint: "https://dict.niweera.gq/wh/{word}",
  note: "Only use a singular word for queries"
};
router.get("*", function(req, res) {
  res.status(404).json(fourNaughtFour);
});

module.exports = router;
