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
function getAllStudents(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let students = yield class_1.Class.findById(res.locals.foundClass).populate("students").select("students");
            res.json(students);
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    });
}
exports.getAllStudents = getAllStudents;
function addStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        class_1.Class.findByIdAndUpdate(res.locals.foundClass._id, { $push: { students: res.locals.user._id } }).then((val) => {
            res.status(200);
            res.json({
                "Success": "User added"
            });
        }).catch((err) => {
            res.status(500);
            res.json(err);
        });
    });
}
exports.addStudent = addStudent;
function deleteStudent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let index = res.locals.foundClass.students.indexOf(res.locals.user._id);
        if (index > -1) {
            res.locals.foundClass.students.splice(index, 1);
            try {
                yield res.locals.foundClass.save();
                res.json({
                    "Success": "User deleted"
                });
            }
            catch (err) {
                res.status(500);
            }
        }
        else {
            res.json({
                "Error": "Student is not in the class"
            });
        }
    });
}
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=rosters.js.map