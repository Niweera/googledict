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

## Related Projects

### [WordHunter](https://github.com/Niweera/wordhunter)

WordHunter application is under development. It provides possible words for given set of characters.

