# A Simplified Google Dictionary API

## Getting Started

To use, pass the query string with parameter `define` equal to the word you want to get the meaning of.

Eg. `/?define=hello`, will give you the Google dictionary definition of **hello**:

```json
{
  "word": "hel·lo",
  "definition": {
    "exclamation": [
      "used as a greeting or to begin a telephone conversation."
    ],
    "noun": [
      "an utterance of “hello”; a greeting."
    ],
    "verb": [
      "say or shout “hello”; greet someone."
    ]
  }
}
```

### Paths

| Location | Endpoint |
| :-- | :-- |
| Root path | `https://dict.niweera.gq/`|

### HTTP request and query methods

| Method | Endpoint | Query | Description | Examples |
| :-- | :-- | :-- | :-- | :-- |
| `GET` | `/` | `?define={word}` | Give JSON response with the definitions of the `{word}`. | [`?define=hello`](https://dict.niweera.gq/?define=hello) |

### Invalid use of GoogleDict

| Method | Endpoint | Query | Description | Examples |
| :-- | :-- | :-- | :-- | :-- |
| `GET` | `/` | `?define={word+anotherWord}` | Will throw an error. Please use only a single word in the query. | [`?define=hell+fire`](https://dict.niweera.gq/?define=hell+fire) |

## Related Projects

### [WordHunter](https://github.com/Niweera/wordhunter)

[WordHunter](https://wordhunter.niweera.gq) application is under development. It provides possible words for given set of characters.

## Acknowledgement

Without the insights from this repo [googleDictionaryAPI](https://github.com/meetDeveloper/googleDictionaryAPI) by [meetDeveloper](https://github.com/meetDeveloper), the development of GoogleDict Dictionary API service would be impossible...

