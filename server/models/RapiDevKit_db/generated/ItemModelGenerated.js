// Database
import Database from "../../../classes/Database_RapiDevKit_db";
import mongoose, { Schema } from "mongoose";

// Logger
import Logger from "../../../classes/Logger";

const generatedModel = {
  /**
   * Init  schema
   */
  init() {
    const db = Database.getConnection();

    /**
      * Item
      */
    const itemSchema = new mongoose.Schema({
      Active: {
        type: "Boolean", 
        required : true
      },
      Created: {
        type: "Number"
      },
      Data: {
        type: "String"
      },
      Modified: {
        type: "Number"
      },
      Order: {
        type: "Number"
      },
      Protected: {
        type: "Boolean"
      },
      Status: {
        type: "String"
      },
      //RELATIONS
      Creator: {
        type: Schema.ObjectId,
        ref : "User"
      },
      Link: {
        type: Schema.ObjectId,
        ref : "Item"
      },
      Type: {
        type: Schema.ObjectId, 
        required : true,
        ref : "ItemType"
      },
      
      
      //EXTERNAL RELATIONS
      /*
      */
    });

    generatedModel.setModel(db.connection.model("Item", itemSchema));
  },

  /**
   * Set Model
   */
  setModel: model => {
    generatedModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return generatedModel.model;
  },

  // Start queries
    

  // CRUD METHODS


  /**
  * ItemModel.create
  *   @description CRUD ACTION create
  *
  */
  async create(item) {
    const obj = new generatedModel.model(item);
    return await obj.save();
  },
  
  /**
  * ItemModel.delete
  *   @description CRUD ACTION delete
  *   @param ObjectId id Id
  *
  */
  async delete(id) {
    return await generatedModel.model.findByIdAndRemove(id);
  },
  
  /**
  * ItemModel.findByActive
  *   @description CRUD ACTION findByActive
  *   @param Objectid key Id of the resource Active to search
  *
  */
  async findByActive(key) {
    return await generatedModel.model.find({ 'Active' : key});
  },
  
  /**
  * ItemModel.findByCreated
  *   @description CRUD ACTION findByCreated
  *   @param Integer by start date
  *   @param Integer to end date
  *
  */
  async findByCreated(key) {
    return await generatedModel.model.find({ 'Created' : key});
  },
  
  /**
  * ItemModel.findByCreator
  *   @description CRUD ACTION findByCreator
  *   @param Objectid key Id of the resource Creator to search
  *
  */
  async findByCreator(key) {
    return await generatedModel.model.find({ 'Creator' : key});
  },
  
  /**
  * ItemModel.findByProtected
  *   @description CRUD ACTION findByProtected
  *   @param Objectid key Id of the resource Protected to search
  *
  */
  async findByProtected(key) {
    return await generatedModel.model.find({ 'Protected' : key});
  },
  
  /**
  * ItemModel.findByType
  *   @description CRUD ACTION findByType
  *   @param Objectid key Id della risorsa Type da cercare
  *
  */
  async findByType(key) {
    return await generatedModel.model.find({ 'Type' : key});
  },
  
  /**
  * ItemModel.get
  *   @description CRUD ACTION get
  *   @param ObjectId id Id 
  *
  */
  async get(id) {
    return await generatedModel.model.findOne({_id: id});
  },
  
  /**
  * ItemModel.getLink
  *   @description CRUD ACTION getLink
  *   @param Objectid id ID of Item from Link
  *
  */
  async getLink(id) {
    return await generatedModel.model.findOne({ _id : id}).populate("Link")
  },
  
  /**
  * ItemModel.list
  *   @description CRUD ACTION list
  *
  */
  async list() {
    return await generatedModel.model.find();
  },
  
  /**
  * ItemModel.update
  *   @description CRUD ACTION update
  *   @param ObjectId id Id
  *
  */
  async update(item) { 
    return await generatedModel.model.findOneAndUpdate({ _id: item._id }, item, {'new': true});
  },
  


};

export default generatedModel;
