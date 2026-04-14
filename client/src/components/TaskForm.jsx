import React, { useState } from 'react';
import { createTask } from '../services/api';
import { Plus, Sparkles } from 'lucide-react';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [important, setImportant] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTask(title, important);
      setTitle('');
      setImportant(false);
      onTaskCreated();
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <div className="form-card animate-fade">
      <h4>Create New Task</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Focus on what matters..."
            className="styled-input"
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', margin: '0.85rem 0 1rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
          />
          <Sparkles size={16} />
          Mark as important
        </label>
        <button type="submit" className="primary-button ">
          <Plus size={20} strokeWidth={3} />
          <span>Quick Add</span>
        </button>
      </form>
      <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid #f1f5f9' }}>
        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
          Important tasks count double in your Productivity Score.
        </p>
      </div>
    </div>
  );
};

export default TaskForm;
