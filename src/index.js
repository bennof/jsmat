import * as tools from "./js/tools";
import { Matrix, Vector, Vec2, Vec3, Vec4 } from "./js/vector";
import * as plot from "./js/plot";

import * as stat from "./js/stat/index";
import * as filter from "./js/filter/index";
import * as solver from "./js/sim/solver";

//import 'jsdox/dist/styles.css';

const VERSION = "0.0.1"

// simpliefy
var Mat = Matrix;
var Vec = Vector;

export {
    VERSION,
    Matrix, Vector, Vec2, Vec3, Vec4, 
    Mat, Vec,
    stat,
    filter,
    solver,
    plot,
}