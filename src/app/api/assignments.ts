import {Request,Response,NextFunction} from "express"
import {User, UserDocument} from "../../models/user"
import {Class, ClassDocument} from "../../models/class"

export async function lookupAssignment(req:Request,res:Response,next:NextFunction,assignnum:string){
    let num = Number.parseInt(assignnum);
    if(num!==undefined && num <= res.locals.foundClass.assignments.length && num >= 1){
        res.locals.assignnum = num-1;
        next();
    }else{
        res.status(400);
        res.json({
            "Error": "Invalid assignment number provided"
        })
    }
}

export async function getAllAssignments(req:Request,res:Response,next:NextFunction){
    res.json(res.locals.foundClass.assignments);
}

export async function getAssignment(req:Request,res:Response,next:NextFunction){
    res.json(res.locals.foundClass.assignments[res.locals.assignnum]);
}

export async function createAssignment(req:Request,res:Response,next:NextFunction){
    let c = res.locals.foundClass._id;
    let title = req.body.title;
    if(title!==undefined){
        let points = req.body.points;
        Class.findByIdAndUpdate(res.locals.foundClass._id,{$push: {assignments:{title:title,points:points,class:c}}}).then((val)=>{
            res.json({
                "Success":"Assignment was added"
            });
        }).catch((err)=>{
            res.status(400);
            res.json(err);
        })
    }else{
        res.status(400);
        res.json({
            "Error":"title is required"
        })
    }
}

export async function updateAssignment(req:Request,res:Response,next:NextFunction){
}

export async function deleteAssignment(req:Request,res:Response,next:NextFunction){
    res.locals.foundClass.assignments.splice(res.locals.assignnum,1);
    try{
        await res.locals.foundClass.save();
        res.json(res.locals.foundClass.assignments);
    }catch(err){
        res.status(500);
        res.json(err);
    }
}