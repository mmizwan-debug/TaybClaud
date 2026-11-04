# IndexNow

IndexNow tells Bing (which also feeds ChatGPT search and Copilot), Yandex, Seznam and Naver when pages change.

- Key: `ecc8066d7527cf0d78978d4123cd781e`
- Key file: https://taybmeals.com/ecc8066d7527cf0d78978d4123cd781e.txt (file at the repo root, contains only the key)
- Submit URLs (POST JSON to https://api.indexnow.org/indexnow):

```json
{"host":"taybmeals.com","key":"ecc8066d7527cf0d78978d4123cd781e","keyLocation":"https://taybmeals.com/ecc8066d7527cf0d78978d4123cd781e.txt","urlList":["https://taybmeals.com/", "..."]}
```

Do not delete or change the key file, or submissions stop working.
