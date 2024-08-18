import React from "react";
import ReactDOM from "react-dom/client";

//React.createElement => ReactElement(JS Object) => HTMLElement(render)

//JSX =>Babel transpiles it to React.createElement => ReactElement(JS Object) => HTMLElement(render)

const heading = React.createElement(
  "div", //Which element is to be created?
  { id: "child1" }, //Setting attributes to the element created
  //Siblings in an array
  [
    React.createElement("h1", {}, "I'm h1 tag"),
    React.createElement("h2", {}, "I'm h2 tag"),
  ]
);

console.log(heading); //object

const root = ReactDOM.createRoot(document.getElementById("root"));
/*
render() => renders a JS object(heading) and 
creates the element which the browser understands(html) and puts it up in the DOM.
*/
root.render(heading);

// JSX --> It is a convention where we merge JS and html(Not part of React/ Seperate Entity).
//         is not HTML inside JS.
//         HTML like, XML like syntax.
//         Transpiled before reaching JS Engine. (Babel)

const jsxHeading = <h1>Hi I'm JSX</h1>;
