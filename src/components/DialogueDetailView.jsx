import React from 'react';
import { Volume2 } from 'lucide-react';

export function DialogueDetailView({ dialogue, onSpeak }) {
    if (!dialogue) return null;

    return (
        <div style={{ width: '100%', textAlign: 'left' }}>
            {/* Scene description */}
            <div style={{
                marginBottom: '1.5rem', padding: '1rem',
                background: '#eef2ff', borderRadius: '0.75rem',
                border: '1px solid #e0e7ff'
            }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>場景描述</h4>
                <p style={{ color: '#312e81', fontWeight: 500, margin: 0 }}>{dialogue.description}</p>
            </div>

            {/* Dialogue Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%', fontSize: '0.875rem',
                    textAlign: 'left', borderCollapse: 'collapse',
                    border: '1px solid #c7d2fe'
                }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '10px 14px', fontWeight: 700, whiteSpace: 'nowrap', color: '#312e81', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '0.75rem', width: '8%' }}>角色</th>
                            <th style={{ padding: '10px 14px', fontWeight: 700, whiteSpace: 'nowrap', color: '#312e81', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '0.75rem', width: '55%' }}>日文</th>
                            <th style={{ padding: '10px 14px', fontWeight: 700, whiteSpace: 'nowrap', color: '#312e81', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '0.75rem' }}>中文翻譯</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dialogue.dialogueData?.map((line, idx) => (
                            <tr key={idx}>
                                <td style={{
                                    padding: '10px 14px', border: '1px solid #c7d2fe',
                                    textAlign: 'center', verticalAlign: 'top'
                                }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        background: line.role === 'A' ? '#4f46e5' : '#e11d48',
                                        color: '#fff', fontSize: '0.75rem', fontWeight: 700
                                    }}>
                                        {line.role}
                                    </span>
                                </td>
                                <td style={{
                                    padding: '10px 14px', border: '1px solid #c7d2fe',
                                    color: '#1f2937', verticalAlign: 'top', lineHeight: 2
                                }}>
                                    <span
                                        onClick={() => onSpeak(line.jp)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {line.ruby ? (
                                            <span dangerouslySetInnerHTML={{ __html: line.ruby }} />
                                        ) : (
                                            line.jp
                                        )}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSpeak(line.jp);
                                        }}
                                        style={{
                                            marginLeft: '8px', background: 'none', border: 'none',
                                            color: '#818cf8', cursor: 'pointer', padding: 0,
                                            display: 'inline-flex', verticalAlign: 'middle'
                                        }}
                                    >
                                        <Volume2 size={14} />
                                    </button>
                                </td>
                                <td style={{
                                    padding: '10px 14px', border: '1px solid #c7d2fe',
                                    color: '#6b7280', verticalAlign: 'top'
                                }}>
                                    {line.zh}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
