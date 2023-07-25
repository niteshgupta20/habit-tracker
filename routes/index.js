const express = require('express');
const router = express.Router();
const habit_controller = require('../controllers/habit_controller');

router.get('/', habit_controller.getHabits);
router.post('/create-habit', habit_controller.createHabit);
router.get('/delete-habit/:id', habit_controller.deleteHabit);
router.get('/update-habit-status/', habit_controller.updateHabitStatus);

module.exports = router;
