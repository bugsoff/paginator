# Paginator

## Install

```html
    <script src="/url/to/js/paginator.min.js"></script>
    <link rel="stylesheet" href="/url/to/css/paginator.min.css">
```

## Usage

```javascript
    arg = {
        total: 101,                 // total items in dataset
        per_page: 10,               // items per one page
        start: start,               // start show from item number
        neighbor_pages: 2,          // show some neighbor pages near to current page
        params: {type: "test"},     // additional parameters to placed to query string
    }

    paginator(arg)                  // render paginator
```
