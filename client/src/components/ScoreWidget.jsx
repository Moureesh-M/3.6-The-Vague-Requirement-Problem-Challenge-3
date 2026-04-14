import React, { useState, useEffect } from 'react';
import { fetchScore } from '../services/api';
import { Award, TrendingUp, Target } from 'lucide-react';

const ScoreWidget = ({ tasks }) => {
  const [score, setScore] = useState({
    value: 0,
    breakdown: {
      totalTasks: 0,
      completedTasks: 0,
      importantTasks: 0,
      completedImportantTasks: 0,
      totalWeight: 0,
      completedWeight: 0
    }
  });

  useEffect(() => {
    const getScore = async () => {
      try {
        const data = await fetchScore();
        setScore(data);
      } catch (err) {
        console.error('Error fetching score:', err);
      }
    };
    getScore();
  }, [tasks]);

  const { value, breakdown } = score;
  const scoreLabel = value >= 80 ? 'Strong consistency' : value >= 50 ? 'Steady progress' : 'Building momentum';
  const completionText = breakdown.totalTasks === 0
    ? 'Add tasks to start tracking progress.'
    : `${breakdown.completedTasks}/${breakdown.totalTasks} tasks complete`;
  const importantText = breakdown.importantTasks === 0
    ? 'No important tasks yet.'
    : `${breakdown.completedImportantTasks}/${breakdown.importantTasks} important tasks complete`;
  const ratioText = breakdown.totalWeight === 0
    ? 'Weighted ratio: 0%'
    : `Weighted ratio: ${Math.round((breakdown.completedWeight / breakdown.totalWeight) * 100)}%`;

  return (
    <div className="score-hero-card">
      <div className="score-hero-left">
        <h2>Your Productivity Score</h2>
        <p style={{ marginBottom: '0.75rem', opacity: 0.7 }}>
          Important tasks count double. The score reflects completed work versus total workload.
        </p>
        <div className="score-big">
          {value}
          <span>pts</span>
        </div>
        <p style={{ marginTop: '1rem', opacity: 0.7 }}>{scoreLabel}</p>
      </div>
      <div className="score-hero-right">
        <div className="status-badge" style={{ background: '#dbeafe', color: '#1e3a8a', marginBottom: '1rem' }}>
          <TrendingUp size={16} />
          {completionText}
        </div>
        <div className="status-badge" style={{ background: 'rgba(245, 158, 11, 0.14)', color: '#92400e', marginBottom: '1rem' }}>
          <Target size={16} />
          {importantText}
        </div>
        <div className="status-badge" style={{ background: 'rgba(15, 23, 42, 0.08)', color: '#0f172a' }}>
          <Award size={16} />
          {ratioText}
        </div>
        <div className="logo-icon" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', marginTop: '1rem' }}>
          <Award size={48} />
        </div>
      </div>
    </div>
  );
};

export default ScoreWidget;
