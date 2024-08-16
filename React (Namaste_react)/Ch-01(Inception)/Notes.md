## Q: What is `Emmet`?

A: `Emmet` is a powerful toolkit for web developers and designers that greatly enhances their HTML and CSS workflow. It helps in writing code more quickly and efficiently by providing shortcuts for common HTML and CSS patterns.

### **i) HTML Expansion**: Emmet allows us to quickly generate HTML code by using abbreviations.

For instance,
`html:5`- generates html5 boilerplate,
`lorem`- generates lorem ipsum text,
`lorem5`- generates 5 words of lorem ipsum text

### **ii) CSS Abbreviations**: Emmet also supports expanding CSS abbreviations

For instance, `m10`

```
margin: 10px;
```

### iii) Nested Elements: We can use > to nest elements within each other.

For instance, `ul>li*3` would generate an unordered list with three list items.

```
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

### iv) Siblings: We can use + to create sibling elements.

For instance, `div+p+bq` would create a div, followed by a p, and then a blockquote.

```
<div></div>
<p></p>
<blockquote></blockquote>
```

### v) Multiplication: We can use the \* operator to create multiple elements.

For instance, `ul>li*5` would generate an unordered list with five list items.

```
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

### vi) Numbering: Use $ to indicate a number that should be incremented in each subsequent item.

For instance, `ul>li.item$*3` would create list items with classes item1, item2, and item3.

```
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
</ul>
```

### vii) Grouping: Parentheses can be used to group elements.

For instance, `ul>(li.item$*2>a{Item $})*3` would generate a list with nested items and anchor tags.

```
<ul>
    <li class="item1"><a href="">Item 1</a></li>
    <li class="item2"><a href="">Item 2</a></li>
    <li class="item1"><a href="">Item 1</a></li>
    <li class="item2"><a href="">Item 2</a></li>
    <li class="item1"><a href="">Item 1</a></li>
    <li class="item2"><a href="">Item 2</a></li>
</ul>
```

## Q: Difference between a `Library and Framework`?

A:
| Feature | **`Library`** | **`Framework`** |
|---|---|---|
| **`Control`** | Developer has more control | Framework has more control |
| **`Usage`** | Used for specific tasks or utilities | Used to build entire applications |
| **`Inversion of Control`** | Developer controls flow | Framework controls parts of the flow |
| **`Example`** | React.js | Angular |

## Q: What is `CDN`? Why do we `use` it?

A: `CDN` stands for Content Delivery Network. It is a network of distributed servers located in various data centers around the world.
The primary purpose of a CDN is to deliver web content, such as images, videos, scripts, stylesheets, and other static or dynamic resources, to users more efficiently and with higher performance.
A CDN solves this problem by replicating the website's content on multiple servers spread across various geographic locations. When a user requests a specific piece of content, the CDN automatically routes the request to the nearest server in its network. This way, the content is delivered from a server closer to the user, reducing latency and ensuring faster loading times.

### Key benefits of using a CDN include:

- **Improved website performance:** Faster load times and reduced latency leads to a better user experience, lower bounce rates, and higher engagement.
- **Scalability:** CDNs can handle large amounts of traffic and distribute it across their network, reducing the load on the origin server.

## Q: Why is `React known as React`?

A: `React` is known as "React" because of its core principle, which is to efficiently react to changes in a component's state and efficiently update the user interface (UI) accordingly. The name "React" reflects the core concept of how the library operates.

## Q: What is `crossorigin in script tag`?

A: When a web page includes resources from different domains, it can introduce security and privacy concerns. Modern web browsers implement the same-origin policy, which restricts web pages from making requests to a different domain than the one that served the web page. This policy is designed to prevent malicious websites from accessing sensitive data from other domains without permission.

## Q What is difference between `React and ReactDOM`?

A:
| Feature | **`React`** | **`ReactDOM`** |
|---|---|---|
| **`Purpose`** | Core library for building UI components | Integration between React and DOM |
| **`Functionality`** | Defines components, handles lifecycle, manages state | Renders React components to the DOM |
| **`Key Method`** | - | ReactDOM.render() attach a React component to a specific HTML element in the DOM |

## Q What is difference between `react.development.js` and `react.production.js` files via CDN?

A:
| Feature | **`react.development.js`** | **`react.production.js`** |
|---|---|---|
| **`Purpose`** | Development | Production |
| **`Code`** | Full, unminified | Minified and optimized |
| **`Size`** | Larger | Smaller |
| **`Error Messages`** | Descriptive error messages and warnings | No error messages or warnings |
| **`Performance`** | Slower | Faster |
| **`Use Case`** | Development | Production |

## Q What is `async and defer`?

A: Both are async way of loading a scripts
| Feature | **`Defer`** | **`Async`** |
|---|---|---|
| **`Loading`** | In the background | In the background |
| **`Execution Timing`** | After DOM is fully built (before DOMContentLoaded) | When the script is done loading |
| **`Relationship with DOMContentLoaded`** | Waits for DOMContentLoaded | No guarantee, can happen before or after |
| **`Script Execution Order`** | Order they appear in the document | Load-first order |
| **`Use Cases`** | Scripts that need the whole DOM and/or their relative execution order is important | Independent scripts, like counters or ads, where relative execution order doesn't matter |

```
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
// same way test for async
```

**`Dynamic Scripts`** behave as “async” by default. This can be changed if we explicitly set script.async=false. Then scripts will be executed in the document order, just like defer.

```
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js runs first because of async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

## References:

- https://beta.reactjs.org/apis/react/createElement
- https://www.youtube.com/watch?v=IrHmpdORLu8
