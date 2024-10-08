const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('../models');

function register(req,res)
{
    
    model.User.findOne({where:{email:req.body.email,mobile_no:req.body.mobile_no}}).then(result =>{
        if(result !== null)
        {
            res.sendResponse(409,{},'Already a user exists with the given data',[]);
        }
        else
        {
            const userDetails = {
                name:req.body.name,
                email:req.body.email,
                mobile_no:req.body.mobile_no,
                password:req.body.password,
            }

            const v = new Validator();

            const schema = {
                name:{type:"string",optional:false,max: 20},
                email:{type:"string",optional:false,max: 20},
                mobile_no:{type:"number",optional:false,length: 10},
            }

            const validatorResponse = v.validate(userDetails,schema);

            if(validatorResponse !== true)
            {
                return res.sendResponse(400,{},'validation errors',validatorResponse);
            }

            bcryptjs.genSalt(10,(err,salt) => {
                
                if(err)
                {
                    return res.sendResponse(500,{},err.message,err);
                }

                bcryptjs.hash(req.body.password,salt,(err,hashedPassword) => {

                    if(err)
                    {
                        return res.sendResponse(500,{},err.message,err);
                    }

                    userDetails.password = hashedPassword;
                    
                    model.User.create(userDetails).then(result => {
                        if(result)
                        {
                            const token = jwt.sign(userDetails,process.env.JWT_KEY,{expiresIn: '15d'})
                            result.dataValues.token = token;
                            res.sendResponse(201,result,'Registration successful',[]);
                        }
                        else
                        {
                            res.sendResponse(500,{},'Unable to register user',[]);
                        }
                    }).catch(error => {
                        res.sendResponse(500,{},'Unable to register user',error);
                    });
                })
            });
            
        }
    }).catch(error => {
        res.sendResponse(500,{},'Unable to Handle Server Request',[error]);
    })
}

function login(req, res)
{
    model.User.findOne({where:{email:req.body.email}}).then(result => {
        if(result !== null)
        {
            bcryptjs.compare(req.body.password,result.password,(error,isMatch)=>{
                if (error) {
                    return  res.sendResponse(500,{},'Error comparing passwords',error);
                }

                if (!isMatch) {
                    return res.sendResponse(400,{},'Invalid credentials',[]);
                }

                const token = jwt.sign(result.dataValues, process.env.JWT_KEY, { expiresIn: '15d'});
                result.dataValues.token = token;
                res.sendResponse(200,result,'Authenticated successful',[]); 
            });
        }
        else
        {
            res.sendResponse(500,{},'Invalid Credentials',[]);
        }
    }).catch(error => {
        res.sendResponse(500,{},'Unable to Handle Server Request',error);
    });
}

function profile(req, res)
{
    const id = req.params.id;

    const userDetails = {
        name:req.body.name,
        email:req.body.email,
        mobile_no:req.body.mobile_no,
    }

    const v = new Validator();

    const schema = {
        name:{type:"string",optional:false,max: 20},
        email:{type:"string",optional:false,max: 20},
        mobile_no:{type:"number",optional:false,length: 10},
    }

    const validatorResponse = v.validate(userDetails,schema);

    if(validatorResponse !== true)
    {
        return res.sendResponse(400,{},'validation errors',validatorResponse);
    }

    model.User.update(userDetails,{where:{id:id}}).then(result => {
        if(result)
        {
            res.sendResponse(200,userDetails,'User details updated successfully',[]);
        }
        else
        {
            res.sendResponse(500,{},'Unable to update user',[]);
        }
    }).catch(error => {
        res.sendResponse(500,{},'Unable to update user',error);
    });
}

module.exports = {
    register : register,
    login: login,
    profile: profile
}