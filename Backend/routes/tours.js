import express from 'express'
import {createTour, deleteTour, getSingleTour,getAllTour, updateTour, getTourBySearch,getTourByAdvancedSearch,getFeatureTour,getTourCount} from '../Controllers/TourController.js'
import {verifyAdmin, verifyUser }from "../utils/verifyToken.js";
const router = express.Router();
router.post("/",verifyAdmin, createTour);
router.put("/:id",verifyAdmin, updateTour);
router.delete("/:id",verifyAdmin, deleteTour);
router.get("/:id",  getSingleTour);
router.get("/",getAllTour);
router.get("/search/getTourBySearch",getTourBySearch);
router.get("/search/getTourByAdvancedSearch",getTourByAdvancedSearch);
router.get("/search/getFeaturedTour",getFeatureTour);
router.get('/search/getTourCount',getTourCount);
export default router;