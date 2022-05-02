const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended: true}));
router.use(express.json());

//Controller
const AnalyticsController = require('../controller/AnalyticsController');

//CRUD analytic router
router.get('/', async (req, res)=>{
    const analytics = await AnalyticsController.getAllAnalytics();
    res.send(analytics);
});

router.get('/:id', async (req, res)=>{
    const analytics = await AnalyticsController.getAnalyticById(req.params.id);
    res.send(analytics);
});

router.get('/esp/:espId', async (req, res) =>{
    const analytics = await AnalyticsController.getAllAnalyticsByEspId(req.params.espId);
    res.send(analytics);
});

router.post('/', async (req, res)=>{
    const analytic = await AnalyticsController.createAnalytic(req.body);
    res.send(analytic);
});

router.put('/:id', async (req, res)=>{
    const analytic = await AnalyticsController.updateAnalytic(req.body, req.params.id);
    res.send(analytic);
});

router.delete('/:id', async (req, res)=>{
    const analytic = await AnalyticsController.deleteAnalyticById(req.params.id);
    res.send(analytic);
});

module.exports = router;