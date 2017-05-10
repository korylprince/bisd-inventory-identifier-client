# Info

This is the chrome extension interface for [bisd-inventory-identifier-server](https://github.com/korylprince/bisd-inventory-identifier-server), an API to find information about BISD Chromebooks.

# Install

```
git clone https://github.com/korylprince/bisd-inventory-identifier-client.git
cd bisd-inventory-identifier-client
npm install
```

# Development

```
API_BASE="<api_location>" SEARCH_BASE="<search_location>" npm run dev
```

# Build for Production

```
API_BASE="<api_location>" SEARCH_BASE="<search_location>" npm run build-prod
```

# Linting

```
npm run lint
```

# Libraries

(Of particular note)

* [vue](https://vuejs.org/)
* [vuetify](https://github.com/vuetifyjs/vuetify)

See package.json for all dependencies.
