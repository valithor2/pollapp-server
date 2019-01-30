import {Request,Response,NextFunction} from "express"
import {User, UserDocument, UserData} from "../../models/user"
import {Class, ClassDocument} from "../../models/class"

export async function lookupClass(req:Request,res:Response,next:NextFunction,classid:String){
    let foundClass;
    try{
        foundClass = await Class.findById(classid);
    }catch(err){
        if(classid.length==7){
            try{
                foundClass = await Class.find({department:{$eq: classid.substr(0,4).toUpperCase()}, number: {$eq: classid.substr(4,3)}});
            }catch(err2){
                res.status(400);
                res.json({
                    error:"Invalid class id provided"
                })
            }
        }else{
            res.status(400);
                res.json({
                    error:"Invalid class id provided"
                })
        }
    }
    if(foundClass){
        res.locals.foundClass = foundClass;
        next();
    }else{
        res.status(400);
        res.json({
            error:"Class not found"
        });
    }

}

export async function getClasses(req:Request,res:Response,next:NextFunction){
    let classes = await Class.find({}).populate("teacher","firstname lastname email").select("department number title teacher");
    res.json(classes);
}

export async function getClass(req:Request,res:Response,next:NextFunction){
    let foundClass = await Class.findById(res.locals.foundClass._id).populate("teacher","firstname lastname email").select("department number title teacher");
    res.json(foundClass);
}

export async function createClass(req:Request,res:Response,next:NextFunction){
        let department = req.body.department;
        let number = req.body.number;
        let title = req.body.title;
        let teacher = req.body.teacher;


        User.findById(teacher).then((doc)=>{
                try{
                    let newClass = new Class({department:department,number:number,title:title,teacher:doc,students:[],assignments:[]});
                    newClass.save().then((val)=>{
                        res.json(newClass);
                    }).catch((err)=>{
                        res.status(400);
                        res.json(err);
                    });
                    
                }catch(err){
                    res.status(400);
                    res.json(err);
                }
            }
        ).catch((err)=>{
            User.find({username: {$eq: teacher}}).then((doc)=>{
                try{
                    let newClass = new Class({department:department,number:number,title:title,teacher:doc,students:[],assignments:[]});
                    newClass.save();
                    res.json(newClass);
                }catch(err){
                    res.status(400);
                    res.json(err);
                }
            })
        });

}

export async function updateClass(req:Request,res:Response,next:NextFunction){
    try{
        for(let property in req.body){
            if(property in res.locals.foundClass){
                if(property=="teacher"){
                    let teacher;
                    try{
                        teacher = User.findById(req.body[property]);
                    }catch(err){
                        teacher = User.find({username:{$eq:req.body[property]}});
                    }
                    if(teacher){
                        res.locals.foundClass[property] = teacher;
                    }
                }else if(property!="students" && property!="assignments" && property != "_id"){
                    res.locals.foundClass[property] = req.body[property]
                }
            }
        }
        try{
            await res.locals.foundClass.save();
            res.json(res.locals.foundClass);
        }catch(err){
            res.json(400);
            res.json(err);
        }
    }catch(err){
        res.status(500);
        res.json(err);
    }
}

export function deleteClass(req:Request,res:Response,next:NextFunction){
    Class.findByIdAndRemove(res.locals.foundClass._id).then(()=>{
        res.json({
            success: "Class was deleted"
        })
    }).catch((err)=>{
        res.render(err);
    });        
}