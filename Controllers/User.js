 const register = (res,req)=>{
    res.status(201).json({
        succsess:true,
        msg:"User register Sucssesfully"
    })
 }
 const login = (res,req)=>{
    res.status(200).json({
        succsess:true,
        msg:"User login Sucssesfully"
    })
 }

 module.exports={register,login}










 