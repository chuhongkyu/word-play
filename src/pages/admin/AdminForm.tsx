import { IContent } from '@/interface/listDetail';
import React, { useState } from 'react';

interface IAdmin {
    subtitle: string;
    startDatetime: string;
    content: IContent[]
}

const AdminForm = () => {
    const [formData, setFormData] = useState<IAdmin>({
        subtitle: '',
        startDatetime: '',
        content: [
            {
                answerEn: '',
                distractors: [],
                words: [],
                tts: ''
            }
        ]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index?:number) => {
        const { name, value } = e.target;
        
        if (name === 'distractors' || name === 'words') {
            const updatedContent = [...formData.content];
            if (index !== undefined) {
                updatedContent[index][name] = value.split(',').map(item => item.trim());
                setFormData({ ...formData, content: updatedContent });
            }   
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleAddQuestion = () => {
        setFormData({
            ...formData,
            content: [
                ...formData.content,
                {
                    answerEn: '',
                    distractors: [],
                    words: [],
                    tts: ''
                }
            ]
        });
    };

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className="admin-form-container">
            <h2>Admin Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="subtitle">Subtitle:</label>
                    <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="startDatetime">Start Datetime:</label>
                    <input type="datetime-local" id="startDatetime" name="startDatetime" value={formData.startDatetime} onChange={handleInputChange} />
                </div>
                {formData.content.map((question, index) => (
                    <div key={index} className="question-group">
                        <h3>Question {index + 1}</h3>
                        <div className="form-group">
                            <label htmlFor={`answerEn${index}`}>Answer (English):</label>
                            <input type="text" id={`answerEn${index}`} name={`content[${index}].answerEn`} value={question.answerEn} onChange={(e) => handleInputChange(e, index)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`distractors${index}`}>Distractors:</label>
                            <input type="text" id={`distractors${index}`} name={`distractors${index}`} value={question.distractors.join(', ')} onChange={(e) => handleInputChange(e, index)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`words${index}`}>Words:</label>
                            <input type="text" id={`words${index}`} name={`words${index}`} value={question.words.join(', ')} onChange={(e) => handleInputChange(e, index)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`tts${index}`}>TTS URL:</label>
                            <input type="text" id={`tts${index}`} name={`content[${index}].tts`} value={question.tts} onChange={(e) => handleInputChange(e, index)} />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={handleAddQuestion}>Add Question</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AdminForm;
