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
    // console.log(queriedWord);

    var url;

    url = `https://www.lexico.com/en/definition/${queriedWord}`;
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

        if (!$(".hwg .hw").first()[0]) {
          // console.log(
          //   $(".searchHeading")
          //     .first()
          //     .text()
          // );
          // console.log(queriedWord + " is not present in Dictionary.");
          //res.header("Access-Control-Allow-Origin", "*");
          return res.status(404).send(
            JSON.stringify({
              error: "Cannot define the given word"
            })
          );
        }

        var dictionary = {},
          numberOfentryGroup,
          arrayOfEntryGroup = [],
          grambs = $("section.gramb"),
          entryHead = $(".entryHead.primary_homograph");

        let i,
          j = 0;

        for (i = 0; i < entryHead.length; i++) {
          arrayOfEntryGroup[i] =
            $("#" + entryHead[0].attribs.id + " ~ .gramb").length -
            $("#" + entryHead[i].attribs.id + " ~ .gramb").length;
        }
        arrayOfEntryGroup[i] = $(
          "#" + entryHead[0].attribs.id + " ~ .gramb"
        ).length;

        numberOfentryGroup = arrayOfEntryGroup.length - 1;

        for (i = 0; i < 1; i++) {
          var entry = {},
            word = $(".hwg .hw")[i].childNodes[0].nodeValue;

          var checkWord = word.toLowerCase();

          var checkWordArray = checkWord.split("");
          var queriedWordArray = queriedWord.split("");
          var isSubSet = checkWordArray.every(val =>
            queriedWordArray.includes(val)
          );

          if (queriedWord.length < checkWord.length || !isSubSet) {
            //res.header("Access-Control-Allow-Origin", "*");
            return res.status(404).send(
              JSON.stringify({
                error: "Cannot define the given word"
              })
            );
          } else if (
            checkWord.concat("s") == queriedWord ||
            checkWord.concat("es") == queriedWord
          ) {
            entry.word = queriedWord;
          } else {
            entry.word = checkWord;
          }

          var abbrv = $(grambs[0])
            .find(" > .ps.pos")
            .text();

          if (abbrv == "abbreviation") {
            //res.header("Access-Control-Allow-Origin", "*");
            return res.status(404).send(
              JSON.stringify({
                error: "Cannot define the given word"
              })
            );
          }

          entry.definition = "";

          let start = arrayOfEntryGroup[i],
            end = arrayOfEntryGroup[i + 1];

          for (j = start; j < end; j++) {
            $(grambs[j])
              .find(".semb")
              .each(function(j, element) {
                var newDefinition = null;

                $(element)
                  .find("> li")
                  .each(function(j, element) {
                    (item = $(element).find("> .trg")),
                      (definition = $(item)
                        .find(" > p > .ind")
                        .text());

                    if (definition.length === 0) {
                      definition = $(item)
                        .find(" > .ind")
                        .text();
                    }

                    if (definition.length > 0) {
                      newDefinition = definition;
                    } else {
                      return true;
                    }
                    if (newDefinition.length > 0) {
                      entry.definition = newDefinition;
                    } else {
                      return false;
                    }
                    return false;
                  });
                return false;
              });
            break;
          }

          if (entry.definition === "") {
            for (j = start; j < end; j++) {
              $(grambs[j])
                .find(".empty_sense")
                .each(function(j, element) {
                  var newDefinition = null;

                  $(element)
                    .find("> .crossReference")
                    .each(function(j, element) {
                      definition = $(element).text();

                      if (definition.length === 0) {
                        definition = $(item)
                          .find(" > .ind")
                          .text();
                      }

                      if (definition.length > 0) {
                        newDefinition = definition;
                      } else {
                        return true;
                      }
                      if (newDefinition.length > 0) {
                        entry.definition = newDefinition;
                      } else {
                        return false;
                      }
                      return false;
                    });
                  return false;
                });
              break;
            }
            dictionary = entry;
            if (dictionary.definition === "") {
              return res.status(404).send(
                JSON.stringify({
                  error: "Cannot define the given word"
                })
              );
            } else {
              console.log(dictionary);
            }
          } else {
            dictionary = entry;
            if (dictionary.definition === "") {
              return res.status(404).send(
                JSON.stringify({
                  error: "Cannot define the given word"
                })
              );
            } else {
              console.log(dictionary);
            }
          }

          break;
        }

        Object.keys(dictionary).forEach(key => {
          Array.isArray(dictionary[key]) &&
            !dictionary[key].length &&
            delete dictionary[key];
        });

        if ($(".hwg .hw").first()[0]) {
          res.header("Content-Type", "application/json");
          //res.header("Access-Control-Allow-Origin", "*");
          res.send(JSON.stringify(dictionary, null, 4));
        }
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
