"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("../../models/class");
function lookupAssignment(req, res, next, assignnum) {
    return __awaiter(this, void 0, void 0, function* () {
        let num = Number.parseInt(assignnum);
        if (num !== undefined && num <= res.locals.foundClass.assignments.length && num >= 1) {
            res.locals.assignnum = num - 1;
            next();
        }
        else {
            res.status(400);
            res.json({
                "Error": "Invalid assignment number provided"
            });
        }
    });
}
exports.lookupAssignment = lookupAssignment;
function getAllAssignments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(res.locals.foundClass.assignments);
    });
}
exports.getAllAssignments = getAllAssignments;
function getAssignment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(res.locals.foundClass.assignments[res.locals.assignnum]);
    });
}
exports.getAssignment = getAssignment;
function createAssignment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let c = res.locals.foundClass._id;
        let title = req.body.title;
        if (title !== undefined) {
            let points = req.body.points;
            class_1.Class.findByIdAndUpdate(res.locals.foundClass._id, { $push: { assignments: { title: title, points: points, class: c } } }).then((val) => {
                res.json({
                    "Success": "Assignment was added"
                });
            }).catch((err) => {
                res.status(400);
                res.json(err);
            });
        }
        else {
            res.status(400);
            res.json({
                "Error": "title is required"
            });
        }
    });
}
exports.createAssignment = createAssignment;
function updateAssignment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.updateAssignment = updateAssignment;
function deleteAssignment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.locals.foundClass.assignments.splice(res.locals.assignnum, 1);
        try {
            yield res.locals.foundClass.save();
            res.json(res.locals.foundClass.assignments);
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    });
}
exports.deleteAssignment = deleteAssignment;
//# sourceMappingURL=assignments.js.map