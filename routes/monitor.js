const express=require('express')
const router=express.Router()
const monitorController=require('../controllers/monitor')
const {ensureAuth}=require('../middleware/auth')
router.get('/',ensureAuth,monitorController.getMonitorPage)
//router.get('/addComment',monitorController.addComment)
//router.get('/deleteComment',monitorController.deleteComment)

module.exports=router