import {Request,Response,NextFunction} from "express"
import {User, UserDocument} from "../../models/user"
import {Class, ClassDocument} from "../../models/class"

export async function getAllStudents(req:Request,res:Response,next:NextFunction){
  try{
    let students = await Class.findById(res.locals.foundClass).populate("students").select("students");
    res.json(students);
  }catch(err){
    res.status(500);
    res.json(err);
  }
}

export async function addStudent(req:Request,res:Response,next:NextFunction){
  Class.findByIdAndUpdate(res.locals.foundClass._id,{$push: {students: res.locals.user._id}}).then((val)=>{
    res.status(200)
    res.json({
      "Success":"User added"
    })
  }).catch((err)=>{
    res.status(500);
    res.json(err)
  })
}

export async function deleteStudent(req:Request,res:Response,next:NextFunction){

  let index = res.locals.foundClass.students.indexOf(res.locals.user._id);
  if(index>-1){
    res.locals.foundClass.students.splice(index,1);
    try{
      await res.locals.foundClass.save();
      res.json({
        "Success": "User deleted"
      })
    }catch(err){
      res.status(500);
    }  
  }else{
    res.json({
      "Error":"Student is not in the class"
    })
  }
}