let rectangles = [
    { width: 50, height: 50, color: "red" },
    { width: 14, height: 21, color: "red" },
    { width: 13, height: 32, color: "red" },
    { width: 10, height: 10, color: "black" },
    { width: 54, height: 30, color: "green" },
    { width: 34, height: 34, color: "black" },
    { width: 40, height: 34, color: "black" }
];
let hasColor = (color) => (rectangle) => rectangle.color == color;
let flow = (...funcArray) => (array) => funcArray.reduce((prevFunc, currFunc) => currFunc(prevFunc), array);
let combine = (...funcArray) => (array) => funcArray.reduceRight((prevFunc, currFunc) => currFunc(prevFunc), array);
let filter = (fn) => (array) => array.filter(fn);
let map = (fn) => (array) => array.map(fn);
let reduce = (fn, initialValue) => (array) => array.reduce(fn, initialValue);
let max = (array) => array.reduce((prevValue, currValue) => Math.max(prevValue,currValue), 0);
let sum = (array) => array.reduce((prevValue, currValue) => prevValue + currValue, 0);

let or = (firstFunc, secondFunc) => (value) => firstFunc(value) || secondFunc(value);
let and = (firstFunc, secondFunc) => (value) => firstFunc(value) && secondFunc(value);
let any = (...funcs) => data => funcs.reduce((acc, fnc) => acc || fnc(data), false);
let all = (...funcs) => data => funcs.reduce((acc, fnc) => acc && fnc(data), true);

let isBlack = hasColor("black");
let isRed = hasColor("red");

function isSquare(rectangle) {
    return rectangle.width == rectangle.height;
}
function notSquare(rectangle) {
    return rectangle.width !== rectangle.height;
}
function calcArea(rectangle) {
    return rectangle.width * rectangle.height;
}
function calcPerimeter(rectangle) {
    return 2 * (rectangle.width + rectangle.height);
}

let maxBlackArea = combine(
    max,
    map(calcArea),
    filter(and(isBlack, isSquare))
);
let maxRedPerimeter = flow(
    filter(and(isRed,notSquare)),    
    map(calcPerimeter),
    sum
);

console.log(`max black square area: ${maxBlackArea(rectangles)}`);
console.log(`sum red rectangle peremeters: ${maxRedPerimeter(rectangles)}`);

