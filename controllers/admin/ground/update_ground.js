const Ground = require("../../../models/Ground");
const addImage = require("../../../utils/addImage");
const sendErrorResponse = require("../../../utils/send-error-response");

require("dotenv/config");

module.exports = async (req, res) => {
  try {
    const { name,location,price,description } = req.body;
    let image;
    if(req.file){
        image = await addImage(req.file);
    }
    const ground = await Ground.findByIdAndUpdate(req.params.id,{
        image: image,
        name: name,
        location: location,
        description: description,
        price: price
    })
    
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully updated ground.",
      result: await Ground.findOne({_id:req.params.id}).populate({
        path: "user"
      }),
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to update the ground.",
      error.message
    );
  }
};
