const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/templates', resumeController.getTemplates);
router.get('/', resumeController.getResumes);
router.post('/', resumeController.createResume);
router.get('/:id', resumeController.getResumeById);
router.put('/:id', resumeController.updateResume);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
