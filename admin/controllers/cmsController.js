import HomePage from "../models/HomePage.js"


// Get Home Page Data 
export const getHomePage = async (req,res)=>{
    try{
        const homepage = await HomePage.findOne();

        res.status(200).json({
            success: true,
            data: homepage,
        })
        console.log(homepage)
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message,
        });
    }
}

export const updateHomePage = async (req,res) => {

    try{
        
        const homepage = await HomePage.findOneAndUpdate({}, req.body,{
            new: true,
            upsert: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Home Page Updated Successfully",
            data: homepage,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
   
}