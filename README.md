# A Simplified Google Dictionary API

## Getting Started

To view the meaning of a specific word, enter the word at the root endpoint. GoogleDict API v2 now supports extended definitions on a given word.

### GoogleDict v1

Eg. `https://dict.niweera.gq/hello`, will give you the Google dictionary definition of **hello**:

```json
{
  "word": "hello",
  "definition": "used as a greeting or to begin a telephone conversation."
}
```

### GoogleDict v2

Eg. `https://dict.niweera.gq/v2/hello`, will give you the Google dictionary definition of **hello**:

```json
{
  "word": "hello",
  "definition": {
    "exclamation": [
      "used as a greeting or to begin a telephone conversation."
    ],
    "noun": [
      "an utterance of ‘hello’; a greeting."
    ],
    "verb": [
      "say or shout ‘hello’."
    ]
  }
}
```

### Paths

| Location | Endpoint |
| :-- | :-- |
| v1 Root path | `https://dict.niweera.gq/`|
| v2 Root path | `https://dict.niweera.gq/v2`|

### HTTP request and query methods

| Method | Endpoint | Query | Description | Examples |
| :-- | :-- | :-- | :-- | :-- |
| `GET` | `/` | `{word}` | Give JSON response with the definitions of the `{word}`. | [`hello`](https://dict.niweera.gq/hello) |
| `GET` | `/v2` | `{word}` | Give JSON response with the definitions of the `{word}`. | [`hello`](https://dict.niweera.gq/v2/hello) |

### Invalid use of GoogleDict

| Method | Endpoint | Query | Description | Examples |
| :-- | :-- | :-- | :-- | :-- |
| `GET` | `/` | `{word anotherWord}` | The API will only refer the first word given. All following words will be ignored. Please use only a single word in the query. | [`hell fire`](https://dict.niweera.gq/hell%20fire) |
| `GET` | `/v2` | `{word anotherWord}` | The API will only refer the first word given. All following words will be ignored. Please use only a single word in the query. | [`hell fire`](https://dict.niweera.gq/v2/hell%20fire) |

## Related Projects

### [WordHunter](https://github.com/Niweera/wordhunter)

[WordHunter](https://wordhunter.niweera.gq) application is under development. It provides possible words for given set of characters.

## Meta

Nipuna Weerasekara – [@Niweera](https://twitter.com/Niweera) – w.nipuna@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/Niweera/googledict](https://github.com/Niweera/googledict)

## Contributing

1. Fork it (<https://github.com/Niweera/googledict/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Acknowledgement

Without the insights from this repo [googleDictionaryAPI](https://github.com/meetDeveloper/googleDictionaryAPI) by [meetDeveloper](https://github.com/meetDeveloper), the development of GoogleDict Dictionary API service would be impossible...

