import express from 'express'
import {createTour, deleteTour, getSingleTour,getAllTour, updateTour, getTourBySearch,getTourByAdvancedSearch,getFeatureTour,getTourCount} from '../Controllers/TourController.js'
import {verifyAdmin, verifyUser }from "../utils/verifyToken.js";
const router = express.Router();
router.post("/", createTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);
router.get("/:id",  getSingleTour);
router.get("/",getAllTour);
router.get("/search/getTourBySearch",getTourBySearch);
router.get("/search/getTourByAdvancedSearch",getTourByAdvancedSearch);
router.get("/search/getFeaturedTour",getFeatureTour);
router.get('/search/getTourCount',getTourCount);
export default router;