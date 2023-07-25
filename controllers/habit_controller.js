const mongoose = require('mongoose');
const Habit = require('../models/habit');

// GET THE NAME OF DAY FOR(0-6)
function getDay(day) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thrus', 'Fri', 'Sat'];
  return days[day];
}

// GET ALL HABITS
module.exports.getHabits = async function (req, res) {
  try {
    const habits = await Habit.find({}).sort('-createdAt');

    const lastWeekDetails = getLastWeekDetails();

    return res.render('Home', {
      habits: habits,
      weeklyDetails: lastWeekDetails,
    });
  } catch (err) {
    console.log('Error in get Habits Controller ', err);
    return;
  }
};

// GET LAST WEEK AND TODAY'S DATE
function getLastWeekDetails() {
  let dates = [];
  for (let i = 6; i >= 0; i--) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);
    const date = ('0' + currentDate.getDate()).slice(-2);
    const day = getDay(currentDate.getDay());
    const data = {
      date: date,
      day: day,
    };
    dates.push(data);
  }
  return dates;
}

// CREATE A HABIT
module.exports.createHabit = async function (req, res) {
  try {
    let habit = await Habit.findOne({ habit: req.body.habit });

    if (habit) {
      req.flash('error', 'Duplicate Habit, Already Exist In Database');
      console.log('Duplicate Habit, already exists in DB');
      return res.redirect('back');
    }

    const days = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      const date = ('0' + currentDate.getDate()).slice(-2);
      const day = getDay(currentDate.getDay());
      const status = 'none';
      const obj = {
        date: date,
        status: status,
      };
      days.unshift(obj);
    }

    const newHabit = {
      habit: req.body.habit,
      days: days,
    };

    habit = await Habit.create(newHabit);
    req.flash('success', 'Habit Created Successfully');
    return res.redirect('back');
  } catch (err) {
    console.log('Error in createHabit controller ', err);
    return;
  }
};

// DELETE A HABIT
module.exports.deleteHabit = async function (req, res) {
  try {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid Habit');
      console.log('ID is not valid');
      return res.redirect('back');
    }

    await Habit.findOneAndRemove({ _id: req.params.id });

    req.flash('success', 'Habit Deleted Successfully');

    return res.redirect('back');
  } catch (err) {
    console.log('Error in delete Habit Controller ', err);
    return;
  }
};

// UPDATE HABIT STATUS
module.exports.updateHabitStatus = async function (req, res) {
  try {
    const query = req.query;

    let habit = await Habit.findOne({ habit: query.h });

    let date = query.date;

    if (!habit) {
      req.flash('error', 'Unavailable Habit');
      console.log(`No ${habit} in Database`);
      return res.redirect('back');
    }

    let days = habit.days;

    let isPresent = false;

    days.find((day) => {
      if (day.date == date) {
        if (day.status == 'none') {
          day.status = 'done';
        } else if (day.status == 'done') {
          day.status = 'not done';
        } else if ((day.status = 'not done')) {
          day.status = 'none';
        }
        isPresent = true;
      }
    });

    if (!isPresent) {
      days.push({ date: date, status: 'done' });
    }

    habit.days = days;
    await habit.save();

    req.flash('success', 'status changed sucessfully');

    return res.redirect('back');
  } catch (err) {
    console.log('Error in Update Habit Status controller ', err);
    return;
  }
};
