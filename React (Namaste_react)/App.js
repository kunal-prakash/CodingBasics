import React from "react";
import ReactDOM from "react-dom/client";

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
creates the element which the browser understands and puts it up in the DOM.
*/
root.render(heading);

//ReactElement(Object) => HTML(Browser understands)

// For writing clean code in react ********JSX*******
