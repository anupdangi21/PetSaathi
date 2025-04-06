import express from 'express'
import additem from "../Models/addItems.js"


const itemAdd = async (req, res)=>{
    try {
        console.log(req.body)
        const {sellername, sellercontact, selleremail, selleraddres, itemtype, category, condition, usedtime, price, description, Image, status, bookedAt}=req.body;
        if(!itemtype || !category || !condition || !usedtime || !price || !description){
            return res.status(400).json({message: "Please fill all the fields."})
        }
        const imagePaths = req.files.map(file => file.filename);

        const itemonsell = new additem({
            sellername, sellercontact, selleremail, selleraddres, itemtype, category, condition, usedtime, price, description, Image: imagePaths, status, bookedAt
        })
        console.log("marketplace ko saman aayo",itemonsell)
        await itemonsell.save()
        return res.status(200).json({success:true, message:"Item added successfully"})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

const getItem = async (req, res)=>{
    try {
        const getItemdata = await additem.find()
        res.status(200).json({status:true, data:getItemdata})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

const updateMarketitem = async (req, res)=>{
    try {
        const {itemtype, category, condition, usedtime, price, description, Image}=req.body
        const itemId = req.params.id
        const updateitem = await additem.findById(itemId)

        if(!updateitem){
            return res.status(400).json({success:false, message:"Item not found"})

        }
        if(itemtype || category || condition || usedtime || price || description || req.file){
          updateitem.itemtype = itemtype || updateitem.itemtype
          updateitem.category = category || updateitem.category
          updateitem.condition = condition || updateitem.condition
          updateitem.usedtime = usedtime || updateitem.usedtime
          updateitem.price = price || updateitem.price
          updateitem.description = description || updateitem.description
            
        if (req.file) {
            item.Image = req.file.path.replace(/\\/g, "/");
        }
        }

    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

const deleteMarketItem = async (req, res) => {
    try {
        const { _id } = req.params;
        const deleteItem = await additem.findByIdAndDelete(_id);

        if (!deleteItem) {
            return res.status(400).json({ success: false, message: "Item not found" });
        }

        return res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


const getitemliststatus = async(req, res)=>{
    try {
        const getItemData= await additem.find()
        res.status(200).json({success: true, data: getItemData})
    } catch (error) {
    return res.status(400).json({success: false, message:"cannot find the items in the database"})
    }
}
const changeitemStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const itemId = req.params.id;  

        const item = await additem.findById(itemId);

        if (!item) {
            return res.status(400).json({ success: false, message: "Item not found" });
        }

        item.status="Confirmed"
        
        await item.save();
        res.status(200).json({ success: true, message: "Item status updated successfully", data: pet });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }                                                
};

export default {itemAdd,getItem, updateMarketitem, deleteMarketItem,getitemliststatus, changeitemStatus  }