import { useState, useRef, useEffect } from "react";

const SYMBOLS = ["🌱", "🔥", "⭐", "🦋", "🌊", "🧠", "💎", "🌙", "🎯", "🦅", "🌻", "⚡"];

const LOGO_URI = "data:image/png;base64,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";

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// ============================================================
// DONUT CHART COMPONENT
// ============================================================
const DonutChart = ({ percentage, size = 90, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  const getColor = (pct) => {
    if (pct >= 75) return "#5E8C6A";
    if (pct >= 40) return "#483428";
    return "#483428";
  };

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#E8E5E0" strokeWidth={strokeWidth} />
        <circle
          cx={center} cy={center} r={radius} fill="none"
          stroke={getColor(percentage)} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: "#1A1A1A"
      }}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

// ============================================================
// EDITABLE TEXT COMPONENT
// ============================================================
const EditableText = ({ value, onChange, placeholder, style = {}, multiline = false, autoResize = false }) => {
  const Tag = multiline || autoResize ? "textarea" : "input";
  const textareaRef = useRef(null);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoResize]);

  return (
    <Tag
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={autoResize ? 1 : undefined}
      style={{
        background: "transparent", border: "none", outline: "none", width: "100%",
        fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1A1A1A",
        resize: multiline && !autoResize ? "vertical" : "none",
        minHeight: multiline && !autoResize ? 60 : "auto",
        padding: "4px 0",
        overflow: autoResize ? "hidden" : "auto",
        ...style,
      }}
    />
  );
};

// ============================================================
// ACTION ITEM ROW
// ============================================================
const ActionItem = ({ action, onUpdate, onDelete }) => {
  return (
    <div style={{
      padding: "10px 0",
      borderBottom: "1px solid #E8E5E0",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => onUpdate({ ...action, done: !action.done })}
          style={{
            width: 22, height: 22, borderRadius: 6, border: `2px solid ${action.done ? "#5E8C6A" : "#6B6B6B"}`,
            background: action.done ? "#5E8C6A" : "transparent", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0,
          }}
        >
          {action.done && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
        
        <div style={{ flex: 1, minWidth: 200 }}>
          <EditableText
            value={action.text}
            onChange={(text) => onUpdate({ ...action, text })}
            placeholder="Action step..."
            autoResize={true}
            style={{
              textDecoration: action.done ? "line-through" : "none",
              color: action.done ? "#A89F91" : "#1A1A1A",
              width: "100%",
            }}
          />
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <input
            type="date"
            value={action.dueDate || ""}
            onChange={(e) => onUpdate({ ...action, dueDate: e.target.value })}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#6B6B6B",
              border: "1px solid #E8E5E0", borderRadius: 6, padding: "3px 6px",
              background: "#FDFCFA", width: 110,
            }}
          />
          <select
            value={action.status || "todo"}
            onChange={(e) => onUpdate({ ...action, status: e.target.value })}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
              border: "1px solid #E8E5E0", borderRadius: 6, padding: "3px 8px",
              background: action.status === "done" ? "#E8F5E8" : action.status === "in-progress" ? "#FFF3E0" : "#FDFCFA",
              color: "#1A1A1A", width: 95,
            }}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button
          onClick={onDelete}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
            color: "#6B6B6B", fontSize: 16, lineHeight: 1, flexShrink: 0,
          }}
          title="Remove"
        >×</button>
      </div>
    </div>
  );
};

// ============================================================
// GOAL CARD COMPONENT
// ============================================================
const GoalCard = ({ goal, onUpdate, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const totalActions = goal.actions.length;
  const doneActions = goal.actions.filter((a) => a.done).length;
  const percentage = totalActions === 0 ? 0 : (doneActions / totalActions) * 100;

  const addAction = () => {
    const today = new Date().toISOString().split("T")[0];
    onUpdate({
      ...goal,
      actions: [...goal.actions, { id: generateId(), text: "", done: false, dueDate: today, status: "todo" }],
    });
  };

  const updateAction = (idx, updated) => {
    const newActions = [...goal.actions];
    newActions[idx] = updated;
    if (updated.done) updated.status = "done";
    if (!updated.done && updated.status === "done") updated.status = "in-progress";
    onUpdate({ ...goal, actions: newActions });
  };

  const deleteAction = (idx) => {
    onUpdate({ ...goal, actions: goal.actions.filter((_, i) => i !== idx) });
  };

  return (
    <div style={{
      background: goal.completed ? "#FFFFFF" : "#FFFFFF",
      borderRadius: goal.completed ? 12 : 16,
      border: goal.completed ? "1px solid #E8E5E0" : "1px solid #E8E5E0",
      overflow: "hidden",
      boxShadow: goal.completed ? "none" : "0 1px 3px rgba(61,53,41,0.04)",
      opacity: goal.completed ? 0.7 : 1,
      transform: goal.completed ? "scale(0.97)" : "scale(1)",
      transition: "all 0.2s ease",
    }}>
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: goal.completed ? "14px 18px" : "20px 24px", cursor: "pointer", gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 8, height: 40, borderRadius: 4, flexShrink: 0,
            background: percentage >= 75 ? "#5E8C6A" : percentage >= 40 ? "#483428" : "#483428",
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: goal.completed ? 14 : 17, fontWeight: 700,
              color: "#1A1A1A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {goal.title || "Untitled Goal"}
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6B6B6B", marginTop: 2,
            }}>
              {doneActions}/{totalActions} actions complete
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <DonutChart percentage={percentage} size={56} strokeWidth={7} />
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div style={{ padding: "0 24px 24px", borderTop: "1px solid #E8E5E0" }}>
          {/* Goal Title & Why */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
                Goal
              </label>
              <EditableText
                value={goal.title}
                onChange={(title) => onUpdate({ ...goal, title })}
                placeholder="What's the goal?"
                autoResize
                style={{ fontSize: 15, fontWeight: 600 }}
              />
            </div>
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
                Why This Matters
              </label>
              <EditableText
                value={goal.why}
                onChange={(why) => onUpdate({ ...goal, why })}
                placeholder="Connect it to the North Star..."
                autoResize
                style={{ fontSize: 14 }}
              />
            </div>
          </div>

          {/* Challenges */}
          <div style={{ marginTop: 16 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Challenges
            </label>
            <EditableText
              value={goal.challenges}
              onChange={(challenges) => onUpdate({ ...goal, challenges })}
              placeholder="What obstacles are in the way?"
              autoResize
              style={{ fontSize: 14 }}
            />
          </div>

          {/* Action Steps */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
                Action Steps
              </label>
              <button
                onClick={addAction}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
                  color: "#5E8C6A", background: "#E8F5F0", border: "none", borderRadius: 8,
                  padding: "5px 12px", cursor: "pointer",
                }}
              >
                + Add Step
              </button>
            </div>
            {goal.actions.length === 0 ? (
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6B6B6B", padding: "12px 0", fontStyle: "italic" }}>
                No action steps yet. Click "+ Add Step" to get started.
              </div>
            ) : (
              <>
                {goal.actions.map((action, idx) => ({ action, idx })).filter(item => !item.action.done).map(({ action, idx }) => (
                  <ActionItem
                    key={action.id}
                    action={action}
                    onUpdate={(updated) => updateAction(idx, updated)}
                    onDelete={() => deleteAction(idx)}
                  />
                ))}
                
                {goal.actions.some(a => a.done) && (
                  <div style={{ marginTop: 12 }}>
                    <button
                      onClick={() => setShowCompleted(!showCompleted)}
                      style={{
                        background: "none", border: "none", padding: "8px 0", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6,
                        fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#6B6B6B",
                      }}
                    >
                      <svg
                        width="12" height="12" viewBox="0 0 20 20" fill="none"
                        style={{ transform: showCompleted ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                      >
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {showCompleted ? "Hide" : "Show"} Completed Action Steps ({goal.actions.filter(a => a.done).length})
                    </button>
                    
                    {showCompleted && (
                      <div style={{ marginTop: 8, opacity: 0.8 }}>
                        {goal.actions.map((action, idx) => ({ action, idx })).filter(item => item.action.done).map(({ action, idx }) => (
                          <ActionItem
                            key={action.id}
                            action={action}
                            onUpdate={(updated) => updateAction(idx, updated)}
                            onDelete={() => deleteAction(idx)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Goal Notes */}
          <div style={{ marginTop: 20 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Goal Notes
            </label>
            <EditableText
              value={goal.notes}
              onChange={(notes) => onUpdate({ ...goal, notes })}
              placeholder="Observations, context, session insights for this goal..."
              multiline
              style={{ fontSize: 13, background: "#FFFFFF", borderRadius: 8, padding: 12, marginTop: 6, border: "1px solid #E8E5E0" }}
            />
          </div>

          {/* Goal Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
            <button
              onClick={() => onUpdate({ ...goal, completed: !goal.completed })}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                color: goal.completed ? "#483428" : "#5E8C6A",
                background: goal.completed ? "#F4EFEB" : "#E8F5F0",
                border: "none", borderRadius: 8, padding: "5px 14px", cursor: "pointer",
              }}
            >
              {goal.completed ? "↩ Reopen Goal" : "✓ Complete Goal"}
            </button>
            <button
              onClick={onDelete}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#483428",
                background: "none", border: "1px solid #E8E5E0", borderRadius: 8,
                padding: "5px 14px", cursor: "pointer",
              }}
            >
              Remove Goal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// STRENGTH ITEM
// ============================================================
const StrengthItem = ({ strength, onUpdate, onDelete }) => {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px",
      background: "#FFFFFF", borderRadius: 10, border: "1px solid #E8E5E0",
    }}>
      <span style={{ color: "#483428", fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>✦</span>
      <EditableText
        value={strength.text}
        onChange={(text) => onUpdate({ ...strength, text })}
        placeholder="A strength, skill, or quality you bring to the table..."
        style={{ flex: 1, fontSize: 14, lineHeight: 1.5 }}
      />
      <button onClick={onDelete} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B6B6B", fontSize: 14, padding: 2, flexShrink: 0 }}>×</button>
    </div>
  );
};

// ============================================================
// STRATEGY ITEM
// ============================================================
const StrategyItem = ({ strategy, onUpdate, onDelete }) => {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px",
      background: "#FFFFFF", borderRadius: 10, border: "1px solid #E8E5E0",
    }}>
      <span style={{ color: "#483428", fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>✦</span>
      <EditableText
        value={strategy.text}
        onChange={(text) => onUpdate({ ...strategy, text })}
        placeholder="Add a strategy or technique that's been helpful..."
        style={{ flex: 1, fontSize: 14, lineHeight: 1.5 }}
      />
      <button onClick={onDelete} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B6B6B", fontSize: 14, padding: 2, flexShrink: 0 }}>×</button>
    </div>
  );
};

// ============================================================
// SESSION NOTE
// ============================================================
const SessionNote = ({ session, onUpdate, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: "#FFFFFF", borderRadius: 12, border: "1px solid #E8E5E0", overflow: "hidden",
    }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px", cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input
            type="date"
            value={session.date || ""}
            onChange={(e) => { e.stopPropagation(); onUpdate({ ...session, date: e.target.value }); }}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#1A1A1A",
              border: "1px solid #E8E5E0", borderRadius: 6, padding: "3px 8px", background: "white",
            }}
          />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#6B6B6B" }}>
            {session.title || "Session notes..."}
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
          <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {expanded && (
        <div style={{ padding: "0 18px 18px" }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Session Title
            </label>
            <EditableText
              value={session.title}
              onChange={(title) => onUpdate({ ...session, title })}
              placeholder="Quick summary of this session..."
              style={{ fontSize: 14, fontWeight: 600 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Key Takeaways
            </label>
            <EditableText
              value={session.takeaways}
              onChange={(takeaways) => onUpdate({ ...session, takeaways })}
              placeholder="What were the breakthroughs or insights?"
              multiline
              style={{ fontSize: 13, background: "white", borderRadius: 8, padding: 10, marginTop: 4, border: "1px solid #E8E5E0" }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: 1 }}>
              Action Items for Next Week
            </label>
            <EditableText
              value={session.nextSteps}
              onChange={(nextSteps) => onUpdate({ ...session, nextSteps })}
              placeholder="What do you commit to doing before next session?"
              multiline
              style={{ fontSize: 13, background: "white", borderRadius: 8, padding: 10, marginTop: 4, border: "1px solid #E8E5E0" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={onDelete} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#483428", background: "none", border: "1px solid #E8E5E0", borderRadius: 8, padding: "4px 12px", cursor: "pointer" }}>
              Remove Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// SECTION HEADER
// ============================================================
const SectionHeader = ({ icon, title, action, collapsed, onToggle, count }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: collapsed ? 8 : 16, marginTop: 40, cursor: "pointer" }} onClick={onToggle}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1A1A1A", margin: 0 }}>
        {title}
      </h2>
      {count !== undefined && (
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6B6B6B", background: "#E8E5E0", borderRadius: 12, padding: "2px 10px" }}>
          {count}
        </span>
      )}
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s ease", marginLeft: 4 }}>
        <path d="M5 7.5L10 12.5L15 7.5" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <div onClick={(e) => e.stopPropagation()}>
      {action}
    </div>
  </div>
);
// ============================================================
// MAIN APP
// ============================================================
export default function CoachingTracker({ data, onUpdate }) {
  const [collapsed, setCollapsed] = useState({
    goals: false,
    completedGoals: true,
    strengths: false,
    strategies: false,
    sessions: false,
  });

  const generateId = () => {
    return typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
  };

  const update = (field, value) => onUpdate({ ...data, [field]: value });
  const toggleSection = (section) => setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));

  // Goals
  const addGoal = () => {
    update("goals", [
      ...data.goals,
      { id: generateId(), title: "", why: "", challenges: "", notes: "", actions: [], completed: false },
    ]);
  };

  const updateGoal = (idx, updated) => {
    const g = [...data.goals];
    g[idx] = updated;
    update("goals", g);
  };

  const deleteGoal = (idx) => update("goals", data.goals.filter((_, i) => i !== idx));

  // Strengths
  const addStrength = () => update("strengths", [...data.strengths, { id: generateId(), text: "" }]);
  const updateStrength = (idx, updated) => { const s = [...data.strengths]; s[idx] = updated; update("strengths", s); };
  const deleteStrength = (idx) => update("strengths", data.strengths.filter((_, i) => i !== idx));

  // Strategies
  const addStrategy = () => update("strategies", [...data.strategies, { id: generateId(), text: "" }]);
  const updateStrategy = (idx, updated) => { const s = [...data.strategies]; s[idx] = updated; update("strategies", s); };
  const deleteStrategy = (idx) => update("strategies", data.strategies.filter((_, i) => i !== idx));

  // Sessions
  const addSession = () => {
    const today = new Date().toISOString().split("T")[0];
    update("sessions", [{ id: generateId(), date: today, title: "", takeaways: "", nextSteps: "" }, ...data.sessions]);
  };
  const updateSession = (idx, updated) => { const s = [...data.sessions]; s[idx] = updated; update("sessions", s); };
  const deleteSession = (idx) => update("sessions", data.sessions.filter((_, i) => i !== idx));

  // Overall progress
  const totalActions = data.goals.reduce((sum, g) => sum + g.actions.length, 0);
  const doneActions = data.goals.reduce((sum, g) => sum + g.actions.filter((a) => a.done).length, 0);
  const overallPct = totalActions === 0 ? 0 : (doneActions / totalActions) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#F9F7F3", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header Section Card */}
      <div style={{
        background: "transparent",
        padding: "32px 24px 28px", color: "#1A1A1A",
      }}>
        <div style={{ 
          maxWidth: 800, margin: "0 auto", 
          background: "rgba(94, 140, 106, 0.15)", border: "1px solid rgba(94, 140, 106, 0.3)", borderRadius: 20,
          padding: "32px"
        }}>
          {/* Avatar / Name / Date */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid rgba(94, 140, 106, 0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <div
                  onClick={() => onUpdate({ ...data, showSymbolPicker: !data.showSymbolPicker })}
                  style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: data.avatarSymbol ? 26 : 22,
                    fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#5E8C6A",
                    cursor: "pointer", border: "1px solid rgba(94, 140, 106, 0.2)",
                  }}
                >
                  {data.avatarSymbol || data.clientInitial || "?"}
                </div>
                {data.showSymbolPicker && (
                  <div style={{
                    position: "absolute", top: 56, left: "50%", transform: "translateX(-50%)",
                    background: "#1A1A1A", borderRadius: 12, padding: "12px 14px",
                    display: "flex", gap: 6, flexWrap: "wrap", width: 200, justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)", zIndex: 10,
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                    {SYMBOLS.map(symbol => (
                      <div
                        key={symbol}
                        onClick={(e) => { e.stopPropagation(); onUpdate({ ...data, avatarSymbol: symbol, showSymbolPicker: false }); }}
                        style={{
                          width: 36, height: 36, borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 20, cursor: "pointer",
                          background: data.avatarSymbol === symbol ? "rgba(255,255,255,0.2)" : "transparent",
                          border: data.avatarSymbol === symbol ? "2px solid rgba(255,255,255,0.5)" : "2px solid transparent",
                          transition: "transform 0.15s ease",
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.2)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                      >
                        {symbol}
                      </div>
                    ))}
                    <div
                      onClick={(e) => { e.stopPropagation(); onUpdate({ ...data, avatarSymbol: "", showSymbolPicker: false }); }}
                      style={{
                        width: 36, height: 36, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, cursor: "pointer", color: "rgba(255,255,255,0.5)",
                        border: "2px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      clear
                    </div>
                  </div>
                )}
              </div>
              <div>
                <EditableText
                  value={data.clientName}
                  onChange={(v) => update("clientName", v)}
                  placeholder="Client Name"
                  style={{ fontSize: 22, fontWeight: 700, color: "#1A1A1A", fontFamily: "'Playfair Display', serif" }}
                />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#6B6B6B", marginBottom: 4 }}>Start Date</div>
              <input
                type="date"
                value={data.startDate || ""}
                onChange={(e) => update("startDate", e.target.value)}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1A1A1A",
                  background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(94, 140, 106, 0.2)",
                  borderRadius: 6, padding: "4px 8px",
                }}
              />
            </div>
          </div>

          {/* North Star */}
          <div style={{
            background: "rgba(255, 255, 255, 0.5)", border: "1px solid rgba(94, 140, 106, 0.2)", borderRadius: 12, padding: "20px 24px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16, color: "#5E8C6A" }}>✦</span>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#5E8C6A" }}>
                North Star
              </span>
            </div>
            <EditableText
              value={data.northStar}
              onChange={(v) => update("northStar", v)}
              placeholder="What's the big vision? What version of yourself do you want to see by the end of your coaching journey?"
              multiline
              style={{ fontSize: 15, color: "#1A1A1A", lineHeight: 1.6, minHeight: 50, fontWeight: 500 }}
            />
          </div>

          {/* Overall Progress Bar */}
          {totalActions > 0 && (
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ flex: 1, height: 6, background: "rgba(72,52,40,0.1)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  width: `${overallPct}%`, height: "100%", borderRadius: 3,
                  background: "#5E8C6A",
                  transition: "width 0.4s ease",
                }} />
              </div>
              <span style={{ fontSize: 13, color: "#6B6B6B", whiteSpace: "nowrap" }}>
                {doneActions}/{totalActions} actions
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px" }}>

        {/* Goals Section */}
        {(() => {
          const activeGoals = data.goals.filter(g => !g.completed);
          const completedGoals = data.goals.filter(g => g.completed);
          return (
            <>
              <SectionHeader
                icon="🎯"
                title="Goals"
                collapsed={collapsed.goals}
                onToggle={() => toggleSection('goals')}
                count={activeGoals.length}
                action={
                  <button onClick={addGoal} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
                    color: "white", background: "#5E8C6A", border: "none", borderRadius: 10,
                    padding: "8px 18px", cursor: "pointer",
                  }}>
                    + Add Goal
                  </button>
                }
              />
              {!collapsed.goals && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {activeGoals.length === 0 && completedGoals.length === 0 ? (
                    <div style={{
                      textAlign: "center", padding: "40px 20px", background: "white",
                      borderRadius: 16, border: "2px dashed #E8E5E0", color: "#6B6B6B", fontSize: 14,
                    }}>
                      No goals yet. Click "+ Add Goal" to start building the roadmap.
                    </div>
                  ) : (
                    activeGoals.map((goal) => {
                      const realIdx = data.goals.indexOf(goal);
                      return (
                        <GoalCard
                          key={goal.id}
                          goal={goal}
                          onUpdate={(updated) => updateGoal(realIdx, updated)}
                          onDelete={() => deleteGoal(realIdx)}
                        />
                      );
                    })
                  )}
                </div>
              )}
              {completedGoals.length > 0 && (
                <>
                  <SectionHeader
                    icon="✅"
                    title="Completed Goals"
                    collapsed={collapsed.completedGoals}
                    onToggle={() => toggleSection('completedGoals')}
                    count={completedGoals.length}
                  />
                  {!collapsed.completedGoals && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {completedGoals.map((goal) => {
                        const realIdx = data.goals.indexOf(goal);
                        return (
                          <GoalCard
                            key={goal.id}
                            goal={goal}
                            onUpdate={(updated) => updateGoal(realIdx, updated)}
                            onDelete={() => deleteGoal(realIdx)}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </>
          );
        })()}

        {/* Session Log */}
        <SectionHeader
          icon="📝"
          title="Session Log"
          collapsed={collapsed.sessions}
          onToggle={() => toggleSection('sessions')}
          count={data.sessions.length}
          action={
            <button onClick={addSession} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: "white", background: "#5E8C6A", border: "none", borderRadius: 10,
              padding: "8px 18px", cursor: "pointer",
            }}>
              + Log Session
            </button>
          }
        />
        {!collapsed.sessions && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.sessions.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "30px 20px", background: "#FFFFFF",
                borderRadius: 12, border: "1px dashed #E8E5E0", color: "#6B6B6B", fontSize: 14,
              }}>
                Session notes will appear here. Log insights and action items after each session.
              </div>
            ) : (
              data.sessions.map((s, idx) => (
                <SessionNote
                  key={s.id}
                  session={s}
                  onUpdate={(u) => updateSession(idx, u)}
                  onDelete={() => deleteSession(idx)}
                />
              ))
            )}
          </div>
        )}

        {/* Strategies Bank */}
        <SectionHeader
          icon="💡"
          title="Strategies That Work"
          collapsed={collapsed.strategies}
          onToggle={() => toggleSection('strategies')}
          count={data.strategies.length}
          action={
            <button onClick={addStrategy} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: "white", background: "#5E8C6A", border: "none", borderRadius: 10,
              padding: "8px 18px", cursor: "pointer",
            }}>
              + Add Strategy
            </button>
          }
        />
        {!collapsed.strategies && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.strategies.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "30px 20px", background: "#FFFFFF",
                borderRadius: 12, border: "1px dashed #E8E5E0", color: "#6B6B6B", fontSize: 14,
              }}>
                A running list of what works for you so you can refer back later.
              </div>
            ) : (
              data.strategies.map((s, idx) => (
                <StrategyItem
                  key={s.id}
                  strategy={s}
                  onUpdate={(u) => updateStrategy(idx, u)}
                  onDelete={() => deleteStrategy(idx)}
                />
              ))
            )}
          </div>
        )}

        {/* Strengths Section */}
        <SectionHeader
          icon="💪🏻"
          title="My Strengths"
          collapsed={collapsed.strengths}
          onToggle={() => toggleSection('strengths')}
          count={data.strengths.length}
          action={
            <button onClick={addStrength} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              color: "white", background: "#5E8C6A", border: "none", borderRadius: 10,
              padding: "8px 18px", cursor: "pointer",
            }}>
              + Add Strength
            </button>
          }
        />
        {!collapsed.strengths && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.strengths.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "30px 20px", background: "#FFFFFF",
                borderRadius: 12, border: "1px dashed #E8E5E0", color: "#6B6B6B", fontSize: 14,
              }}>
                Recognize and track your strengths here. These can be utilized to help you overcome challenges you face.
              </div>
            ) : (
              data.strengths.map((s, idx) => (
                <StrengthItem
                  key={s.id}
                  strength={s}
                  onUpdate={(u) => updateStrength(idx, u)}
                  onDelete={() => deleteStrength(idx)}
                />
              ))
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 60, textAlign: "center", padding: "24px 0", borderTop: "1px solid #E8E5E0", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <img src={LOGO_URI} alt="LG Coaching" style={{ width: 80, height: 80, opacity: 0.6 }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#6B6B6B" }}>
            Liana Groombridge • ADHD Coaching
          </span>
        </div>
      </div>
    </div>
  );
}
