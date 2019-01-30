import { Router } from "express";
import * as bodyParser from "body-parser";
import * as authentication from "./authentication"
import * as users from "./users";
import * as classes from "./classes";
import * as rosters from "./rosters";
import * as assignments from "./assignments"
//import * as students from "./students";

export const router = Router();

router.param("userid", users.lookupUsers);
router.param("classid",classes.lookupClass);

router.use(bodyParser.json());
//router.use("/",authentication.authenticate);

//router.use("/users/",authentication.checkBoth);
router.get("/users/",users.getUsers);
router.get("/users/:userid",users.getUser);
//router.post("/users/",authentication.checkAdmin);
//router.put("/users/:userid",authentication.checkAdmin);
//router.delete("/users/:userid",authentication.checkAdmin);
router.post("/users/",users.postUser);
router.put("/users/:userid",users.putUser)
router.delete("/users/:userid",users.deleteUser);

router.get("/classes/",classes.getClasses);
router.get("/classes/:classid",classes.getClass);
//router.post("/classes/",authentication.checkBoth);
//router.post("/classes/:classid",authentication.checkBoth);
//router.delete("/classes/:classid",authentication.checkBoth);
router.post("/classes/",classes.createClass);
router.post("/classes/:classid",classes.updateClass);
router.delete("/classes/:classid",classes.deleteClass);

//router.use("/rosters/",authentication.checkBoth);
router.get("/rosters/:classid/",rosters.getAllStudents);
router.put("/rosters/:classid/:userid",rosters.addStudent);
router.delete("/rosters/:classid/:userid",rosters.deleteStudent);

router.get("/assignments/:classid/",assignments.getAllAssignments);
router.get("/assignments/:classid/:assignnum");
//router.post("/assignments/:classid/",authentication.checkBoth);
//router.put("/assignments/:classid/:assignnum",authentication.checkBoth);
//router.delete("/assignments/:classid/:assignnum",authentication.checkBoth);
router.post("/assignments/:classid/",assignments.createAssignment);
router.put("/assignments/:classid/:assignnum",assignments.updateAssignment);
router.delete("/assignments/:classid/:assignnum",assignments.deleteAssignment);

