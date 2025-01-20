const express = require('express');
const { getallblog, createblog, updateblog, deleteblog, byid, userblog } = require('../controllers/blog');
const router=express.Router()

router.get('/all',getallblog)
router.post('/create',createblog)

router.put('/update/:id',updateblog)

router.delete('/delete/:id',deleteblog)

router.get('/get/:id',byid)

//user-blog
router.get('/user-blog/:id',userblog)

module.exports=router;