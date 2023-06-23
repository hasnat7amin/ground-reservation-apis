
const Product = require("../../models/product");
const sendErrorResponse = require("../../utils/send-error-response")


module.exports = async (req, res) => {
    try {
        const product = await Product.findOne({})
        
        return res.status(200).json({
            code : 200,
            status: true,
            message: "Product fetched successfully",
            result: product
        })
    } catch (error) {
        sendErrorResponse(res,400,"Failed to get product by this id." , error.message)
    }
}