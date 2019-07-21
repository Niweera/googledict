# A Simplified Google Dictionary API

## Getting Started

To view the meaning of a specific word, enter the word at the root endpoint.

Eg. `https://dict.niweera.gq/hello`, will give you the Google dictionary definition of **hello**:

```json
{
  "word": "hello",
  "definition": "used as a greeting or to begin a telephone conversation."
}
```

### Paths

| Location | Endpoint |
| :-- | :-- |
| Root path | `https://dict.niweera.gq/`|

### HTTP request and query methods

| Method | Endpoint | Query | Description | Examples |
| :-- | :-- | :-- | :-- | :-- |
| `GET` | `/` | `{word}` | Give JSON response with the definitions of the `{word}`. | [`hello`](https://dict.niweera.gq/hello) |

### Invalid use of GoogleDict

| Method | Endpoint | Query | Description | Examples |
| :-- | :-- | :-- | :-- | :-- |
| `GET` | `/` | `{word anotherWord}` | Will throw an error. Please use only a single word in the query. | [`hell fire`](https://dict.niweera.gq/hell%20fire) |

## Related Projects

### [WordHunter](https://github.com/Niweera/wordhunter)

[WordHunter](https://wordhunter.niweera.gq) application is under development. It provides possible words for given set of characters.

## Acknowledgement

Without the insights from this repo [googleDictionaryAPI](https://github.com/meetDeveloper/googleDictionaryAPI) by [meetDeveloper](https://github.com/meetDeveloper), the development of GoogleDict Dictionary API service would be impossible...

