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
const user_1 = require("../../models/user");
const class_1 = require("../../models/class");
function lookupClass(req, res, next, classid) {
    return __awaiter(this, void 0, void 0, function* () {
        let foundClass;
        try {
            foundClass = yield class_1.Class.findById(classid);
        }
        catch (err) {
            if (classid.length == 7) {
                try {
                    foundClass = yield class_1.Class.find({ department: { $eq: classid.substr(0, 4).toUpperCase() }, number: { $eq: classid.substr(4, 3) } });
                }
                catch (err2) {
                    res.status(400);
                    res.json({
                        error: "Invalid class id provided"
                    });
                }
            }
            else {
                res.status(400);
                res.json({
                    error: "Invalid class id provided"
                });
            }
        }
        if (foundClass) {
            res.locals.foundClass = foundClass;
            next();
        }
        else {
            res.status(400);
            res.json({
                error: "Class not found"
            });
        }
    });
}
exports.lookupClass = lookupClass;
function getClasses(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let classes = yield class_1.Class.find({}).populate("teacher", "firstname lastname email").select("department number title teacher");
        res.json(classes);
    });
}
exports.getClasses = getClasses;
function getClass(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let foundClass = yield class_1.Class.findById(res.locals.foundClass._id).populate("teacher", "firstname lastname email").select("department number title teacher");
        res.json(foundClass);
    });
}
exports.getClass = getClass;
function createClass(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let department = req.body.department;
        let number = req.body.number;
        let title = req.body.title;
        let teacher = req.body.teacher;
        user_1.User.findById(teacher).then((doc) => {
            try {
                let newClass = new class_1.Class({ department: department, number: number, title: title, teacher: doc, students: [], assignments: [] });
                newClass.save().then((val) => {
                    res.json(newClass);
                }).catch((err) => {
                    res.status(400);
                    res.json(err);
                });
            }
            catch (err) {
                res.status(400);
                res.json(err);
            }
        }).catch((err) => {
            user_1.User.find({ username: { $eq: teacher } }).then((doc) => {
                try {
                    let newClass = new class_1.Class({ department: department, number: number, title: title, teacher: doc, students: [], assignments: [] });
                    newClass.save();
                    res.json(newClass);
                }
                catch (err) {
                    res.status(400);
                    res.json(err);
                }
            });
        });
    });
}
exports.createClass = createClass;
function updateClass(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let property in req.body) {
                if (property in res.locals.foundClass) {
                    if (property == "teacher") {
                        let teacher;
                        try {
                            teacher = user_1.User.findById(req.body[property]);
                        }
                        catch (err) {
                            teacher = user_1.User.find({ username: { $eq: req.body[property] } });
                        }
                        if (teacher) {
                            res.locals.foundClass[property] = teacher;
                        }
                    }
                    else if (property != "students" && property != "assignments" && property != "_id") {
                        res.locals.foundClass[property] = req.body[property];
                    }
                }
            }
            try {
                yield res.locals.foundClass.save();
                res.json(res.locals.foundClass);
            }
            catch (err) {
                res.json(400);
                res.json(err);
            }
        }
        catch (err) {
            res.status(500);
            res.json(err);
        }
    });
}
exports.updateClass = updateClass;
function deleteClass(req, res, next) {
    class_1.Class.findByIdAndRemove(res.locals.foundClass._id).then(() => {
        res.json({
            success: "Class was deleted"
        });
    }).catch((err) => {
        res.render(err);
    });
}
exports.deleteClass = deleteClass;
//# sourceMappingURL=classes.js.map