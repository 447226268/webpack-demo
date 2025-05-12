
import _ from 'lodash';
import Header from ".@components/Header.js";
import Body from "@components/a/b/Body.js";
const math = require('@/math.js');

console.log(math.add(5, 6));
console.log(_.join(['Hello', 'World'], ' '));
console.log(Header());
console.log(Body());