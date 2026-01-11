const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const { taskValidations } = require('../utils/validation');
const Task = require('../models/Task');

// Get all tasks for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { 
      status, 
      priority, 
      search, 
      sort = '-createdAt',
      page = 1,
      limit = 10 
    } = req.query;

    const query = { createdBy: req.user._id };

    // Filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('assignedTo', 'name email');

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch tasks',
      error: error.message 
    });
  }
});

// Get single task
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    }).populate('assignedTo', 'name email');

    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch task',
      error: error.message 
    });
  }
});

// Create task
router.post('/', authMiddleware, taskValidations.create, async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      createdBy: req.user._id
    };

    const task = new Task(taskData);
    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to create task',
      error: error.message 
    });
  }
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { 
        _id: req.params.id, 
        createdBy: req.user._id 
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    // Update completedAt if task is marked as done
    if (req.body.status === 'done' && !task.completedAt) {
      task.completedAt = new Date();
      task.isCompleted = true;
      await task.save();
    }

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to update task',
      error: error.message 
    });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!task) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    res.json({ 
      message: 'Task deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to delete task',
      error: error.message 
    });
  }
});

module.exports = router;