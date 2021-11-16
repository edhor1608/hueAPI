const express = require('express')
const router = express.Router()

const streamingService = require('../services/streaming.service')

//router.get('/', streamingService.setRed)
router.get('/setRed', streamingService.setRed)
router.get('/setGreen', streamingService.setGreen)
router.get('/setHue/:hue', streamingService.setHue)
router.get('/setHex/:hex', streamingService.setHex)
router.get('/alert', streamingService.alert)

module.exports = router