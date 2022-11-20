const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
// const ContactModel = require("../models/contactModel.js")


// User
exports.createUser = async (_req,res,next) =>{
    if(!_req.body?.name){
        return next(new ApiError(400,"Name rỗng"));
    }
    try {
        const contactservice = new ContactService(MongoDB.client,"user");
        const document = await contactservice.create(_req.body);
        return res.send(document);
        
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo liên hệ tại contact.service")
        );
    }
}
exports.findAllUser = async (req,res,next) => {
    try {
        const contactService = new ContactService(MongoDB.client,"user");
        const documents = await contactService.find();
        return res.status(200).json({documents});
    } catch (error) {
        return next(
            new ApiError(500,"Đã xảy ra lỗi khi truy xuất dữ liệu bãi xe")
        );
        }
};
exports.findOneUser = async(req,res,next) => {
    const id = req.params.id;
   try {
       const contactService = new ContactService(MongoDB.client,"user");
       const documents = await contactService.findById(id);
       return res.status(200).json({documents});
   } catch (error) {
       return next(
           new ApiError(500,"Đã xảy ra lỗi khi truy xuất danh bạ")
       );
       }
};
// Park
exports.findAllPark =async (req,res,next) =>{
    try {
        const contactService = new ContactService(MongoDB.client,"Area");
        // const {name} = req.query;
        // if(name){
        //     const documents = await contactService.findByName(name);
        //     return res.status(200).json({documents});
        // }else {
            const documents = await contactService.find();
            return res.status(200).json({documents});
        // }
    } catch (error) {
        return next(
            new ApiError(500,"Đã xảy ra lỗi khi truy xuất danh bạ")
        );
        }
}
exports.updateArea = async (req,res,next) => {
    try {
        
        const contactService = new ContactService(MongoDB.client,"Area");
        const document = await contactService.updateArea(Number(req.params.id),req.body)
        if(!document){
            return next(new ApiError(404,"Contact not found"));
        }
        return res.send({message: "Area was updated successfully"});
    } catch (error) {
        return next( new ApiError(500,`Loi khi dang cap nhat voi id=${req.params.id}`));
    }
};

 